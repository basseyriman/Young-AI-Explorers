"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Bot, Rocket, HeartPulse, Waves, Globe2, Shield, PlayCircle, Trophy, Star } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const islands = [
  { id: "ai", name: "AI Island", image: "/assets/islands/ai_island.png", x: 20, y: 15, width: 180, height: 180, lessons: 5, time: "45 mins", xp: "+500 XP", progress: 20, desc: "Explore the core of Artificial Intelligence, neural networks, and how machines learn to think.", badge: Brain },
  { id: "robotics", name: "Robotics City", image: "/assets/islands/robotics_city.png", x: 60, y: 25, width: 200, height: 200, lessons: 8, time: "1.5 hours", xp: "+800 XP", progress: 60, desc: "Build, code, and command the futuristic machines of tomorrow in this automated metropolis.", badge: Bot },
  { id: "space", name: "Space Station", image: "/assets/islands/space_station.png", x: 30, y: 55, width: 220, height: 220, lessons: 6, time: "1 hour", xp: "+600 XP", progress: 0, desc: "Launch into orbit and discover how AI helps astronauts explore deep space.", badge: Rocket },
  { id: "health", name: "Healthcare Valley", image: "/assets/islands/health_valley.png", x: 75, y: 65, width: 170, height: 170, lessons: 4, time: "30 mins", xp: "+400 XP", progress: 100, desc: "Learn how technology and AI are curing diseases and creating a healthier future.", badge: HeartPulse },
  { id: "ocean", name: "Ocean Tech", image: "/assets/islands/ocean_tech.png", x: 10, y: 75, width: 190, height: 190, lessons: 5, time: "45 mins", xp: "+500 XP", progress: 0, desc: "Dive deep into the abyss with AI submarines and aquatic energy networks.", badge: Waves },
  { id: "climate", name: "Climate Earth", image: "/assets/islands/climate_earth.png", x: 85, y: 15, width: 160, height: 160, lessons: 7, time: "1.2 hours", xp: "+700 XP", progress: 0, desc: "Use smart grids and eco-tech to protect our planet's fragile ecosystems.", badge: Globe2 },
  { id: "cyber", name: "Cyber Fortress", image: "/assets/islands/cyber_fortress.png", x: 45, y: 85, width: 180, height: 180, lessons: 6, time: "1 hour", xp: "+600 XP", progress: 0, desc: "Defend against digital threats and master the art of cybersecurity.", badge: Shield },
];

