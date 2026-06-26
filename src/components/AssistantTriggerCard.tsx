"use client";
import { Compass, ArrowRight } from 'lucide-react';

export function AssistantTriggerCard() {
  return (
    <div 
      onClick={() => window.dispatchEvent(new CustomEvent('open-ai-assistant'))}
      className="group relative overflow-hidden rounded-[32px] border-2 border-slate-100 dark:border-white/5 bg-white dark:bg-[#020617]/50 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-900/10 dark:hover:shadow-purple-500/10 cursor-pointer flex flex-col justify-between"
    >
      <div className="relative z-10">
        <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/30 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-500 group-hover:bg-purple-500 group-hover:text-white group-hover:shadow-lg group-hover:shadow-purple-500/30">
          <Compass className="h-7 w-7" />
        </div>
        <h3 className="font-heading text-xl font-bold text-slate-900 dark:text-white mb-3">AI Explorer Assistant</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed mb-8">
          Need help with a tricky concept? The AI Assistant is online and ready to guide you.
        </p>
      </div>
      <div className="relative z-10 inline-flex items-center text-sm font-bold text-purple-600 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
        Ask a question <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );
}
