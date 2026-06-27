import { groq } from '@ai-sdk/groq'
import { generateText } from 'ai'
import type { CustomTopicLessonContent } from '@/lib/custom-topic-content'
import type { QuizQuestion } from '@/data/lessons'

export interface GeneratedTopicContent {
  lesson: CustomTopicLessonContent
  quiz: QuizQuestion[]
  badgeName: string
}

function extractJsonObject(raw: string): string {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i)
  if (fenced) return fenced[1].trim()
  const start = raw.indexOf('{')
  const end = raw.lastIndexOf('}')
  if (start >= 0 && end > start) return raw.slice(start, end + 1)
  return raw.trim()
}

function normalizeQuiz(raw: unknown): QuizQuestion[] {
  if (!Array.isArray(raw)) return []
  return raw
    .slice(0, 3)
    .map((q) => {
      const item = q as Record<string, unknown>
      const options = Array.isArray(item.options) ? item.options.map(String) : []
      const answer = String(item.answer ?? options[0] ?? '')
      return {
        question: String(item.question ?? 'What did you learn?'),
        options: options.length >= 2 ? options : [answer, 'Something else', 'Not sure', 'All of the above'],
        answer,
      }
    })
    .filter((q) => q.question && q.options.includes(q.answer))
}

export async function generateTopicContent(
  title: string,
  description: string
): Promise<GeneratedTopicContent> {
  const { text } = await generateText({
    model: groq('llama-3.1-8b-instant'),
    prompt: `You are Vision Vee, creating kid-friendly AI education content for children on Young AI Explorers.

Topic title: ${title}
Topic description: ${description}

Return ONLY valid JSON (no markdown) with this exact shape:
{
  "introduction": "2-3 sentences introducing the topic with Vision Vee speaking warmly to a young explorer",
  "main_lesson": "3-5 short paragraphs explaining the topic simply with real-world examples",
  "fun_facts": ["fact 1", "fact 2"],
  "examples": [{ "type": "activity", "content": "one hands-on thinking activity" }],
  "quiz_questions": [
    { "question": "...", "options": ["A", "B", "C", "D"], "answer": "exact match to one option" },
    { "question": "...", "options": ["True", "False"], "answer": "True" },
    { "question": "...", "options": ["...", "...", "...", "..."], "answer": "..." }
  ],
  "badge_name": "Short badge name like Nigeria Farming Explorer"
}

Keep language simple, positive, and age-appropriate. The answer field must exactly match one option string.`,
  })

  const parsed = JSON.parse(extractJsonObject(text)) as Record<string, unknown>

  const lesson: CustomTopicLessonContent = {
    introduction: String(parsed.introduction ?? description),
    main_lesson: String(parsed.main_lesson ?? description),
    fun_facts: Array.isArray(parsed.fun_facts)
      ? parsed.fun_facts.slice(0, 2).map(String)
      : ['Vision Vee created this topic just for you!', 'Custom topics grow your unlimited curriculum.'],
    examples: Array.isArray(parsed.examples)
      ? parsed.examples.map((e) => {
          const ex = e as Record<string, unknown>
          return { type: String(ex.type ?? 'activity'), content: String(ex.content ?? '') }
        })
      : [{ type: 'activity', content: `Discuss ${title} with a parent or friend — what surprised you?` }],
  }

  const quiz = normalizeQuiz(parsed.quiz_questions)
  if (quiz.length < 3) {
    quiz.push(
      { question: `What is "${title}" mainly about?`, options: [description.slice(0, 60), 'Video games only', 'Nothing useful', 'Only for adults'], answer: description.slice(0, 60) },
      { question: 'True or False: Vision Vee can help you learn unlimited custom topics.', options: ['True', 'False'], answer: 'True' },
      { question: 'Who approves new Vision Vee topics for students?', options: ['A parent or teacher', 'Nobody', 'Random strangers', 'Vision Vee alone'], answer: 'A parent or teacher' }
    )
  }

  return {
    lesson,
    quiz: quiz.slice(0, 3),
    badgeName: String(parsed.badge_name ?? `${title.split(' ').slice(0, 2).join(' ')} Explorer`).slice(0, 48),
  }
}
