import type { SupabaseClient } from '@supabase/supabase-js'
import { ALL_COUNTRIES } from '@/data/countries'

type AuthLikeError = {
  message?: string
  code?: string
  status?: number
  name?: string
}

export type SignupAuthResult =
  | { ok: true; userId: string; emailConfirmed: boolean; sessionCreated: boolean }
  | { ok: false; error: AuthLikeError }

const SMTP_HINT =
  'Supabase could not send the confirmation email. For local testing: open Supabase → Authentication → Sign In / Providers → Email → turn OFF "Confirm email". Or add SUPABASE_SERVICE_ROLE_KEY to .env.local (Project Settings → API → service_role key).'

const CODE_MESSAGES: Record<string, string> = {
  user_already_exists: 'An account with this email already exists. Try signing in instead.',
  email_exists: 'An account with this email already exists. Try signing in instead.',
  identity_already_exists: 'An account with this email already exists. Try signing in instead.',
  unexpected_failure:
    'We could not finish setting up your account in the database. Run migration 013_signup_bulletproof.sql in Supabase, or try signing in if you already registered.',
  signup_disabled: 'New signups are temporarily disabled. Please try again later.',
  over_email_send_rate_limit: 'Too many signup emails sent. Wait a few minutes, then try again.',
  over_request_rate_limit: 'Too many attempts. Please wait a minute and try again.',
  weak_password: 'Password is too weak. Use at least 6 characters.',
  invalid_email: 'Please enter a valid email address.',
  email_address_invalid: 'Please enter a valid email address.',
  validation_failed: 'Please check your email, password, and name, then try again.',
  '23505': 'An account with this email already exists. Try signing in instead.',
  '42501':
    'Your account may have been created. Check your email to confirm, then sign in.',
}

function pickMessage(error: AuthLikeError): string | undefined {
  const candidates = [error.message]
  for (const value of candidates) {
    if (!value) continue
    const trimmed = value.trim()
    if (!trimmed || trimmed === '{}' || trimmed === '[object Object]' || trimmed === 'undefined') {
      continue
    }
    if (/database error saving new user/i.test(trimmed)) {
      return 'We could not finish creating your account. Run migration 013_signup_bulletproof.sql in Supabase SQL Editor, then try again — or sign in if you already registered.'
    }
    return trimmed
  }
  return undefined
}

export function formatSignupError(error: AuthLikeError | null | undefined): string {
  if (!error) {
    return 'Unable to create your account. Please try again.'
  }

  const message = pickMessage(error)
  if (message) return message

  const code = error.code?.trim()
  if (code && CODE_MESSAGES[code]) {
    return CODE_MESSAGES[code]
  }

  if (error.name === 'AuthRetryableFetchError' && (error.status === 500 || error.status === 0)) {
    return SMTP_HINT
  }

  if (error.status === 422) {
    return 'Please check your email and password, then try again.'
  }
  if (error.status === 429) {
    return CODE_MESSAGES.over_request_rate_limit
  }
  if (error.status === 500) {
    return SMTP_HINT
  }

  console.error('[signup] Unmapped auth error:', {
    name: error.name,
    code: error.code,
    status: error.status,
    message: error.message,
  })

  return 'Unable to create your account. Please check your details and try again.'
}

export function normalizeSignupMessage(raw: string | string[] | undefined): string | null {
  if (!raw) return null
  const message = Array.isArray(raw) ? raw[0] : raw
  if (!message || message === '{}' || message === '[object Object]' || message === 'undefined') {
    return 'Something went wrong while creating your account. Please try again.'
  }
  return message
}

/** Ensure country_code exists in DB (FK on profiles) before signup. */
export async function resolveCountryCodeForSignup(
  supabase: SupabaseClient,
  code: string
): Promise<string> {
  const normalized = (code || 'GB').trim().toUpperCase()
  const known = ALL_COUNTRIES.some((c) => c.code === normalized)
  if (!known) return 'GB'

  const { data } = await supabase
    .from('countries')
    .select('code')
    .eq('code', normalized)
    .maybeSingle()

  if (data?.code) return data.code

  const { data: global } = await supabase
    .from('countries')
    .select('code')
    .eq('code', 'GLOBAL')
    .maybeSingle()
  if (global?.code) return global.code

  return 'GB'
}

