"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Play, CheckCircle2, Lock, BookOpen } from "lucide-react";
import Link from "next/link";

interface Lesson {
  id: number | string;
  title: string;
  desc: string;
}

interface Category {
  id: string;
  title: string;
  icon: string;
  lessons: Lesson[];
  accentColor: string;
}

const categories: Category[] = [
  {
    id: "ai-foundations",
    title: "AI Foundations",
    icon: "🧠",
    accentColor: "from-purple-500/10 to-purple-500/0 border-purple-500/20 text-purple-600 dark:text-purple-400",
    lessons: [
      { id: "intro", title: "Welcome to the Future", desc: "This is where every child starts. An exciting intro to tomorrow's tech." },
      { id: 11, title: "Machine Learning", desc: "Teach computers to learn from patterns and data without direct rules." },
      { id: 34, title: "Deep Learning", desc: "Discover multi-layered networks designed to solve complex puzzles." },
      { id: 9, title: "Neural Networks", desc: "Explore the digital connections inspired by the human brain." },
      { id: 4, title: "AI Decision Making", desc: "See how smart algorithms find paths and make choices." },
      { id: 27, title: "AI Ethics", desc: "Understanding the importance of safety, fairness, and kindness in AI." }
    ]
  },
  {
    id: "sees-hears-speaks",
    title: "AI That Sees, Hears & Speaks",
    icon: "👁️",
    accentColor: "from-blue-500/10 to-blue-500/0 border-blue-500/20 text-blue-600 dark:text-blue-400",
    lessons: [
      { id: 1, title: "Computer Vision", desc: "Give cameras the power to recognize and label objects in the world." },
      { id: 15, title: "Facial Recognition", desc: "Learn how smart locks and phones identify face patterns." },
      { id: 2, title: "Speech Recognition", desc: "Translating spoken language into digital text." },
      { id: 3, title: "AI Translation", desc: "Build bridges of friendship by breaking down language barriers." },
      { id: 12, title: "Natural Language Processing", desc: "How computers write, read, and interpret human text." },
      { id: 35, title: "AI Chatbots", desc: "Talk with interactive smart buddies that answer questions." },
      { id: 16, title: "Virtual Assistants", desc: "Meet the brains behind voice helpers like Siri, Alexa, and Vee." }
    ]
  },
  {
    id: "robotics-machines",
    title: "Robotics & Intelligent Machines",
    icon: "🤖",
    accentColor: "from-orange-500/10 to-orange-500/0 border-orange-500/20 text-orange-600 dark:text-orange-400",
    lessons: [
      { id: 13, title: "Robotics", desc: "Build and program autonomous mechanical helpers." },
      { id: 7, title: "Self-Driving Cars", desc: "Cars that navigate traffic lanes, signs, and hazards safely." },
      { id: 28, title: "Smart Manufacturing", desc: "Automating factory lines with intelligent robots." },
      { id: 23, title: "Smart Traffic", desc: "Optimizing city lights and road networks with AI." },
      { id: 14, title: "Recommendation Systems", desc: "How video and shopping sites learn what you like." }
    ]
  },
  {
    id: "everyday-life",
    title: "AI in Everyday Life",
    icon: "🏥",
    accentColor: "from-cyan-500/10 to-cyan-500/0 border-cyan-500/20 text-cyan-600 dark:text-cyan-400",
    lessons: [
      { id: 5, title: "AI in Healthcare", desc: "Help doctors spot illnesses early and discover new medicine." },
      { id: 22, title: "AI in Education", desc: "Customized learning assistants tailored to your strengths." },
      { id: 19, title: "AI in Sports", desc: "Analyze scores, runs, and plays to make teams faster and stronger." },
      { id: 20, title: "AI in Agriculture", desc: "Smart planting and watering to grow better food for the planet." },
      { id: 21, title: "Weather Prediction", desc: "Forecast storm tracks and temperatures days in advance." },
      { id: 36, title: "Emergency Services", desc: "How dispatch systems allocate help quickly during crises." }
    ]
  },
  {
    id: "smart-world",
    title: "Smart World & Digital Society",
    icon: "🌍",
    accentColor: "from-emerald-500/10 to-emerald-500/0 border-emerald-500/20 text-emerald-600 dark:text-emerald-400",
    lessons: [
      { id: 10, title: "AI & Planet Earth", desc: "Listening to ocean and forest sounds to track wildlife health." },
      { id: 29, title: "Cybersecurity", desc: "Defending network firewalls against hackers." },
      { id: 24, title: "Secure Banking", desc: "Smart fraud alerts and transaction processing." },
      { id: 25, title: "Smart Shopping", desc: "Checkout-free grocery stores and inventory bots." },
      { id: 26, title: "Social Media AI", desc: "Filtering spam comments and surfacing trends." }
    ]
  },
  {
    id: "creativity-innovation",
    title: "Creativity & Future Innovation",
    icon: "🎨",
    accentColor: "from-pink-500/10 to-pink-500/0 border-pink-500/20 text-pink-600 dark:text-pink-400",
    lessons: [
      { id: 17, title: "AI in Art", desc: "Generate paintings and animations from word prompts." },
      { id: 18, title: "AI in Music", desc: "Compose orchestral tracks or vocal harmonies." },
      { id: 30, title: "Smart Photography", desc: "Selfie filters, background removal, and auto-tuning." },
      { id: 32, title: "AI in Fashion", desc: "Digital styling recommendations and custom designs." },
      { id: 33, title: "AI in Movies", desc: "Special effects, script outlines, and digital stunt doubles." },
      { id: 6, title: "AI in Games", desc: "Intelligent playing opponents that adapt to your moves." },
      { id: 31, title: "AI in Food & Nutrition", desc: "Create healthy recipes and balanced diet sheets." },
      { id: 8, title: "AI in Space Exploration", desc: "Mars Rover autonomy and stellar path navigation." },
      { id: 37, title: "Digital Archaeology", desc: "Scanning ancient ruins to reconstruct history." }
    ]
  }
];

