import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { Sparkles, PlayCircle, LogOut, Flame, Medal, Award, Star, Compass, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export default async function StudentDashboard() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  const signOut = async () => {
    'use server'
    const supabaseServer = await createClient()
    await supabaseServer.auth.signOut()
    redirect('/login')
  }

  // Fallback to "Emma" as requested in the design prompt if no name is set
  const firstName = user.user_metadata?.first_name || 'Emma';

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-[#020617] font-sans text-slate-900 dark:text-white selection:bg-cyan-500/30 relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-20 brightness-150 dark:brightness-100 contrast-150 mix-blend-overlay"></div>
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-cyan-600/[0.02] dark:bg-cyan-600/10 rounded-full blur-[150px] mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-purple-600/[0.03] dark:bg-purple-600/20 rounded-full blur-[150px] mix-blend-multiply dark:mix-blend-screen" />
      </div>
      
      {/* Top Navigation */}
      <header className="relative z-50 w-full border-b border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#020617]/50 backdrop-blur-xl">
        <div className="container mx-auto flex h-20 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_15px_rgba(0,200,255,0.4)]">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-heading text-xl font-bold text-slate-900 dark:text-white tracking-wide">Young AI Explorers</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-xs font-bold">👧🏼</div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{user.email}</span>
            </div>
            <form action={signOut}>
              <Button type="submit" variant="ghost" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 rounded-full text-sm font-semibold h-10 px-5">
                <LogOut className="h-4 w-4 mr-2" /> Sign Out
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 container mx-auto px-6 py-12 space-y-10 max-w-6xl">
        
        <div className="flex flex-col md:flex-row gap-10">
          
          {/* LEFT COLUMN: Greeting & Mission */}
          <div className="flex-1 space-y-8">
            <div>
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-slate-900 dark:text-white mb-2">
                Hello <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{firstName}</span> 👋
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400">Ready for your next adventure?</p>
            </div>

            {/* Today's Mission Card */}
            <div className="relative overflow-hidden rounded-[32px] border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-glass p-1 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20" />
              <div className="relative h-full bg-white/90 dark:bg-[#020617]/80 backdrop-blur-xl rounded-[28px] p-8 md:p-10 flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-500/20 dark:border-cyan-500/50 mb-6">
                    <Sparkles className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    <span className="text-sm font-bold text-cyan-700 dark:text-cyan-300 tracking-wider uppercase">Today's Mission</span>
                  </div>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Continue Robotics</h2>
                  <p className="text-slate-650 dark:text-slate-400 mb-8 max-w-md text-lg">
                    You're 60% through "How Robots See the World". Finish the interactive quiz to earn your Silver Inventor badge!
                  </p>
                  <Button className="bg-slate-900 text-white dark:bg-white dark:text-[#020617] hover:bg-slate-805 dark:hover:bg-slate-200 hover:scale-105 transition-transform rounded-full px-8 h-14 font-bold text-lg shadow-[0_10px_20px_rgba(0,0,0,0.15)] dark:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                    <PlayCircle className="mr-2 h-6 w-6" /> Resume Lesson
                  </Button>
                </div>
                
                <div className="w-48 h-48 relative shrink-0 hidden sm:block">
                  <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full" />
                  <div className="w-full h-full rounded-full border-[6px] border-slate-200 dark:border-slate-800 flex items-center justify-center relative overflow-hidden bg-slate-50 dark:bg-[#0d1b2a]">
                    {/* Progress Ring (SVG) */}
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                      <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-200 dark:text-slate-800" />
                      <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="552.92" strokeDashoffset="221.16" className="text-cyan-600 dark:text-cyan-400 drop-shadow-[0_4px_10px_rgba(34,211,238,0.3)] dark:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all duration-1000" />
                    </svg>
                    <div className="text-center relative z-10">
                      <div className="text-4xl font-bold text-slate-900 dark:text-white">60%</div>
                      <div className="text-xs text-cyan-600 dark:text-cyan-400 font-medium uppercase tracking-wider">Completed</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <Link href="/#map" className="p-6 rounded-3xl bg-slate-50/50 dark:bg-glass border border-slate-200 dark:border-white/5 hover:bg-slate-100/50 dark:hover:bg-white/5 transition-colors group flex items-center justify-between shadow-sm">
                 <div>
                   <Compass className="h-8 w-8 text-purple-650 dark:text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                   <div className="font-bold text-slate-900 dark:text-white text-lg">Innovation Map</div>
                   <div className="text-sm text-slate-600 dark:text-slate-400">Explore new topics</div>
                 </div>
                 <ArrowRight className="h-5 w-5 text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
               </Link>
               <button onClick={() => window.dispatchEvent(new Event('open-ai-assistant'))} className="text-left p-6 rounded-3xl bg-slate-50/50 dark:bg-glass border border-slate-200 dark:border-white/5 hover:bg-slate-100/50 dark:hover:bg-white/5 transition-colors group flex items-center justify-between shadow-sm">
                 <div>
                   <div className="w-8 h-8 relative rounded-full overflow-hidden bg-slate-200 dark:bg-black mb-4 border border-cyan-500/30 group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(0,255,255,0.2)]">
                     <Image src="/assets/mascot_transparent.png" alt="Vision Vee" fill className="object-cover scale-150" />
                   </div>
                   <div className="font-bold text-slate-900 dark:text-white text-lg">Ask Vision Vee</div>
                   <div className="text-sm text-slate-600 dark:text-slate-400">Your AI Assistant</div>
                 </div>
                 <ArrowRight className="h-5 w-5 text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
               </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Stats Panel */}
          <div className="w-full md:w-80 shrink-0 space-y-6">
            <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white px-2">Your Progress</h3>
            
            <div className="flex flex-col gap-4">
              {/* Streak */}
              <div className="p-5 rounded-3xl bg-slate-50/50 dark:bg-glass border border-slate-200 dark:border-white/5 flex items-center gap-5 hover:bg-slate-100/50 dark:hover:bg-white/5 transition-colors shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-orange-500/10 dark:bg-orange-500/20 border border-orange-500/20 dark:border-orange-500/30 flex items-center justify-center shrink-0">
                  <Flame className="h-7 w-7 text-orange-600 dark:text-orange-500 drop-shadow-[0_2px_5px_rgba(249,115,22,0.3)] dark:drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                </div>
                <div>
                  <div className="text-sm text-slate-550 dark:text-slate-400 font-medium mb-1">Current Streak</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">8 Days</div>
                </div>
              </div>

              {/* Badges */}
              <div className="p-5 rounded-3xl bg-slate-50/50 dark:bg-glass border border-slate-200 dark:border-white/5 flex items-center gap-5 hover:bg-slate-100/50 dark:hover:bg-white/5 transition-colors shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 dark:bg-purple-500/20 border border-purple-500/20 dark:border-purple-500/30 flex items-center justify-center shrink-0">
                  <Medal className="h-7 w-7 text-purple-600 dark:text-purple-400 drop-shadow-[0_2px_5px_rgba(168,85,247,0.3)] dark:drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                </div>
                <div>
                  <div className="text-sm text-slate-550 dark:text-slate-400 font-medium mb-1">Badges Earned</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">12 <span className="text-sm font-normal text-slate-500">/ 37</span></div>
                </div>
              </div>

              {/* XP */}
              <div className="p-5 rounded-3xl bg-slate-50/50 dark:bg-glass border border-slate-200 dark:border-white/5 flex items-center gap-5 hover:bg-slate-100/50 dark:hover:bg-white/5 transition-colors shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-500/20 dark:border-cyan-500/30 flex items-center justify-center shrink-0">
                  <Star className="h-7 w-7 text-cyan-600 dark:text-cyan-400 drop-shadow-[0_2px_5px_rgba(34,211,238,0.3)] dark:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                </div>
                <div>
                  <div className="text-sm text-slate-555 dark:text-slate-400 font-medium mb-1">Total XP</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">4,560</div>
                </div>
              </div>

              {/* Certificates */}
              <div className="p-5 rounded-3xl bg-slate-50/50 dark:bg-glass border border-slate-200 dark:border-white/5 flex items-center gap-5 hover:bg-slate-100/50 dark:hover:bg-white/5 transition-colors shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 dark:border-emerald-500/30 flex items-center justify-center shrink-0">
                  <Award className="h-7 w-7 text-emerald-600 dark:text-emerald-400 drop-shadow-[0_2px_5px_rgba(16,185,129,0.3)] dark:drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                </div>
                <div>
                  <div className="text-sm text-slate-555 dark:text-slate-400 font-medium mb-1">Certificates</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">5</div>
                </div>
              </div>
            </div>
            
          </div>
          
        </div>
      </main>
    </div>
  )
}
