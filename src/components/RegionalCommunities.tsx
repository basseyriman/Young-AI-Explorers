"use client";

import Link from "next/link";
import { ArrowRight, Globe, MessageSquare, Shield, TrendingUp } from "lucide-react";
import {
  EXPLORER_REGIONS,
  REGIONAL_TRENDING,
  TOPIC_COUNT_LABEL,
  type ExplorerRegionId,
} from "@/data/curriculum";

export function RegionalCommunities() {
  return (
    <section id="community" className="py-28 relative z-10 border-y border-brand-purple/8 dark:border-brand-gold/8">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-purple/6 dark:bg-brand-gold/8 border border-brand-purple/10 dark:border-brand-gold/15 mb-6">
            <Globe className="h-3.5 w-3.5 text-brand-gold" strokeWidth={2} />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple/70 dark:text-brand-cream/70">Global Explorer Network</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-purple dark:text-brand-cream mb-4">
            Young AI Explorers Worldwide
          </h2>
          <p className="text-brand-purple/60 dark:text-brand-cream/60 text-lg leading-relaxed">
            Connect with explorers across the UK, Nigeria, Ghana, Uganda, Tanzania, and the global community. See what others are learning, share ideas safely, and challenge friends to a Match Quiz.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {EXPLORER_REGIONS.map((region) => (
            <Link
              key={region.id}
              href={`/community?region=${region.id}`}
              className="group p-5 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10 hover:border-brand-gold/35 transition-all text-center"
            >
              <span className="text-3xl block mb-2">{region.flag}</span>
              <div className="font-heading font-bold text-sm text-brand-purple dark:text-brand-cream group-hover:text-brand-gold transition-colors">
                {region.label}
              </div>
              <div className="text-xs text-brand-purple/45 dark:text-brand-cream/45 mt-1">
                {region.explorers.toLocaleString()} explorers
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="p-8 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="h-5 w-5 text-brand-gold" strokeWidth={1.5} />
              <h3 className="font-heading font-bold text-lg">Trending Across Regions</h3>
            </div>
            <p className="text-sm text-brand-purple/55 dark:text-brand-cream/55 mb-6">
              Privacy-safe insights — only aggregated topic trends, never personal child data.
            </p>
            <div className="space-y-4">
              {(["nigeria", "uk", "global"] as ExplorerRegionId[]).map((rid) => {
                const region = EXPLORER_REGIONS.find((r) => r.id === rid)!;
                const trend = REGIONAL_TRENDING[rid][0];
                return (
                  <div key={rid} className="flex items-start gap-4 p-4 rounded-xl bg-brand-warm/80 dark:bg-brand-purple-dark/40 border border-brand-purple/8 dark:border-brand-gold/8">
                    <span className="text-xl">{region.flag}</span>
                    <div>
                      <div className="font-semibold text-sm">{trend.topic}</div>
                      <div className="text-xs text-brand-purple/50 dark:text-brand-cream/50 mt-1">
                        {trend.explorers} explorers exploring · &ldquo;{trend.idea}&rdquo;
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-5 w-5 text-brand-gold" strokeWidth={1.5} />
              <h3 className="font-heading font-bold text-lg">Secure by Design</h3>
            </div>
            <ul className="space-y-4 text-sm text-brand-purple/65 dark:text-brand-cream/65 flex-grow">
              <li className="flex gap-2"><span className="text-brand-gold">✓</span> Parents control sharing: Private, Region-only, or Global</li>
              <li className="flex gap-2"><span className="text-brand-gold">✓</span> No real names or photos in community feeds</li>
              <li className="flex gap-2"><span className="text-brand-gold">✓</span> Match Quiz uses nicknames and {TOPIC_COUNT_LABEL} curriculum topics only</li>
              <li className="flex gap-2"><span className="text-brand-gold">✓</span> Vision Vee can add custom topics — parent-approved</li>
              <li className="flex gap-2"><span className="text-brand-gold">✓</span> Regional leaders see trends, not individual progress</li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link href="/community" className="flex-1 py-3.5 text-center rounded-full bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark font-semibold text-sm hover:opacity-90 transition-opacity">
                View All Communities
              </Link>
              <Link href="/match-quiz" className="flex-1 py-3.5 text-center rounded-full border border-brand-purple/20 dark:border-brand-gold/25 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-brand-purple/5 dark:hover:bg-brand-gold/5 transition-colors">
                <MessageSquare className="h-4 w-4" /> Match Quiz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
