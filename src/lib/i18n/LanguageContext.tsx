'use client'

import React, { createContext, useContext, useState, useTransition } from 'react'
import type { Locale } from './config'
import { setLanguageAction } from './actions'
import { useRouter } from 'next/navigation'

interface LanguageContextProps {
  locale: Locale
  setLocale: (locale: Locale) => Promise<void>
  t: (key: string) => string
  isPending: boolean
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined)

export function LanguageProvider({
  children,
  initialLocale,
  initialDictionary,
}: {
  children: React.ReactNode
  initialLocale: Locale
  initialDictionary: any
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)
  const [dictionary, setDictionary] = useState<any>(initialDictionary)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const setLocale = async (newLocale: Locale) => {
    if (newLocale === locale) return

    startTransition(async () => {
      const res = await setLanguageAction(newLocale)
      if (res.success) {
        setLocaleState(newLocale)
        // Dynamically fetch client dictionary
        try {
          // Statically loading dicts client-side using dynamic import to save bundle size
          const dictModule = await import(`./dicts/${newLocale}.json`)
          setDictionary(dictModule.default)
        } catch (e) {
          console.error('Failed to dynamically load dictionary:', e)
        }
        
        // Force refresh all Next.js Server Components
        router.refresh()
      }
    })
  }

  // Dot-notation translation helper
  const t = (path: string): string => {
    const parts = path.split('.')
    let current = dictionary
    for (const part of parts) {
      if (current == null) return path
      current = current[part]
    }
    return typeof current === 'string' ? current : path
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, isPending }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider')
  }
  return context
}
