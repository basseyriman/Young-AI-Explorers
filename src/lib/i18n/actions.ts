'use server'

import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { SUPPORTED_LOCALES, type Locale } from './config'

export async function setLanguageAction(locale: Locale) {
  if (!SUPPORTED_LOCALES.includes(locale)) {
    return { error: 'Invalid locale' }
  }

  // Set cookie
  const cookieStore = await cookies()
  cookieStore.set('locale', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
  })

  // Attempt database persistence
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      await supabase
        .from('profiles')
        .update({ preferred_language: locale })
        .eq('id', user.id)
    }
  } catch (e) {
    console.error('Failed to persist language in profile:', e)
  }

  return { success: true }
}
