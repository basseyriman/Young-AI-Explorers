"use client";

import { Shield, Award, Lock, Globe, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/LanguageContext";

export function TrustAndStandards() {
  const { t } = useTranslation();

  const STANDARDS = [
    { 
      icon: Shield, 
      title: t("trust.standards.ico_title") !== "trust.standards.ico_title" ? t("trust.standards.ico_title") : "UK Age Appropriate Design Code", 
      desc: t("trust.standards.ico_desc") !== "trust.standards.ico_desc" ? t("trust.standards.ico_desc") : "Built to meet ICO children's privacy standards" 
    },
    { 
      icon: Lock, 
      title: t("trust.standards.gdpr_title") !== "trust.standards.gdpr_title" ? t("trust.standards.gdpr_title") : "GDPR & Data Protection", 
      desc: t("trust.standards.gdpr_desc") !== "trust.standards.gdpr_desc" ? t("trust.standards.gdpr_desc") : "EU/UK compliant data handling via Supabase infrastructure" 
    },
    { 
      icon: Award, 
      title: t("trust.standards.unesco_title") !== "trust.standards.unesco_title" ? t("trust.standards.unesco_title") : "UNESCO AI Competency Framework", 
      desc: t("trust.standards.unesco_desc") !== "trust.standards.unesco_desc" ? t("trust.standards.unesco_desc") : "Aligned with global AI literacy standards for education" 
    },
    { 
      icon: Globe, 
      title: t("trust.standards.curriculum_title") !== "trust.standards.curriculum_title" ? t("trust.standards.curriculum_title") : "National Curriculum Ready", 
      desc: t("trust.standards.curriculum_desc") !== "trust.standards.curriculum_desc" ? t("trust.standards.curriculum_desc") : "Supports UK, Commonwealth, and international STEM frameworks" 
    },
  ];

  const ASSURANCES = [
    t("trust.assurances.item1") !== "trust.assurances.item1" ? t("trust.assurances.item1") : "Parent-controlled curriculum with topic enable/disable",
    t("trust.assurances.item2") !== "trust.assurances.item2" ? t("trust.assurances.item2") : "No personal data in community feeds — aggregated trends only",
    t("trust.assurances.item3") !== "trust.assurances.item3" ? t("trust.assurances.item3") : "Vision Vee AI assistant with child-safe guardrails",
    t("trust.assurances.item4") !== "trust.assurances.item4" ? t("trust.assurances.item4") : "Secure authentication and row-level database security",
    t("trust.assurances.item5") !== "trust.assurances.item5" ? t("trust.assurances.item5") : "Match Quiz with nickname-only identity protection",
    t("trust.assurances.item6") !== "trust.assurances.item6" ? t("trust.assurances.item6") : "Custom topics require parent approval pathway",
  ];

  return (
    <section id="trust" className="py-28 relative z-10 bg-brand-purple dark:bg-brand-purple-dark text-brand-cream">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold mb-4">{t("trust.tag")}</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 leading-tight">
            {t("trust.title")}
          </h2>
          <p className="text-brand-cream/70 text-lg leading-relaxed">
            {t("trust.desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {STANDARDS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-6 rounded-2xl bg-brand-cream/5 border border-brand-gold/15">
              <Icon className="h-7 w-7 text-brand-gold mb-4" strokeWidth={1.5} />
              <h3 className="font-heading font-bold text-sm mb-2">{title}</h3>
              <p className="text-xs text-brand-cream/60 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-xl font-heading font-bold mb-6 text-brand-gold">{t("trust.assurances_title")}</h3>
            <ul className="space-y-3">
              {ASSURANCES.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-brand-cream/80">
                  <CheckCircle2 className="h-4 w-4 text-brand-gold shrink-0 mt-0.5" strokeWidth={2} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-8 md:p-10 rounded-2xl bg-brand-cream/5 border border-brand-gold/20">
            <h3 className="text-xl font-heading font-bold mb-4">{t("trust.leaders_title")}</h3>
            <p className="text-sm text-brand-cream/70 leading-relaxed mb-6">
              {t("trust.leaders_desc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/school/pilot" className="px-6 py-3 rounded-full bg-brand-gold text-brand-purple-dark font-semibold text-sm text-center hover:opacity-90 transition-opacity">
                {t("trust.pilot_cta")}
              </Link>
              <Link href="/signup?role=parent" className="px-6 py-3 rounded-full border border-brand-gold/30 font-semibold text-sm text-center hover:bg-brand-gold/10 transition-colors">
                {t("trust.parent_cta")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
