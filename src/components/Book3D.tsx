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
        <div className="absolute inset-0 backface-hidden transform-style-3d shadow-2xl rounded-r-lg overflow-hidden border-l-4 border-slate-900/40 bg-[#020617] flex flex-col justify-end items-center pb-6 pt-4">
          
          {/* Quote */}
          <div className="absolute top-4 w-full text-center text-[7px] sm:text-[9px] text-slate-100 italic tracking-widest uppercase z-30 opacity-80 px-2">
            <span className="text-amber-300">★★★★★</span> "A must-read for the next generation of innovators."
          </div>

          {/* Tech grid & Orbs */}
          <div className="absolute inset-0 z-0 overflow-hidden" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#0EA5E9] rounded-full blur-[60px] opacity-60"></div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#8B5CF6] rounded-full blur-[60px] opacity-60"></div>
          </div>

          {/* Cover Image */}
          <div className="absolute inset-0 z-10">
            <Image src="/assets/cover_illustration.png" alt="Illustration" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/10 to-[#020617]/95"></div>
          </div>

          {/* Content */}
          <div className="relative z-20 flex flex-col items-center w-full px-6 text-center">
            <div className="flex gap-2 mb-4">
              <span className="bg-black/50 backdrop-blur-md border border-white/20 text-white px-2 py-1 rounded-full text-[6px] sm:text-[7px] font-bold tracking-widest uppercase">Ages 9-12</span>
              <span className="bg-gradient-to-br from-[#0EA5E9] to-[#8B5CF6] shadow-[0_4px_15px_rgba(14,165,233,0.4)] text-white px-2 py-1 rounded-full text-[6px] sm:text-[7px] font-bold tracking-widest uppercase">Future-Ready Edition</span>
            </div>
            
            <h1 className="flex flex-col mb-3">
              <span className="font-heading text-lg sm:text-xl font-extrabold text-white tracking-[0.25em] leading-[1.2] drop-shadow-xl">YOUNG</span>
              <span className="font-heading text-5xl sm:text-6xl font-black leading-none text-transparent bg-clip-text bg-gradient-to-br from-[#38BDF8] to-[#8B5CF6]">AI</span>
              <span className="font-heading text-lg sm:text-xl font-extrabold text-white tracking-[0.25em] leading-[1.2] drop-shadow-xl">EXPLORERS</span>
            </h1>
            
            <h2 className="text-[10px] sm:text-xs text-[#94A3B8] font-medium tracking-widest mb-5">A Kid's Guide to the Future</h2>
            
            <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 px-4 py-3 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] w-full max-w-[90%]">
              <p className="text-[6px] text-[#94A3B8] uppercase tracking-wider mb-1">Written & Designed by</p>
              <h3 className="font-heading text-xs sm:text-sm text-white font-bold tracking-wide">Bassey Riman</h3>
              <span className="text-[5px] sm:text-[6px] text-slate-500 mt-1 block">AI Engineer | Medical AI | AI in Education</span>
            </div>
          </div>

          {/* Glossy overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-50 pointer-events-none" />
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
