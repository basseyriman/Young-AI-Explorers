"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Brain, Rocket, Bot, Globe, Shield, Activity, MonitorPlay, CheckCircle2, Medal, Trophy, Download, GraduationCap, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { InnovationMap } from "@/components/InnovationMap";
import { Book3D } from "@/components/Book3D";
import { AssistantTriggerCard } from "@/components/AssistantTriggerCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent relative selection:bg-cyan-500/30">
      {/* GLOBAL CINEMATIC BACKGROUND */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        {/* Stars */}
        {Array.from({ length: 50 }).map((_, i) => {
          const pseudoRand = (i * 137) % 100;
          const pseudoRand2 = (i * 93) % 100;
          return (
            <div
              key={`star-${i}`}
              className="absolute bg-white rounded-full animate-twinkle"
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
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[150px] mix-blend-screen animate-float" style={{ animationDelay: "2s" }} />
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span className="text-sm font-medium text-slate-300">Welcome to the future of learning</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Young AI <br/>
              <span className="text-gradient">Explorers</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl font-light leading-relaxed">
              Discover Artificial Intelligence, Robotics, Space, Healthcare Innovation and the Technology shaping tomorrow.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start mb-16">
              <Link href="/signup" className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 rounded-full font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                Start Learning <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="#map" className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-semibold hover:bg-white/10 transition-colors flex items-center justify-center backdrop-blur-md">
                Explore 37 Topics
              </Link>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10">
              {[
                { label: "Interactive Lessons", value: "37" },
                { label: "Quiz Questions", value: "200+" },
                { label: "Learning Assistant", value: "AI" },
                { label: "Earn Rewards", value: "Certificates" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex-1 relative w-full aspect-square max-w-lg hidden md:block"
          >
            {/* 3D Rotating Earth representation */}
            <div className="absolute inset-0 rounded-full border border-white/5 animate-rotate-slow shadow-[0_0_100px_rgba(0,100,255,0.2)]">
              <div className="absolute top-0 left-1/2 w-4 h-4 bg-cyan-400 rounded-full blur-sm" />
              <div className="absolute bottom-1/4 right-0 w-2 h-2 bg-purple-400 rounded-full blur-sm" />
            </div>
            
            {/* The Mascot */}
            <div className="absolute inset-0 flex items-center justify-center animate-float">
              <Image 
                src="/assets/vision_vee.png" 
                alt="Vision Vee Robot" 
                width={300} 
                height={300} 
                className="drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION: INNOVATION MAP (Signature Feature) */}
      <section id="map" className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">The Innovation Map</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Click an island to begin your adventure. Explore the interconnected world of future technologies.</p>
          </div>
          <InnovationMap />
        </div>
      </section>

      {/* SECTION 2: EXPLORE THE FUTURE (Cards) */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Brain, title: "Artificial Intelligence", color: "text-purple-400", bg: "hover:shadow-purple-500/20" },
              { icon: Bot, title: "Robotics", color: "text-cyan-400", bg: "hover:shadow-cyan-500/20" },
              { icon: Rocket, title: "Space", color: "text-orange-400", bg: "hover:shadow-orange-500/20" },
              { icon: Activity, title: "Healthcare AI", color: "text-emerald-400", bg: "hover:shadow-emerald-500/20" },
              { icon: Globe, title: "Climate Tech", color: "text-blue-400", bg: "hover:shadow-blue-500/20" },
              { icon: Shield, title: "Cybersecurity", color: "text-rose-400", bg: "hover:shadow-rose-500/20" },
              { icon: MonitorPlay, title: "Gaming AI", color: "text-yellow-400", bg: "hover:shadow-yellow-500/20" },
              { icon: Brain, title: "Self Driving Cars", color: "text-indigo-400", bg: "hover:shadow-indigo-500/20" },
            ].map((topic, i) => {
              const Icon = topic.icon;
              return (
                <Link href={`/dashboard/student`} key={i}>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-6 rounded-3xl bg-glass border border-white/5 hover:-translate-y-2 transition-all duration-300 group ${topic.bg}`}
                  >
                    <Icon className={`h-10 w-10 ${topic.color} mb-6`} />
                    <h3 className="text-xl font-medium text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">{topic.title}</h3>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: THE 3D BOOK */}
      <section className="py-32 relative z-10 border-y border-white/5 bg-slate-900/50">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 w-full flex justify-center">
            <Book3D />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">The Physical Book</h2>
            <p className="text-xl text-slate-400 mb-8 font-light">
              Start the journey off-screen. The perfect companion to the online platform, available worldwide.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <Link href="https://www.amazon.com/Young-AI-Explorers-Guide-Future/dp/B0H4KGNW3B/ref=sr_1_1?crid=1B47QDACN97ZG&dib=eyJ2IjoiMSJ9.yXspQGnrKSKPF9NWQY0CSsiGBl6_7uWc422KOGdLjpnJy1vSiLR9g8VkWRK52_edLmhaT4dKyLYjkzFH0UlmedOd6KOC1p0QqPFjiZDxHr3UpyZvuRHKEWlbj5ZBaLlqzGj2xdU16HmDq6s1d0RiSU8q-9Wr62BmwtUsqe11Kz5LlpkSq5HPnSMm3pjJZ5mG_Skq6WiZDEmmiesYlDNdmyB16-KDK087gRhf3PEPUXM.gULxLo1HgyynT2lOmFzFar6FStXYNo321SBTppBQRj4&dib_tag=se&keywords=young+AI+EXPLORER&qid=1782348015&sprefix=young+ai+explorer%2Caps%2C231&sr=8-1" target="_blank" className="w-full sm:w-auto px-8 py-4 bg-[#ff9900] text-black rounded-full font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2">
                Available on Amazon <ArrowUpRight className="h-5 w-5" />
              </Link>
              <Link href="/dashboard/student" className="w-full sm:w-auto px-8 py-4 text-white hover:text-cyan-400 transition-colors flex items-center justify-center gap-2">
                Continue learning online <ArrowRight className="h-5 w-5" />
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
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">Meet Vision Vee</h2>
            <p className="text-xl text-slate-400 mb-8 font-light">
              Not just an AI. A friendly companion that answers questions, explains complex ideas with simple analogies, and guides children through their learning journey.
            </p>
            <div className="p-6 rounded-2xl bg-glass border border-white/10 relative">
              <div className="flex gap-4 mb-4">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center shrink-0">👦</div>
                <div className="bg-slate-800 rounded-2xl rounded-tl-none px-4 py-2 text-sm text-slate-300">How do robots see?</div>
              </div>
              <div className="flex gap-4 flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center shrink-0">🤖</div>
                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl rounded-tr-none px-4 py-3 text-sm text-cyan-100">
                  Imagine your eyes are like little cameras! Robots have special cameras and sensors too. They use a brain called "Computer Vision" to understand the pictures they take!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: LEARNING JOURNEY */}
      <section className="py-32 relative z-10 bg-slate-900/30 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4">The Learning Journey</h2>
            <p className="text-slate-400 text-lg">A rewarding, step-by-step path to mastering the future.</p>
          </div>
          
          <div className="max-w-3xl mx-auto relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2"></div>
            
            {[
              { title: "Explore a Topic", desc: "Read engaging, illustrated lessons.", icon: Rocket, color: "bg-purple-500" },
              { title: "Test Your Knowledge", desc: "Take fun, interactive quizzes.", icon: CheckCircle2, color: "bg-blue-500" },
              { title: "Earn a Badge", desc: "Collect 3D medals for your achievements.", icon: Medal, color: "bg-orange-500" },
              { title: "Get Certified", desc: "Download your official Explorer Certificate.", icon: GraduationCap, color: "bg-emerald-500" },
            ].map((step, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                key={i} 
                className={`relative flex items-center gap-8 mb-16 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                  <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400">{step.desc}</p>
                </div>
                <div className={`w-14 h-14 rounded-full ${step.color} flex items-center justify-center shrink-0 z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)] border-4 border-[#0d1b2a]`}>
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 & 7: BADGES & LEADERBOARD */}
      <section className="py-32 relative z-10">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-heading font-bold text-white mb-8">Earn 3D Badges</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "AI Explorer", color: "from-amber-400 to-orange-600" },
                { name: "Robotics Pro", color: "from-slate-300 to-slate-500" },
                { name: "Future Scientist", color: "from-cyan-400 to-blue-600" },
                { name: "Innovation Champ", color: "from-purple-400 to-pink-600" }
              ].map((badge, i) => (
                <div key={i} className="bg-glass border border-white/10 p-6 rounded-3xl text-center flex flex-col items-center justify-center hover:bg-white/5 transition-colors">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center mb-4 shadow-lg border-2 border-white/20 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-white/20 mix-blend-overlay w-1/2" />
                    <Medal className="h-10 w-10 text-white drop-shadow-md" />
                  </div>
                  <div className="font-medium text-slate-200">{badge.name}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-heading font-bold text-white mb-8 flex items-center gap-3">
              <Trophy className="h-8 w-8 text-yellow-400" /> Top Explorers
            </h2>
            <div className="bg-glass border border-white/10 rounded-3xl p-6">
              {[
                { name: "Alex M.", pts: "2,450", rank: 1 },
                { name: "Sarah K.", pts: "2,100", rank: 2 },
                { name: "Leo T.", pts: "1,950", rank: 3 },
                { name: "Emma J.", pts: "1,800", rank: 4 },
              ].map((user, i) => (
                <div key={i} className="flex items-center justify-between p-4 border-b border-white/5 last:border-0 hover:bg-white/5 rounded-xl transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${i === 0 ? 'bg-yellow-500 text-black' : i === 1 ? 'bg-slate-300 text-black' : i === 2 ? 'bg-amber-700 text-white' : 'bg-white/10 text-slate-400'}`}>
                      {user.rank}
                    </div>
                    <span className="font-medium text-slate-200">{user.name}</span>
                  </div>
                  <span className="text-cyan-400 font-mono">{user.pts} pts</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 & 9: PARENTS & SCHOOLS */}
      <section className="py-32 relative z-10 border-y border-white/5 bg-slate-900/50">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="p-10 rounded-3xl bg-glass border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">For Parents</h2>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Equip your child with essential AI literacy. Our platform ensures screen time is highly educational, completely safe, and aligned with future career outcomes.
            </p>
            <ul className="space-y-3 mb-8 text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-400" /> Safe, moderated AI interactions</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-400" /> Detailed progress tracking</li>
            </ul>
            <Link href="#" className="text-cyan-400 font-medium hover:text-cyan-300 flex items-center gap-1">Learn more <ArrowRight className="h-4 w-4" /></Link>
          </div>
          
          <div className="p-10 rounded-3xl bg-glass border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">For Schools</h2>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Partner with Young AI Explorers. Download our comprehensive classroom resources, book interactive workshops, and integrate AI literacy into your curriculum.
            </p>
            <ul className="space-y-3 mb-8 text-slate-300">
              <li className="flex items-center gap-2"><Download className="h-5 w-5 text-purple-400" /> Free Teacher Resource Packs</li>
              <li className="flex items-center gap-2"><Globe className="h-5 w-5 text-purple-400" /> Virtual & In-person Workshops</li>
            </ul>
            <Link href="#" className="text-purple-400 font-medium hover:text-purple-300 flex items-center gap-1">View resources <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      {/* SECTION 10: FOUNDER & FOOTER */}
      <footer className="pt-32 pb-12 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-24">
            <div className="w-24 h-24 rounded-full bg-slate-800 mx-auto mb-6 overflow-hidden border-2 border-white/10">
              {/* Optional: Add Founder Photo here */}
              <div className="w-full h-full bg-gradient-to-tr from-cyan-900 to-purple-900" />
            </div>
            <p className="text-2xl font-light text-slate-300 italic mb-6">
              "My mission is to make Artificial Intelligence accessible to every child, regardless of their background. The future belongs to those who understand the technology shaping it."
            </p>
            <div className="font-medium text-white tracking-wider uppercase text-sm">Founder, Young AI Explorers</div>
          </div>
          
          <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-cyan-400" />
              <span className="font-heading font-bold text-xl text-white">Young AI Explorers</span>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-400">
              <Link href="#" className="hover:text-white transition-colors">Schools</Link>
              <Link href="#" className="hover:text-white transition-colors">Parents</Link>
              <Link href="#" className="hover:text-white transition-colors">Teachers</Link>
              <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-white transition-colors">Contact</Link>
            </div>
            <div className="text-sm text-slate-500">
              © {new Date().getFullYear()} Young AI Explorers.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
