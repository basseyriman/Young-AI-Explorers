"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Globe, MessageSquare, Shield, TrendingUp } from "lucide-react";
import { useTranslation } from "@/lib/i18n/LanguageContext";

interface Country {
  code: string;
  name: string;
  flag_emoji: string;
  explorer_count?: number;
  is_featured?: boolean;
}

export function RegionalCommunities() {
  const { t } = useTranslation();
  const [countries, setCountries] = useState<Country[]>([]);
  const [trending, setTrending] = useState<{ topic_title: string; explorers: number; sample_idea: string | null; country_code: string }[]>([]);

  useEffect(() => {
    fetch("/api/community/countries")
      .then((r) => r.json())
      .then((d) => setCountries(d.featured ?? d.countries ?? []))
      .catch(() => setCountries([]));

    fetch("/api/community/trending?country=GB")
      .then((r) => r.json())
      .then((d) => setTrending((d.trending ?? []).slice(0, 3)))
      .catch(() => setTrending([]));
  }, []);

  const point1 = t("community_dict.secure.point1") !== "community_dict.secure.point1" ? t("community_dict.secure.point1") : "✓ All countries supported — featured nations shown first at signup";
  const point2 = t("community_dict.secure.point2") !== "community_dict.secure.point2" ? t("community_dict.secure.point2") : "✓ Parents control sharing: Private, Region, or Global";
  const point3 = t("community_dict.secure.point3") !== "community_dict.secure.point3" ? t("community_dict.secure.point3") : "✓ Match Quiz uses nicknames and your full curriculum — core plus custom topics";
  const point4 = t("community_dict.secure.point4") !== "community_dict.secure.point4" ? t("community_dict.secure.point4") : "✓ Vision Vee creates new topics on request — unlimited custom topics";
  const point5 = t("community_dict.secure.point5") !== "community_dict.secure.point5" ? t("community_dict.secure.point5") : "✓ Supabase row-level security on all user data";

  return (
    <section id="community" className="py-28 relative z-10 border-y border-brand-purple/8 dark:border-brand-gold/8">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-purple/6 dark:bg-brand-gold/8 border border-brand-purple/10 dark:border-brand-gold/15 mb-6">
            <Globe className="h-3.5 w-3.5 text-brand-gold" strokeWidth={2} />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple/70 dark:text-brand-cream/70">{t("community_dict.tag")}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-purple dark:text-brand-cream mb-4">
            {t("community_dict.title")}
          </h2>
          <p className="text-brand-purple/60 dark:text-brand-cream/60 text-lg leading-relaxed">
            {t("community_dict.desc")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-12">
          {(countries.length ? countries : [{ code: "GB", name: "United Kingdom", flag_emoji: "🇬🇧", explorer_count: 0 }]).map((region) => (
            <Link
              key={region.code}
              href={`/community?country=${region.code}`}
              className="group p-5 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10 hover:border-brand-gold/35 transition-all text-center"
            >
              <span className="text-3xl block mb-2">{region.flag_emoji}</span>
              <div className="font-heading font-bold text-sm text-brand-purple dark:text-brand-cream group-hover:text-brand-gold transition-colors">
                {region.name}
              </div>
              <div className="text-xs text-brand-purple/45 dark:text-brand-cream/45 mt-1">
                {(region.explorer_count ?? 0).toLocaleString()} {t("community_dict.explorers")}
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="p-8 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="h-5 w-5 text-brand-gold" strokeWidth={1.5} />
              <h3 className="font-heading font-bold text-lg">{t("community_dict.live_trends")}</h3>
            </div>
            {trending.length === 0 ? (
              <p className="text-sm text-brand-purple/55 dark:text-brand-cream/55">{t("community_dict.no_trends")}</p>
            ) : (
              <div className="space-y-4">
                {trending.map((tItem) => (
                  <div key={tItem.topic_title} className="p-4 rounded-xl bg-brand-warm/80 dark:bg-brand-purple-dark/40 border border-brand-purple/8 dark:border-brand-gold/8">
                    <div className="font-semibold text-sm">{tItem.topic_title}</div>
                    <div className="text-xs text-brand-purple/50 dark:text-brand-cream/50 mt-1">
                      {tItem.explorers} {t("community_dict.explorers_plural")} · {tItem.sample_idea ? `"${tItem.sample_idea}"` : t("community_dict.active_now")}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-8 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-5 w-5 text-brand-gold" strokeWidth={1.5} />
              <h3 className="font-heading font-bold text-lg">{t("community_dict.secure_design")}</h3>
            </div>
            <ul className="space-y-4 text-sm text-brand-purple/65 dark:text-brand-cream/65 flex-grow">
              <li>{point1}</li>
              <li>{point2}</li>
              <li>{point3}</li>
              <li>{point4}</li>
              <li>{point5}</li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link href="/community" className="flex-1 py-3.5 text-center rounded-full bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark font-semibold text-sm">
                {t("community_dict.all_countries")}
              </Link>
              <Link href="/match-quiz" className="flex-1 py-3.5 text-center rounded-full border border-brand-purple/20 dark:border-brand-gold/25 font-semibold text-sm flex items-center justify-center gap-2">
                <MessageSquare className="h-4 w-4" /> {t("dashboard.match_quiz")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
