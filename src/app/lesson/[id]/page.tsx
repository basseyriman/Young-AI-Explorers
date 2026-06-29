import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Star, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from '@/components/Logo'
import { ALL_LESSONS, type LessonData, type QuizQuestion } from '@/data/lessons'
import { requireTopicAccess, getUserRoleFromProfile } from '@/lib/curriculum-access'
import { getCustomTopicForViewer } from '@/lib/db/platform'
import { customTopicToLessonView, isCustomTopicId } from '@/lib/custom-topic-content'
import { dashboardPathForRole } from '@/lib/auth/dashboard-access'
import { BOOK_COVER_ILLUSTRATION, bookIllustrationFilename } from '@/data/book-illustrations'
import { BookStyleCustomLesson } from '@/components/BookStyleCustomLesson'
import type { TopicId } from '@/data/curriculum'

type LessonView = LessonData & { id: number | string }

export default async function LessonPage({
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
  const dashboardHref = dashboardPathForRole(role)

  let lesson: LessonView | null = null
  let isCustomTopic = false
  let customBadgeName: string | null = null
  let customIllustrationUrl: string | null = null
  let customStoryLabel: string | null = null
  let customQuizPreview: QuizQuestion | null = null

  if (isCustomTopicId(id)) {
    const customRow = await getCustomTopicForViewer(id, user.id, role)
    if (customRow?.content_status === 'ready') {
      lesson = customTopicToLessonView(customRow)
      isCustomTopic = true
      customBadgeName = customRow.badge_name
      customIllustrationUrl = customRow.illustration_url
      customStoryLabel = customRow.lesson_content?.story_label ?? null
      customQuizPreview = customRow.quiz_content?.[0] ?? null
    }
  } else if (id === 'intro') {
    lesson = {
      id: 'intro',
      topic_number: 0,
      title: "Welcome to the Future – Your AI Adventure Begins!",
      introduction: "Step into the magical tech laboratory where anything is possible! Maya and Alex were looking at a glowing holographic screen when a friendly, shiny robot named Vision Vee floated down to greet them. 'Welcome, young explorers!' Vee chirped. 'You are about to start a super exciting journey into Artificial Intelligence, Robotics, and the amazing technologies of tomorrow. Are you ready to see how AI is changing our world?'",
      main_lesson: "Artificial Intelligence (or AI) is like giving computers a special kind of 'brainpower' so they can help us solve problems, recognize pictures, understand our voices, and even create art! Just like you learn from reading books and playing games, computers can learn from patterns and information. Over the course of this journey, you'll visit different virtual islands and learn how AI makes cars drive themselves, helps doctors cure sickness, protects wild animals, and makes the future brighter for everyone.",
      examples: [{ type: "activity", content: "Look around your environment — from smart assistants to facial locks, AI is already here helping you every day. Can you spot 3 things powered by AI?" }],
      fun_facts: ["Did you know that the word 'robot' was first used in a play over 100 years ago? Today, real robots and AI are helping us explore deep space and the bottom of the ocean!"]
    };
  } else {
    const topicNum = parseInt(id);
    const staticLesson = ALL_LESSONS[topicNum];
    if (staticLesson) {
      lesson = { ...staticLesson, id: topicNum };
    }
  }

  if (!lesson) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-brand-gradient dark:bg-brand-gradient-dark">
        <div className="p-8 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10 text-center max-w-md shadow-lg">
          <h1 className="text-2xl font-bold mb-2 text-brand-purple dark:text-brand-cream">Lesson Not Found</h1>
          <p className="text-brand-purple/60 dark:text-brand-cream/60 mb-6">We couldn&apos;t find lesson #{id}.</p>
          <Link href={dashboardHref}>
            <Button className="bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark rounded-full px-8">Return to Dashboard</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Parent-disabled topics are blocked by requireTopicAccess above
  const isLocked = false;

  // Parse fields (static data is already arrays, but handle gracefully)
  let funFacts: string[] = []
  try {
    funFacts = typeof lesson.fun_facts === 'string' ? JSON.parse(lesson.fun_facts) : lesson.fun_facts || []
  } catch (e) {
    console.error('Error parsing JSON fields', e)
  }

  const lessonImage = isCustomTopic
    ? null
    : lesson.topic_number === 0
      ? BOOK_COVER_ILLUSTRATION
      : bookIllustrationFilename(lesson.topic_number)

  const chapterLabel = isCustomTopic
    ? 'Vision Vee Topic'
    : id === 'intro'
      ? 'Introduction'
      : `Chapter ${parseInt(id, 10) < 10 ? '0' + id : id}`

  return (
    <div className="flex min-h-screen flex-col bg-brand-gradient dark:bg-brand-gradient-dark font-sans text-brand-purple dark:text-brand-cream selection:bg-brand-gold/30">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(201,160,78,0.12),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(201,160,78,0.08),rgba(26,15,46,0))]" />
      </div>

      <nav className="relative z-50 flex items-center justify-between border-b border-brand-purple/10 dark:border-brand-gold/10 bg-brand-surface/90 dark:bg-brand-purple-dark/80 px-6 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <Link 
            href={dashboardHref}
            className="flex items-center gap-2 text-sm font-semibold text-brand-purple/60 dark:text-brand-cream/60 transition-colors hover:text-brand-gold"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Dashboard</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="rounded-full bg-brand-gold/10 px-3 py-1 text-xs font-bold tracking-wider uppercase text-brand-gold border border-brand-gold/20 shadow-sm">
            {chapterLabel}
          </span>
          <Link href="/" className="hidden sm:flex items-center hover:opacity-80 transition-opacity">
            <Logo showWordmark size="sm" />
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 mx-auto w-full max-w-4xl flex-1 px-6 py-12">
        {isLocked ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            {lessonImage ? (
              <div className="relative w-64 h-64 mb-8">
                <img src={`/assets/${lessonImage}`} alt={lesson.title} className="w-full h-full object-cover rounded-[32px] opacity-40 grayscale shadow-xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <Lock className="h-16 w-16 text-brand-purple/50 drop-shadow-lg" />
                </div>
              </div>
            ) : (
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-[24px] bg-brand-purple/5 border-2 border-brand-purple/10 shadow-lg">
                <Lock className="h-10 w-10 text-brand-purple/40" />
              </div>
            )}
            <h1 className="font-heading text-4xl font-bold tracking-tight text-brand-purple dark:text-brand-cream mb-4">
              {lesson.title}
            </h1>
            <p className="text-xl text-brand-purple/60 dark:text-brand-cream/60 max-w-lg mx-auto mb-8 font-medium leading-relaxed">
              {lesson.introduction}
            </p>
            <Link href={dashboardHref}>
              <Button variant="outline" className="border-2 border-brand-purple/15 bg-brand-surface text-brand-purple hover:bg-brand-warm rounded-full px-8 h-12 font-bold shadow-sm transition-all duration-300 hover:-translate-y-1">
                Explore Available Lessons
              </Button>
            </Link>
          </div>
        ) : isCustomTopic ? (
          <div className="space-y-8">
            <BookStyleCustomLesson
              title={lesson.title}
              storyLabel={customStoryLabel}
              introduction={lesson.introduction}
              mainLesson={lesson.main_lesson}
              funFacts={funFacts}
              illustrationUrl={customIllustrationUrl}
              quizPreview={customQuizPreview}
              badgeName={customBadgeName}
            />
            <div className="mx-auto w-full max-w-[210mm] bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10 p-8 md:p-10 rounded-2xl shadow-sm text-center">
              <h3 className="text-xl font-semibold text-brand-purple dark:text-brand-cream mb-3 tracking-tight">Ready to test your knowledge?</h3>
              <p className="text-brand-purple/60 dark:text-brand-cream/60 mb-6 text-base">
                Show what you&apos;ve learned and earn the {customBadgeName ? `"${customBadgeName}"` : 'new'} badge.
              </p>
              <Link href={`/quiz/${id}`}>
                <Button size="lg" className="bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark hover:opacity-90 h-12 px-8 text-base rounded-full font-semibold transition-opacity">
                  Take the Quiz <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Header Section */}
            <div className="text-center space-y-6">
              <span className="inline-flex items-center rounded-full bg-brand-gold/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-gold border border-brand-gold/20 shadow-sm">
                <Star className="w-4 h-4 mr-2" />
                {chapterLabel}
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-brand-purple dark:text-brand-cream leading-tight py-2 max-w-4xl mx-auto text-balance">
                {lesson.title}
              </h1>
            </div>

            {/* Main Illustration Hero */}
            {lessonImage ? (
              <div className="relative w-full max-w-4xl mx-auto rounded-[32px] overflow-hidden shadow-2xl shadow-brand-purple/10 border-4 border-brand-surface group bg-brand-warm aspect-[5/4] md:aspect-[4/3]">
                <img 
                  src={`/assets/${lessonImage}`} 
                  alt={lesson.title} 
                  className="w-full h-full object-cover object-[center_90%] transition-transform duration-1000 group-hover:scale-105" 
                />
              </div>
            ) : null}

            {/* Story Time */}
            <section className="bg-brand-surface dark:bg-brand-purple-dark p-8 md:p-12 rounded-[24px] border border-brand-purple/10 dark:border-brand-gold/10 shadow-sm transition-shadow hover:shadow-md">
              <h2 className="text-2xl font-semibold text-brand-purple dark:text-brand-cream tracking-tight border-b border-brand-purple/10 dark:border-brand-gold/10 pb-4 mb-6">Introduction</h2>
              <p className="text-lg leading-relaxed text-brand-purple/80 dark:text-brand-cream/80">
                {lesson.introduction}
              </p>
            </section>

            {/* Core Lesson */}
            <section className="bg-brand-surface dark:bg-brand-purple-dark p-8 md:p-12 rounded-[24px] border border-brand-purple/10 dark:border-brand-gold/10 shadow-sm transition-shadow hover:shadow-md">
              <h2 className="text-2xl font-semibold text-brand-purple dark:text-brand-cream tracking-tight border-b border-brand-purple/10 dark:border-brand-gold/10 pb-4 mb-6">The Lesson</h2>
              <p className="text-lg leading-relaxed text-brand-purple/80 dark:text-brand-cream/80">
                {lesson.main_lesson}
              </p>
            </section>

            {/* Fun Fact */}
            {funFacts.length > 0 && (
              <section className="bg-brand-gold/5 p-8 md:p-12 rounded-[24px] border border-brand-gold/20 shadow-sm transition-shadow hover:shadow-md">
                <h3 className="text-xl font-semibold text-brand-purple dark:text-brand-cream tracking-tight border-b border-brand-gold/20 pb-4 mb-6">Did You Know?</h3>
                <p className="text-lg leading-relaxed text-brand-purple/80 dark:text-brand-cream/80">
                  {funFacts[0]}
                </p>
              </section>
            )}

            {/* Interactive Quiz CTA */}
            <div className="bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10 p-10 md:p-14 rounded-[24px] shadow-sm text-center">
               <h3 className="text-2xl font-semibold text-brand-purple dark:text-brand-cream mb-4 tracking-tight">Ready to test your knowledge?</h3>
               <p className="text-brand-purple/60 dark:text-brand-cream/60 mb-8 max-w-lg mx-auto text-lg">
                 Show what you&apos;ve learned and earn a new badge for your collection.
               </p>
               <Link href={`/quiz/${id}`}>
                 <Button size="lg" className="bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark hover:opacity-90 h-14 px-10 text-lg rounded-full font-semibold transition-opacity">
                   Take the Quiz <ArrowRight className="ml-2 h-5 w-5" />
                 </Button>
               </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
