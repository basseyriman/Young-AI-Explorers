"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const worlds = [
  {
    id: "ai-foundations",
    title: "AI Foundations",
    image: "/assets/island_ai_foundations.png",
    lessons: "6 Lessons",
    duration: "~ 60 mins",
    accentColor: "bg-purple-600 hover:bg-purple-700 shadow-purple-500/20",
    hoverBorder: "hover:border-purple-500/40 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]",
    arrowBg: "bg-purple-600",
    badgeColor: "text-purple-400 bg-purple-500/10",
  },
  {
    id: "robotics-machines",
    title: "Robotics & Machines",
    image: "/assets/island_robotics.png",
    lessons: "5 Lessons",
    duration: "~ 55 mins",
    accentColor: "bg-orange-500 hover:bg-orange-600 shadow-orange-500/20",
    hoverBorder: "hover:border-orange-500/40 hover:shadow-[0_0_30px_rgba(249,115,22,0.2)]",
    arrowBg: "bg-orange-500",
    badgeColor: "text-orange-400 bg-orange-500/10",
  },
  {
    id: "space-discovery",
    title: "Space Discovery",
    image: "/assets/island_space.png",
    lessons: "6 Lessons",
    duration: "~ 65 mins",
    accentColor: "bg-blue-600 hover:bg-blue-700 shadow-blue-500/20",
    hoverBorder: "hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]",
    arrowBg: "bg-blue-600",
    badgeColor: "text-blue-400 bg-blue-500/10",
  },
  {
    id: "healthcare-ai",
    title: "Healthcare AI",
    image: "/assets/island_healthcare.png",
    lessons: "6 Lessons",
    duration: "~ 60 mins",
    accentColor: "bg-cyan-500 hover:bg-cyan-600 shadow-cyan-500/20",
    hoverBorder: "hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)]",
    arrowBg: "bg-cyan-500",
    badgeColor: "text-cyan-400 bg-cyan-500/10",
  },
  {
    id: "smart-world",
    title: "Smart World",
    image: "/assets/island_smart_world.png",
    lessons: "5 Lessons",
    duration: "~ 50 mins",
    accentColor: "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20",
    hoverBorder: "hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]",
    arrowBg: "bg-emerald-500",
    badgeColor: "text-emerald-400 bg-emerald-500/10",
  },
  {
    id: "creativity-innovation",
    title: "Creativity & Innovation",
    image: "/assets/island_creativity.png",
    lessons: "8 Lessons",
    duration: "~ 70 mins",
    accentColor: "bg-pink-500 hover:bg-pink-600 shadow-pink-500/20",
    hoverBorder: "hover:border-pink-500/40 hover:shadow-[0_0_30px_rgba(236,72,153,0.2)]",
    arrowBg: "bg-pink-500",
    badgeColor: "text-pink-400 bg-pink-500/10",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
} as const;

export function WorldSelector() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mt-12"
    >
      {worlds.map((world) => (
        <Link href={`/dashboard/student`} key={world.id} className="block group">
          <motion.div
            variants={cardVariants}
            className={`h-full flex flex-col rounded-3xl bg-white dark:bg-[#090d1f] border border-slate-200 dark:border-white/5 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-xl dark:shadow-none hover:-translate-y-2 ${world.hoverBorder}`}
          >
            {/* Image Section */}
            <div className="relative w-full aspect-square bg-slate-900/5 dark:bg-white/5 overflow-hidden">
              <Image
                src={world.image}
                alt={world.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 16vw"
                className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col flex-grow justify-between min-h-[140px]">
              <div>
                <h3 className="font-heading font-bold text-base md:text-lg text-slate-900 dark:text-white leading-tight mb-2 tracking-tight group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                  {world.title}
                </h3>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex flex-col gap-0.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <span>{world.lessons}</span>
                  <span>{world.duration}</span>
                </div>

                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 ${world.arrowBg}`}>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  );
}
