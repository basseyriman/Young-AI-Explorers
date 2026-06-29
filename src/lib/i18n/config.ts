export type Locale = 'en' | 'fr' | 'es' | 'sw' | 'ar'

export const SUPPORTED_LOCALES: Locale[] = ['en', 'fr', 'es', 'sw', 'ar']

export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  sw: 'Kiswahili',
  ar: 'العربية',
}

export const LOCALE_FLAGS: Record<Locale, string> = {
  en: '🇬🇧',
  fr: '🇫🇷',
  es: '🇪🇸',
  sw: '🇹🇿',
  ar: '🇸🇦',
}
