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

const QUIZ_FALLBACK_TEXT: Record<string, Record<string, string>> = {
  en: {
    q1: 'What is "{title}" mainly about?',
    q2: 'True or False: Vision Vee can help you learn unlimited custom topics.',
    q3: 'Who approves new Vision Vee topics for students?',
    true: 'True',
    false: 'False',
    parent: 'A parent or teacher',
    nobody: 'Nobody',
    strangers: 'Random strangers',
    vee_alone: 'Vision Vee alone',
    games_only: 'Video games only',
    nothing_useful: 'Nothing useful',
    adults_only: 'Only for adults',
    intro: 'In the glowing Heavenly Tech Lab, a young explorer\'s eyes lit up with curiosity about {title}. Vision Vee floated in with a warm golden glow. "Great question, Explorer! Let\'s discover how AI connects to {title} — and I know just the adventure for us!"',
    main_fallback: '{title} is a custom topic on Young AI Explorers. You can learn at your own pace, ask questions, and earn a badge when you finish the quiz.',
    fact1: 'Custom topics like "{title}" grow your curriculum without limits.',
    fact2: 'Parents review Vision Vee topics before they appear in your learning journey.',
    act: 'Talk with a parent about {title}. What is one question you still want Vision Vee to answer?',
    badge: '{title} Explorer'
  },
  fr: {
    q1: 'De quoi s\'agit-il principalement dans "{title}" ?',
    q2: 'Vrai ou Faux : Vision Vee peut vous aider à apprendre des sujets personnalisés illimités.',
    q3: 'Qui approuve les nouveaux sujets de Vision Vee pour les élèves ?',
    true: 'Vrai',
    false: 'Faux',
    parent: 'Un parent ou un enseignant',
    nobody: 'Personne',
    strangers: 'Des inconnus',
    vee_alone: 'Vision Vee seule',
    games_only: 'Jeux vidéo uniquement',
    nothing_useful: 'Rien d\'utile',
    adults_only: 'Réservé aux adultes',
    intro: 'Dans le laboratoire technologique brillant, les yeux d\'un jeune explorateur se sont illuminés de curiosité pour {title}. Vision Vee a plané avec une lueur dorée chaleureuse. "Excellente question, explorateur ! Découvrons comment l\'IA se connecte à {title} — et je connais l\'aventure parfaite pour nous !"',
    main_fallback: '{title} est un sujet personnalisé sur Young AI Explorers. Vous pouvez apprendre à votre propre rythme, poser des questions et gagner un badge lorsque vous aurez terminé le quiz.',
    fact1: 'Les sujets personnalisés comme "{title}" développent votre programme sans limites.',
    fact2: 'Les parents examinent les sujets de Vision Vee avant qu\'ils n\'apparaissent dans votre parcours d\'apprentissage.',
    act: 'Parlez avec un parent de {title}. Quelle est la question à laquelle vous aimeriez que Vision Vee réponde ?',
    badge: 'Explorateur de {title}'
  },
  es: {
    q1: '¿De qué trata principalmente "{title}"?',
    q2: 'Verdadero o Falso: Vision Vee puede ayudarte a aprender temas personalizados ilimitados.',
    q3: '¿Quién aprueba los nuevos temas de Vision Vee para los estudiantes?',
    true: 'Verdadero',
    false: 'Falso',
    parent: 'Un padre o maestro',
    nobody: 'Nadie',
    strangers: 'Desconocidos',
    vee_alone: 'Vision Vee sola',
    games_only: 'Solo videojuegos',
    nothing_useful: 'Nada útil',
    adults_only: 'Solo para adultos',
    intro: 'En el brillante laboratorio tecnológico, los ojos de un joven explorador se iluminaron de curiosidad por {title}. Vision Vee flotó con un cálido brillo dorado. "¡Excelente pregunta, explorador! Descubramos cómo se conecta la IA con {title}, ¡y conozco la aventura perfecta para nosotros!"',
    main_fallback: '{title} es un tema personalizado en Young AI Explorers. Puedes aprender a tu propio ritmo, hacer preguntas y ganar una insignia cuando termines el cuestionario.',
    fact1: 'Los temas personalizados como "{title}" amplían tu plan de estudios sin límites.',
    fact2: 'Los padres revisan los temas de Vision Vee antes de que aparezcan en tu viaje de aprendizaje.',
    act: 'Habla con un padre sobre {title}. ¿Cuál es una pregunta que todavía quieres que responda Vision Vee?',
    badge: 'Explorador de {title}'
  },
  sw: {
    q1: 'Somo la "{title}" linahusu nini hasa?',
    q2: 'Kweli au Si Kweli: Vision Vee anaweza kukusaidia kujifunza mada maalum bila kikomo.',
    q3: 'Nani anayeidhinisha mada mpya za Vision Vee kwa wanafunzi?',
    true: 'Kweli',
    false: 'Si Kweli',
    parent: 'Mzazi au mwalimu',
    nobody: 'Hakuna mtu',
    strangers: 'Watu wasiojulikana',
    vee_alone: 'Vision Vee peke yake',
    games_only: 'Michezo ya video tu',
    nothing_useful: 'Hakuna kitu cha maana',
    adults_only: 'Kwa watu wazima tu',
    intro: 'Katika Maabara ya Teknolojia yenye kung\'aa, macho ya mgunduzi mchanga yaliwaka kwa hamu ya kujua kuhusu {title}. Vision Vee alielea akiwa na mwanga wa dhahabu wenye joto. "Swali zuri sana, Mgunduzi! Hebu tugundue jinsi AI inavyounganishwa na {title} — nami ninajua tukio zuri kwa ajili yetu!"',
    main_fallback: '{title} ni mada maalum kwenye Young AI Explorers. Unaweza kujifunza kwa kasi yako mwenyewe, kuuliza maswali, na kupata beji utakapomaliza quiz.',
    fact1: 'Mada maalum kama "{title}" hukuza mtaala wako bila kikomo.',
    fact2: 'Wazazi hukagua mada za Vision Vee kabla hazijaonekana kwenye safari yako ya kujifunza.',
    act: 'Zungumza na mzazi kuhusu {title}. Ni swali gani moja bado ungependa Vision Vee alijibu?',
    badge: 'Mgunduzi wa {title}'
  },
  ar: {
    q1: 'ما هو الموضوع الرئيسي لـ "{title}"؟',
    q2: 'صحيح أم خطأ: يمكن لـ فيجن في مساعدتك في تعلم مواضيع مخصصة غير محدودة.',
    q3: 'من يوافق على مواضيع فيجن في الجديدة للطلاب؟',
    true: 'صحيح',
    false: 'خطأ',
    parent: 'ولي أمر أو معلم',
    nobody: 'لا أحد',
    strangers: 'غرباء عشوائيون',
    vee_alone: 'فيجن في بمفردها',
    games_only: 'ألعاب الفيديو فقط',
    nothing_useful: 'لا شيء مفيد',
    adults_only: 'للبالغين فقط',
    intro: 'في مختبر التقنية المتوهج، أضاءت عينا مستكشف صغير بالفضول حول {title}. طفت فيجن في بوهج ذهبي دافئ. "سؤال رائع، أيها المستكشف! فلنكتشف كيف يتصل الذكاء الاصطناعي بـ {title} - وأنا أعرف المغامرة المثالية لنا!"',
    main_fallback: '{title} هو موضوع مخصص في Young AI Explorers. يمكنك التعلم بالوتيرة التي تناسبك، وطرح الأسئلة، وكسب شارة عند إكمال الاختبار.',
    fact1: 'المواضيع المخصصة مثل "{title}" تنمي منهجك الدراسي بلا حدود.',
    fact2: 'يراجع أولياء الأمور مواضيع فيجن في قبل ظهورها في رحلتك التعليمية.',
    act: 'تحدث مع ولي أمرك حول {title}. ما هو السؤال الذي ما زلت تريد من فيجن في الإجابة عليه؟',
    badge: 'مستكشف {title}'
  }
}

