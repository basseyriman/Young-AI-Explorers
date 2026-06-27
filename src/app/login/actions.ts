'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { dashboardPathForRole, getUserRole } from '@/lib/auth/dashboard-access'
import {
  formatSignupError,
  resolveCountryCodeForSignup,
  ensureSignupProfile,
  registerAuthUser,
} from '@/lib/auth/signup-utils'

export async function login(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) redirect(`/login?message=${encodeURIComponent(error.message)}`)

  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    const { ensureOwnProfile } = await import('@/lib/db/platform')
    await ensureOwnProfile()
    const role = await getUserRole(user.id, user.user_metadata)
    redirect(dashboardPathForRole(role))
  }
  redirect('/dashboard/student')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = (formData.get('email') as string)?.trim()
  const password = formData.get('password') as string
  const fullName = (formData.get('fullName') as string)?.trim()
  const role = (formData.get('role') as string) || 'student'

  if (!fullName) {
    redirect('/signup?message=' + encodeURIComponent('Please enter your full name.'))
  }
  if (!email?.includes('@')) {
    redirect('/signup?message=' + encodeURIComponent('Please enter a valid email address.'))
  }
  const countryCode = await resolveCountryCodeForSignup(supabase, (formData.get('countryCode') as string) || 'GB')
  const nickname = fullName.split(' ')[0] || 'Explorer'
  const parentEmail = (formData.get('parentEmail') as string)?.trim() || null
  const parentConsent = formData.get('parentConsent') === 'on'
  const birthYearRaw = formData.get('birthYear') as string
  const birthYear = birthYearRaw ? parseInt(birthYearRaw, 10) : null
  const termsConsent = formData.get('termsConsent') === 'on'

  if (!termsConsent) {
    redirect('/signup?message=' + encodeURIComponent('Please accept the Terms and Privacy Policy to create an account.'))
  }

  if (role === 'student') {
    if (!parentConsent) {
      redirect('/signup?message=' + encodeURIComponent('A parent or guardian must consent before a student account can be created.'))
    }
    if (!parentEmail || !parentEmail.includes('@')) {
      redirect('/signup?message=' + encodeURIComponent('Please enter a parent or guardian email address.'))
    }
    const currentYear = new Date().getFullYear()
    if (!birthYear || birthYear < 1995 || birthYear > currentYear) {
      redirect('/signup?message=' + encodeURIComponent('Please enter a valid birth year.'))
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

  const metadata: Record<string, unknown> = {
    full_name: fullName,
    role,
    country_code: countryCode,
    nickname,
    parent_email: parentEmail,
  }
  if (role === 'student' && birthYear != null) {
    metadata.birth_year = birthYear
  }

  const registered = await registerAuthUser({
    email,
    password,
    emailRedirectTo: `${siteUrl}/auth/callback`,
    metadata,
  })

  if (!registered.ok) {
    console.error('[signup] registerAuthUser failed:', registered.error)
    redirect(`/signup?message=${encodeURIComponent(formatSignupError(registered.error))}`)
  }

  const profilePayload = {
    userId: registered.userId,
    email,
    fullName,
    role,
    countryCode,
    nickname,
    parentEmail,
    birthYear,
  }

  const ensured = await ensureSignupProfile(profilePayload)
  if (ensured.error) {
    console.error('[signup] profile ensure failed:', ensured.error)
  }

  if (registered.sessionCreated) {
    await supabase.from('profiles').upsert({
      id: registered.userId,
      email,
      full_name: fullName,
      role,
      country_code: countryCode,
      nickname,
      sharing_level: role === 'student' ? 'private' : 'region',
      allow_match_quiz: role !== 'student',
      parent_email: role === 'student' ? parentEmail : null,
      parent_consent_at: role === 'student' ? new Date().toISOString() : null,
      birth_year: role === 'student' ? birthYear : null,
    })
    await supabase.from('curriculum_settings').upsert({
      user_id: registered.userId,
      sharing_level: role === 'student' ? 'private' : 'region',
      allow_match_quiz: role !== 'student',
    })
  }

  if (!registered.emailConfirmed) {
    redirect(`/signup/verify-email?email=${encodeURIComponent(email)}&role=${role}`)
  }

  redirect(dashboardPathForRole(role))
}
