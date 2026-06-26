"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Globe, MessageSquare, Users, Zap } from "lucide-react";
import { Logo } from "@/components/Logo";
import {
  EXPLORER_REGIONS,
  REGIONAL_TRENDING,
  TOPIC_COUNT_LABEL,
  type ExplorerRegionId,
} from "@/data/curriculum";

export default function CommunityPage() {
  const [activeRegion, setActiveRegion] = useState<ExplorerRegionId>("global");
  const region = EXPLORER_REGIONS.find((r) => r.id === activeRegion)!;
  const trends = REGIONAL_TRENDING[activeRegion];

  return (
    <div className="min-h-screen bg-brand-gradient dark:bg-brand-gradient-dark text-brand-purple dark:text-brand-cream">
      <header className="border-b border-brand-purple/10 dark:border-brand-gold/10 bg-brand-surface/80 dark:bg-brand-purple-dark/60">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/"><Logo showWordmark size="md" /></Link>
          <Link href="/" className="text-sm font-medium text-brand-gold flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3">Explorer Communities</h1>
          <p className="text-brand-purple/60 dark:text-brand-cream/60 max-w-2xl">
            See what Young AI Explorers are learning in your region. All data is aggregated and privacy-safe — explore {TOPIC_COUNT_LABEL} topics together.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {EXPLORER_REGIONS.map((r) => (
            <button
              key={r.id}
              onClick={() => setActiveRegion(r.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                activeRegion === r.id
                  ? "bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark border-transparent"
                  : "border-brand-purple/15 dark:border-brand-gold/15 hover:border-brand-gold/30"
              }`}
            >
              {r.flag} {r.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="p-6 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10">
            <Users className="h-5 w-5 text-brand-gold mb-3" />
            <div className="text-2xl font-bold">{region.explorers.toLocaleString()}</div>
            <div className="text-xs text-brand-purple/50 dark:text-brand-cream/50">Active Explorers</div>
          </div>
          <div className="p-6 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10">
            <Globe className="h-5 w-5 text-brand-gold mb-3" />
            <div className="text-2xl font-bold">{TOPIC_COUNT_LABEL}</div>
            <div className="text-xs text-brand-purple/50 dark:text-brand-cream/50">Topics Available</div>
          </div>
          <div className="p-6 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10">
            <Zap className="h-5 w-5 text-brand-gold mb-3" />
            <div className="text-2xl font-bold">{trends.length * 47}</div>
            <div className="text-xs text-brand-purple/50 dark:text-brand-cream/50">Ideas Shared This Week</div>
          </div>
        </div>

        <h2 className="text-xl font-heading font-bold mb-6">What {region.label} Explorers Are Learning</h2>
        <div className="space-y-4 mb-12">
          {trends.map((t, i) => (
            <div key={i} className="p-6 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-bold text-lg text-brand-purple dark:text-brand-cream">{t.topic}</div>
                  <p className="text-sm text-brand-purple/60 dark:text-brand-cream/60 mt-2 italic">&ldquo;{t.idea}&rdquo;</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-semibold text-brand-gold">{t.explorers}</div>
                  <div className="text-[10px] uppercase tracking-wider text-brand-purple/40 dark:text-brand-cream/40">exploring</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 rounded-2xl bg-brand-purple/5 dark:bg-brand-gold/5 border border-brand-gold/20 text-center">
          <MessageSquare className="h-8 w-8 text-brand-gold mx-auto mb-4" />
          <h3 className="text-xl font-heading font-bold mb-2">Ready to connect?</h3>
          <p className="text-sm text-brand-purple/60 dark:text-brand-cream/60 mb-6 max-w-md mx-auto">
            Challenge another explorer from {region.label} to a Match Quiz on shared {TOPIC_COUNT_LABEL} topics.
          </p>
          <Link href={`/match-quiz?region=${activeRegion}`} className="inline-flex px-8 py-3.5 rounded-full bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark font-semibold hover:opacity-90 transition-opacity">
            Start Match Quiz
          </Link>
        </div>
      </main>
    </div>
  );
}
