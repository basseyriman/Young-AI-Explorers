import { Shield, Award, Lock, Globe, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const STANDARDS = [
  { icon: Shield, title: "UK Age Appropriate Design Code", desc: "Built to meet ICO children's privacy standards" },
  { icon: Lock, title: "GDPR & Data Protection", desc: "EU/UK compliant data handling via Supabase infrastructure" },
  { icon: Award, title: "UNESCO AI Competency Framework", desc: "Aligned with global AI literacy standards for education" },
  { icon: Globe, title: "National Curriculum Ready", desc: "Supports UK, Commonwealth, and international STEM frameworks" },
];

const ASSURANCES = [
  "Parent-controlled curriculum with topic enable/disable",
  "No personal data in community feeds — aggregated trends only",
  "Vision Vee AI assistant with child-safe guardrails",
  "Secure authentication and row-level database security",
  "Match Quiz with nickname-only identity protection",
  "Custom topics require parent approval pathway",
];

export function TrustAndStandards() {
  return (
    <section id="trust" className="py-28 relative z-10 bg-brand-purple dark:bg-brand-purple-dark text-brand-cream">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brand-gold mb-4">Trust & Standards</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 leading-tight">
            Built for Governments.<br />Trusted by Families.
          </h2>
          <p className="text-brand-cream/70 text-lg leading-relaxed">
            Young AI Explorers is designed to meet the expectations of education ministries, high commissioners, and guardians worldwide — with enterprise-grade security and child-first privacy.
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
            <h3 className="text-xl font-heading font-bold mb-6 text-brand-gold">Platform Assurances</h3>
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
            <h3 className="text-xl font-heading font-bold mb-4">For Education Leaders</h3>
            <p className="text-sm text-brand-cream/70 leading-relaxed mb-6">
              We welcome partnerships with departments of education, high commissioners, and school networks. Request a pilot programme, curriculum mapping document, or data processing agreement for institutional deployment.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/signup" className="px-6 py-3 rounded-full bg-brand-gold text-brand-purple-dark font-semibold text-sm text-center hover:opacity-90 transition-opacity">
                Request School Pilot
              </Link>
              <Link href="/dashboard/parent" className="px-6 py-3 rounded-full border border-brand-gold/30 font-semibold text-sm text-center hover:bg-brand-gold/10 transition-colors">
                Parent Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
