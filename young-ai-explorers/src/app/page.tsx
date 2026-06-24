import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Brain, Trophy, Sparkles } from "lucide-react"

import { Logo } from "@/components/Logo"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-slate-900 selection:bg-blue-500/30 overflow-hidden">
      {/* Premium Light Background setup */}
      <div className="fixed inset-0 z-0 bg-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(219,234,254,0.7),rgba(255,255,255,0))]" />
        {/* Soft dot pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')] opacity-50" />
      </div>
      
      <header className="relative z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-20 items-center justify-between px-6 md:px-12">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl overflow-hidden shadow-md shadow-blue-500/10 transition-transform duration-500 group-hover:scale-105 bg-white border border-slate-200 group-hover:border-blue-300">
              <Logo className="h-6 w-6 text-blue-600" />
            </div>
            <span className="font-heading text-xl font-bold tracking-tight text-slate-800 group-hover:text-blue-600 transition-colors">
              Young AI Explorers
            </span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/login" className="text-sm font-semibold text-slate-500 transition-colors hover:text-blue-600">
              Sign In
            </Link>
            <Link href="/login">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5 rounded-full px-6 font-bold h-10">
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10 flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-32 md:py-48 lg:py-56 relative">
          {/* Decorative blur blobs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-300/40 rounded-full blur-[100px] pointer-events-none opacity-60"></div>
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-purple-300/40 rounded-full blur-[100px] pointer-events-none opacity-60"></div>
          
          <div className="relative flex flex-col items-center text-center space-y-10 max-w-5xl mx-auto">
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-white px-5 py-2.5 text-sm font-bold text-blue-600 shadow-sm">
              <Sparkles className="mr-2 h-4 w-4 text-blue-500" />
              The Official Companion Platform
            </div>
            
            <h1 className="font-heading text-5xl font-black tracking-tight sm:text-7xl lg:text-8xl text-slate-900 leading-[1.1]">
              Exploring the Future, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 drop-shadow-sm">
                One Idea at a Time.
              </span>
            </h1>
            
            <p className="max-w-2xl text-lg text-slate-600 sm:text-2xl font-medium leading-relaxed">
              The ultimate educational ecosystem for the next generation of innovators. Master AI, Robotics, and STEM in an immersive, bright environment.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-8">
              <Link href="/login" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-600/20 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/30 hover:-translate-y-1 h-14 px-10 text-lg rounded-full font-bold border-2 border-transparent">
                  Start Learning Now <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </Link>
              <a href="https://www.amazon.com/dp/B0H4KGNW3B?ref_=pe_123509780_1038749300_t_fed_asin_title" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 h-14 px-8 text-lg rounded-full font-bold shadow-sm transition-all duration-300 hover:-translate-y-1">
                  Discover the Book
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-32 border-t border-slate-200 bg-white relative z-10">
          <div className="container mx-auto px-6">
            <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
              
              <div className="group flex flex-col space-y-6 rounded-[32px] border-2 border-slate-100 bg-white p-10 transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-900/5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 group-hover:scale-110 transition-transform duration-500 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-600/20 group-hover:border-blue-600">
                  <BookOpen className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-slate-900 mb-3">Comprehensive Curriculum</h3>
                  <p className="text-slate-600 text-base leading-relaxed font-medium">
                    37 detailed core topics covering everything from Neural Networks to Digital Archaeology, structured perfectly for optimal learning.
                  </p>
                </div>
              </div>

              <div className="group flex flex-col space-y-6 rounded-[32px] border-2 border-slate-100 bg-white p-10 transition-all duration-500 hover:-translate-y-2 hover:border-purple-200 hover:shadow-2xl hover:shadow-purple-900/5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-50 border border-purple-100 text-purple-600 group-hover:scale-110 transition-transform duration-500 group-hover:bg-purple-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-purple-600/20 group-hover:border-purple-600">
                  <Brain className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-slate-900 mb-3">AI Assistant</h3>
                  <p className="text-slate-600 text-base leading-relaxed font-medium">
                    A companion AI Explorer Assistant to explain concepts, generate examples, and powerfully enhance the learning journey.
                  </p>
                </div>
              </div>

              <div className="group flex flex-col space-y-6 rounded-[32px] border-2 border-slate-100 bg-white p-10 transition-all duration-500 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-900/5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 group-hover:scale-110 transition-transform duration-500 group-hover:bg-emerald-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-emerald-600/20 group-hover:border-emerald-600">
                  <Trophy className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-slate-900 mb-3">Earn Badges</h3>
                  <p className="text-slate-600 text-base leading-relaxed font-medium">
                    Unlock achievements like 'Robotics Explorer' and generate beautifully crafted official PDF certificates for your progress.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 py-12 bg-slate-50 relative z-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-3 mb-4 md:mb-0">
            <Logo className="h-6 w-6 text-slate-400" />
            <span className="font-heading text-base font-bold text-slate-500">Young AI Explorers</span>
          </div>
          <div className="text-slate-500 text-sm font-medium">
            <p>Founded by Bassey Riman. © {new Date().getFullYear()} All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
