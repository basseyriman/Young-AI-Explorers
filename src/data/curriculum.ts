/** Core curriculum constants — always use 38+ to allow Vision Vee & parent-created topics */

export const BASE_LESSON_COUNT = 38;
export const BASE_CHAPTER_COUNT = 37;
export const TOPIC_COUNT_LABEL = "38+";
export const QUIZ_QUESTION_COUNT = 114;

export type TopicId = number | "intro" | string;

export interface BookLesson {
  id: TopicId;
  title: string;
  category: string;
  description?: string;
}

export interface CustomTopic {
  id: string;
  title: string;
  description: string;
  createdBy: "parent" | "vision_vee";
  createdAt: string;
  worldId?: string;
}

export interface CurriculumSettings {
  /** ISO country code from registration or parent settings */
  countryCode: string;
  /** @deprecated use countryCode — kept for compatibility */
  region: string;
  disabledTopics: TopicId[];
  customTopics: CustomTopic[];
  sharingLevel: "private" | "region" | "global";
  allowMatchQuiz: boolean;
}

export const DEFAULT_CURRICULUM: CurriculumSettings = {
  countryCode: "GB",
  region: "GB",
  disabledTopics: [],
  customTopics: [],
  sharingLevel: "region",
  allowMatchQuiz: true,
};

export const BOOK_LESSONS: BookLesson[] = [
  { id: "intro", title: "Welcome to the Future", category: "AI Foundations", description: "Your AI adventure begins here." },
  { id: 11, title: "Machine Learning", category: "AI Foundations" },
  { id: 34, title: "Deep Learning", category: "AI Foundations" },
  { id: 9, title: "Neural Networks", category: "AI Foundations" },
  { id: 4, title: "AI Decision Making", category: "AI Foundations" },
  { id: 27, title: "AI Ethics", category: "AI Foundations" },
  { id: 1, title: "Computer Vision", category: "AI That Sees, Hears & Speaks" },
  { id: 15, title: "Facial Recognition", category: "AI That Sees, Hears & Speaks" },
  { id: 2, title: "Speech Recognition", category: "AI That Sees, Hears & Speaks" },
  { id: 3, title: "AI Translation", category: "AI That Sees, Hears & Speaks" },
  { id: 12, title: "Natural Language Processing", category: "AI That Sees, Hears & Speaks" },
  { id: 35, title: "AI Chatbots", category: "AI That Sees, Hears & Speaks" },
  { id: 16, title: "Virtual Assistants", category: "AI That Sees, Hears & Speaks" },
  { id: 13, title: "Robotics", category: "Robotics & Intelligent Machines" },
  { id: 7, title: "Self-Driving Cars", category: "Robotics & Intelligent Machines" },
  { id: 28, title: "Smart Manufacturing", category: "Robotics & Intelligent Machines" },
  { id: 23, title: "Smart Traffic", category: "Robotics & Intelligent Machines" },
  { id: 14, title: "Recommendation Systems", category: "Robotics & Intelligent Machines" },
  { id: 5, title: "AI in Healthcare", category: "AI in Everyday Life" },
  { id: 22, title: "AI in Education", category: "AI in Everyday Life" },
  { id: 19, title: "AI in Sports", category: "AI in Everyday Life" },
  { id: 20, title: "AI in Agriculture", category: "AI in Everyday Life" },
  { id: 21, title: "Weather Prediction", category: "AI in Everyday Life" },
  { id: 36, title: "Emergency Services", category: "AI in Everyday Life" },
  { id: 10, title: "AI & Planet Earth", category: "Smart World & Digital Society" },
  { id: 29, title: "Cybersecurity", category: "Smart World & Digital Society" },
  { id: 24, title: "Secure Banking", category: "Smart World & Digital Society" },
  { id: 25, title: "Smart Shopping", category: "Smart World & Digital Society" },
  { id: 26, title: "Social Media AI", category: "Smart World & Digital Society" },
  { id: 17, title: "AI in Art", category: "Creativity & Future Innovation" },
  { id: 18, title: "AI in Music", category: "Creativity & Future Innovation" },
  { id: 30, title: "Smart Photography", category: "Creativity & Future Innovation" },
  { id: 32, title: "AI in Fashion", category: "Creativity & Future Innovation" },
  { id: 33, title: "AI in Movies", category: "Creativity & Future Innovation" },
  { id: 6, title: "AI in Games", category: "Creativity & Future Innovation" },
  { id: 31, title: "AI in Food & Nutrition", category: "Creativity & Future Innovation" },
  { id: 8, title: "AI in Space Exploration", category: "Creativity & Future Innovation" },
  { id: 37, title: "Digital Archaeology", category: "Creativity & Future Innovation" },
];

export const BOOK_ORDER: TopicId[] = [
  "intro", 11, 34, 9, 4, 27, 1, 15, 2, 3, 12, 35, 16, 13, 7, 28, 23, 14,
  5, 22, 19, 20, 21, 36, 10, 29, 24, 25, 26, 17, 18, 30, 32, 33, 6, 31, 8, 37,
];

export const WORLDS = [
  { id: "ai-foundations", title: "AI Foundations", lessonCount: 6, topicIds: ["intro", 11, 34, 9, 4, 27] as TopicId[] },
  { id: "sees-hears-speaks", title: "AI That Sees, Hears & Speaks", lessonCount: 7, topicIds: [1, 15, 2, 3, 12, 35, 16] as TopicId[] },
  { id: "robotics-machines", title: "Robotics & Intelligent Machines", lessonCount: 5, topicIds: [13, 7, 28, 23, 14] as TopicId[] },
  { id: "everyday-life", title: "AI in Everyday Life", lessonCount: 6, topicIds: [5, 22, 19, 20, 21, 36] as TopicId[] },
  { id: "smart-world", title: "Smart World & Digital Society", lessonCount: 5, topicIds: [10, 29, 24, 25, 26] as TopicId[] },
  { id: "creativity-innovation", title: "Creativity & Future Innovation", lessonCount: 9, topicIds: [17, 18, 30, 32, 33, 6, 31, 8, 37] as TopicId[] },
];


export function topicIdKey(id: TopicId): string {
  return String(id);
}

export function isTopicEnabled(id: TopicId, settings: CurriculumSettings): boolean {
  return !settings.disabledTopics.some((d) => topicIdKey(d) === topicIdKey(id));
}

export function getEnabledLessons(settings: CurriculumSettings = DEFAULT_CURRICULUM): BookLesson[] {
  return BOOK_LESSONS.filter((l) => isTopicEnabled(l.id, settings));
}

export function getTotalTopicCount(settings: CurriculumSettings = DEFAULT_CURRICULUM): number {
  return getEnabledLessons(settings).length + settings.customTopics.length;
}

export function getTopicCountLabel(settings?: CurriculumSettings): string {
  const total = settings ? getTotalTopicCount(settings) : BASE_LESSON_COUNT;
  return total > BASE_LESSON_COUNT ? `${total}+` : `${BASE_LESSON_COUNT}+`;
}
