"use client";

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function OpenAIAssistantButton() {
  return (
    <button
      onClick={() => window.dispatchEvent(new Event('open-ai-assistant'))}
      className="text-left p-6 rounded-3xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/15 hover:bg-brand-gold/5 transition-colors group flex items-center justify-between shadow-sm"
    >
      <div>
        <div className="w-8 h-8 relative rounded-full overflow-hidden bg-brand-gold/10 mb-4 border border-brand-gold/30 group-hover:scale-110 transition-transform">
          <Image src="/assets/mascot_transparent.png" alt="Vision Vee" fill className="object-contain p-0.5" />
        </div>
        <div className="font-bold text-brand-purple dark:text-brand-cream text-lg">Ask Vision Vee</div>
        <div className="text-sm text-brand-purple/60 dark:text-brand-cream/60">Your AI Assistant</div>
      </div>
      <ArrowRight className="h-5 w-5 text-brand-gold group-hover:translate-x-0.5 transition-transform" />
    </button>
  );
}
