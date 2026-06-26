"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Brain, Rocket, Bot, Globe, Shield, Activity, MonitorPlay, CheckCircle2, Medal, Trophy, Download, GraduationCap, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { InnovationMap } from "@/components/InnovationMap";
import { Book3D } from "@/components/Book3D";
import { AssistantTriggerCard } from "@/components/AssistantTriggerCard";
import { NavBar } from "@/components/NavBar";
import { AnimatedCounter } from "@/components/AnimatedCounter";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent relative selection:bg-cyan-500/30">
      <NavBar />
      {/* GLOBAL CINEMATIC BACKGROUND */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] dark:opacity-20 brightness-150 dark:brightness-100 contrast-150 mix-blend-overlay"></div>
        {/* Stars */}
        {Array.from({ length: 50 }).map((_, i) => {
          const pseudoRand = (i * 137) % 100;
          const pseudoRand2 = (i * 93) % 100;
          return (
            <div
              key={`star-${i}`}
              className="absolute bg-slate-300 dark:bg-white rounded-full animate-twinkle opacity-0 dark:opacity-100 transition-opacity duration-1000"
              style={{
                width: (pseudoRand % 3) + 1 + "px",
                height: (pseudoRand % 3) + 1 + "px",
                top: pseudoRand + "%",
                left: pseudoRand2 + "%",
                animationDelay: (pseudoRand % 5) + "s",
                opacity: (pseudoRand2 / 100) * 0.8 + 0.2,
              }}
            />
          );
        })}
        {/* Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/[0.03] dark:bg-purple-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-600/[0.02] dark:bg-cyan-600/10 rounded-full blur-[150px] mix-blend-multiply dark:mix-blend-screen animate-float" style={{ animationDelay: "2s" }} />
      </div>

      {/* SECTION 1: HERO EXPERIENCE */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md mb-8">
              <Sparkles className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Welcome to the future of learning</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight text-slate-900 dark:text-white mb-6 leading-[1.1]">
              Young AI <br/>
              <span className="text-gradient">Explorers</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl font-light leading-relaxed">
              Discover Artificial Intelligence, Robotics, Space, Healthcare Innovation and the Technology shaping tomorrow.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start mb-16">
              <Link href="/signup" className="w-full sm:w-auto px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                Start Learning <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="#map" className="w-full sm:w-auto px-8 py-4 bg-slate-100 border border-slate-200 dark:bg-white/5 dark:border-white/10 text-slate-900 dark:text-white rounded-full font-semibold hover:bg-slate-200 dark:hover:bg-white/10 transition-colors flex items-center justify-center backdrop-blur-md">
                Explore 37 Topics
              </Link>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-slate-200 dark:border-white/10">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1"><AnimatedCounter value={37} suffix="+" /></div>
                <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Interactive Lessons</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1"><AnimatedCounter value={200} suffix="+" /></div>
                <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Quiz Questions</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1">AI</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Learning Assistant</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1">100%</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">Future Ready</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex-1 relative w-full aspect-square max-w-lg hidden md:block"
          >
            {/* The Mascot */}
            <div className="absolute inset-0 flex items-center justify-center animate-float pointer-events-none">
              <div className="relative w-[480px] h-[480px]">
                <Image 
                  src="/assets/mascot_iconic_clean.png" 
                  alt="Vision Vee Robot" 
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, 480px"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST BANNER: AS SEEN IN */}
      <section className="py-8 relative z-10 border-y border-slate-200/50 dark:border-white/5 bg-slate-100/50 dark:bg-slate-900/30 backdrop-blur-md">
        <div className="container mx-auto px-6">
          <p className="text-center text-xs text-slate-500 uppercase tracking-[0.2em] font-semibold mb-6">Recognised By</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="font-heading text-xl md:text-2xl font-bold text-slate-900 dark:text-white">amazon</span>
            <span className="font-heading text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-widest">STEM</span>
            <span className="font-heading text-xl md:text-2xl font-bold text-slate-900 dark:text-white">Schools Worldwide</span>
          </div>
        </div>
      </section>

      {/* SECTION: INNOVATION MAP (Signature Feature) */}
      <section id="map" className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-4">The Innovation Map</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">Click an island to begin your adventure. Explore the interconnected world of future technologies.</p>
          </div>
          <InnovationMap />
        </div>
      </section>

      {/* SECTION 2: EXPLORE THE FUTURE (Cards) */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🧠", title: "Artificial Intelligence", desc: "Teach computers to think.", color: "from-purple-500/20 to-purple-500/0", border: "group-hover:border-purple-500/50", shadow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]" },
              { icon: "🤖", title: "Robotics", desc: "Build machines that move.", color: "from-cyan-500/20 to-cyan-500/0", border: "group-hover:border-cyan-500/50", shadow: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]" },
              { icon: "🚀", title: "Space", desc: "Explore the final frontier.", color: "from-orange-500/20 to-orange-500/0", border: "group-hover:border-orange-500/50", shadow: "group-hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]" },
              { icon: "🏥", title: "Healthcare AI", desc: "Cure diseases with data.", color: "from-emerald-500/20 to-emerald-500/0", border: "group-hover:border-emerald-500/50", shadow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]" },
              { icon: "🌍", title: "Climate Tech", desc: "Protect our planet.", color: "from-blue-500/20 to-blue-500/0", border: "group-hover:border-blue-500/50", shadow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]" },
              { icon: "🛡️", title: "Cybersecurity", desc: "Defend the digital world.", color: "from-rose-500/20 to-rose-500/0", border: "group-hover:border-rose-500/50", shadow: "group-hover:shadow-[0_0_30px_rgba(244,63,94,0.3)]" },
              { icon: "🎮", title: "Gaming AI", desc: "Create intelligent worlds.", color: "from-yellow-500/20 to-yellow-500/0", border: "group-hover:border-yellow-500/50", shadow: "group-hover:shadow-[0_0_30px_rgba(234,179,8,0.3)]" },
              { icon: "🚗", title: "Self Driving", desc: "Cars that drive themselves.", color: "from-indigo-500/20 to-indigo-500/0", border: "group-hover:border-indigo-500/50", shadow: "group-hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]" },
            ].map((topic, i) => {
              return (
                <Link href={`/dashboard/student`} key={i}>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`relative p-6 rounded-3xl bg-white/70 dark:bg-[#020617]/50 backdrop-blur-xl border border-slate-200 dark:border-white/5 hover:-translate-y-3 transition-all duration-300 group overflow-hidden shadow-sm hover:shadow-xl dark:shadow-none ${topic.shadow} ${topic.border}`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-b ${topic.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    <div className="relative z-10">
                      <div className="text-4xl mb-6 group-hover:scale-125 group-hover:rotate-6 transition-transform duration-300 transform-origin-bottom">{topic.icon}</div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{topic.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">{topic.desc}</p>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: THE 3D BOOK */}
      <section className="py-32 relative z-10 border-y border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 w-full flex justify-center">
            <Book3D />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <div className="flex text-amber-400 text-sm">★★★★★</div>
              <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">100+ Amazon Reviews</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-6">The Physical Book</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-6 font-light">
              Start the journey off-screen. The perfect companion to the online platform, available worldwide.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-8">
              <span className="bg-slate-200 border border-slate-300 dark:bg-white/10 dark:border-white/20 rounded-full px-4 py-1.5 text-xs font-bold text-slate-700 dark:text-white tracking-widest uppercase">Ages 9-12</span>
              <span className="bg-slate-200 border border-slate-300 dark:bg-white/10 dark:border-white/20 rounded-full px-4 py-1.5 text-xs font-bold text-slate-700 dark:text-white tracking-widest uppercase">Worldwide Shipping</span>
              <span className="bg-purple-500/10 border border-purple-200 dark:bg-purple-500/20 dark:border-purple-500/50 rounded-full px-4 py-1.5 text-xs font-bold text-purple-700 dark:text-purple-300 tracking-widest uppercase">Paperback</span>
              <span className="bg-cyan-500/10 border border-cyan-200 dark:bg-cyan-500/20 dark:border-cyan-500/50 rounded-full px-4 py-1.5 text-xs font-bold text-cyan-700 dark:text-cyan-300 tracking-widest uppercase">Future eBook</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <Link href="https://www.amazon.com/Young-AI-Explorers-Guide-Future/dp/B0H4KGNW3B/ref=sr_1_1?crid=1B47QDACN97ZG&dib=eyJ2IjoiMSJ9.yXspQGnrKSKPF9NWQY0CSsiGBl6_7uWc422KOGdLjpnJy1vSiLR9g8VkWRK52_edLmhaT4dKyLYjkzFH0UlmedOd6KOC1p0QqPFjiZDxHr3UpyZvuRHKEWlbj5ZBaLlqzGj2xdU16HmDq6s1d0RiSU8q-9Wr62BmwtUsqe11Kz5LlpkSq5HPnSMm3pjJZ5mG_Skq6WiZDEmmiesYlDNdmyB16-KDK087gRhf3PEPUXM.gULxLo1HgyynT2lOmFzFar6FStXYNo321SBTppBQRj4&dib_tag=se&keywords=young+AI+EXPLORER&qid=1782348015&sprefix=young+ai+explorer%2Caps%2C231&sr=8-1" target="_blank" className="w-full sm:w-auto px-8 py-4 bg-[#ff9900] text-black rounded-full font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,153,0,0.3)]">
                Buy on Amazon <ArrowUpRight className="h-5 w-5" />
              </Link>
              <Link href="#" className="w-full sm:w-auto px-8 py-4 text-slate-900 border border-slate-300 dark:text-white dark:border-white/20 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                Read Sample
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: MEET VISION VEE */}
      <section className="py-32 relative z-10 overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-16">
          <div className="flex-1 w-full max-w-md mx-auto relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 blur-3xl -z-10 rounded-full"></div>
            <AssistantTriggerCard />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 mb-8 shadow-lg shadow-cyan-500/30">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-6">Meet Vision Vee</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 font-light">
              Not just an AI. A friendly companion that answers questions, explains complex ideas with simple analogies, and guides children through their learning journey.
            </p>
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-glass border border-slate-200 dark:border-white/10 relative shadow-sm">
              <div className="flex gap-4 mb-4">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0">👦</div>
                <div className="bg-slate-200 dark:bg-slate-800 rounded-2xl rounded-tl-none px-4 py-2 text-sm text-slate-800 dark:text-slate-300">How do robots see?</div>
              </div>
              <div className="flex gap-4 flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-cyan-600 dark:bg-cyan-500 flex items-center justify-center shrink-0">🤖</div>
                <div className="bg-cyan-500/5 dark:bg-cyan-500/10 border border-cyan-500/20 rounded-2xl rounded-tr-none px-4 py-3 text-sm text-cyan-950 dark:text-cyan-100">
                  Imagine your eyes are like little cameras! Robots have special cameras and sensors too. They use a brain called "Computer Vision" to understand the pictures they take!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: LEARNING JOURNEY */}
      <section className="py-32 relative z-10 bg-slate-100/50 dark:bg-slate-900/30 border-y border-slate-200 dark:border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-4">The Learning Journey</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg">A rewarding, step-by-step path to mastering the future.</p>
          </div>
          
          <div className="max-w-3xl mx-auto relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-200 dark:bg-white/10 -translate-x-1/2"></div>
            
            {[
              { title: "Explore a Topic", desc: "Read engaging, illustrated lessons.", icon: Rocket, color: "bg-purple-50" },
              { title: "Test Your Knowledge", desc: "Take fun, interactive quizzes.", icon: CheckCircle2, color: "bg-blue-50" },
              { title: "Earn a Badge", desc: "Collect 3D medals for your achievements.", icon: Medal, color: "bg-orange-50" },
              { title: "Get Certified", desc: "Download your official Explorer Certificate.", icon: GraduationCap, color: "bg-emerald-50" },
            ].map((step, i) => {
              const bgClass = step.color.replace('50', '500');
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  key={i} 
                  className={`relative flex items-center gap-8 mb-16 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                    <p className="text-slate-650 dark:text-slate-400">{step.desc}</p>
                  </div>
                  <div className={`w-14 h-14 rounded-full ${bgClass} flex items-center justify-center shrink-0 z-10 shadow-[0_4px_15px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(0,0,0,0.5)] border-4 border-white dark:border-[#0d1b2a]`}>
                    <step.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1"></div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-8">Earn 3D Badges</h2>
            <div className="grid grid-cols-2 gap-6">
              {[
                { name: "Gold Explorer", color: "from-yellow-300 to-amber-600", shadow: "shadow-[0_10px_30px_rgba(251,191,36,0.3)]", border: "border-yellow-400/50" },
                { name: "Silver Inventor", color: "from-slate-200 to-slate-500", shadow: "shadow-[0_10px_30px_rgba(148,163,184,0.3)]", border: "border-slate-300/50" },
                { name: "Diamond Coder", color: "from-cyan-200 to-blue-600", shadow: "shadow-[0_10px_30px_rgba(6,182,212,0.4)]", border: "border-cyan-300/50" },
                { name: "Legendary Pioneer", color: "from-fuchsia-300 to-purple-700", shadow: "shadow-[0_10px_30px_rgba(168,85,247,0.5)]", border: "border-fuchsia-400/50" }
              ].map((badge, i) => (
                <div key={i} className="group bg-white/75 dark:bg-glass border border-slate-200 dark:border-white/10 p-6 rounded-[32px] text-center flex flex-col items-center justify-center hover:bg-slate-50 dark:hover:bg-white/5 transition-colors shadow-sm dark:shadow-none animate-fade-in">
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center mb-6 border-[3px] ${badge.border} ${badge.shadow} transform-style-3d group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500`}>
                    <div className="absolute inset-0 rounded-full bg-white/20 mix-blend-overlay rotate-45 transform origin-top-left translate-x-4" />
                    <Medal className="h-10 w-10 text-white drop-shadow-xl" style={{ transform: "translateZ(20px)" }} />
                  </div>
                  <div className="font-bold text-slate-800 dark:text-slate-200 text-lg tracking-wide">{badge.name}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
              <Trophy className="h-8 w-8 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" /> Top Explorers
            </h2>
            <div className="bg-white/75 dark:bg-glass border border-slate-200 dark:border-white/10 rounded-[32px] p-6 shadow-lg dark:shadow-2xl">
              {[
                { name: "Alex M.", pts: "2,450 XP", rank: 1, streak: "12🔥", level: "Lv 8", avatar: "👦" },
                { name: "Sarah K.", pts: "2,100 XP", rank: 2, streak: "8🔥", level: "Lv 7", avatar: "👧" },
                { name: "Leo T.", pts: "1,950 XP", rank: 3, streak: "5🔥", level: "Lv 6", avatar: "👦🏽" },
                { name: "Emma J.", pts: "1,800 XP", rank: 4, streak: "3🔥", level: "Lv 5", avatar: "👧🏼" },
              ].map((user, i) => (
                <div key={i} className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-white/5 last:border-0 hover:bg-slate-50 dark:hover:bg-white/5 rounded-2xl transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg ${i === 0 ? 'bg-gradient-to-br from-yellow-300 to-amber-600 text-white shadow-lg shadow-yellow-500/30' : i === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-500 text-white' : i === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-800 text-white' : 'bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400'}`}>
                      {user.rank}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 flex items-center justify-center text-xl shadow-inner group-hover:scale-110 transition-transform">
                        {user.avatar}
                      </div>
                      <div>
                        <div className="font-bold text-slate-800 dark:text-slate-200">{user.name} <span className="text-xs font-mono bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded text-cyan-600 dark:text-cyan-300 ml-2">{user.level}</span></div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2">
                          <span className="text-orange-500 dark:text-orange-400 font-medium">{user.streak} Streak</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold tracking-wider">{user.pts}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="parents" className="py-32 relative z-10 border-y border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Parents Card */}
          <div className="p-1 rounded-3xl bg-gradient-to-br from-slate-200 to-transparent dark:from-white/10 dark:to-transparent">
            <div className="h-full p-8 md:p-10 rounded-[22px] bg-white dark:bg-[#020617] border border-slate-100 dark:border-white/5 flex flex-col shadow-lg">
              <div className="w-full h-48 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-8 overflow-hidden relative">
                <Image src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop" alt="Parent and child" fill className="object-cover opacity-60 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#020617] to-transparent"></div>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">For Parents</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-grow">
                Equip your child with essential AI literacy. Our platform ensures screen time is highly educational, completely safe, and aligned with future career outcomes.
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-150 dark:bg-white/5 dark:border-white/10 mb-8">
                <p className="text-sm text-slate-700 dark:text-slate-300 italic">"The only educational platform my daughter actually begs to use. She's learning Python and AI concepts at age 10!"</p>
                <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400 mt-2">— Sarah T., Parent</p>
              </div>
              <Link href="#" className="w-full py-4 text-center text-white dark:text-slate-900 bg-slate-900 dark:bg-white rounded-full font-bold hover:scale-105 transition-transform shadow-[0_10px_20px_rgba(0,0,0,0.15)] dark:shadow-[0_0_20px_rgba(255,255,255,0.2)]">Explore Parent Dashboard</Link>
            </div>
          </div>
          
          {/* Schools Card */}
          <div id="schools" className="p-1 rounded-3xl bg-gradient-to-br from-purple-500/20 to-transparent dark:from-purple-500/30 dark:to-transparent">
            <div className="h-full p-8 md:p-10 rounded-[22px] bg-white dark:bg-[#020617] border border-slate-100 dark:border-white/5 flex flex-col shadow-lg">
              <div className="w-full h-48 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-8 overflow-hidden relative">
                <Image src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop" alt="Classroom" fill className="object-cover opacity-60 mix-blend-luminosity hover:mix-blend-normal hover:opacity-100 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#020617] to-transparent"></div>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">For Schools & Teachers</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed flex-grow">
                Partner with Young AI Explorers. Download our comprehensive classroom resources, book interactive workshops, and integrate AI literacy into your curriculum.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link href="#" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-purple-500/10 text-purple-700 hover:bg-purple-500/20 dark:bg-purple-500/20 dark:text-purple-300 font-medium transition-colors border border-purple-200 dark:border-purple-500/30">
                  <Download className="h-4 w-4" /> Curriculum PDF
                </Link>
                <Link href="#" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-cyan-500/10 text-cyan-700 hover:bg-cyan-500/20 dark:bg-cyan-500/20 dark:text-cyan-300 font-medium transition-colors border border-cyan-200 dark:border-cyan-500/30">
                  <Globe className="h-4 w-4" /> Book Workshop
                </Link>
              </div>
              <Link href="#" className="w-full py-4 text-center text-slate-900 dark:text-white bg-slate-100 hover:bg-slate-200 dark:bg-[#020617]/50 dark:hover:bg-white/10 transition-colors border border-slate-200 dark:border-white/20 rounded-full font-bold">Request School Demo</Link>
            </div>
          </div>
          
        </div>
      </section>

      {/* SECTION 10: FOUNDER & FOOTER */}
      <footer className="pt-32 pb-12 relative z-10 bg-gradient-to-b from-transparent to-[#f8fafc] dark:to-[#020617]">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-24">
            <div className="w-28 h-28 rounded-full bg-slate-200 dark:bg-slate-800 mx-auto mb-6 overflow-hidden border-4 border-cyan-500/30 relative">
              <Image src="/assets/author.jpg" alt="Bassey Riman" fill className="object-cover" />
            </div>
            <p className="text-2xl md:text-3xl font-light text-slate-800 dark:text-slate-300 italic mb-8 leading-relaxed">
              "My mission is to make Artificial Intelligence accessible to every child. The future belongs to those who understand the technology shaping it."
            </p>
            <div className="flex flex-col items-center">
              <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white mb-2">Bassey Riman</h3>
              <p className="text-sm font-bold text-cyan-600 dark:text-cyan-400 tracking-widest uppercase">Founder, Young AI Explorers</p>
              <p className="text-sm text-slate-600 dark:text-slate-500 mt-2">AI Engineer • Author • AI in Education</p>
            </div>
          </div>
          
          <div className="border-t border-slate-200 dark:border-white/10 pt-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex flex-col gap-4">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="font-heading font-bold text-xl text-slate-900 dark:text-white">Young AI Explorers</span>
              </Link>
              <p className="text-sm text-slate-600 dark:text-slate-500">Inspiring the next generation of innovators.</p>
            </div>
            
            <div className="flex flex-wrap gap-8 text-sm text-slate-650 dark:text-slate-400 font-medium">
              <div className="flex flex-col gap-3">
                <span className="text-slate-950 dark:text-white font-bold mb-1">Platform</span>
                <Link href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Topics</Link>
                <Link href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">AI Assistant</Link>
                <Link href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">The Book</Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-slate-950 dark:text-white font-bold mb-1">Community</span>
                <Link href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">For Schools</Link>
                <Link href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">For Parents</Link>
                <Link href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">For Teachers</Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-slate-950 dark:text-white font-bold mb-1">Legal</span>
                <Link href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Terms of Service</Link>
                <Link href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Cookie Policy</Link>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-slate-950 dark:text-white font-bold mb-1">Socials</span>
                <Link href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">LinkedIn</Link>
                <Link href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Instagram</Link>
                <Link href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">YouTube</Link>
                <Link href="#" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Email Us</Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-200 dark:border-white/5 mt-12 pt-8 text-center text-sm text-slate-500 dark:text-slate-600">
            © {new Date().getFullYear()} Young AI Explorers. Designed for the future.
          </div>
        </div>
      </footer>
    </main>
  );
}
