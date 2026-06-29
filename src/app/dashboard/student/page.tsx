import { PlayCircle, Flame, Medal, Award, Star, Compass, ArrowRight, Globe, Swords } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import OpenAIAssistantButton from '@/components/OpenAIAssistantButton'
import { LearningJourney } from '@/components/LearningJourney'
import { Logo } from '@/components/Logo'
import { SignOutButton } from '@/components/SignOutButton'
import { BOOK_LESSONS, getTotalTopicCount, isTopicEnabled, TOPIC_MARKETING, EXPLORER_MAP_LABEL } from '@/data/curriculum'
import { getCurriculumFromDb, getUserBadges, getCountries, mergeCurriculumWithFallback, getProfile } from '@/lib/db/platform'
import { requireRole } from '@/lib/auth/dashboard-access'

export default async function StudentDashboard() {
  const { user } = await requireRole(['student', 'teacher', 'admin'])

  let curriculum = mergeCurriculumWithFallback(null, user.user_metadata)
  let earnedBadges: (string | number)[] = user.user_metadata?.earned_badges ?? []

  try {
    const dbCurriculum = await getCurriculumFromDb(user.id)
    curriculum = mergeCurriculumWithFallback(dbCurriculum, user.user_metadata)
    const dbBadges = await getUserBadges(user.id)
    if (dbBadges.length) earnedBadges = dbBadges
  } catch { /* fallback to metadata until migration applied */ }

  const profile = await getProfile(user.id)
  const countries = await getCountries()
  const country = countries.find((c) => c.code === (profile?.country_code ?? curriculum.countryCode))

  const firstName = profile?.nickname ?? profile?.full_name?.split(' ')[0] ?? user.user_metadata?.full_name?.split(' ')[0] ?? 'Explorer'
  const enabledLessons = BOOK_LESSONS.filter((l) => isTopicEnabled(l.id, curriculum))
  const totalTopics = getTotalTopicCount(curriculum)
  const activeLesson = enabledLessons.find((l) => !earnedBadges.map(String).includes(String(l.id))) || enabledLessons[0]
  const completedCount = earnedBadges.filter((id) => enabledLessons.some((l) => String(l.id) === String(id))).length
  const progressPct = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0

  return (
    <div className="flex min-h-screen flex-col bg-brand-gradient dark:bg-brand-gradient-dark font-sans text-brand-purple dark:text-brand-cream">
      <header className="border-b border-brand-purple/10 dark:border-brand-gold/10 bg-brand-surface/90 dark:bg-brand-purple-dark/60">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <Link href="/"><Logo showWordmark size="md" /></Link>
          <div className="flex items-center gap-4">
            {country && (
              <span className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-purple/5 dark:bg-brand-gold/5 border border-brand-purple/10 text-sm">
                {country.flag_emoji} {country.name}
              </span>
            )}
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-12 space-y-10 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-1 space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-2">
                Hello, <span className="text-gradient">{firstName}</span>
              </h1>
              <p className="text-brand-purple/60 dark:text-brand-cream/60">
                {TOPIC_MARKETING.platformLine} · {curriculum.customTopics.length} custom added · {TOPIC_MARKETING.growsWithVisionVee}
              </p>
            </div>

            {activeLesson && (
              <div className="rounded-2xl border border-brand-purple/10 dark:border-brand-gold/10 bg-brand-surface dark:bg-brand-purple-dark p-8 shadow-sm">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-4 text-xs font-semibold uppercase tracking-wider text-brand-gold">
                  Today&apos;s Mission
                </div>
                <h2 className="text-2xl font-bold mb-3">{activeLesson.title}</h2>
                <p className="text-brand-purple/60 dark:text-brand-cream/60 mb-6">{activeLesson.category}</p>
                <Link href={`/lesson/${activeLesson.id}`}>
                  <Button className="rounded-full px-8 h-12 bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark font-semibold">
                    <PlayCircle className="mr-2 h-5 w-5" /> Start Lesson
                  </Button>
                </Link>
              </div>
            )}

            {curriculum.customTopics.length > 0 && (
              <div className="rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-6 space-y-3">
                <h3 className="font-heading font-bold flex items-center gap-2">
                  <span aria-hidden>✨</span> Vision Vee Custom Topics
                </h3>
                {curriculum.customTopics.map((t) => {
                  const isReady = t.contentStatus === 'ready';
                  const isDone = earnedBadges.map(String).includes(t.id);
                  return (
                    <div key={t.id} className="p-4 rounded-xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-gold/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="font-semibold text-sm flex items-center gap-2 text-brand-purple dark:text-brand-cream">
                          {t.title}
                          {isDone && <span className="text-[10px] uppercase text-emerald-600 font-bold">Completed</span>}
                        </div>
                        <div className="text-xs text-brand-purple/70 dark:text-brand-cream/85 mt-1 leading-relaxed">{t.description}</div>
                        {t.badgeName && isReady && (
                          <div className="text-[10px] uppercase tracking-wider text-brand-gold mt-1">Badge: {t.badgeName}</div>
                        )}
                      </div>
                      {isReady ? (
                        <Link href={`/lesson/${t.id}`}>
                          <Button size="sm" className="rounded-full bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark shrink-0">
                            <PlayCircle className="h-4 w-4 mr-1.5" /> Start
                          </Button>
                        </Link>
                      ) : (
                        <span className="text-xs text-brand-purple/45 italic shrink-0">Preparing…</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/#topics" className="p-5 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 hover:border-brand-gold/30 transition-colors group flex items-center justify-between">
                <div><Compass className="h-6 w-6 text-brand-gold mb-2" /><div className="font-bold text-sm">{EXPLORER_MAP_LABEL}</div></div>
                <ArrowRight className="h-4 w-4 opacity-40 group-hover:opacity-100" />
              </Link>
              <Link href="/community" className="p-5 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 hover:border-brand-gold/30 transition-colors group flex items-center justify-between">
                <div><Globe className="h-6 w-6 text-brand-gold mb-2" /><div className="font-bold text-sm">{country?.name ?? 'Community'}</div></div>
                <ArrowRight className="h-4 w-4 opacity-40 group-hover:opacity-100" />
              </Link>
              {curriculum.allowMatchQuiz && (
                <Link href="/match-quiz" className="p-5 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 hover:border-brand-gold/30 transition-colors group flex items-center justify-between">
                  <div><Swords className="h-6 w-6 text-brand-gold mb-2" /><div className="font-bold text-sm">Match Quiz</div></div>
                  <ArrowRight className="h-4 w-4 opacity-40 group-hover:opacity-100" />
                </Link>
              )}
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-heading font-bold flex items-center gap-3">
                <Compass className="h-6 w-6 text-brand-gold" /> My Learning Journey
              </h2>
              <p className="text-sm text-brand-purple/55 dark:text-brand-cream/55 -mt-4">
                Book lessons to start · Vision Vee topics grow from here
              </p>
              <LearningJourney
                completedLessonIds={earnedBadges}
                activeLessonId={activeLesson?.id}
                disabledTopicIds={curriculum.disabledTopics}
                customTopics={curriculum.customTopics.map((t) => ({
                  id: t.id,
                  title: t.title,
                  description: t.description,
                  badgeName: t.badgeName,
                  contentStatus: t.contentStatus,
                  illustrationUrl: t.illustrationUrl,
                }))}
              />
            </div>
          </div>

          <div className="w-full md:w-80 shrink-0 space-y-4">
            <h3 className="font-heading font-bold text-lg px-2 text-brand-purple dark:text-brand-cream">Your Progress</h3>
            <div className="p-6 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/15 text-center">
              <div className="text-4xl font-bold text-gradient mb-1">{progressPct}%</div>
              <div className="text-sm text-brand-purple/50 dark:text-brand-cream/65">{completedCount} of {totalTopics} enabled · unlimited with custom topics</div>
            </div>
            {[
              { icon: Flame, label: 'Streak', value: '—', color: 'text-orange-500' },
              { icon: Medal, label: 'Badges', value: `${completedCount}/${totalTopics}+`, color: 'text-brand-gold' },
              { icon: Star, label: 'XP', value: String(completedCount * 120), color: 'text-brand-purple dark:text-brand-gold' },
              { icon: Award, label: 'Certificates', value: String(Math.floor(completedCount / 6)), color: 'text-emerald-600 dark:text-emerald-400' },
            ].map(({ icon: Icon, label, value, color }) => (
              <div key={label} className="p-5 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/15 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-purple/5 dark:bg-brand-gold/10 flex items-center justify-center">
                  <Icon className={`h-6 w-6 ${color}`} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-xs font-medium text-brand-purple/50 dark:text-brand-cream/65">{label}</div>
                  <div className="text-xl font-bold text-brand-purple dark:text-brand-cream">{value}</div>
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