export function InnovationMap() {
  const [hoveredIsland, setHoveredIsland] = useState<string | null>(null);
  const [selectedIsland, setSelectedIsland] = useState<string | null>(null);

  const activeIslandData = islands.find(i => i.id === selectedIsland);

  return (
    <div className="relative w-full min-h-[90vh] rounded-[40px] overflow-hidden bg-black border border-white/10 mt-12 perspective-1000 shadow-[0_0_100px_rgba(0,100,255,0.15)] group">
      
      {/* Deep Space Background */}
      <div className="absolute inset-0 bg-[#020617]">
        {/* Starfield */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        {Array.from({ length: 60 }).map((_, i) => {
          const pseudoRand = (i * 137) % 100;
          const pseudoRand2 = (i * 93) % 100;
          return (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-twinkle"
              style={{
                width: (pseudoRand % 2) + 1 + "px",
                height: (pseudoRand % 2) + 1 + "px",
                top: pseudoRand + "%",
                left: pseudoRand2 + "%",
                animationDelay: (pseudoRand % 5) + "s",
                opacity: (pseudoRand2 / 100) * 0.8 + 0.2,
              }}
            />
          );
        })}
        {/* Nebulas */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/30 rounded-full blur-[150px] mix-blend-screen animate-float-slow" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-cyan-600/20 rounded-full blur-[150px] mix-blend-screen animate-float" style={{ animationDelay: "2s" }} />
      </div>
      
      {/* Map Container */}
      <motion.div 
        className="absolute inset-0 preserve-3d"
        animate={{ 
          rotateX: selectedIsland ? 0 : 55, 
          rotateZ: selectedIsland ? 0 : -10, 
          scale: selectedIsland ? 1.5 : 0.85,
          x: selectedIsland ? `-${activeIslandData?.x! - 50}%` : 0,
          y: selectedIsland ? `-${activeIslandData?.y! - 50}%` : 0
        }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} // smooth cinematic ease
      >
        {/* Energy Pathways (SVG) */}
        <AnimatePresence>
          {!selectedIsland && (
            <motion.svg 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 w-full h-full" style={{ transform: "translateZ(-1px)" }}
            >
               {islands.map((island, i) => {
                 if (i === islands.length - 1) return null;
                 const next = islands[i+1];
                 return (
                   <motion.line 
                     key={`line-${i}`}
                     x1={`${island.x}%`} y1={`${island.y}%`} 
                     x2={`${next.x}%`} y2={`${next.y}%`} 
                     stroke="url(#lineGradient)" 
                     strokeWidth="4"
                     strokeDasharray="20 20"
                     animate={{ strokeDashoffset: [0, -200] }}
                     transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                     className="drop-shadow-[0_0_10px_rgba(0,200,255,0.8)]"
                   />
                 )
               })}
               <defs>
                 <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                   <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.8"/>
                   <stop offset="100%" stopColor="#4facfe" stopOpacity="0.2"/>
                 </linearGradient>
               </defs>
            </motion.svg>
          )}
        </AnimatePresence>

        {/* The 3D Islands */}
        {islands.map((island, index) => {
          const isHovered = hoveredIsland === island.id && !selectedIsland;
          const isSelected = selectedIsland === island.id;
          const isFaded = selectedIsland && !isSelected;

          return (
            <motion.div
              key={island.id}
              className="absolute origin-center"
              style={{ left: `${island.x}%`, top: `${island.y}%`, marginLeft: -island.width/2, marginTop: -island.height/2, width: island.width, height: island.height }}
              initial={{ y: 100, opacity: 0 }}
              animate={{ 
                y: isHovered ? -20 : 0, 
                scale: isHovered ? 1.15 : isSelected ? 1 : 1,
                opacity: isFaded ? 0 : 1,
                filter: isFaded ? 'blur(10px)' : 'blur(0px)'
              }}
              transition={{ delay: index * 0.1, duration: 0.8, type: "spring", bounce: 0.4 }}
              onHoverStart={() => !selectedIsland && setHoveredIsland(island.id)}
              onHoverEnd={() => !selectedIsland && setHoveredIsland(null)}
              onClick={() => setSelectedIsland(isSelected ? null : island.id)}
            >
              {/* Island Image */}
              <div className="relative w-full h-full cursor-pointer group-island">
                <div className={`absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full transition-opacity duration-500 ${isHovered || isSelected ? 'opacity-100' : 'opacity-0'}`} />
                <Image 
                  src={island.image} 
                  alt={island.name} 
                  fill 
                  className={`object-contain transition-all duration-700 ${isHovered ? 'drop-shadow-[0_20px_50px_rgba(0,255,255,0.4)]' : 'drop-shadow-2xl'}`} 
                  style={{ transform: !selectedIsland ? "rotateX(-55deg) rotateZ(10deg)" : "rotateX(0deg) rotateZ(0deg)", transition: "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)" }}
                />
              </div>

              {/* Hover Preview Card */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20, scale: 0.9, rotateX: -55, rotateZ: 10 }}
                    animate={{ opacity: 1, y: -20, scale: 1, rotateX: -55, rotateZ: 10 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    className="absolute left-1/2 -translate-x-1/2 bottom-full mb-8 w-80 bg-[#020617]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-5 shadow-[0_30px_60px_rgba(0,0,0,0.8)] pointer-events-none z-50 origin-bottom"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-600/20 border border-cyan-400/30 flex items-center justify-center">
                        <island.badge className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg">{island.name}</h3>
                        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                          <Trophy className="w-3 h-3 text-yellow-400" /> {island.xp}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 mb-4 line-clamp-2">{island.desc}</p>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="bg-white/5 rounded-lg p-2 text-center">
                        <div className="text-xs text-slate-400 mb-1">Lessons</div>
                        <div className="font-bold text-white text-sm">{island.lessons}</div>
                      </div>
                      <div className="bg-white/5 rounded-lg p-2 text-center">
                        <div className="text-xs text-slate-400 mb-1">Time</div>
                        <div className="font-bold text-white text-sm">{island.time}</div>
                      </div>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: `${island.progress}%` }} />
                    </div>
                    <div className="mt-2 text-xs font-bold text-cyan-400 text-right">{island.progress}% Completed</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Mission Briefing Overlay (When Zoomed In) */}
      <AnimatePresence>
        {selectedIsland && activeIslandData && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute right-0 top-0 bottom-0 w-full md:w-[450px] bg-[#020617]/90 backdrop-blur-3xl border-l border-white/10 p-10 flex flex-col z-50"
          >
            <button 
              onClick={() => setSelectedIsland(null)}
              className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>

            <div className="mt-16 flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 mb-6">
                <Star className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Mission Briefing</span>
              </div>
              
              <h2 className="text-4xl font-heading font-bold text-white mb-4">{activeIslandData.name}</h2>
              <p className="text-lg text-slate-300 mb-10 leading-relaxed">{activeIslandData.desc}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <PlayCircle className="w-6 h-6 text-cyan-400 mb-2" />
                  <div className="text-2xl font-bold text-white">{activeIslandData.lessons}</div>
                  <div className="text-sm text-slate-400">Interactive Lessons</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                  <Trophy className="w-6 h-6 text-yellow-400 mb-2" />
                  <div className="text-2xl font-bold text-white">{activeIslandData.xp}</div>
                  <div className="text-sm text-slate-400">XP Reward</div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <div className="text-sm font-medium text-slate-400 mb-1">Your Progress</div>
                    <div className="text-2xl font-bold text-white">{activeIslandData.progress}%</div>
                  </div>
                  <activeIslandData.badge className="w-10 h-10 text-slate-600" />
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: `${activeIslandData.progress}%` }} />
                </div>
              </div>
            </div>

            <button className="w-full py-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold text-lg shadow-[0_0_30px_rgba(0,200,255,0.4)] hover:scale-105 transition-transform flex items-center justify-center gap-2">
              <PlayCircle className="w-6 h-6" /> Begin Journey
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
