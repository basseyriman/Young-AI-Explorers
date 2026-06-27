import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (!user && request.nextUrl.pathname.startsWith('/lesson')) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (!user && request.nextUrl.pathname.startsWith('/quiz')) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  const pathname = request.nextUrl.pathname
  const isStudentRoute =
    pathname.startsWith('/dashboard/student') ||
    pathname.startsWith('/lesson') ||
    pathname.startsWith('/quiz') ||
    pathname.startsWith('/match-quiz')

  const publicWhenUnverified = [
    '/',
    '/login',
    '/signup',
    '/signup/verify-email',
    '/auth/callback',
    '/privacy',
    '/terms',
    '/cookies',
  ]

  if (
    user &&
    !user.email_confirmed_at &&
    (user.user_metadata?.role === 'student' || !user.user_metadata?.role) &&
    isStudentRoute
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/signup/verify-email'
    url.searchParams.set('email', user.email ?? '')
    url.searchParams.set('role', 'student')
    return NextResponse.redirect(url)
  }

  if (
    user &&
    !user.email_confirmed_at &&
    !publicWhenUnverified.some((p) => pathname === p || pathname.startsWith(p + '/')) &&
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/_next') &&
    (user.user_metadata?.role === 'student' || !user.user_metadata?.role)
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/signup/verify-email'
    url.searchParams.set('email', user.email ?? '')
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
