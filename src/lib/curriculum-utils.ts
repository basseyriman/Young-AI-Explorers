import {
  CurriculumSettings,
  DEFAULT_CURRICULUM,
  type CustomTopic,
  type ExplorerRegionId,
  type TopicId,
} from "@/data/curriculum";

export function parseCurriculumSettings(raw: unknown): CurriculumSettings {
  if (!raw || typeof raw !== "object") return DEFAULT_CURRICULUM;
  const data = raw as Partial<CurriculumSettings>;
  return {
    region: (data.region as ExplorerRegionId) ?? DEFAULT_CURRICULUM.region,
    disabledTopics: Array.isArray(data.disabledTopics) ? data.disabledTopics : [],
    customTopics: Array.isArray(data.customTopics) ? data.customTopics : [],
    sharingLevel: data.sharingLevel ?? DEFAULT_CURRICULUM.sharingLevel,
    allowMatchQuiz: data.allowMatchQuiz ?? true,
  };
}

export function curriculumFromUserMetadata(metadata: Record<string, unknown> | undefined): CurriculumSettings {
  return parseCurriculumSettings(metadata?.curriculum_settings);
}

export function toggleTopicDisabled(
  settings: CurriculumSettings,
  topicId: TopicId,
  disabled: boolean
): CurriculumSettings {
  const key = String(topicId);
  const without = settings.disabledTopics.filter((t) => String(t) !== key);
  return {
    ...settings,
    disabledTopics: disabled ? [...without, topicId] : without,
  };
}

export function addCustomTopic(
  settings: CurriculumSettings,
  topic: Omit<CustomTopic, "id" | "createdAt">
): CurriculumSettings {
  const newTopic: CustomTopic = {
    ...topic,
    id: `custom-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  return { ...settings, customTopics: [...settings.customTopics, newTopic] };
}

export function removeCustomTopic(settings: CurriculumSettings, topicId: string): CurriculumSettings {
  return {
    ...settings,
    customTopics: settings.customTopics.filter((t) => t.id !== topicId),
  };
}
