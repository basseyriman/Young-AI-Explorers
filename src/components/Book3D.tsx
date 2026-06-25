"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export function Book3D() {
  return (
    <div className="relative w-full max-w-sm mx-auto aspect-[3/4] perspective-1000 group">
      <motion.div
        className="w-full h-full relative preserve-3d cursor-pointer"
        initial={{ rotateY: -20, rotateX: 10 }}
        whileHover={{ rotateY: -30, rotateX: 5, scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Book Cover (Front) */}
        <div className="absolute inset-0 backface-hidden transform-style-3d shadow-2xl rounded-r-lg overflow-hidden border-l-4 border-slate-900/40">
          <Image
            src="/assets/young-ai-explorers-book-cutout.png"
            alt="Young AI Explorers Book"
            fill
            sizes="(max-width: 768px) 100vw, 384px"
            className="object-cover"
            priority
          />
          {/* Glossy overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </div>

        {/* Book Spine */}
        <div 
          className="absolute left-0 top-0 w-12 h-full bg-slate-900 origin-left backface-hidden flex items-center justify-center overflow-hidden"
          style={{ transform: "rotateY(-90deg)" }}
        >
          <div className="w-full h-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900" />
          <span className="absolute text-white/80 font-heading text-xs tracking-[0.2em] whitespace-nowrap transform -rotate-90">
            YOUNG AI EXPLORERS
          </span>
        </div>

        {/* Book Pages (Right Side) */}
        <div 
          className="absolute right-0 top-1 bottom-1 w-8 bg-slate-100 origin-right backface-hidden rounded-r-sm"
          style={{ 
            transform: "rotateY(90deg)",
            background: "repeating-linear-gradient(to bottom, #f1f5f9, #f1f5f9 2px, #e2e8f0 2px, #e2e8f0 4px)"
          }}
        />

        {/* Book Shadow */}
        <div 
          className="absolute -bottom-6 left-4 right-4 h-8 bg-black/40 blur-xl rounded-[100%]"
          style={{ transform: "translateZ(-20px)" }}
        />
      </motion.div>
    </div>
  );
}
