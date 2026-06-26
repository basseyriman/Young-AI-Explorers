"use client";

import { motion } from "framer-motion";
import { ArrowRight, Brain, Eye, Bot, Home, Globe, Palette, type LucideIcon } from "lucide-react";
import Link from "next/link";

type World = {
  id: string;
  title: string;
  subtitle: string;
  lessons: string;
  duration: string;
  icon: LucideIcon;
  index: string;
  accent: "purple" | "gold";
};

const worlds: World[] = [
  {
    id: "ai-foundations",
    title: "AI Foundations",
    subtitle: "Core concepts every explorer needs",
    lessons: "6 Lessons",
    duration: "~ 60 mins",
    icon: Brain,
    index: "01",
    accent: "purple",
  },
  {
    id: "sees-hears-speaks",
    title: "AI That Sees, Hears & Speaks",
    subtitle: "Computer vision, speech, and language",
    lessons: "7 Lessons",
    duration: "~ 75 mins",
    icon: Eye,
    index: "02",
    accent: "gold",
  },
  {
    id: "robotics-machines",
    title: "Robotics & Intelligent Machines",
    subtitle: "How machines learn to move and decide",
    lessons: "5 Lessons",
    duration: "~ 55 mins",
    icon: Bot,
    index: "03",
    accent: "purple",
  },
  {
    id: "everyday-life",
    title: "AI in Everyday Life",
    subtitle: "Healthcare, transport, and daily tools",
    lessons: "6 Lessons",
    duration: "~ 60 mins",
    icon: Home,
    index: "04",
    accent: "gold",
  },
  {
    id: "smart-world",
    title: "Smart World & Digital Society",
    subtitle: "Ethics, privacy, and the connected world",
    lessons: "5 Lessons",
    duration: "~ 50 mins",
    icon: Globe,
    index: "05",
    accent: "purple",
  },
  {
    id: "creativity-innovation",
    title: "Creativity & Future Innovation",
    subtitle: "Art, music, and tomorrow's inventions",
    lessons: "9 Lessons",
    duration: "~ 90 mins",
    icon: Palette,
    index: "06",
    accent: "gold",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
} as const;

export function WorldSelector() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      {worlds.map((world) => {
        const Icon = world.icon;
        const isGold = world.accent === "gold";

        return (
          <Link href="/dashboard/student" key={world.id} className="block group">
            <motion.article
              variants={cardVariants}
              className="h-full flex flex-col rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/12 dark:border-brand-gold/15 overflow-hidden transition-all duration-200 hover:border-brand-gold/40 dark:hover:border-brand-gold/35 hover:shadow-[0_12px_40px_rgba(74,45,110,0.1)] hover:-translate-y-0.5"
            >
              <div className="px-6 pt-6 pb-4 flex items-start justify-between">
                <span className={`text-3xl font-heading font-bold tabular-nums leading-none ${isGold ? "text-brand-gold" : "text-brand-purple/25 dark:text-brand-gold/30"}`}>
                  {world.index}
                </span>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${isGold ? "bg-brand-gold/10 border-brand-gold/25 text-brand-gold" : "bg-brand-purple/8 border-brand-purple/15 text-brand-purple dark:bg-brand-gold/10 dark:border-brand-gold/20 dark:text-brand-gold"}`}>
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
              </div>

              <div className="px-6 pb-6 flex flex-col flex-grow">
                <h3 className="font-heading font-bold text-lg text-brand-purple dark:text-brand-cream leading-snug mb-2 group-hover:text-brand-gold transition-colors duration-200">
                  {world.title}
                </h3>
                <p className="text-sm text-brand-purple/55 dark:text-brand-cream/55 leading-relaxed mb-6 flex-grow">
                  {world.subtitle}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-brand-purple/8 dark:border-brand-gold/10">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-semibold text-brand-purple dark:text-brand-cream">{world.lessons}</span>
                    <span className="text-xs text-brand-purple/45 dark:text-brand-cream/45">{world.duration}</span>
                  </div>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:translate-x-0.5 ${isGold ? "bg-brand-gold text-brand-purple-dark" : "bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark"}`}>
                    <ArrowRight className="h-4 w-4" strokeWidth={2} />
                  </div>
                </div>
              </div>
            </motion.article>
          </Link>
        );
      })}
    </motion.div>
  );
}
