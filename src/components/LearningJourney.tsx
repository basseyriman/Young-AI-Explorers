"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Play, CheckCircle2, BookOpen } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/LanguageContext";

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
    accentColor: "from-brand-purple/10 to-brand-purple/0 border-brand-purple/20 text-brand-purple dark:text-brand-cream",
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
      { id: 23, title: "Smart Traffic", desc: "Smarter roads that reduce travel times and carbon footprints." },
      { id: 14, title: "Recommendation Systems", desc: "Discover how AI predicts the next song or movie you'll love." }
    ]
  },
  {
    id: "everyday-life",
    title: "AI in Everyday Life",
    icon: "🏠",
    accentColor: "from-emerald-500/10 to-emerald-500/0 border-emerald-500/20 text-emerald-600 dark:text-emerald-400",
    lessons: [
      { id: 5, title: "AI in Healthcare", desc: "Diagnosing conditions faster and discovery of lifesaving medicine." },
      { id: 22, title: "AI in Education", desc: "Adaptive learning tailored to every child's path." },
      { id: 19, title: "AI in Sports", desc: "Analyzing play patterns to optimize training and check stats." },
      { id: 20, title: "AI in Agriculture", desc: "Autonomous tractors and drone monitoring to feed the planet." },
      { id: 21, title: "Weather Prediction", desc: "forecasting storms and climate patterns in minutes." },
      { id: 36, title: "Emergency Services", desc: "Prioritizing ambulance calls and routing responders." }
    ]
  },
  {
    id: "smart-world",
    title: "Smart World & Digital Society",
    icon: "🌍",
    accentColor: "from-blue-500/10 to-blue-500/0 border-blue-500/20 text-blue-600 dark:text-blue-400",
    lessons: [
      { id: 10, title: "AI & Planet Earth", desc: "Detecting illegal logging and protecting rare animal migrations." },
      { id: 29, title: "Cybersecurity", desc: "Defending systems from hackers with automated threat defense." },
      { id: 24, title: "Secure Banking", desc: "Using AI to monitor card fraud and verify transactions." },
      { id: 25, title: "Smart Shopping", desc: "Automatic stores where you grab objects and exit without queues." },
      { id: 26, title: "Social Media AI", desc: "Optimizing feeds and moderating safety on digital platforms." }
    ]
  },
  {
    id: "creativity-innovation",
    title: "Creativity & Future Innovation",
    icon: "🎨",
    accentColor: "from-amber-500/10 to-amber-500/0 border-amber-500/20 text-amber-600 dark:text-amber-400",
    lessons: [
      { id: 17, title: "AI in Art", desc: "Generating images, designs, and visual styles from text prompts." },
      { id: 18, title: "AI in Music", desc: "Composing tracks, producing beats, and editing tracks." },
      { id: 30, title: "Smart Photography", desc: "Processing camera snapshots to balance colors and lighting." },
      { id: 32, title: "AI in Fashion", desc: "Predicting trending wear styles and mapping sizing." },
      { id: 33, title: "AI in Movies", desc: "rendering CGI characters and sorting key frames." },
      { id: 6, title: "AI in Games", desc: "Challenging opponents that learn and adapt to how you play." },
      { id: 31, title: "AI in Food & Nutrition", desc: "Generating recipes and mapping nutritional goals." },
      { id: 8, title: "AI in Space Exploration", desc: "helping Mars rovers map terrain without laggy earth links." },
      { id: 37, title: "Digital Archaeology", desc: "Scanning ruins and mapping historic artifacts in 3D." }
    ]
  }
];

interface CustomTopic {
  id: string;
  title: string;
  description: string;
  contentStatus?: "pending" | "generating" | "ready" | "failed";
  badgeName?: string;
  illustrationUrl?: string;
}

interface LearningJourneyProps {
  completedLessonIds: (string | number)[];
  activeLessonId?: string | number;
  disabledTopicIds: (string | number)[];
  customTopics: CustomTopic[];
}