interface LearningJourneyProps {
  completedLessonIds?: (number | string)[];
  activeLessonId?: number | string;
}

export function LearningJourney({
  completedLessonIds = [1, 7, 14, 15, 19],
  activeLessonId = 11
}: LearningJourneyProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>("ai-foundations");

  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {categories.map((category) => {
        const isExpanded = expandedCategory === category.id;
        const totalLessons = category.lessons.length;
        const completedCount = category.lessons.filter(l => completedLessonIds.includes(l.id)).length;
        const progressPercentage = Math.round((completedCount / totalLessons) * 100);

        return (
          <div 
            key={category.id} 
            className="rounded-3xl border border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-glass overflow-hidden shadow-sm transition-all duration-300"
          >
            {/* Header Accordion Button */}
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full px-6 py-5 flex items-center justify-between text-left relative z-10 group"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{category.icon}</span>
                <div>
                  <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {category.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="w-24 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: `${progressPercentage}%` }} />
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {completedCount}/{totalLessons} completed ({progressPercentage}%)
                    </span>
                  </div>
                </div>
              </div>
              
              <ChevronDown className={`h-5 w-5 text-slate-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>

            {/* Accordion Content Panel */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pt-2 border-t border-slate-200/50 dark:border-white/5 space-y-3 bg-white/50 dark:bg-black/20">
                    {category.lessons.map((lesson, idx) => {
                      const isCompleted = completedLessonIds.includes(lesson.id);
                      const isActive = lesson.id === activeLessonId;

                      return (
                        <Link 
                          href={`/lesson/${lesson.id}`} 
                          key={lesson.id}
                          className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 group/item ${
                            isActive 
                              ? "bg-cyan-500/5 border-cyan-500/30 hover:border-cyan-400/50 shadow-sm"
                              : isCompleted
                              ? "bg-slate-50/20 border-slate-200/50 dark:border-white/5 opacity-80 hover:opacity-100"
                              : "bg-transparent border-slate-200/30 dark:border-white/5 hover:bg-slate-100/30 dark:hover:bg-white/5 hover:border-slate-350"
                          }`}
                        >
                          <div className="flex items-center gap-4 flex-1">
                            {/* Icon status indicator */}
                            <div className="shrink-0">
                              {isCompleted ? (
                                <CheckCircle2 className="h-6 w-6 text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
                              ) : isActive ? (
                                <div className="h-6 w-6 rounded-full bg-cyan-500 flex items-center justify-center text-white animate-pulse">
                                  <Play className="h-3 w-3 fill-current ml-0.5" />
                                </div>
                              ) : (
                                <BookOpen className="h-5 w-5 text-slate-400 group-hover/item:text-slate-600 dark:group-hover/item:text-slate-300 transition-colors" />
                              )}
                            </div>
                            
                            <div>
                              <div className="font-bold text-sm md:text-base text-slate-800 dark:text-slate-200 flex items-center gap-2">
                                <span className="text-slate-400 font-mono text-xs">
                                  {lesson.id === "intro" ? "Intro." : `Ch ${typeof lesson.id === 'number' && lesson.id < 10 ? '0' + lesson.id : lesson.id}.`}
                                </span>
                                {lesson.title}
                                {isActive && (
                                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                                    Next up
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl font-medium">
                                {lesson.desc}
                              </div>
                            </div>
                          </div>

                          <div className="shrink-0 pl-4">
                            <span className="h-8 w-8 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center bg-white dark:bg-slate-900 group-hover/item:bg-slate-900 dark:group-hover/item:bg-white group-hover/item:text-white dark:group-hover/item:text-slate-900 transition-colors">
                              <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
