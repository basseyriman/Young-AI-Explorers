import type { LessonData, QuizQuestion } from '@/data/lessons'

export type CustomTopicContentStatus = 'pending' | 'generating' | 'ready' | 'failed'

export interface CustomTopicLessonContent {
  introduction: string
  main_lesson: string
  fun_facts: string[]
  examples?: { type: string; content: string }[]
}

export interface CustomTopicRow {
  id: string
  user_id: string
  title: string
  description: string | null
  created_by: string
  world_id: string | null
  is_approved: boolean
  content_status: CustomTopicContentStatus
  lesson_content: CustomTopicLessonContent | null
  quiz_content: QuizQuestion[] | null
  badge_name: string | null
  generated_at: string | null
  created_at: string
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export function isCustomTopicId(id: string): boolean {
  return UUID_RE.test(id)
}

export function customTopicToLessonView(row: CustomTopicRow): LessonData & { id: string } {
  const lesson = row.lesson_content
  return {
    id: row.id,
    topic_number: 0,
    title: row.title,
    introduction: lesson?.introduction ?? row.description ?? '',
    main_lesson: lesson?.main_lesson ?? row.description ?? '',
    fun_facts: lesson?.fun_facts ?? [],
    examples: lesson?.examples ?? [],
  }
}

export interface ParsedTopicProposal {
  title: string
  description: string
}

/** Parse Vision Vee structured topic block from assistant message */
export function parseTopicProposalFromText(text: string): ParsedTopicProposal | null {
  const block = text.match(/---TOPIC---([\s\S]*?)---END---/i)
  const source = block ? block[1] : text

  const titleMatch = source.match(/title:\s*(.+)/i)
  const descMatch = source.match(/description:\s*([\s\S]+?)(?:\n(?:title:|---)|$)/i)

  if (titleMatch) {
    return {
      title: titleMatch[1].trim().replace(/^["']|["']$/g, ''),
      description: (descMatch?.[1] ?? titleMatch[1]).trim().replace(/^["']|["']$/g, ''),
    }
  }

  const fallback = text.match(/(?:custom topic|topic idea)[:\s]+["']?([^"'\n]+)["']?/i)
  if (fallback) {
    return {
      title: fallback[1].trim(),
      description: `A custom topic about ${fallback[1].trim()}, created with Vision Vee.`,
    }
  }

  return null
}

/** Remove structured topic block from chat display text */
export function stripTopicProposalBlock(text: string): string {
  return text
    .replace(/---TOPIC---[\s\S]*?---END---/gi, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}
