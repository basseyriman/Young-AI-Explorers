"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  LogOut, Users, Globe, BookOpen, Shield, TrendingUp, Settings,
  Mail, Building2, Calendar, Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { signOut } from "@/app/dashboard/actions";
import { TOPIC_MARKETING } from "@/data/curriculum";
import type { CountryRow, SchoolInquiryRow } from "@/lib/db/platform";

interface PlatformStats {
  totalUsers: number;
  students: number;
  parents: number;
  teachers: number;
  admins: number;
}

interface Props {
  userEmail: string;
  userName: string;
  stats: PlatformStats;
  countries: CountryRow[];
  inquiries: SchoolInquiryRow[];
}

const TYPE_LABELS: Record<SchoolInquiryRow["inquiry_type"], string> = {
  demo: "Demo",
  workshop: "Workshop",
  pilot: "Pilot",
};

const TYPE_COLORS: Record<SchoolInquiryRow["inquiry_type"], string> = {
  demo: "bg-brand-purple/10 text-brand-purple dark:text-brand-cream border-brand-purple/20",
  workshop: "bg-brand-gold/10 text-brand-gold border-brand-gold/20",
  pilot: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function AdminDashboardClient({ userEmail, userName, stats, countries, inquiries }: Props) {
  const [filter, setFilter] = useState<"all" | SchoolInquiryRow["inquiry_type"]>("all");
  const topCountries = countries.filter((c) => c.code !== "GLOBAL").slice(0, 8);

  const filtered = useMemo(
    () => (filter === "all" ? inquiries : inquiries.filter((i) => i.inquiry_type === filter)),
    [inquiries, filter],
  );

  const counts = useMemo(() => ({
    all: inquiries.length,
    demo: inquiries.filter((i) => i.inquiry_type === "demo").length,
    workshop: inquiries.filter((i) => i.inquiry_type === "workshop").length,
    pilot: inquiries.filter((i) => i.inquiry_type === "pilot").length,
  }), [inquiries]);

  return (
    <div className="min-h-screen bg-brand-gradient dark:bg-brand-gradient-dark text-brand-purple dark:text-brand-cream">
      <header className="border-b border-brand-purple/10 dark:border-brand-gold/10 bg-brand-surface/80 dark:bg-brand-purple-dark/60">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/"><Logo showWordmark size="md" /></Link>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-600 dark:text-red-400">
              <Shield className="h-3.5 w-3.5" /> Admin
            </span>
            <span className="text-sm text-brand-purple/60 dark:text-brand-cream/60 hidden sm:block">{userEmail}</span>
            <form action={signOut}>
              <Button type="submit" variant="ghost" className="rounded-full text-sm font-semibold">
                <LogOut className="h-4 w-4 mr-2" /> Sign Out
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-6xl space-y-10">
        <div>
          <h1 className="text-4xl font-heading font-bold mb-2">
            Admin Console — <span className="text-gradient">{userName}</span>
          </h1>
          <p className="text-brand-purple/60 dark:text-brand-cream/60">
            Platform overview · Supabase live data
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {[
            { label: "Total Users", value: stats.totalUsers, icon: Users },
            { label: "Students", value: stats.students, icon: BookOpen },
            { label: "Parents", value: stats.parents, icon: Users },
            { label: "Teachers", value: stats.teachers, icon: Settings },
            { label: "Admins", value: stats.admins, icon: Shield },
            { label: "School Inquiries", value: inquiries.length, icon: Building2 },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="p-5 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 text-center">
              <Icon className="h-5 w-5 text-brand-gold mx-auto mb-2" strokeWidth={1.5} />
              <div className="text-2xl font-bold">{value}</div>
              <div className="text-xs text-brand-purple/50 mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* School Inquiries */}
        <section className="rounded-2xl border border-brand-purple/10 dark:border-brand-gold/10 bg-brand-surface dark:bg-brand-purple-dark p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-heading font-bold flex items-center gap-2">
              <Building2 className="h-5 w-5 text-brand-gold" /> School Inquiries
            </h2>
            <div className="flex flex-wrap gap-2">
              {(["all", "demo", "workshop", "pilot"] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setFilter(key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                    filter === key
                      ? "bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark border-transparent"
                      : "border-brand-purple/15 dark:border-brand-gold/15 hover:border-brand-gold/30"
                  }`}
                >
                  {key === "all" ? "All" : TYPE_LABELS[key]} ({counts[key]})
                </button>
              ))}
            </div>
          </div>

          {inquiries.length === 0 ? (
            <div className="text-center py-12 text-brand-purple/50 dark:text-brand-cream/50">
              <Filter className="h-10 w-10 mx-auto mb-3 opacity-40" />
              <p className="font-medium">No inquiries yet</p>
              <p className="text-sm mt-1">Submissions from /school/demo, /workshop, and /pilot appear here.</p>
              <p className="text-xs mt-4 text-brand-purple/40 dark:text-brand-cream/40">
                If forms work but this list is empty, run migration 005_admin_read_school_inquiries.sql in Supabase.
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center py-8 text-brand-purple/50">No {TYPE_LABELS[filter as SchoolInquiryRow["inquiry_type"]]} requests yet.</p>
          ) : (
            <div className="space-y-3">
              {filtered.map((inquiry) => (
                <article
                  key={inquiry.id}
                  className="p-4 rounded-xl border border-brand-purple/10 dark:border-brand-gold/10 bg-brand-warm/50 dark:bg-brand-purple-dark/50"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${TYPE_COLORS[inquiry.inquiry_type]}`}>
                          {TYPE_LABELS[inquiry.inquiry_type]}
                        </span>
                        <span className="text-xs text-brand-purple/45 dark:text-brand-cream/45 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(inquiry.created_at)}
                        </span>
                      </div>
                      <h3 className="font-bold text-base truncate">{inquiry.school_name}</h3>
                      <p className="text-sm text-brand-purple/60 dark:text-brand-cream/60 mt-0.5">
                        {inquiry.contact_name} · {inquiry.country_code ?? "—"}
                        {inquiry.student_count != null && ` · ${inquiry.student_count} students`}
                        {inquiry.preferred_date && ` · ${inquiry.preferred_date}`}
                      </p>
                      {inquiry.message && (
                        <p className="text-sm text-brand-purple/70 dark:text-brand-cream/70 mt-2 line-clamp-3">
                          {inquiry.message}
                        </p>
                      )}
                    </div>
                    <a
                      href={`mailto:${inquiry.contact_email}?subject=Young AI Explorers — ${TYPE_LABELS[inquiry.inquiry_type]} request`}
                      className="inline-flex items-center gap-2 shrink-0 px-4 py-2 rounded-full bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark text-sm font-semibold hover:opacity-90 transition-opacity"
                    >
                      <Mail className="h-4 w-4" />
                      Reply
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-brand-purple/10 dark:border-brand-gold/10 bg-brand-surface dark:bg-brand-purple-dark p-6">
            <h2 className="text-xl font-heading font-bold mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-brand-gold" /> Explorer Countries
            </h2>
            <ul className="space-y-2">
              {topCountries.map((c) => (
                <li key={c.code} className="flex items-center justify-between text-sm py-2 border-b border-brand-purple/5 last:border-0">
                  <span>{c.flag_emoji} {c.name}</span>
                  <span className="text-brand-purple/50">{c.explorer_count ?? 0} explorers</span>
                </li>
              ))}
            </ul>
            <Link href="/community" className="inline-block mt-4 text-sm text-brand-gold hover:underline">View all communities →</Link>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-brand-purple/10 dark:border-brand-gold/10 bg-brand-surface dark:bg-brand-purple-dark p-6">
              <h2 className="text-xl font-heading font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-brand-gold" /> Platform
              </h2>
              <ul className="space-y-3 text-sm text-brand-purple/70 dark:text-brand-cream/70">
                <li>{TOPIC_MARKETING.platformLine}</li>
                <li>{countries.length} countries configured</li>
                <li>Vision Vee AI assistant</li>
                <li>Match Quiz matchmaking via Supabase</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-6">
              <h3 className="font-heading font-bold mb-3">Quick Links</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "School Demos", href: "/school/demo" },
                  { label: "Workshops", href: "/school/workshop" },
                  { label: "Pilot", href: "/school/pilot" },
                  { label: "Curriculum", href: "/school/curriculum" },
                  { label: "Privacy", href: "/privacy" },
                ].map((link) => (
                  <Link key={link.href} href={link.href} className="px-3 py-1.5 rounded-full text-xs font-medium bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 hover:border-brand-gold/30 transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
