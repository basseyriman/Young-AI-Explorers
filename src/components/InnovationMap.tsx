"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Bot, Rocket, HeartPulse, Waves, TestTube, Building2 } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const islands = [
  { id: "ai", name: "AI Island", icon: Brain, color: "from-purple-500 to-indigo-600", x: 20, y: 15 },
  { id: "robotics", name: "Robotics City", icon: Bot, color: "from-blue-500 to-cyan-500", x: 60, y: 30 },
  { id: "space", name: "Space Station", icon: Rocket, color: "from-orange-500 to-red-600", x: 30, y: 60 },
  { id: "health", name: "Healthcare Valley", icon: HeartPulse, color: "from-emerald-400 to-teal-500", x: 70, y: 70 },
  { id: "ocean", name: "Ocean Technology", icon: Waves, color: "from-blue-600 to-indigo-800", x: 10, y: 80 },
  { id: "science", name: "Science Lab", icon: TestTube, color: "from-pink-500 to-rose-600", x: 80, y: 15 },
  { id: "smart", name: "Smart Cities", icon: Building2, color: "from-amber-400 to-orange-500", x: 50, y: 50 },
];

export function InnovationMap() {
  const [hoveredIsland, setHoveredIsland] = useState<string | null>(null);

  return (
    <div className="relative w-full min-h-[80vh] rounded-3xl overflow-hidden bg-glass border border-white/10 mt-12 p-8 perspective-1000 shadow-[0_0_100px_rgba(0,100,255,0.1)]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0d1b2a]/40 to-[#000000]/80"></div>
      
      {/* 2.5D Isometric Container */}
      <motion.div 
        className="relative w-full h-full preserve-3d"
        initial={{ rotateX: 60, rotateZ: -20, scale: 0.8 }}
        animate={{ rotateX: 60, rotateZ: -10, scale: 0.9 }}
        transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
      >
        {/* Animated Connecting Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full opacity-30" style={{ transform: "translateZ(-1px)" }}>
           {islands.map((island, i) => {
             if (i === islands.length - 1) return null;
             const next = islands[i+1];
             return (
               <motion.line 
                 key={`line-${i}`}
                 x1={`${island.x}%`} y1={`${island.y}%`} 
                 x2={`${next.x}%`} y2={`${next.y}%`} 
                 stroke="url(#lineGradient)" 
                 strokeWidth="3"
                 strokeDasharray="15 15"
                 animate={{ strokeDashoffset: [0, -100] }}
                 transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
               />
             )
           })}
           <defs>
             <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" stopColor="#00f2fe" />
               <stop offset="100%" stopColor="#4facfe" />
             </linearGradient>
           </defs>
        </svg>

        {islands.map((island, index) => {
          const Icon = island.icon;
          const isHovered = hoveredIsland === island.id;
          return (
            <motion.div
              key={island.id}
              className="absolute group cursor-pointer"
              style={{ left: `${island.x}%`, top: `${island.y}%` }}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
              onHoverStart={() => setHoveredIsland(island.id)}
              onHoverEnd={() => setHoveredIsland(null)}
            >
              <div className="relative -ml-8 -mt-8 w-16 h-16 flex flex-col items-center justify-center">
                {/* Glow behind island */}
                <div className={`absolute inset-0 bg-gradient-to-br ${island.color} blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500 rounded-full animate-pulse`} />
                
                {/* The Island Base */}
                <motion.div 
                  className={`relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br ${island.color} flex items-center justify-center shadow-[0_20px_30px_rgba(0,0,0,0.6)] border-t border-white/40 transform-style-3d ${isHovered ? 'ring-4 ring-white/30' : ''} transition-all`}
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4 + (index % 3), repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                >
                  <Icon className="text-white h-8 w-8 drop-shadow-lg" style={{ transform: "translateZ(20px) rotateX(-60deg) rotateZ(10deg)" }} />
                </motion.div>

                {/* Island Label & Mascot Popup */}
                <AnimatePresence>
                  {isHovered ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute bottom-24 whitespace-nowrap bg-slate-900/90 backdrop-blur-xl px-4 py-3 rounded-2xl border border-cyan-500/30 text-sm font-bold text-white shadow-[0_0_30px_rgba(0,200,255,0.3)] z-50 flex items-center gap-3"
                      style={{ transform: "rotateX(-60deg) rotateZ(10deg)" }}
                    >
                      <div className="w-8 h-8 relative rounded-full overflow-hidden bg-black flex-shrink-0">
                        <Image src="/assets/mascot_transparent.png" alt="Mascot" fill className="object-cover scale-150" />
                      </div>
                      <span>Let's explore {island.name}!</span>
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="absolute top-20 whitespace-nowrap bg-slate-900/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-sm font-medium text-slate-300 opacity-90 transition-all shadow-lg"
                      style={{ transform: "rotateX(-60deg) rotateZ(10deg)" }}
                    >
                      {island.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