export function LearningJourney({
  completedLessonIds,
  activeLessonId,
  disabledTopicIds,
  customTopics,
}: LearningJourneyProps) {
  const { t } = useTranslation();
  const [expandedCategory, setExpandedCategory] = useState<string | null>("ai-foundations");

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const isDisabled = (id: string | number) => {
    return disabledTopicIds.some((d) => String(d) === String(id));
  };

  return (
    <div className="space-y-4">
      {/* Custom Topics (Vision Vee) Section */}
      {customTopics.length > 0 && (
        <div className="rounded-3xl border border-brand-gold/20 bg-brand-gold/5 overflow-hidden shadow-sm">
          <div className="px-6 py-5 border-b border-brand-gold/15 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✨</span>
              <h3 className="font-heading font-bold text-lg text-brand-purple dark:text-brand-cream">
                {t("dashboard.custom_topics_title")}
              </h3>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full border border-brand-gold/20">
              Vision Vee
            </span>
          </div>
          
          <div className="p-6 space-y-3 bg-brand-surface/20 dark:bg-brand-purple-dark/20">
            {customTopics.map((topic) => {
              const isReady = topic.contentStatus === 'ready';
              const isCompleted = completedLessonIds.map(String).includes(topic.id);
              const isActive = topic.id === activeLessonId;

              return (
                <Link
                  href={isReady ? `/lesson/${topic.id}` : "#"}
                  key={topic.id}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 group/item ${
                    isActive
                      ? "bg-brand-gold/10 border-brand-gold/30 hover:border-brand-gold/50 shadow-sm"
                      : isCompleted
                      ? "bg-brand-purple/5 border-brand-purple/10 opacity-80 hover:opacity-100"
                      : "bg-brand-surface dark:bg-brand-purple-dark border-brand-purple/10 dark:border-brand-gold/10 hover:bg-brand-warm dark:hover:bg-brand-purple-dark/50"
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="shrink-0">
                      {isCompleted ? (
                        <CheckCircle2 className="h-6 w-6 text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
                      ) : isActive ? (
                        <div className="h-6 w-6 rounded-full bg-brand-purple dark:bg-brand-gold flex items-center justify-center text-brand-cream dark:text-brand-purple-dark animate-pulse">
                          <Play className="h-3 w-3 fill-current ml-0.5" />
                        </div>
                      ) : (
                        <BookOpen className="h-5 w-5 text-brand-purple/40 group-hover/item:text-brand-gold transition-colors" />
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-sm md:text-base text-brand-purple dark:text-brand-cream flex items-center gap-2">
                        {topic.title}
                        {isActive && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-brand-gold/10 text-brand-gold border border-brand-gold/20">
                            {t("dashboard.next_up") || "Next up"}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-brand-purple/50 dark:text-brand-cream/50 mt-1 max-w-xl font-medium">
                        {topic.description}
                        {topic.badgeName && isReady && (
                          <span className="block mt-1 text-brand-gold">{t("dashboard.badges")}: {topic.badgeName}</span>
                        )}
                        {!isReady && (
                          <span className="block mt-1 italic">{t("dashboard.preparing")}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  {isReady && (
                    <span className="shrink-0 pl-4 h-8 w-8 rounded-full border border-brand-gold/25 flex items-center justify-center bg-brand-surface dark:bg-brand-purple-dark group-hover/item:bg-brand-gold group-hover/item:text-brand-purple-dark transition-colors">
                      <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {categories.map((category) => {
        const isExpanded = expandedCategory === category.id;
        const visibleLessons = category.lessons.filter((l) => !isDisabled(l.id));
        const totalLessons = visibleLessons.length;
        const completedCount = visibleLessons.filter(l => completedLessonIds.includes(l.id)).length;
        const progressPercentage = Math.round((completedCount / totalLessons) * 100);

        return (
          <div 
            key={category.id} 
            className="rounded-3xl border border-brand-purple/10 dark:border-brand-gold/15 bg-brand-surface/80 dark:bg-brand-purple-dark/60 overflow-hidden shadow-sm transition-all duration-300"
          >
            {/* Header Accordion Button */}
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full px-6 py-5 flex items-center justify-between text-left relative z-10 group"
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{category.icon}</span>
                <div>
                  <h3 className="font-heading font-bold text-lg text-brand-purple dark:text-brand-cream group-hover:text-brand-gold transition-colors">
                    {t(`worlds.${category.id}`)}
                  </h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="w-24 h-1.5 bg-brand-purple/10 dark:bg-brand-gold/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-brand-purple to-brand-gold dark:from-brand-gold dark:to-brand-purple" style={{ width: `${progressPercentage}%` }} />
                    </div>
                    <span className="text-xs text-brand-purple/50 dark:text-brand-cream/50 font-medium">
                      {completedCount}/{totalLessons} {t("dashboard.completed").toLowerCase()} ({progressPercentage}%)
                    </span>
                  </div>
                </div>
              </div>
              
              <ChevronDown className={`h-5 w-5 text-brand-purple/50 dark:text-brand-cream/50 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
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
                  <div className="px-6 pb-6 pt-2 border-t border-brand-purple/10 dark:border-brand-gold/10 space-y-3 bg-brand-warm/50 dark:bg-brand-purple-dark/30">
                    {visibleLessons.map((lesson) => {
                      const isCompleted = completedLessonIds.includes(lesson.id);
                      const isActive = lesson.id === activeLessonId;

                      const transTitle = t(`lessons.${lesson.id}.title`);
                      const lessonTitle = transTitle.startsWith("lessons.") ? lesson.title : transTitle;

                      const transDesc = t(`lessons.${lesson.id}.desc`);
                      const lessonDesc = transDesc.startsWith("lessons.") ? lesson.desc : transDesc;

                      return (
                        <Link 
                          href={`/lesson/${lesson.id}`} 
                          key={lesson.id}
                          className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-200 group/item ${
                            isActive 
                              ? "bg-brand-gold/10 border-brand-gold/30 hover:border-brand-gold/50 shadow-sm"
                              : isCompleted
                              ? "bg-brand-purple/5 border-brand-purple/10 opacity-80 hover:opacity-100"
                              : "bg-transparent border-brand-purple/10 dark:border-brand-gold/10 hover:bg-brand-warm dark:hover:bg-brand-purple-dark/50"
                          }`}
                        >
                          <div className="flex items-center gap-4 flex-1">
                            {/* Icon status indicator */}
                            <div className="shrink-0">
                              {isCompleted ? (
                                <CheckCircle2 className="h-6 w-6 text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
                              ) : isActive ? (
                                <div className="h-6 w-6 rounded-full bg-brand-purple dark:bg-brand-gold flex items-center justify-center text-brand-cream dark:text-brand-purple-dark animate-pulse">
                                  <Play className="h-3 w-3 fill-current ml-0.5" />
                                </div>
                              ) : (
                                <BookOpen className="h-5 w-5 text-brand-purple/40 group-hover/item:text-brand-gold transition-colors" />
                              )}
                            </div>
                            
                            <div>
                              <div className="font-bold text-sm md:text-base text-brand-purple dark:text-brand-cream flex items-center gap-2">
                                <span className="text-brand-purple/40 font-mono text-xs">
                                  {lesson.id === "intro" ? "Intro." : `Ch ${typeof lesson.id === 'number' && lesson.id < 10 ? '0' + lesson.id : lesson.id}.`}
                                </span>
                                {lessonTitle}
                                {isActive && (
                                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-brand-gold/10 text-brand-gold border border-brand-gold/20">
                                    {t("dashboard.next_up") || "Next up"}
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-brand-purple/50 dark:text-brand-cream/50 mt-1 max-w-xl font-medium">
                                {lessonDesc}
                              </div>
                            </div>
                          </div>

                          <div className="shrink-0 pl-4">
                            <span className="h-8 w-8 rounded-full border border-brand-purple/15 dark:border-brand-gold/15 flex items-center justify-center bg-brand-surface dark:bg-brand-purple-dark group-hover/item:bg-brand-purple dark:group-hover/item:bg-brand-gold group-hover/item:text-brand-cream dark:group-hover/item:text-brand-purple-dark transition-colors">
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
