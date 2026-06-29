/**
 * Official Young AI Explorers book illustrations — one per starter chapter.
 * Source: YoungAIExplorersBook/assets (printed book / KDP).
 * Run `npm run copy-illustrations` after updating book art.
 */

export const BOOK_COVER_ILLUSTRATION = 'cover_illustration.png'

/** Amazon / marketing 3D book product image (not Vision Vee mascot) */
export const BOOK_AMAZON_COVER = 'book_cover_amazon.png'

/** Topic number (1–37) → public/assets filename */
export const BOOK_ILLUSTRATION_BY_TOPIC: Record<number, string> = {
  1: 'computer_vision.png',
  2: 'speech_recognition.png',
  3: 'ai_translation.png',
  4: 'ai_decision_making.png',
  5: 'ai_healthcare.png',
  6: 'ai_games.png',
  7: 'self_driving_cars.png',
  8: 'ai_space.png',
  9: 'neural_networks.png',
  10: 'ai_environment.png',
  11: 'machine_learning.png',
  12: 'nlp.png',
  13: 'robotics.png',
  14: 'recommendation_systems.png',
  15: 'facial_recognition.png',
  16: 'virtual_assistants.png',
  17: 'ai_art.png',
  18: 'ai_music.png',
  19: 'ai_sports.png',
  20: 'ai_agriculture.png',
  21: 'ai_weather.png',
  22: 'ai_education.png',
  23: 'ai_transportation.png',
  24: 'ai_banking.png',
  25: 'ai_shopping.png',
  26: 'ai_social_media.png',
  27: 'ai_ethics.png',
  28: 'ai_manufacturing.png',
  29: 'ai_cybersecurity.png',
  30: 'ai_photography.png',
  31: 'ai_food.png',
  32: 'ai_fashion.png',
  33: 'ai_movies.png',
  34: 'deep_learning.png',
  35: 'ai_chatbots.png',
  36: 'ai_emergency_services.png',
  37: 'ai_archaeology.png',
}

export function bookIllustrationPath(topicNumber: number): string | null {
  const file = BOOK_ILLUSTRATION_BY_TOPIC[topicNumber]
  return file ? `/assets/${file}` : null
}

export function bookIllustrationFilename(topicNumber: number): string | null {
  return BOOK_ILLUSTRATION_BY_TOPIC[topicNumber] ?? null
}
