import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/Logo'
import QuizClient from './QuizClient'
import { ALL_LESSONS, ALL_QUIZZES, type LessonData, type QuizQuestion } from '@/data/lessons'
import { requireTopicAccess, getUserRoleFromProfile } from '@/lib/curriculum-access'
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

  const topicId: TopicId = id === 'intro' ? 'intro' : parseInt(id, 10)
  const role = await getUserRoleFromProfile(user.id, user.user_metadata)
  await requireTopicAccess(user.id, topicId, role, user.user_metadata)

  let lesson: LessonView | null = null
  let questions: QuizQuestion[] = []

  if (id === 'intro') {
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
          <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center max-w-md shadow-lg">
            <h1 className="text-2xl font-bold mb-2 text-slate-900">Lesson Not Found</h1>
            <p className="text-slate-500 mb-6">We couldn&apos;t find quiz #{id}.</p>
            <Link href="/dashboard/student">
              <Button className="bg-slate-900 text-white rounded-full px-8">Return to Dashboard</Button>
            </Link>
          </div>
        </div>
      )
    }

    lesson = { id: topicNum, title: staticLesson.title, topic_number: topicNum };
    questions = staticQuestions || [];
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900 selection:bg-blue-500/30 overflow-hidden">
      {/* Premium Light Background setup */}
      <div className="fixed inset-0 z-0 bg-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(219,234,254,0.7),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')] opacity-50" />
      </div>
      
      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <Link 
            href={`/lesson/${id}`}
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-blue-600"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Lesson</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold tracking-wider uppercase text-blue-600 border border-blue-200 shadow-sm">
            Quiz: {id === 'intro' ? 'Introduction' : `Chapter ${parseInt(id) < 10 ? '0' + id : id}`}
          </span>
          <Link href="/" className="hidden sm:flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="flex h-6 w-6 items-center justify-center rounded-md overflow-hidden bg-slate-100 border border-slate-200">
              <Logo size="sm" />
            </div>
            <span className="font-heading text-sm font-bold text-slate-800">Young AI Explorers</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 mx-auto w-full max-w-3xl flex-1 px-6 py-12">
        <QuizClient 
          questions={questions} 
          lessonTitle={lesson.title} 
          topicNumber={id === 'intro' ? 'intro' : parseInt(id)} 
        />
      </main>
    </div>
  )
}