function getFallbackText(locale: string, key: string, title: string): string {
  const dict = QUIZ_FALLBACK_TEXT[locale] || QUIZ_FALLBACK_TEXT['en']
  const val = dict[key] || QUIZ_FALLBACK_TEXT['en'][key] || ''
  return val.replace(/{title}/g, title)
}

function extractJsonObject(raw: string): string {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i)
  if (fenced) return fenced[1].trim()
  const start = raw.indexOf('{')
  const end = raw.lastIndexOf('}')
  if (start >= 0 && end > start) return raw.slice(start, end + 1)
  return raw.trim()
}

function normalizeQuiz(raw: unknown, title: string, description: string, locale: string): QuizQuestion[] {
  if (!Array.isArray(raw)) return fallbackQuiz(title, description, locale)
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
  return fallbackQuiz(title, description, locale)
}

function fallbackQuiz(title: string, description: string, locale: string): QuizQuestion[] {
  const summary = description.length > 80 ? `${description.slice(0, 77)}…` : description
  return [
    {
      question: getFallbackText(locale, 'q1', title),
      options: [summary || title, getFallbackText(locale, 'games_only', title), getFallbackText(locale, 'nothing_useful', title), getFallbackText(locale, 'adults_only', title)],
      answer: summary || title,
    },
    {
      question: getFallbackText(locale, 'q2', title),
      options: [getFallbackText(locale, 'true', title), getFallbackText(locale, 'false', title)],
      answer: getFallbackText(locale, 'true', title),
    },
    {
      question: getFallbackText(locale, 'q3', title),
      options: [getFallbackText(locale, 'parent', title), getFallbackText(locale, 'nobody', title), getFallbackText(locale, 'strangers', title), getFallbackText(locale, 'vee_alone', title)],
      answer: getFallbackText(locale, 'parent', title),
    },
  ]
}

