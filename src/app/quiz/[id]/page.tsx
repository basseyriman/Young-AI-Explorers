import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/Logo'
import QuizClient from './QuizClient'
import { ALL_LESSONS, ALL_QUIZZES, type LessonData, type QuizQuestion } from '@/data/lessons'
import { requireTopicAccess, getUserRoleFromProfile } from '@/lib/curriculum-access'
import { getCustomTopicById } from '@/lib/db/platform'
import { isCustomTopicId } from '@/lib/custom-topic-content'
import type { TopicId } from '@/data/curriculum'

type LessonView = Pick<LessonData, 'title' | 'topic_number'> & { id: number | string }

export default async function QuizPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  const topicId: TopicId = id === 'intro' ? 'intro' : isCustomTopicId(id) ? id : parseInt(id, 10)
  const role = await getUserRoleFromProfile(user.id, user.user_metadata)
  await requireTopicAccess(user.id, topicId, role, user.user_metadata)

  let lesson: LessonView | null = null
  let questions: QuizQuestion[] = []
  let badgeName: string | undefined

  if (isCustomTopicId(id)) {
    const customRow = await getCustomTopicById(id, user.id)
    if (!customRow || customRow.content_status !== 'ready') {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-brand-gradient dark:bg-brand-gradient-dark">
          <div className="p-8 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10 text-center max-w-md shadow-lg">
            <h1 className="text-2xl font-bold mb-2 text-brand-purple dark:text-brand-cream">Quiz Not Ready</h1>
            <p className="text-brand-purple/60 dark:text-brand-cream/60 mb-6">Vision Vee is still preparing this topic.</p>
            <Link href="/dashboard/student">
              <Button className="bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark rounded-full px-8">Return to Dashboard</Button>
            </Link>
          </div>
        </div>
      )
    }
    lesson = { id: customRow.id, title: customRow.title, topic_number: 0 }
    questions = (customRow.quiz_content as QuizQuestion[]) ?? []
    badgeName = customRow.badge_name ?? undefined
  } else if (id === 'intro') {
    lesson = { id: 'intro', title: "Welcome to the Future – Your AI Adventure Begins!", topic_number: 0 }
    questions = [
      { question: "What is Artificial Intelligence (AI)?", options: ["A type of mechanical battery", "Computers having 'brainpower' to learn, think, and help us", "A robot that plays music only", "A system for washing cars"], answer: "Computers having 'brainpower' to learn, think, and help us" },
      { question: "True or False: AI can learn from patterns and data without needing new rules for everything.", options: ["True", "False"], answer: "True" },
      { question: "Who is your friendly robot guide in Young AI Explorers?", options: ["Echo Ed", "Logic Leo", "Vision Vee", "Astro Ace"], answer: "Vision Vee" }
    ]
  } else {
    const topicNum = parseInt(id);
    const staticLesson = ALL_LESSONS[topicNum];
    const staticQuestions = ALL_QUIZZES[topicNum];

    if (!staticLesson) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-brand-gradient dark:bg-brand-gradient-dark">
          <div className="p-8 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10 text-center max-w-md shadow-lg">
            <h1 className="text-2xl font-bold mb-2 text-brand-purple dark:text-brand-cream">Lesson Not Found</h1>
            <p className="text-brand-purple/60 dark:text-brand-cream/60 mb-6">We couldn&apos;t find quiz #{id}.</p>
            <Link href="/dashboard/student">
              <Button className="bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark rounded-full px-8">Return to Dashboard</Button>
            </Link>
          </div>
        </div>
      )
    }

    lesson = { id: topicNum, title: staticLesson.title, topic_number: topicNum };
    questions = staticQuestions || [];
  }

  return (
    <div className="flex min-h-screen flex-col bg-brand-gradient dark:bg-brand-gradient-dark font-sans text-brand-purple dark:text-brand-cream selection:bg-brand-gold/30 overflow-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(201,160,78,0.12),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(201,160,78,0.08),rgba(26,15,46,0))]" />
      </div>
      
      <nav className="relative z-50 flex items-center justify-between border-b border-brand-purple/10 dark:border-brand-gold/10 bg-brand-surface/90 dark:bg-brand-purple-dark/80 px-6 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <Link 
            href={`/lesson/${id}`}
            className="flex items-center gap-2 text-sm font-semibold text-brand-purple/60 dark:text-brand-cream/60 transition-colors hover:text-brand-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Lesson</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="rounded-full bg-brand-gold/10 px-3 py-1 text-xs font-bold tracking-wider uppercase text-brand-gold border border-brand-gold/20 shadow-sm">
            Quiz: {isCustomTopicId(id) ? 'Vision Vee Topic' : id === 'intro' ? 'Introduction' : `Chapter ${parseInt(id, 10) < 10 ? '0' + id : id}`}
          </span>
          <Link href="/" className="hidden sm:flex items-center hover:opacity-80 transition-opacity">
            <Logo showWordmark size="sm" />
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 mx-auto w-full max-w-3xl flex-1 px-6 py-12">
        <QuizClient 
          questions={questions} 
          lessonTitle={lesson.title} 
          topicNumber={id === 'intro' ? 'intro' : isCustomTopicId(id) ? id : parseInt(id, 10)} 
          badgeName={badgeName}
        />
      </main>
    </div>
  )
}
