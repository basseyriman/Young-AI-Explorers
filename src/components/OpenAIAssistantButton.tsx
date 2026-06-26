"use client";

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function OpenAIAssistantButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event('open-ai-assistant'))}
      className="text-left p-6 rounded-3xl bg-slate-50/50 dark:bg-glass border border-slate-200 dark:border-white/5 hover:bg-slate-100/50 dark:hover:bg-white/5 transition-colors group flex items-center justify-between shadow-sm"
    >
      <div>
        <div className="w-8 h-8 relative rounded-full overflow-hidden bg-slate-200 dark:bg-black mb-4 border border-cyan-500/30 group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(0,255,255,0.2)]">
          <Image src="/assets/mascot_transparent.png" alt="Vision Vee" fill className="object-contain p-0.5" />
        </div>
        <div className="font-bold text-slate-900 dark:text-white text-lg">Ask Vision Vee</div>
        <div className="text-sm text-slate-600 dark:text-slate-400">Your AI Assistant</div>
      </div>
      <ArrowRight className="h-5 w-5 text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
    </button>
  );
}