export function buildFallbackTopicContent(title: string, description: string, locale = 'en'): GeneratedTopicContent {
  return {
    lesson: {
      introduction: getFallbackText(locale, 'intro', title),
      main_lesson: description || getFallbackText(locale, 'main_fallback', title),
      fun_facts: [
        getFallbackText(locale, 'fact1', title),
        getFallbackText(locale, 'fact2', title),
      ],
      examples: [
        {
          type: 'activity',
          content: getFallbackText(locale, 'act', title),
        },
      ],
    },
    quiz: fallbackQuiz(title, description, locale),
    badgeName: getFallbackText(locale, 'badge', title).slice(0, 48),
  }
}

function parseGeneratedPayload(text: string, title: string, description: string, locale: string): GeneratedTopicContent {
  try {
    const parsed = JSON.parse(extractJsonObject(text)) as Record<string, unknown>

    const lesson: CustomTopicLessonContent = {
      introduction: String(parsed.introduction ?? description),
      main_lesson: String(parsed.main_lesson ?? description),
      story_label: parsed.story_label ? String(parsed.story_label).slice(0, 64) : undefined,
      fun_facts: Array.isArray(parsed.fun_facts)
        ? parsed.fun_facts.slice(0, 2).map(String)
        : buildFallbackTopicContent(title, description, locale).lesson.fun_facts,
      examples: Array.isArray(parsed.examples)
        ? parsed.examples.map((e) => {
            const ex = e as Record<string, unknown>
            return { type: String(ex.type ?? 'activity'), content: String(ex.content ?? '') }
          })
        : buildFallbackTopicContent(title, description, locale).lesson.examples,
    }

    return {
      lesson,
      quiz: normalizeQuiz(parsed.quiz_questions, title, description, locale),
      badgeName: String(parsed.badge_name ?? getFallbackText(locale, 'badge', title)).slice(0, 48),
    }
  } catch {
    return buildFallbackTopicContent(title, description, locale)
  }
}

export async function generateTopicContent(
  title: string,
  description: string,
  locale = 'en'
): Promise<GeneratedTopicContent> {
  if (!process.env.GROQ_API_KEY?.trim()) {
    return buildFallbackTopicContent(title, description, locale)
  }

  try {
    const languagePrompt = locale !== 'en'
      ? `IMPORTANT: You MUST write all generated text fields (story_label, introduction, main_lesson, fun_facts, examples content, badge_name, and quiz questions/options/answers) in the user's language, which is code "${locale}" (e.g. Swahili, French, Spanish, Arabic). Do NOT output English for the final JSON content values.`
      : '';

    const { text } = await generateText({
      model: groq('llama-3.1-8b-instant'),
      prompt: `You are Vision Vee, creating kid-friendly AI education content for Young AI Explorers — the same voice and story style as the published book by Bassey Riman / RimansTech Industries.

${BOOK_STORY_STYLE_GUIDE}

${BOOK_STORY_EXAMPLES}

Topic title: ${title}
Topic description: ${description}

${languagePrompt}

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

    return parseGeneratedPayload(text, title, description, locale)
  } catch {
    return buildFallbackTopicContent(title, description, locale)
  }
}
