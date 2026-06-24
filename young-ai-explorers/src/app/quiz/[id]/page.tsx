import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/Logo'
import QuizClient from './QuizClient'

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

  // 1. Fetch the lesson
  const { data: lesson, error: lessonError } = await supabase
    .from('lessons')
    .select('id, title, topic_number')
    .eq('topic_number', parseInt(id))
    .single()

  if (lessonError || !lesson) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white bg-slate-950">
        <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
        <Link href="/dashboard/student">
          <Button>Return to Dashboard</Button>
        </Link>
      </div>
    )
  }

  // 2. Fetch the quiz for this lesson
  const { data: quiz, error: quizError } = await supabase
    .from('quizzes')
    .select('questions')
    .eq('lesson_id', lesson.id)
    .single()

  if (quizError || !quiz || !quiz.questions) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-white bg-slate-950 p-6">
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center max-w-md">
          <HelpCircle className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">No Quiz Available</h1>
          <p className="text-slate-400 mb-6">
            There doesn't seem to be a quiz available for {lesson.title} yet.
          </p>
          <Link href={`/lesson/${id}`}>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Return to Lesson</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Parse questions
  let questions = []
  try {
    questions = typeof quiz.questions === 'string' ? JSON.parse(quiz.questions) : quiz.questions
  } catch (e) {
    console.error('Failed to parse questions', e)
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
            Quiz: Chapter {lesson.topic_number}
          </span>
          <Link href="/" className="hidden sm:flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="flex h-6 w-6 items-center justify-center rounded-md overflow-hidden bg-slate-100 border border-slate-200">
              <Logo className="h-4 w-4 text-blue-600" />
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
          topicNumber={lesson.topic_number} 
        />
      </main>
    </div>
  )
}
