"use client";
import { Compass, ArrowRight } from 'lucide-react';

export function AssistantTriggerCard() {
  return (
    <div
      onClick={() => window.dispatchEvent(new CustomEvent('open-ai-assistant'))}
      className="group relative overflow-hidden rounded-2xl border border-brand-purple/10 dark:border-brand-gold/10 bg-brand-surface/80 dark:bg-brand-purple-dark/40 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/30 hover:shadow-[0_12px_40px_rgba(74,45,110,0.08)] cursor-pointer flex flex-col justify-between"
    >
      <div className="relative z-10">
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-purple/8 dark:bg-brand-gold/10 border border-brand-purple/10 dark:border-brand-gold/15 group-hover:border-brand-gold/30 transition-colors">
          <Compass className="h-6 w-6 text-brand-purple dark:text-brand-gold" strokeWidth={1.5} />
        </div>
        <h3 className="font-heading text-xl font-bold text-brand-purple dark:text-brand-cream mb-3">AI Explorer Assistant</h3>
        <p className="text-brand-purple/60 dark:text-brand-cream/60 text-sm leading-relaxed mb-8">
          Need help with a tricky concept? The AI Assistant is online and ready to guide you.
        </p>
      </div>
      <div className="relative z-10 inline-flex items-center text-sm font-semibold text-brand-gold group-hover:gap-2 transition-all">
        Ask a question <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );
}
