'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { dashboardPathForRole, getUserRole } from '@/lib/auth/dashboard-access'

export async function login(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) redirect(`/login?message=${encodeURIComponent(error.message)}`)

  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    const role = await getUserRole(user.id, user.user_metadata)
    redirect(dashboardPathForRole(role))
  }
  redirect('/dashboard/student')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string
  const role = (formData.get('role') as string) || 'student'
  const countryCode = (formData.get('countryCode') as string) || 'GB'
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
    if (!birthYear || birthYear < 2008 || birthYear > 2018) {
      redirect('/signup?message=' + encodeURIComponent('Please enter a valid birth year (ages 8–14).'))
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${siteUrl}/auth/callback`,
      data: {
        full_name: fullName,
        role,
        country_code: countryCode,
        nickname,
        parent_email: parentEmail,
        birth_year: birthYear,
      },
    },
  })

  if (error) redirect(`/signup?message=${encodeURIComponent(error.message)}`)

  if (data.user) {
    await supabase.from('profiles').upsert({
      id: data.user.id,
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
      user_id: data.user.id,
      sharing_level: role === 'student' ? 'private' : 'region',
      allow_match_quiz: role !== 'student',
    })
  }

  if (data.user && !data.user.email_confirmed_at) {
    redirect(`/signup/verify-email?email=${encodeURIComponent(email)}&role=${role}`)
  }

  redirect(dashboardPathForRole(role))
}
