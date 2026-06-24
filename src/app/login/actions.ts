'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    redirect(`/login?message=${encodeURIComponent(error.message)}`)
  }

  // Find user role to redirect appropriately
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    if (profile?.role === 'teacher') redirect('/dashboard/teacher')
    if (profile?.role === 'parent') redirect('/dashboard/parent')
    if (profile?.role === 'admin') redirect('/dashboard/admin')
  }

  redirect('/dashboard/student')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string
  const role = (formData.get('role') as string) || 'student'

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: role
      }
    }
  })

  if (error) {
    redirect(`/signup?message=${encodeURIComponent(error.message)}`)
  }

  // Attempt to create the profile record if the table exists
  if (data.user) {
    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id,
      full_name: fullName,
      role: role
    })
    
    if (profileError) {
      console.error("Profile creation error (schema might not be applied yet):", profileError)
    }
  }

  if (role === 'teacher') redirect('/dashboard/teacher')
  if (role === 'parent') redirect('/dashboard/parent')
  if (role === 'admin') redirect('/dashboard/admin')
  
  redirect('/dashboard/student')
}