function devAutoConfirmSignup(): boolean {
  if (process.env.SUPABASE_SIGNUP_AUTO_CONFIRM === 'true') return true
  if (process.env.SUPABASE_SIGNUP_AUTO_CONFIRM === 'false') return false
  return process.env.NODE_ENV === 'development'
}

/** Register via service role when available (avoids SMTP/500 errors); else anon signUp. */
export async function registerAuthUser(input: {
  email: string
  password: string
  emailRedirectTo: string
  metadata: Record<string, unknown>
}): Promise<SignupAuthResult> {
  const { createAdminClient } = await import('@/utils/supabase/admin')
  const admin = createAdminClient()
  const autoConfirm = devAutoConfirmSignup()

  if (admin) {
    const { data, error } = await admin.auth.admin.createUser({
      email: input.email,
      password: input.password,
      email_confirm: autoConfirm,
      user_metadata: input.metadata,
    })

    if (error) {
      const msg = error.message?.toLowerCase() ?? ''
      if (msg.includes('already') || error.status === 422) {
        return { ok: false, error: { message: error.message, code: 'email_exists', status: error.status, name: error.name } }
      }
      return { ok: false, error: { message: error.message, code: error.code, status: error.status, name: error.name } }
    }

    if (!data.user) {
      return { ok: false, error: { message: 'No user returned from Supabase.' } }
    }

    let sessionCreated = false
    if (autoConfirm) {
      const { createClient } = await import('@/utils/supabase/server')
      const supabase = await createClient()
      const { error: signInErr } = await supabase.auth.signInWithPassword({
        email: input.email,
        password: input.password,
      })
      sessionCreated = !signInErr
    }

    return {
      ok: true,
      userId: data.user.id,
      emailConfirmed: autoConfirm || !!data.user.email_confirmed_at,
      sessionCreated,
    }
  }

  const { createClient } = await import('@/utils/supabase/server')
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      emailRedirectTo: input.emailRedirectTo,
      data: input.metadata,
    },
  })

  if (error) {
    return { ok: false, error: { message: error.message, code: error.code, status: error.status, name: error.name } }
  }

  const identityCount = data.user?.identities?.length ?? 0
  if (data.user && identityCount === 0) {
    return { ok: false, error: { code: 'email_exists', message: 'Email already registered' } }
  }

  if (!data.user) {
    return { ok: false, error: { message: 'No user returned from Supabase.' } }
  }

  return {
    ok: true,
    userId: data.user.id,
    emailConfirmed: !!data.user.email_confirmed_at,
    sessionCreated: !!data.session,
  }
}

export type SignupProfilePayload = {
  userId: string
  email: string
  fullName: string
  role: string
  countryCode: string
  nickname: string
  parentEmail: string | null
  birthYear: number | null
}

/** Create profile rows with service role (bypasses RLS when email confirm leaves no session). */
export async function ensureSignupProfile(payload: SignupProfilePayload): Promise<{ error?: string }> {
  const { createAdminClient } = await import('@/utils/supabase/admin')
  const admin = createAdminClient()
  if (!admin) return {}

  const { userId, email, fullName, role, countryCode, nickname, parentEmail, birthYear } = payload
  const sharingLevel = role === 'student' ? 'private' : 'region'
  const allowMatchQuiz = role !== 'student'

  const { error: profileErr } = await admin.from('profiles').upsert({
    id: userId,
    email,
    full_name: fullName,
    role,
    country_code: countryCode,
    nickname,
    sharing_level: sharingLevel,
    allow_match_quiz: allowMatchQuiz,
    parent_email: role === 'student' ? parentEmail : null,
    parent_consent_at: role === 'student' && parentEmail ? new Date().toISOString() : null,
    birth_year: role === 'student' ? birthYear : null,
  })
  if (profileErr) return { error: profileErr.message }

  const { error: settingsErr } = await admin.from('curriculum_settings').upsert({
    user_id: userId,
    sharing_level: sharingLevel,
    allow_match_quiz: allowMatchQuiz,
  })
  if (settingsErr) return { error: settingsErr.message }

  return {}
}
