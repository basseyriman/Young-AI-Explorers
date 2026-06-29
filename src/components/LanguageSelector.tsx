'use client'

import { useState, useRef, useEffect } from 'react'
import { useTranslation } from '@/lib/i18n/LanguageContext'
import type { Locale } from '@/lib/i18n/config'
import { SUPPORTED_LOCALES, LOCALE_NAMES, LOCALE_FLAGS } from '@/lib/i18n/config'
import { Globe, ChevronDown, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function LanguageSelector({ showLabel = true }: { showLabel?: boolean }) {
  const { locale, setLocale, isPending } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = async (lang: Locale) => {
    setIsOpen(false)
    await setLocale(lang)
  }

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={`flex items-center gap-2 px-3 py-2 rounded-full border border-brand-purple/10 dark:border-brand-gold/15 bg-brand-surface/50 dark:bg-brand-purple-dark/50 hover:bg-brand-purple/5 dark:hover:bg-brand-gold/5 transition-all text-sm font-semibold text-brand-purple dark:text-brand-cream hover:text-brand-gold focus:outline-none focus:ring-2 focus:ring-brand-gold/40 ${
          isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
        aria-label="Select language"
      >
        <span className="flex items-center gap-1.5">
          <Globe className="h-4 w-4 text-brand-gold/80" />
          <span className="text-base leading-none">{LOCALE_FLAGS[locale]}</span>
          {showLabel && <span className="hidden sm:inline text-xs tracking-wide uppercase">{LOCALE_NAMES[locale]}</span>}
        </span>
        <ChevronDown className={`h-3 w-3 text-brand-purple/40 dark:text-brand-cream/40 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 mt-2 w-48 rounded-2xl bg-brand-cream dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/15 shadow-[0_10px_30px_rgba(74,45,110,0.15)] dark:shadow-[0_10px_30px_rgba(201,160,78,0.1)] py-1.5 z-[100] origin-top-right focus:outline-none"
          >
            {SUPPORTED_LOCALES.map((lang) => (
              <button
                key={lang}
                onClick={() => handleSelect(lang)}
                className={`w-full flex items-center justify-between px-4 py-2 text-sm font-medium transition-colors text-left ${
                  lang === locale
                    ? 'text-brand-gold bg-brand-purple/5 dark:bg-brand-gold/5 font-bold'
                    : 'text-brand-purple/75 dark:text-brand-cream/80 hover:text-brand-purple dark:hover:text-brand-cream hover:bg-brand-purple/5 dark:hover:bg-brand-gold/5'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="text-lg">{LOCALE_FLAGS[lang]}</span>
                  <span>{LOCALE_NAMES[lang]}</span>
                </span>
                {lang === locale && <Check className="h-4 w-4 text-brand-gold" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
