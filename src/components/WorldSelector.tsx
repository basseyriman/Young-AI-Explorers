"use client";

import { motion } from "framer-motion";
import { ArrowRight, Brain, Eye, Bot, Home, Globe, Palette } from "lucide-react";
import Link from "next/link";
import { WORLDS, TOPIC_COUNT_LABEL } from "@/data/curriculum";

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
      {WORLDS.map((world, i) => {
        const icons = [Brain, Eye, Bot, Home, Globe, Palette];
        const Icon = icons[i] ?? Brain;
        const isGold = i % 2 === 1;

        return (
          <Link href="/dashboard/student" key={world.id} className="block group">
            <motion.article
              variants={cardVariants}
              className="h-full flex flex-col rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/12 dark:border-brand-gold/15 overflow-hidden transition-all duration-200 hover:border-brand-gold/40 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(74,45,110,0.1)]"
            >
              <div className="px-6 pt-6 pb-4 flex items-start justify-between">
                <span className={`text-3xl font-heading font-bold tabular-nums leading-none ${isGold ? "text-brand-gold" : "text-brand-purple/25 dark:text-brand-gold/30"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${isGold ? "bg-brand-gold/10 border-brand-gold/25 text-brand-gold" : "bg-brand-purple/8 border-brand-purple/15 text-brand-purple dark:text-brand-gold"}`}>
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
              </div>
              <div className="px-6 pb-6 flex flex-col flex-grow">
                <h3 className="font-heading font-bold text-lg text-brand-purple dark:text-brand-cream leading-snug mb-2 group-hover:text-brand-gold transition-colors">
                  {world.title}
                </h3>
                <p className="text-sm text-brand-purple/55 dark:text-brand-cream/55 mb-6 flex-grow">
                  {world.lessonCount} lessons · Part of {TOPIC_COUNT_LABEL} topics
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-brand-purple/8 dark:border-brand-gold/10">
                  <span className="text-xs font-semibold text-brand-purple/50 dark:text-brand-cream/50">+ custom topics available</span>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center group-hover:translate-x-0.5 transition-transform ${isGold ? "bg-brand-gold text-brand-purple-dark" : "bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark"}`}>
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
