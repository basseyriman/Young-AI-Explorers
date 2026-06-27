'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) redirect(`/login?message=${encodeURIComponent(error.message)}`)

  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    const role = profile?.role ?? user.user_metadata?.role
    if (role === 'teacher') redirect('/dashboard/teacher')
    if (role === 'parent') redirect('/dashboard/parent')
    if (role === 'admin') redirect('/dashboard/admin')
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

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName, role, country_code: countryCode, nickname },
    },
  })

  if (error) redirect(`/signup?message=${encodeURIComponent(error.message)}`)

  if (data.user) {
    await supabase.from('profiles').upsert({
      id: data.user.id,
      full_name: fullName,
      role,
      country_code: countryCode,
      nickname,
      sharing_level: 'region',
      allow_match_quiz: true,
    })
    await supabase.from('curriculum_settings').upsert({ user_id: data.user.id })
  }

  if (role === 'teacher') redirect('/dashboard/teacher')
  if (role === 'parent') redirect('/dashboard/parent')
  if (role === 'admin') redirect('/dashboard/admin')
  redirect('/dashboard/student')
}
