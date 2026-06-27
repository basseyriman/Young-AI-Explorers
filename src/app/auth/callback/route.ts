import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { dashboardPathForRole, getUserRole } from '@/lib/auth/dashboard-access'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard/student'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const role = await getUserRole(user.id, user.user_metadata)
        return NextResponse.redirect(`${origin}${dashboardPathForRole(role)}`)
      }
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/login?message=${encodeURIComponent('Email verification failed. Please try signing in or request a new link.')}`)
}
