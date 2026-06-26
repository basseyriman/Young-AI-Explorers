"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Download, GraduationCap, Globe, ArrowUpRight, BookOpen, MessageCircle, Compass, Layers } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { WorldSelector } from "@/components/WorldSelector";
import { Book3D } from "@/components/Book3D";
import { AssistantTriggerCard } from "@/components/AssistantTriggerCard";
import { NavBar } from "@/components/NavBar";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Logo } from "@/components/Logo";
import { RegionalCommunities } from "@/components/RegionalCommunities";
import { BASE_LESSON_COUNT, TOPIC_COUNT_LABEL, QUIZ_QUESTION_COUNT } from "@/data/curriculum";

function InitialsAvatar({ name, className = "" }: { name: string; className?: string }) {
  const initials = name.split(" ").map((n) => n[0]).join("");
  return (
    <div className={`rounded-full bg-brand-purple/10 dark:bg-brand-gold/10 border border-brand-purple/15 dark:border-brand-gold/20 flex items-center justify-center font-semibold text-brand-purple dark:text-brand-gold text-sm ${className}`}>
      {initials}
    </div>
  );
}

export default function Home() {
  const [explorationMode, setExplorationMode] = useState<"map" | "grid" | null>(null);

  return (
    <main className="min-h-screen bg-transparent relative selection:bg-brand-gold/30">
      <NavBar />

      {/* SECTION 1: HERO */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/[0.03] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-brand-gold/[0.04] rounded-full" />
        </div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 text-center lg:text-left max-w-2xl"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-purple/5 dark:bg-brand-gold/5 border border-brand-purple/10 dark:border-brand-gold/15 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
              <span className="text-sm font-medium text-brand-purple/70 dark:text-brand-cream/70 tracking-wide">
                The future of learning, beautifully crafted
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight text-brand-purple dark:text-brand-cream mb-6 leading-[1.08]">
              Young AI{" "}
              <span className="text-gradient">Explorers</span>
            </h1>

            <p className="text-lg md:text-xl text-brand-purple/60 dark:text-brand-cream/60 mb-10 max-w-xl font-light leading-relaxed mx-auto lg:mx-0">
              Discover artificial intelligence, robotics, and the technologies shaping tomorrow — through guided lessons designed for curious young minds.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-16">
              <Link
                href="/signup"
                className="w-full sm:w-auto px-8 py-4 bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark rounded-full font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-[0_8px_30px_rgba(74,45,110,0.2)] dark:shadow-[0_8px_30px_rgba(201,160,78,0.15)]"
              >
                Start Learning <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="#topics"
                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-brand-purple/20 dark:border-brand-gold/25 text-brand-purple dark:text-brand-cream rounded-full font-semibold hover:bg-brand-purple/5 dark:hover:bg-brand-gold/5 transition-colors flex items-center justify-center"
              >
                Explore {TOPIC_COUNT_LABEL} Topics
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-brand-purple/10 dark:border-brand-gold/10">
              {[
                { value: BASE_LESSON_COUNT, suffix: "+", label: "Interactive Lessons" },
                { value: QUIZ_QUESTION_COUNT, suffix: "+", label: "Quiz Questions" },
                { value: null, suffix: "", label: "AI Learning Assistant", display: "AI" },
                { value: null, suffix: "", label: "Future Ready", display: "100%" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl md:text-3xl font-bold text-brand-purple dark:text-brand-cream mb-1">
                    {stat.display ?? <AnimatedCounter value={stat.value!} suffix={stat.suffix} />}
                  </div>
                  <div className="text-xs text-brand-purple/50 dark:text-brand-cream/50 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            className="flex-1 relative w-full max-w-xl"
          >
            <div className="relative aspect-[4/5] rounded-[1.75rem] overflow-hidden shadow-[0_16px_48px_rgba(74,45,110,0.12)] border border-brand-purple/10 dark:border-brand-gold/15 bg-brand-warm">
              <Image
                src="/assets/hero-robot-kids.png"
                alt="A friendly robot guiding children through a hands-on learning activity in a warm classroom"
                fill
                className="object-cover object-center"
                priority
                quality={100}
                unoptimized
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 576px"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-purple-dark/40 to-transparent pointer-events-none" />
            </div>
            <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-brand-cream dark:bg-brand-purple-dark rounded-2xl px-5 py-4 shadow-[0_8px_30px_rgba(74,45,110,0.1)] border border-brand-purple/10 dark:border-brand-gold/10">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold mb-0.5">Vision Vee</p>
              <p className="text-sm font-medium text-brand-purple dark:text-brand-cream">Your AI learning companion</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST BANNER */}
      <section className="py-10 relative z-10 border-y border-brand-purple/8 dark:border-brand-gold/8 bg-brand-surface dark:bg-brand-purple-dark/40">
        <div className="container mx-auto px-6">
          <p className="text-center text-xs text-brand-purple/40 dark:text-brand-cream/40 uppercase tracking-[0.25em] font-medium mb-6">Recognised By</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20">
            {["Amazon", "STEM Education", "Schools Worldwide"].map((name) => (
              <span key={name} className="font-heading text-lg md:text-xl font-semibold text-brand-purple/30 dark:text-brand-cream/30 tracking-wide hover:text-brand-purple/60 dark:hover:text-brand-cream/60 transition-colors">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* TOPICS & WORLDS */}
      <section id="topics" className="py-28 relative z-10 bg-brand-warm/60 dark:bg-brand-purple-dark/20 border-b border-brand-purple/8 dark:border-brand-gold/8">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-purple/6 dark:bg-brand-gold/8 border border-brand-purple/10 dark:border-brand-gold/15 mb-6">
              <Layers className="h-3.5 w-3.5 text-brand-gold" strokeWidth={2} />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple/70 dark:text-brand-cream/70">{TOPIC_COUNT_LABEL} Topics · 6 Worlds · Custom Additions</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-purple dark:text-brand-cream mb-4 leading-tight">
              Explore Every Topic
            </h2>
            <p className="text-brand-purple/60 dark:text-brand-cream/60 text-lg leading-relaxed">
              {BASE_LESSON_COUNT}+ core topics across six guided worlds — plus custom topics Vision Vee or parents can add to any child&apos;s curriculum.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {explorationMode === null && (
              <motion.div
                key="gate"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-2xl mx-auto text-center mb-16"
              >
                <div className="p-8 md:p-10 rounded-2xl border border-brand-purple/12 dark:border-brand-gold/15 bg-brand-surface dark:bg-brand-purple-dark shadow-[0_4px_24px_rgba(74,45,110,0.06)]">
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-purple/8 dark:bg-brand-gold/10 border border-brand-purple/12 dark:border-brand-gold/15">
                    <Compass className="h-6 w-6 text-brand-purple dark:text-brand-gold" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-heading font-bold text-brand-purple dark:text-brand-cream mb-3">
                    Start Your Adventure
                  </h3>
                  <p className="text-brand-purple/60 dark:text-brand-cream/60 text-base max-w-lg mx-auto mb-8 leading-relaxed">
                    Choose from six guided worlds — each packed with illustrated lessons, quizzes, and badges.
                  </p>
                  <button
                    onClick={() => setExplorationMode("grid")}
                    className="px-8 py-3.5 bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark rounded-full font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mx-auto shadow-[0_6px_24px_rgba(74,45,110,0.18)] group/btn"
                  >
                    View All Worlds <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            )}

            {explorationMode === "grid" && (
              <motion.div
                key="grid-view"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex justify-between items-center mb-10">
                  <button
                    onClick={() => setExplorationMode(null)}
                    className="px-4 py-2 rounded-full border border-brand-purple/15 dark:border-brand-gold/15 bg-brand-surface dark:bg-brand-purple-dark text-brand-purple/70 dark:text-brand-cream/70 hover:border-brand-gold/30 font-medium transition-colors text-sm"
                  >
                    ← Collapse
                  </button>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">Guided Worlds</span>
                </div>
                <WorldSelector />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Legacy anchor for nav */}
      <section id="map" className="sr-only" aria-hidden="true" />

      <RegionalCommunities />

      {/* THE BOOK */}
      <section id="book" className="py-28 relative z-10 border-y border-brand-purple/8 dark:border-brand-gold/8 bg-brand-surface/40 dark:bg-brand-purple-dark/20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 w-full flex justify-center">
            <Book3D />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="w-3.5 h-3.5 rounded-sm bg-brand-gold" />
                ))}
              </div>
              <span className="text-brand-purple/50 dark:text-brand-cream/50 text-sm font-medium">100+ Amazon Reviews</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-purple dark:text-brand-cream mb-6">The Physical Book</h2>
            <p className="text-xl text-brand-purple/60 dark:text-brand-cream/60 mb-6 font-light">
              Start the journey off-screen. The perfect companion to the online platform, available worldwide.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-8">
              {["Ages 9–12", "Worldwide Shipping", "Paperback", "Future eBook"].map((tag) => (
                <span key={tag} className="bg-brand-purple/5 dark:bg-brand-gold/5 border border-brand-purple/10 dark:border-brand-gold/15 rounded-full px-4 py-1.5 text-xs font-semibold text-brand-purple/70 dark:text-brand-cream/70 tracking-wide uppercase">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
              <Link
                href="https://www.amazon.com/Young-AI-Explorers-Guide-Future/dp/B0H4KGNW3B"
                target="_blank"
                className="w-full sm:w-auto px-8 py-4 bg-[#ff9900] text-black rounded-full font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                Buy on Amazon <ArrowUpRight className="h-5 w-5" />
              </Link>
              <Link href="#" className="w-full sm:w-auto px-8 py-4 text-brand-purple dark:text-brand-cream border border-brand-purple/20 dark:border-brand-gold/20 rounded-full hover:bg-brand-purple/5 dark:hover:bg-brand-gold/5 transition-colors flex items-center justify-center gap-2">
                Read Sample
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MEET VISION VEE */}
      <section id="assistant" className="py-28 relative z-10 overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-16">
          <div className="flex-1 w-full max-w-md mx-auto relative">
            <AssistantTriggerCard />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-purple/8 dark:bg-brand-gold/10 border border-brand-purple/10 dark:border-brand-gold/15 mb-8">
              <MessageCircle className="h-7 w-7 text-brand-purple dark:text-brand-gold" strokeWidth={1.5} />
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-purple dark:text-brand-cream mb-6">Meet Vision Vee</h2>
            <p className="text-xl text-brand-purple/60 dark:text-brand-cream/60 mb-8 font-light">
              Not just an AI. A friendly companion that answers questions, explains complex ideas with simple analogies, and can create custom topics for your curriculum when you or your parent asks.
            </p>
            <div className="p-6 rounded-2xl bg-brand-surface/80 dark:bg-brand-purple-dark/40 border border-brand-purple/10 dark:border-brand-gold/10 shadow-sm">
              <div className="flex gap-4 mb-4">
                <InitialsAvatar name="Alex M" className="w-8 h-8 shrink-0" />
                <div className="bg-brand-purple/5 dark:bg-brand-gold/5 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm text-brand-purple/80 dark:text-brand-cream/80">
                  How do robots see?
                </div>
              </div>
              <div className="flex gap-4 flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-brand-purple dark:bg-brand-gold flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-brand-cream dark:text-brand-purple-dark">VV</span>
                </div>
                <div className="bg-brand-purple/8 dark:bg-brand-gold/8 border border-brand-purple/10 dark:border-brand-gold/15 rounded-2xl rounded-tr-sm px-4 py-3 text-sm text-brand-purple/80 dark:text-brand-cream/80">
                  Imagine your eyes are like little cameras. Robots have special cameras and sensors too — they use a brain called Computer Vision to understand the pictures they take.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEARNING JOURNEY */}
      <section className="py-28 relative z-10 bg-brand-surface/40 dark:bg-brand-purple-dark/20 border-y border-brand-purple/8 dark:border-brand-gold/8">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-purple dark:text-brand-cream mb-4">The Learning Journey</h2>
            <p className="text-brand-purple/60 dark:text-brand-cream/60 text-lg">A rewarding, step-by-step path to mastering the future.</p>
          </div>

          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-brand-purple/10 dark:bg-brand-gold/10 -translate-x-1/2" />

            {[
              { title: "Explore a Topic", desc: "Read engaging, illustrated lessons.", step: "01" },
              { title: "Test Your Knowledge", desc: "Take fun, interactive quizzes.", step: "02" },
              { title: "Earn a Badge", desc: "Collect medals for your achievements.", step: "03" },
              { title: "Get Certified", desc: "Download your official Explorer Certificate.", step: "04" },
            ].map((step, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                key={i}
                className={`relative flex items-center gap-8 mb-14 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                <div className={`flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                  <h3 className="text-xl font-bold text-brand-purple dark:text-brand-cream mb-2">{step.title}</h3>
                  <p className="text-brand-purple/60 dark:text-brand-cream/60">{step.desc}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-brand-purple dark:bg-brand-gold flex items-center justify-center shrink-0 z-10 border-4 border-brand-cream dark:border-brand-purple-dark shadow-sm">
                  <span className="text-xs font-bold text-brand-cream dark:text-brand-purple-dark">{step.step}</span>
                </div>
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BADGES & LEADERBOARD */}
      <section className="py-28 relative z-10">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-heading font-bold text-brand-purple dark:text-brand-cream mb-8">Earn Badges</h2>
            <div className="grid grid-cols-2 gap-5">
              {[
                { name: "Gold Explorer", tier: "gold" },
                { name: "Silver Inventor", tier: "silver" },
                { name: "Diamond Coder", tier: "diamond" },
                { name: "Legendary Pioneer", tier: "legend" },
              ].map((badge) => (
                <div key={badge.name} className="group bg-brand-surface/80 dark:bg-brand-purple-dark/40 border border-brand-purple/10 dark:border-brand-gold/10 p-6 rounded-2xl text-center flex flex-col items-center justify-center hover:border-brand-gold/30 transition-colors">
                  <div className={`w-16 h-16 rounded-full mb-4 flex items-center justify-center border-2 ${
                    badge.tier === "gold" ? "border-brand-gold bg-brand-gold/10" :
                    badge.tier === "silver" ? "border-brand-purple/30 bg-brand-purple/5" :
                    badge.tier === "diamond" ? "border-brand-purple/40 bg-brand-purple/8" :
                    "border-brand-gold/40 bg-brand-gold/8"
                  }`}>
                    <GraduationCap className={`h-7 w-7 ${
                      badge.tier === "gold" ? "text-brand-gold" : "text-brand-purple dark:text-brand-gold"
                    }`} strokeWidth={1.5} />
                  </div>
                  <div className="font-semibold text-brand-purple dark:text-brand-cream text-sm tracking-wide">{badge.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-heading font-bold text-brand-purple dark:text-brand-cream mb-8">Top Explorers</h2>
            <div className="bg-brand-surface/80 dark:bg-brand-purple-dark/40 border border-brand-purple/10 dark:border-brand-gold/10 rounded-2xl p-2">
              {[
                { name: "Alex M.", pts: "2,450 XP", rank: 1, streak: 12, level: "Lv 8" },
                { name: "Sarah K.", pts: "2,100 XP", rank: 2, streak: 8, level: "Lv 7" },
                { name: "Leo T.", pts: "1,950 XP", rank: 3, streak: 5, level: "Lv 6" },
                { name: "Emma J.", pts: "1,800 XP", rank: 4, streak: 3, level: "Lv 5" },
              ].map((user, i) => (
                <div key={i} className="flex items-center justify-between p-4 border-b border-brand-purple/5 dark:border-brand-gold/5 last:border-0 hover:bg-brand-purple/[0.03] dark:hover:bg-brand-gold/[0.03] rounded-xl transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                      i === 0 ? "bg-brand-gold text-brand-purple-dark" :
                      i === 1 ? "bg-brand-purple/15 text-brand-purple dark:text-brand-cream" :
                      i === 2 ? "bg-brand-purple/10 text-brand-purple/70 dark:text-brand-cream/70" :
                      "bg-brand-purple/5 text-brand-purple/50 dark:text-brand-cream/50"
                    }`}>
                      {user.rank}
                    </div>
                    <div className="flex items-center gap-3">
                      <InitialsAvatar name={user.name} className="w-9 h-9" />
                      <div>
                        <div className="font-semibold text-brand-purple dark:text-brand-cream text-sm">
                          {user.name}{" "}
                          <span className="text-[10px] font-mono bg-brand-purple/5 dark:bg-brand-gold/10 px-2 py-0.5 rounded text-brand-gold ml-1">{user.level}</span>
                        </div>
                        <div className="text-xs text-brand-purple/50 dark:text-brand-cream/50 mt-0.5">
                          {user.streak} day streak
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="text-brand-gold font-semibold text-sm tracking-wide">{user.pts}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PARENTS & SCHOOLS */}
      <section id="parents" className="py-28 relative z-10 border-y border-brand-purple/8 dark:border-brand-gold/8 bg-brand-surface/40 dark:bg-brand-purple-dark/20">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-brand-purple/10 dark:border-brand-gold/10 bg-brand-surface dark:bg-brand-purple-dark/60 overflow-hidden shadow-[0_4px_30px_rgba(74,45,110,0.05)]">
            <div className="w-full h-52 overflow-hidden relative">
              <Image
                src="/assets/hero-robot-kids.png"
                alt="Children learning with technology"
                fill
                className="object-cover object-top"
                quality={100}
                sizes="(max-width: 768px) 100vw, 400px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-surface dark:from-brand-purple-dark to-transparent" />
            </div>
            <div className="p-8 md:p-10">
              <h2 className="text-2xl font-bold text-brand-purple dark:text-brand-cream mb-4">For Parents</h2>
              <p className="text-brand-purple/60 dark:text-brand-cream/60 mb-6 leading-relaxed">
                Equip your child with essential AI literacy. Control their curriculum — enable, remove, or add custom topics beyond the core {TOPIC_COUNT_LABEL} lessons. Set sharing preferences and connect with explorers worldwide.
              </p>
              <div className="p-4 rounded-xl bg-brand-purple/[0.03] dark:bg-brand-gold/[0.05] border border-brand-purple/8 dark:border-brand-gold/10 mb-8">
                <p className="text-sm text-brand-purple/70 dark:text-brand-cream/70 italic leading-relaxed">
                  &ldquo;The only educational platform my daughter actually begs to use. She&apos;s learning Python and AI concepts at age 10.&rdquo;
                </p>
                <p className="text-xs font-semibold text-brand-gold mt-3">Sarah T., Parent</p>
              </div>
              <Link href="/dashboard/parent" className="block w-full py-4 text-center text-brand-cream dark:text-brand-purple-dark bg-brand-purple dark:bg-brand-gold rounded-full font-semibold hover:opacity-90 transition-all">
                Parent Dashboard — Control Curriculum
              </Link>
            </div>
          </div>

          <div id="schools" className="rounded-2xl border border-brand-purple/10 dark:border-brand-gold/10 bg-brand-surface dark:bg-brand-purple-dark/60 overflow-hidden shadow-[0_4px_30px_rgba(74,45,110,0.05)]">
            <div className="w-full h-52 overflow-hidden relative bg-brand-purple/5">
              <div className="absolute inset-0 flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-brand-purple/15 dark:text-brand-gold/15" strokeWidth={1} />
              </div>
            </div>
            <div className="p-8 md:p-10">
              <h2 className="text-2xl font-bold text-brand-purple dark:text-brand-cream mb-4">For Schools & Teachers</h2>
              <p className="text-brand-purple/60 dark:text-brand-cream/60 mb-6 leading-relaxed">
                Partner with Young AI Explorers. Download classroom resources, book interactive workshops, and integrate AI literacy into your curriculum.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link href="#" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-purple/5 dark:bg-brand-gold/5 text-brand-purple dark:text-brand-cream font-medium transition-colors border border-brand-purple/10 dark:border-brand-gold/15 hover:bg-brand-purple/8 dark:hover:bg-brand-gold/8">
                  <Download className="h-4 w-4" strokeWidth={1.5} /> Curriculum PDF
                </Link>
                <Link href="#" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-purple/5 dark:bg-brand-gold/5 text-brand-purple dark:text-brand-cream font-medium transition-colors border border-brand-purple/10 dark:border-brand-gold/15 hover:bg-brand-purple/8 dark:hover:bg-brand-gold/8">
                  <Globe className="h-4 w-4" strokeWidth={1.5} /> Book Workshop
                </Link>
              </div>
              <Link href="#" className="block w-full py-4 text-center text-brand-purple dark:text-brand-cream bg-transparent border border-brand-purple/20 dark:border-brand-gold/20 rounded-full font-semibold hover:bg-brand-purple/5 dark:hover:bg-brand-gold/5 transition-colors">
                Request School Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pt-24 pb-12 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <p className="text-2xl md:text-3xl font-light text-brand-purple/80 dark:text-brand-cream/80 italic mb-8 leading-relaxed">
              &ldquo;My mission is to make Artificial Intelligence accessible to every child. The future belongs to those who understand the technology shaping it.&rdquo;
            </p>
            <div className="flex flex-col items-center">
              <h3 className="font-heading text-xl font-bold text-brand-purple dark:text-brand-cream mb-1">Bassey Riman</h3>
              <p className="text-sm font-semibold text-brand-gold tracking-wider uppercase">Founder, Young AI Explorers</p>
              <p className="text-sm text-brand-purple/50 dark:text-brand-cream/50 mt-2">AI Engineer · Author · AI in Education</p>
            </div>
          </div>

          <div className="border-t border-brand-purple/10 dark:border-brand-gold/10 pt-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex flex-col gap-3">
              <Link href="/">
                <Logo showWordmark size="md" />
              </Link>
              <p className="text-sm text-brand-purple/50 dark:text-brand-cream/50">Inspiring the next generation of innovators.</p>
            </div>

            <div className="flex flex-wrap gap-10 text-sm text-brand-purple/60 dark:text-brand-cream/60">
              {[
                { title: "Platform", links: ["Topics", "AI Assistant", "The Book"] },
                { title: "Community", links: ["UK Explorers", "Nigeria", "Ghana", "Global Network"] },
                { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
              ].map((col) => (
                <div key={col.title} className="flex flex-col gap-2.5">
                  <span className="text-brand-purple dark:text-brand-cream font-semibold mb-1">{col.title}</span>
                  {col.links.map((link) => (
                    <Link key={link} href="#" className="hover:text-brand-gold transition-colors">{link}</Link>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-brand-purple/8 dark:border-brand-gold/8 mt-10 pt-8 text-center text-sm text-brand-purple/40 dark:text-brand-cream/40">
            © {new Date().getFullYear()} Young AI Explorers. Designed for the future.
          </div>
        </div>
      </footer>
    </main>
  );
}
