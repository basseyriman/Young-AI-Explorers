import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Brain, Trophy, Sparkles, Star } from "lucide-react"

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
        <section className="container mx-auto px-6 py-20 md:py-32 lg:py-40 relative">
          {/* Decorative blur blobs */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-blue-400/30 rounded-full blur-[120px] pointer-events-none opacity-60"></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-400/30 rounded-full blur-[120px] pointer-events-none opacity-60"></div>
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-400/30 rounded-full blur-[120px] pointer-events-none opacity-60"></div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            {/* Left Content */}
            <div className="flex flex-col items-start text-left space-y-8">
              <div className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50/80 backdrop-blur-sm px-5 py-2.5 text-sm font-bold text-indigo-700 shadow-sm transition-transform hover:scale-105">
                <Sparkles className="mr-2 h-4 w-4 text-indigo-500" />
                The Official Companion Platform
              </div>
              
              <h1 className="font-heading text-5xl font-black tracking-tight sm:text-6xl lg:text-7xl text-slate-900 leading-[1.1]">
                Adventures in the <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 drop-shadow-sm">
                  Galaxy of Intelligence.
                </span>
              </h1>
              
              <p className="max-w-xl text-lg text-slate-600 sm:text-2xl font-medium leading-relaxed">
                The ultimate educational ecosystem for the next generation of innovators. Master AI, Robotics, and STEM in an immersive environment.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-6">
                <Link href="/login" className="w-full sm:w-auto group">
                  <Button size="lg" className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-600/20 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-600/40 hover:-translate-y-1 h-16 px-10 text-lg rounded-full font-bold border-2 border-transparent">
                    Start Learning Now <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <a href="https://www.amazon.com/dp/B0H4KGNW3B?ref_=pe_123509780_1038749300_t_fed_asin_title" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-slate-200 bg-white/80 backdrop-blur-sm text-slate-700 hover:bg-slate-50 hover:border-indigo-300 hover:text-indigo-700 h-16 px-8 text-lg rounded-full font-bold shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-900/5">
                    <BookOpen className="mr-3 h-6 w-6" /> Discover the Book
                  </Button>
                </a>
              </div>
              
              {/* Trust badges or mini stats */}
              <div className="pt-8 flex items-center gap-6 opacity-70">
                <div className="flex -space-x-4">
                  <div className="h-12 w-12 rounded-full border-4 border-slate-50 bg-blue-100 flex items-center justify-center text-blue-600 font-bold shadow-sm z-30">AI</div>
                  <div className="h-12 w-12 rounded-full border-4 border-slate-50 bg-purple-100 flex items-center justify-center text-purple-600 font-bold shadow-sm z-20">ML</div>
                  <div className="h-12 w-12 rounded-full border-4 border-slate-50 bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold shadow-sm z-10">NLP</div>
                </div>
                <p className="text-sm font-bold text-slate-600">Explore 37+ amazing topics <br/> alongside your AI Assistant.</p>
              </div>
            </div>

            {/* Right Content - Book Cover */}
            <div className="relative w-full max-w-xl mx-auto lg:ml-auto">
              {/* Glowing backplate */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[40px] blur-2xl opacity-40 scale-95 transition-all duration-700 hover:scale-105 hover:opacity-60"></div>
              
              {/* Book Cover Image Container */}
              <div className="relative group rounded-[32px] overflow-hidden border-4 border-white/80 shadow-2xl transition-transform duration-700 hover:-translate-y-4 hover:shadow-[0_40px_80px_-20px_rgba(79,70,229,0.3)] bg-slate-100">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-purple-600/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none"></div>
                <img 
                  src="/assets/cover.png" 
                  alt="Young AI Explorers Book Cover" 
                  className="w-full h-auto object-cover transform transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-10 -right-10 animate-[bounce_6s_ease-in-out_infinite]">
                <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md shadow-xl border border-white/50 text-indigo-600 transform rotate-12">
                  <Star className="w-8 h-8 fill-indigo-100" />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-10 animate-[bounce_8s_ease-in-out_infinite]">
                <div className="p-4 rounded-2xl bg-white/90 backdrop-blur-md shadow-xl border border-white/50 text-blue-600 transform -rotate-6">
                  <Brain className="w-8 h-8 fill-blue-50" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative py-32 border-t border-slate-200/50 bg-white/80 backdrop-blur-xl relative z-10">
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
