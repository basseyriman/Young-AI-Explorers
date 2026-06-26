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
        <div className="absolute inset-0 backface-hidden transform-style-3d shadow-2xl rounded-r-lg overflow-hidden border-l-4 border-brand-purple-dark/40 bg-brand-purple-dark flex flex-col justify-end items-center pb-6 pt-4">
          <div className="absolute top-4 w-full text-center text-[7px] sm:text-[9px] text-brand-cream/80 italic tracking-widest uppercase z-30 px-2">
            <span className="text-brand-gold">★★★★★</span> &ldquo;A must-read for the next generation of innovators.&rdquo;
          </div>

          <div className="absolute inset-0 z-0 overflow-hidden bg-brand-purple-dark">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-purple rounded-full blur-[60px] opacity-40" />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-brand-gold rounded-full blur-[60px] opacity-30" />
          </div>

          <div className="absolute inset-0 z-10">
            <Image src="/assets/cover_illustration.png" alt="Young AI Explorers book cover" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-purple-dark/10 to-brand-purple-dark/95" />
          </div>

          <div className="relative z-20 flex flex-col items-center w-full px-6 text-center">
            <div className="flex gap-2 mb-4">
              <span className="bg-black/40 backdrop-blur-md border border-brand-gold/20 text-brand-cream px-2 py-1 rounded-full text-[6px] sm:text-[7px] font-bold tracking-widest uppercase">Ages 9–12</span>
              <span className="bg-brand-gold/90 text-brand-purple-dark px-2 py-1 rounded-full text-[6px] sm:text-[7px] font-bold tracking-widest uppercase">Future-Ready Edition</span>
            </div>

            <h1 className="flex flex-col mb-3">
              <span className="font-heading text-lg sm:text-xl font-extrabold text-brand-cream tracking-[0.25em] leading-[1.2]">YOUNG</span>
              <span className="font-heading text-5xl sm:text-6xl font-black leading-none text-gradient">AI</span>
              <span className="font-heading text-lg sm:text-xl font-extrabold text-brand-cream tracking-[0.25em] leading-[1.2]">EXPLORERS</span>
            </h1>

            <h2 className="text-[10px] sm:text-xs text-brand-cream/60 font-medium tracking-widest mb-5">A Kid&apos;s Guide to the Future</h2>

            <div className="bg-brand-purple-dark/60 backdrop-blur-xl border border-brand-gold/15 px-4 py-3 rounded-2xl w-full max-w-[90%]">
              <p className="text-[6px] text-brand-cream/50 uppercase tracking-wider mb-1">Written & Designed by</p>
              <h3 className="font-heading text-xs sm:text-sm text-brand-cream font-bold tracking-wide">Bassey Riman</h3>
              <span className="text-[5px] sm:text-[6px] text-brand-cream/40 mt-1 block">AI Engineer · Medical AI · AI in Education</span>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-50 pointer-events-none" />
        </div>

        <div
          className="absolute left-0 top-0 w-12 h-full bg-brand-purple-dark origin-left backface-hidden flex items-center justify-center overflow-hidden"
          style={{ transform: "rotateY(-90deg)" }}
        >
          <div className="w-full h-full bg-gradient-to-r from-brand-purple-dark via-brand-purple to-brand-purple-dark" />
          <span className="absolute text-brand-gold/80 font-heading text-xs tracking-[0.2em] whitespace-nowrap transform -rotate-90">
            YOUNG AI EXPLORERS
          </span>
        </div>

        <div
          className="absolute right-0 top-1 bottom-1 w-8 bg-brand-warm origin-right backface-hidden rounded-r-sm"
          style={{
            transform: "rotateY(90deg)",
            background: "repeating-linear-gradient(to bottom, #FAF8F5, #FAF8F5 2px, #F5F0EB 2px, #F5F0EB 4px)"
          }}
        />

        <div
          className="absolute -bottom-6 left-4 right-4 h-8 bg-brand-purple-dark/30 blur-xl rounded-[100%]"
          style={{ transform: "translateZ(-20px)" }}
        />
      </motion.div>
    </div>
  );
}
