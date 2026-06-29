import { cookies } from 'next/headers'
import type { LessonData } from '@/data/lessons'
import { ALL_LESSONS } from '@/data/lessons'
import { frLessons } from './lessons/fr'
import { esLessons } from './lessons/es'
import { swLessons } from './lessons/sw'
import { arLessons } from './lessons/ar'

// Load dictionary files statically
import enDict from './dicts/en.json'
import frDict from './dicts/fr.json'
import esDict from './dicts/es.json'
import swDict from './dicts/sw.json'
import arDict from './dicts/ar.json'

import { SUPPORTED_LOCALES, LOCALE_NAMES, LOCALE_FLAGS, type Locale } from './config'
export type { Locale } from './config'
export { SUPPORTED_LOCALES, LOCALE_NAMES, LOCALE_FLAGS }

const DICTIONARIES: Record<Locale, any> = {
  en: enDict,
  fr: frDict,
  es: esDict,
  sw: swDict,
  ar: arDict,
}

const LESSONS_BY_LOCALE: Record<Locale, Record<number, Partial<LessonData>>> = {
  en: {}, // Static English uses ALL_LESSONS directly
  fr: frLessons,
  es: esLessons,
  sw: swLessons,
  ar: arLessons,
}

/**
 * Gets the current locale from cookies. Fallbacks to 'en'.
 */
export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const localeCookie = cookieStore.get('locale')?.value as Locale
  if (localeCookie && SUPPORTED_LOCALES.includes(localeCookie)) {
    return localeCookie
  }
  return 'en'
}

/**
 * Gets the translation dictionary object for the specified locale.
 */
export async function getTranslations(locale: Locale) {
  return DICTIONARIES[locale] || DICTIONARIES['en']
}

/**
 * Gets localized lesson data with English fallback for missing fields.
 */
export async function getLocalizedLesson(
  id: string | number,
  locale: Locale
): Promise<LessonData | null> {
  const topicNum = typeof id === 'string' ? (id === 'intro' ? 0 : parseInt(id, 10)) : id
  if (isNaN(topicNum)) return null

  // Topic 0 is intro
  let baseLesson: LessonData | undefined
  if (topicNum === 0) {
    baseLesson = {
      topic_number: 0,
      title: 'Welcome to the Future – Your AI Adventure Begins!',
      introduction:
        "Step into the magical tech laboratory where anything is possible! Maya and Alex were looking at a glowing holographic screen when a friendly, shiny robot named Vision Vee floated down to greet them. 'Welcome, young explorers!' Vee chirped. 'You are about to start a super exciting journey into Artificial Intelligence, Robotics, and the amazing technologies of tomorrow. Are you ready to see how AI is changing our world?'",
      main_lesson:
        "Artificial Intelligence (or AI) is like giving computers a special kind of 'brainpower' so they can help us solve problems, recognize pictures, understand our voices, and even create art! Just like you learn from reading books and playing games, computers can learn from patterns and information. Over the course of this journey, you'll visit different virtual islands and learn how AI makes cars drive themselves, helps doctors cure sickness, protects wild animals, and makes the future brighter for everyone.",
      examples: [
        {
          type: 'activity',
          content:
            'Look around your environment — from smart assistants to facial locks, AI is already here helping you every day. Can you spot 3 things powered by AI?',
        },
      ],
      fun_facts: [
        "Did you know that the word 'robot' was first used in a play over 100 years ago? Today, real robots and AI are helping us explore deep space and the bottom of the ocean!",
      ],
    }
  } else {
    baseLesson = ALL_LESSONS[topicNum]
  }

  if (!baseLesson) return null

  // If locale is english, return base
  if (locale === 'en') {
    return baseLesson
  }

  // Fetch localized overrides
  const localizedData = LESSONS_BY_LOCALE[locale]?.[topicNum]
  if (!localizedData) {
    return baseLesson // fallback to English
  }

  // Merge localized overrides with English fallback
  return {
    ...baseLesson,
    title: localizedData.title || baseLesson.title,
    introduction: localizedData.introduction || baseLesson.introduction,
    main_lesson: localizedData.main_lesson || baseLesson.main_lesson,
    fun_facts: localizedData.fun_facts || baseLesson.fun_facts,
    examples: localizedData.examples || baseLesson.examples,
  }
}
