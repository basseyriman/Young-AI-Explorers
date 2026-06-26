import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { PlayCircle, LogOut, Flame, Medal, Award, Star, Compass, ArrowRight, Globe, Swords } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import OpenAIAssistantButton from '@/components/OpenAIAssistantButton'
import { LearningJourney } from '@/components/LearningJourney'
import { Logo } from '@/components/Logo'
import {
  BOOK_LESSONS,
  EXPLORER_REGIONS,
  getTotalTopicCount,
  TOPIC_COUNT_LABEL,
  isTopicEnabled,
} from '@/data/curriculum'
import { curriculumFromUserMetadata } from '@/lib/curriculum-utils'

export default async function StudentDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const signOut = async () => {
    'use server'
    const supabaseServer = await createClient()
    await supabaseServer.auth.signOut()
    redirect('/login')
  }

  const firstName = user.user_metadata?.full_name?.split(' ')[0] || user.user_metadata?.first_name || 'Explorer'
  const earnedBadges = user.user_metadata?.earned_badges || []
  const curriculum = curriculumFromUserMetadata(user.user_metadata)

  const enabledLessons = BOOK_LESSONS.filter((l) => isTopicEnabled(l.id, curriculum))
  const totalTopics = getTotalTopicCount(curriculum)
  const activeLesson = enabledLessons.find((l) => !earnedBadges.includes(l.id)) || enabledLessons[0]
  const completedCount = earnedBadges.filter((id: string | number) =>
    enabledLessons.some((l) => String(l.id) === String(id))
  ).length

  const region = EXPLORER_REGIONS.find((r) => r.id === curriculum.region) ?? EXPLORER_REGIONS[5]
  const progressPct = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0

  return (
    <div className="flex min-h-screen flex-col bg-brand-gradient dark:bg-brand-gradient-dark font-sans text-brand-purple dark:text-brand-cream">
      <header className="relative z-50 w-full border-b border-brand-purple/10 dark:border-brand-gold/10 bg-brand-surface/90 dark:bg-brand-purple-dark/60">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <Link href="/"><Logo showWordmark size="md" /></Link>
          <div className="flex items-center gap-4">
            <span className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-purple/5 dark:bg-brand-gold/5 border border-brand-purple/10 dark:border-brand-gold/10 text-sm">
              {region.flag} {region.label}
            </span>
            <form action={signOut}>
              <Button type="submit" variant="ghost" className="rounded-full text-sm font-semibold text-brand-purple/60 dark:text-brand-cream/60">
                <LogOut className="h-4 w-4 mr-2" /> Sign Out
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 container mx-auto px-6 py-12 space-y-10 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-1 space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-2">
                Hello, <span className="text-gradient">{firstName}</span>
              </h1>
              <p className="text-brand-purple/60 dark:text-brand-cream/60">
                {TOPIC_COUNT_LABEL} topics in your curriculum · {curriculum.customTopics.length} custom additions
              </p>
            </div>

            {activeLesson && (
              <div className="rounded-2xl border border-brand-purple/10 dark:border-brand-gold/10 bg-brand-surface dark:bg-brand-purple-dark p-8 md:p-10 shadow-[0_8px_30px_rgba(74,45,110,0.06)]">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-4 text-xs font-semibold uppercase tracking-wider text-brand-gold">
                  Today&apos;s Mission
                </div>
                <h2 className="text-2xl font-bold mb-3">{activeLesson.title}</h2>
                <p className="text-brand-purple/60 dark:text-brand-cream/60 mb-6 max-w-md">
                  {activeLesson.category} — finish the quiz to earn your badge.
                </p>
                <Link href={`/lesson/${activeLesson.id}`}>
                  <Button className="rounded-full px-8 h-12 bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark font-semibold">
                    <PlayCircle className="mr-2 h-5 w-5" /> Start Lesson
                  </Button>
                </Link>
              </div>
            )}

            {curriculum.customTopics.length > 0 && (
              <div className="rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-6 space-y-3">
                <h3 className="font-heading font-bold">Custom Topics in Your Curriculum</h3>
                {curriculum.customTopics.map((t) => (
                  <div key={t.id} className="p-4 rounded-xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-gold/15">
                    <div className="font-semibold text-sm">{t.title}</div>
                    <div className="text-xs text-brand-purple/55 dark:text-brand-cream/55 mt-1">{t.description}</div>
                    <div className="text-[10px] uppercase tracking-wider text-brand-gold mt-2">
                      Added by {t.createdBy === 'vision_vee' ? 'Vision Vee' : 'Parent'}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/#topics" className="p-5 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10 hover:border-brand-gold/30 transition-colors group flex items-center justify-between">
                <div>
                  <Compass className="h-6 w-6 text-brand-gold mb-2" />
                  <div className="font-bold text-sm">All Topics</div>
                  <div className="text-xs text-brand-purple/50">{TOPIC_COUNT_LABEL} available</div>
                </div>
                <ArrowRight className="h-4 w-4 opacity-40 group-hover:opacity-100" />
              </Link>
              <Link href="/community" className="p-5 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10 hover:border-brand-gold/30 transition-colors group flex items-center justify-between">
                <div>
                  <Globe className="h-6 w-6 text-brand-gold mb-2" />
                  <div className="font-bold text-sm">{region.label}</div>
                  <div className="text-xs text-brand-purple/50">Your community</div>
                </div>
                <ArrowRight className="h-4 w-4 opacity-40 group-hover:opacity-100" />
              </Link>
              {curriculum.allowMatchQuiz && (
                <Link href="/match-quiz" className="p-5 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10 hover:border-brand-gold/30 transition-colors group flex items-center justify-between">
                  <div>
                    <Swords className="h-6 w-6 text-brand-gold mb-2" />
                    <div className="font-bold text-sm">Match Quiz</div>
                    <div className="text-xs text-brand-purple/50">Challenge explorers</div>
                  </div>
                  <ArrowRight className="h-4 w-4 opacity-40 group-hover:opacity-100" />
                </Link>
              )}
            </div>

            <div className="space-y-6 pt-4">
              <h2 className="text-2xl font-heading font-bold flex items-center gap-3">
                <Compass className="h-6 w-6 text-brand-gold" /> My Learning Journey
              </h2>
              <LearningJourney
                completedLessonIds={earnedBadges}
                activeLessonId={activeLesson?.id}
                disabledTopicIds={curriculum.disabledTopics}
              />
            </div>
          </div>

          <div className="w-full md:w-80 shrink-0 space-y-4">
            <h3 className="font-heading font-bold text-lg px-2">Your Progress</h3>
            <div className="p-6 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10 text-center">
              <div className="text-4xl font-bold text-gradient mb-1">{progressPct}%</div>
              <div className="text-xs uppercase tracking-wider text-brand-purple/50 mb-4">Complete</div>
              <div className="text-sm text-brand-purple/60">{completedCount} of {totalTopics}+ topics</div>
            </div>
            {[
              { icon: Flame, label: 'Current Streak', value: '8 Days', color: 'text-orange-500' },
              { icon: Medal, label: 'Badges Earned', value: `${completedCount} / ${totalTopics}+`, color: 'text-brand-gold' },
              { icon: Star, label: 'Total XP', value: '4,560', color: 'text-brand-purple dark:text-brand-gold' },
              { icon: Award, label: 'Certificates', value: '5', color: 'text-emerald-600' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="p-5 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-purple/5 dark:bg-brand-gold/5 flex items-center justify-center">
                  <Icon className={`h-6 w-6 ${color}`} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-xs text-brand-purple/50">{label}</div>
                  <div className="text-xl font-bold">{value}</div>
                </div>
              </div>
            ))}
            <OpenAIAssistantButton />
          </div>
        </div>
      </main>
    </div>
  )
}
