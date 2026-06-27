"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { ArrowLeft, Globe, MessageSquare, Users, Zap, Send } from "lucide-react";
import { Logo } from "@/components/Logo";
import { TOPIC_COUNT_LABEL } from "@/data/curriculum";
import type { CountryRow, TrendingRow } from "@/lib/db/platform";
import { postIdeaAction } from "@/app/dashboard/parent/actions";

interface Props {
  countries: CountryRow[];
  initialTrending: TrendingRow[];
  initialCountryCode: string;
  userNickname?: string;
  isLoggedIn: boolean;
}

export function CommunityClient({ countries, initialTrending, initialCountryCode, userNickname, isLoggedIn }: Props) {
  const [activeCountry, setActiveCountry] = useState(initialCountryCode);
  const [trending, setTrending] = useState(initialTrending);
  const [ideaTopic, setIdeaTopic] = useState("");
  const [ideaText, setIdeaText] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const country = countries.find((c) => c.code === activeCountry) ?? countries[0];

  const loadTrending = async (code: string) => {
    const res = await fetch(`/api/community/trending?country=${code}`);
    if (res.ok) {
      const data = await res.json();
      setTrending(data.trending ?? []);
    }
  };

  const handleCountryChange = (code: string) => {
    setActiveCountry(code);
    loadTrending(code);
  };

  const handlePostIdea = () => {
    if (!ideaTopic.trim() || !ideaText.trim() || !isLoggedIn) return;
    startTransition(async () => {
      const result = await postIdeaAction(activeCountry, ideaTopic.trim(), ideaText.trim(), userNickname ?? "Explorer");
      setMessage(result.error ?? "Idea shared with your community!");
      setIdeaTopic("");
      setIdeaText("");
      loadTrending(activeCountry);
    });
  };

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
            Live data from Supabase — see what explorers in any country are learning. {TOPIC_COUNT_LABEL} topics, privacy-safe aggregated trends.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 max-h-48 overflow-y-auto">
          {countries.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => handleCountryChange(c.code)}
              className={`px-3 py-2 rounded-full text-sm border transition-all ${
                activeCountry === c.code
                  ? "bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark border-transparent"
                  : "border-brand-purple/15 dark:border-brand-gold/15 hover:border-brand-gold/30"
              }`}
            >
              {c.flag_emoji} {c.name}
              {(c.explorer_count ?? 0) > 0 && (
                <span className="ml-1 text-xs opacity-70">({c.explorer_count})</span>
              )}
            </button>
          ))}
        </div>

        {country && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <div className="p-6 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10">
              <Users className="h-5 w-5 text-brand-gold mb-3" />
              <div className="text-2xl font-bold">{country.explorer_count ?? 0}</div>
              <div className="text-xs text-brand-purple/50">Registered Explorers</div>
            </div>
            <div className="p-6 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10">
              <Globe className="h-5 w-5 text-brand-gold mb-3" />
              <div className="text-2xl font-bold">{TOPIC_COUNT_LABEL}</div>
              <div className="text-xs text-brand-purple/50">Topics Available</div>
            </div>
            <div className="p-6 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10">
              <Zap className="h-5 w-5 text-brand-gold mb-3" />
              <div className="text-2xl font-bold">{trending.length}</div>
              <div className="text-xs text-brand-purple/50">Active Topics</div>
            </div>
          </div>
        )}

        <h2 className="text-xl font-heading font-bold mb-6">
          Trending in {country?.flag_emoji} {country?.name ?? "your region"}
        </h2>

        {trending.length === 0 ? (
          <div className="p-8 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 text-center mb-10">
            <p className="text-brand-purple/60 dark:text-brand-cream/60 mb-2">No activity yet in this country.</p>
            <p className="text-sm text-brand-purple/45">Be the first — complete a lesson or share an idea below.</p>
          </div>
        ) : (
          <div className="space-y-4 mb-10">
            {trending.map((t) => (
              <div key={`${t.country_code}-${t.topic_id}`} className="p-6 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-bold text-lg">{t.topic_title}</div>
                    {t.sample_idea && (
                      <p className="text-sm text-brand-purple/60 dark:text-brand-cream/60 mt-2 italic">&ldquo;{t.sample_idea}&rdquo;</p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-semibold text-brand-gold">{t.explorers}</div>
                    <div className="text-[10px] uppercase tracking-wider text-brand-purple/40">exploring</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {isLoggedIn ? (
          <div className="p-6 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-gold/20 mb-10 space-y-4">
            <h3 className="font-heading font-bold">Share an Idea</h3>
            {message && <p className="text-sm text-brand-gold">{message}</p>}
            <input value={ideaTopic} onChange={(e) => setIdeaTopic(e.target.value)} placeholder="Topic name" className="w-full px-4 py-3 rounded-xl border border-brand-purple/15 bg-brand-warm dark:bg-brand-purple-dark/50 text-sm" />
            <textarea value={ideaText} onChange={(e) => setIdeaText(e.target.value)} placeholder="Your learning idea (nickname only, no personal info)" rows={3} className="w-full px-4 py-3 rounded-xl border border-brand-purple/15 bg-brand-warm dark:bg-brand-purple-dark/50 text-sm" />
            <button type="button" onClick={handlePostIdea} disabled={pending} className="flex items-center gap-2 px-6 py-3 rounded-full bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark font-semibold text-sm">
              <Send className="h-4 w-4" /> Share Idea
            </button>
          </div>
        ) : (
          <p className="text-sm text-brand-purple/50 mb-10">
            <Link href="/signup" className="text-brand-gold hover:underline">Sign up</Link> to share ideas with your community.
          </p>
        )}

        <div className="p-8 rounded-2xl bg-brand-purple/5 dark:bg-brand-gold/5 border border-brand-gold/20 text-center">
          <MessageSquare className="h-8 w-8 text-brand-gold mx-auto mb-4" />
          <h3 className="text-xl font-heading font-bold mb-2">Challenge an Explorer</h3>
          <p className="text-sm text-brand-purple/60 dark:text-brand-cream/60 mb-6 max-w-md mx-auto">
            Match Quiz pairs you with another explorer in {country?.name} using live Supabase matchmaking.
          </p>
          <Link href={`/match-quiz?country=${activeCountry}`} className="inline-flex px-8 py-3.5 rounded-full bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark font-semibold hover:opacity-90 transition-opacity">
            Start Match Quiz
          </Link>
        </div>
      </main>
    </div>
  );
}
