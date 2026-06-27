import type { CurriculumSettings, TopicId } from '@/data/curriculum'
import { DEFAULT_CURRICULUM } from '@/data/curriculum'

export function parseCurriculumSettings(raw: unknown): CurriculumSettings {
  if (!raw || typeof raw !== 'object') return DEFAULT_CURRICULUM
  const data = raw as Partial<CurriculumSettings>
  const countryCode = data.countryCode ?? data.region ?? 'GB'
  return {
    countryCode,
    region: countryCode,
    disabledTopics: Array.isArray(data.disabledTopics) ? data.disabledTopics : [],
    customTopics: Array.isArray(data.customTopics) ? data.customTopics : [],
    sharingLevel: data.sharingLevel ?? DEFAULT_CURRICULUM.sharingLevel,
    allowMatchQuiz: data.allowMatchQuiz ?? true,
  }
}

export function curriculumFromUserMetadata(metadata: Record<string, unknown> | undefined): CurriculumSettings {
  return parseCurriculumSettings(metadata?.curriculum_settings)
}

export function toggleTopicDisabled(
  settings: CurriculumSettings,
  topicId: TopicId,
  disabled: boolean
): CurriculumSettings {
  const key = String(topicId)
  const without = settings.disabledTopics.filter((t) => String(t) !== key)
  return { ...settings, disabledTopics: disabled ? [...without, topicId] : without }
}

export function addCustomTopic(
  settings: CurriculumSettings,
  topic: { title: string; description: string; createdBy: 'parent' | 'vision_vee' }
): CurriculumSettings {
  return {
    ...settings,
    customTopics: [
      ...settings.customTopics,
      {
        id: `local-${Date.now()}`,
        title: topic.title,
        description: topic.description,
        createdBy: topic.createdBy,
        createdAt: new Date().toISOString(),
      },
    ],
  }
}

export function removeCustomTopic(settings: CurriculumSettings, topicId: string): CurriculumSettings {
  return { ...settings, customTopics: settings.customTopics.filter((t) => t.id !== topicId) }
}
