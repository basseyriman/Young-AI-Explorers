import { groq } from '@ai-sdk/groq'
import { generateText } from 'ai'
import type { CustomTopicLessonContent } from '@/lib/custom-topic-content'
import type { QuizQuestion } from '@/data/lessons'
import { BOOK_STORY_EXAMPLES, BOOK_STORY_STYLE_GUIDE } from '@/lib/vision-vee/book-story-style'

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

function normalizeQuiz(raw: unknown, title: string, description: string): QuizQuestion[] {
  if (!Array.isArray(raw)) return fallbackQuiz(title, description)
  const quiz = raw
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

  if (quiz.length >= 3) return quiz.slice(0, 3)
  return fallbackQuiz(title, description)
}

function fallbackQuiz(title: string, description: string): QuizQuestion[] {
  const summary = description.length > 80 ? `${description.slice(0, 77)}…` : description
  return [
    {
      question: `What is "${title}" mainly about?`,
      options: [summary || title, 'Video games only', 'Nothing useful', 'Only for adults'],
      answer: summary || title,
    },
    {
      question: 'True or False: Vision Vee can help you learn unlimited custom topics.',
      options: ['True', 'False'],
      answer: 'True',
    },
    {
      question: 'Who approves new Vision Vee topics for students?',
      options: ['A parent or teacher', 'Nobody', 'Random strangers', 'Vision Vee alone'],
      answer: 'A parent or teacher',
    },
  ]
}

export function buildFallbackTopicContent(title: string, description: string): GeneratedTopicContent {
  const intro = `In the glowing Heavenly Tech Lab, a young explorer's eyes lit up with curiosity about ${title}. Vision Vee floated in with a warm golden glow. "Great question, Explorer! Let's discover how AI connects to ${title} — and I know just the adventure for us!"`
  return {
    lesson: {
      introduction: intro,
      main_lesson: description || `${title} is a custom topic on Young AI Explorers. You can learn at your own pace, ask questions, and earn a badge when you finish the quiz.`,
      fun_facts: [
        `Custom topics like "${title}" grow your curriculum without limits.`,
        'Parents review Vision Vee topics before they appear in your learning journey.',
      ],
      examples: [
        {
          type: 'activity',
          content: `Talk with a parent about ${title}. What is one question you still want Vision Vee to answer?`,
        },
      ],
    },
    quiz: fallbackQuiz(title, description),
    badgeName: `${title.split(' ').slice(0, 2).join(' ') || 'Custom'} Explorer`.slice(0, 48),
  }
}

function parseGeneratedPayload(text: string, title: string, description: string): GeneratedTopicContent {
  try {
    const parsed = JSON.parse(extractJsonObject(text)) as Record<string, unknown>

    const lesson: CustomTopicLessonContent = {
      introduction: String(parsed.introduction ?? description),
      main_lesson: String(parsed.main_lesson ?? description),
      story_label: parsed.story_label ? String(parsed.story_label).slice(0, 64) : undefined,
      fun_facts: Array.isArray(parsed.fun_facts)
        ? parsed.fun_facts.slice(0, 2).map(String)
        : buildFallbackTopicContent(title, description).lesson.fun_facts,
      examples: Array.isArray(parsed.examples)
        ? parsed.examples.map((e) => {
            const ex = e as Record<string, unknown>
            return { type: String(ex.type ?? 'activity'), content: String(ex.content ?? '') }
          })
        : buildFallbackTopicContent(title, description).lesson.examples,
    }

    return {
      lesson,
      quiz: normalizeQuiz(parsed.quiz_questions, title, description),
      badgeName: String(parsed.badge_name ?? `${title.split(' ').slice(0, 2).join(' ')} Explorer`).slice(0, 48),
    }
  } catch {
    return buildFallbackTopicContent(title, description)
  }
}

export async function generateTopicContent(
  title: string,
  description: string
): Promise<GeneratedTopicContent> {
  if (!process.env.GROQ_API_KEY?.trim()) {
    return buildFallbackTopicContent(title, description)
  }

  try {
    const { text } = await generateText({
      model: groq('llama-3.1-8b-instant'),
      prompt: `You are Vision Vee, creating kid-friendly AI education content for Young AI Explorers — the same voice and story style as the published book by Bassey Riman / RimansTech Industries.

${BOOK_STORY_STYLE_GUIDE}

${BOOK_STORY_EXAMPLES}

Topic title: ${title}
Topic description: ${description}

Return ONLY valid JSON (no markdown) with this exact shape:
{
  "story_label": "Meet [Robot Name] — like Meet Vision Vee or Meet Echo Ed in the book",
  "introduction": "2-4 sentences: young explorer + robot guide story scene (book style)",
  "main_lesson": "3-4 short paragraphs separated by blank lines, explaining the topic simply with real-world examples",
  "fun_facts": ["mind-blowing fact 1", "mind-blowing fact 2"],
  "examples": [{ "type": "activity", "content": "one hands-on thinking activity" }],
  "quiz_questions": [
    { "question": "...", "options": ["A", "B", "C", "D"], "answer": "exact match to one option" },
    { "question": "...", "options": ["True", "False"], "answer": "True" },
    { "question": "...", "options": ["...", "...", "...", "..."], "answer": "..." }
  ],
  "badge_name": "Short badge name like Nigeria Farming Explorer"
}

Keep language simple, positive, and age-appropriate (8–12). The answer field must exactly match one option string.`,
    })

    return parseGeneratedPayload(text, title, description)
  } catch {
    return buildFallbackTopicContent(title, description)
  }
}
