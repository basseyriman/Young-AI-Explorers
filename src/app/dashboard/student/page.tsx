import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Logo } from '@/components/Logo'
import { Brain, Trophy, BookOpen, LogOut, Sparkles, PlayCircle, Star, Compass, User, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AssistantTriggerCard } from '@/components/AssistantTriggerCard'

export default async function StudentDashboard() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()


  const earnedBadges = user.user_metadata?.earned_badges || []

  const signOut = async () => {
    'use server'
    const supabaseServer = await createClient()
    await supabaseServer.auth.signOut()
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900 selection:bg-blue-500/30 overflow-hidden">
      {/* Premium Background setup */}
      <div className="fixed inset-0 z-0 bg-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(219,234,254,0.7),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')] opacity-50" />
      </div>
      
      {/* Top Navigation */}
      <header className="relative z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg overflow-hidden shadow-sm bg-white border border-slate-200">
              <Logo className="h-5 w-5 text-blue-600" />
            </div>
            <span className="font-heading text-lg font-bold text-slate-800">Young AI Explorers</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-500 md:flex shadow-sm">
              <User className="h-3 w-3" />
              {user.email}
            </div>
            <form action={signOut}>
              <Button type="submit" variant="ghost" className="text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-full text-sm font-semibold h-9 px-4">
                <LogOut className="h-4 w-4 mr-2" /> Sign Out
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 container mx-auto px-6 py-12 space-y-10 max-w-6xl">
        {/* Welcome Section */}
        <section className="relative overflow-hidden rounded-[32px] border-2 border-slate-100 bg-white p-10 md:p-14 shadow-xl">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-blue-300/30 blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600 border border-blue-200 shadow-sm">
              <Sparkles className="mr-2 h-3 w-3 text-blue-500" />
              Level 1 Explorer
            </div>
            <h1 className="font-heading text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 sm:text-6xl tracking-tight leading-tight">
              Welcome back, Explorer.
            </h1>
            <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-lg">
              Your next adventure in Artificial Intelligence is waiting. Dive back in to unlock new badges and mysteries.
            </p>
            <div className="pt-4">
              <Link href={`/lesson/${earnedBadges.length + 1}`}>
                <Button className="bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-600/20 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/30 hover:-translate-y-1 rounded-full px-8 h-12 font-bold text-base border-2 border-transparent">
                  <PlayCircle className="mr-2 h-5 w-5" /> Resume Journey
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Dashboard Grid */}
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Current Lesson Module */}
          <Link href={`/lesson/${earnedBadges.length + 1}`} className="group relative overflow-hidden rounded-[32px] border-2 border-slate-100 bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-900/10 cursor-pointer block">
            {/* We'll use the mapped image for the current lesson on the dashboard */}
            <div className="relative mb-6 h-40 w-full overflow-hidden rounded-2xl border-2 border-slate-50 bg-slate-100 shadow-inner group-hover:border-blue-100 transition-colors duration-500">
              <img 
                src={`/assets/${[
                  "", "vision_vee.png", "echo_ed.png", "linky_lex.png", "logic_leo.png", "healo_bot.png", "game_gus.png", "drive_dash.png", "robo_prime.png", "neural_networks.png", "ai_environment.png", "machine_learning.png", "nlp.png", "robotics.png", "recommendation_systems.png", "facial_recognition.png", "virtual_assistants.png", "ai_art.png", "ai_music.png", "ai_sports.png", "ai_agriculture.png", "ai_weather.png", "ai_education.png", "ai_transportation.png", "ai_banking.png", "ai_shopping.png", "ai_social_media.png", "ai_ethics.png", "ai_manufacturing.png", "ai_cybersecurity.png", "ai_photography.png", "ai_food.png", "ai_fashion.png", "ai_movies.png", "deep_learning.png", "ai_chatbots.png", "ai_emergency_services.png", "ai_archaeology.png"
                ][earnedBadges.length + 1] || 'vision_vee.png'}`}
                alt="Current Lesson" 
                className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <h3 className="font-heading text-xl font-bold text-slate-900 mb-2">Current Lesson</h3>
            <p className="text-slate-500 text-sm font-medium mb-6">
              Chapter {earnedBadges.length + 1}: Start exploring!
            </p>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(earnedBadges.length / 37) * 100}%` }}></div>
            </div>
            <p className="text-xs text-slate-500 mt-3 font-bold">{Math.round((earnedBadges.length / 37) * 100)}% Completed</p>
          </Link>

          {/* Badges Module */}
          <div className="group relative overflow-hidden rounded-[32px] border-2 border-slate-100 bg-white p-8 transition-all duration-500 hover:-translate-y-2 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-900/10 cursor-pointer">
            <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 group-hover:scale-110 transition-transform duration-500 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-emerald-500/30">
              <Trophy className="h-7 w-7" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-slate-900 mb-2">Your Badges</h2>
            <p className="text-slate-500 font-medium mb-6">
              You have earned <span className="text-slate-800 font-bold">{earnedBadges.length}</span> out of 37 badges.
            </p>
            <div className="flex gap-3 flex-wrap">
              {Array.from({ length: Math.max(3, earnedBadges.length) }).map((_, i) => {
                const isEarned = i < earnedBadges.length;
                return (
                  <div key={i} className={`h-12 w-12 rounded-[14px] flex items-center justify-center transition-transform duration-300 hover:scale-110 ${isEarned ? 'bg-amber-400 shadow-md shadow-amber-400/30 text-white' : 'border-2 border-slate-100 bg-slate-50 text-slate-300'}`}>
                    <Star className={`h-5 w-5 ${isEarned ? 'fill-current' : ''}`} />
                  </div>
                )
              })}
            </div>
          </div>

          {/* AI Assistant Module */}
          <AssistantTriggerCard />

        </section>
      </main>
    </div>
  )
}
