"use client";

import Link from "next/link";
import {
  BookOpen, Download, Globe, LogOut, Users, GraduationCap,
  ArrowRight, Swords, Compass, Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { SignOutButton } from "@/components/SignOutButton";
import {
  BOOK_LESSONS,
  TOPIC_MARKETING,
} from "@/data/curriculum";

interface Props {
  userEmail: string;
  userName: string;
  countryName?: string;
  countryFlag?: string;
}

export function TeacherDashboardClient({ userEmail, userName, countryName, countryFlag }: Props) {
  const categories = [...new Set(BOOK_LESSONS.map((l) => l.category))];

  return (
    <div className="min-h-screen bg-brand-gradient dark:bg-brand-gradient-dark text-brand-purple dark:text-brand-cream">
      <header className="border-b border-brand-purple/10 dark:border-brand-gold/10 bg-brand-surface/80 dark:bg-brand-purple-dark/60">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/"><Logo showWordmark size="md" /></Link>
          <div className="flex items-center gap-4">
            {countryName && (
              <span className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-purple/5 dark:bg-brand-gold/5 border border-brand-purple/10 text-sm">
                {countryFlag} {countryName}
              </span>
            )}
            <span className="text-sm text-brand-purple/60 dark:text-brand-cream/60 hidden sm:block">{userEmail}</span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-6xl space-y-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-4 text-xs font-semibold uppercase tracking-wider text-brand-gold">
            <GraduationCap className="h-3.5 w-3.5" /> Educator Portal
          </div>
          <h1 className="text-4xl font-heading font-bold mb-2">
            Welcome, <span className="text-gradient">{userName}</span>
          </h1>
          <p className="text-brand-purple/60 dark:text-brand-cream/60">
            {TOPIC_MARKETING.platformLine} · classroom-ready resources
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Download, label: "Curriculum Guide", href: "/school/curriculum", desc: "Printable PDF" },
            { icon: Calendar, label: "Book Workshop", href: "/school/workshop", desc: "Interactive sessions" },
            { icon: Users, label: "Request Demo", href: "/school/demo", desc: "School pilot programme" },
            { icon: Globe, label: "Community", href: "/community", desc: countryName ?? "Global explorers" },
          ].map(({ icon: Icon, label, href, desc }) => (
            <Link key={label} href={href} className="p-5 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 hover:border-brand-gold/30 transition-colors group">
              <Icon className="h-6 w-6 text-brand-gold mb-3" strokeWidth={1.5} />
              <div className="font-bold text-sm mb-1">{label}</div>
              <div className="text-xs text-brand-purple/50 dark:text-brand-cream/50">{desc}</div>
              <ArrowRight className="h-4 w-4 mt-3 opacity-40 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-heading font-bold flex items-center gap-3">
              <Compass className="h-6 w-6 text-brand-gold" /> Curriculum Overview
            </h2>
            <div className="space-y-4">
              {categories.map((cat) => (
                <div key={cat} className="rounded-2xl border border-brand-purple/10 dark:border-brand-gold/10 bg-brand-surface dark:bg-brand-purple-dark p-6">
                  <h3 className="font-heading font-bold mb-3">{cat}</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {BOOK_LESSONS.filter((l) => l.category === cat).map((lesson) => (
                      <li key={String(lesson.id)}>
                        <Link href={`/lesson/${lesson.id}`} className="text-sm text-brand-purple/70 dark:text-brand-cream/70 hover:text-brand-gold transition-colors flex items-center gap-2">
                          <BookOpen className="h-3.5 w-3.5 shrink-0" />
                          {lesson.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading font-bold text-lg">Classroom Tools</h3>
            <Link href="/match-quiz" className="block p-5 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 hover:border-brand-gold/30 transition-colors">
              <Swords className="h-6 w-6 text-brand-gold mb-2" />
              <div className="font-bold text-sm">Match Quiz</div>
              <p className="text-xs text-brand-purple/50 mt-1">Live classroom quiz battles with nicknames</p>
            </Link>
            <Link href="/dashboard/student" className="block p-5 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 hover:border-brand-gold/30 transition-colors">
              <Compass className="h-6 w-6 text-brand-gold mb-2" />
              <div className="font-bold text-sm">Student Preview</div>
              <p className="text-xs text-brand-purple/50 mt-1">See the platform as your students do</p>
            </Link>
            <div className="p-5 rounded-2xl bg-brand-gold/5 border border-brand-gold/20 text-sm">
              <p className="font-semibold mb-2">Need help?</p>
              <p className="text-brand-purple/60 dark:text-brand-cream/60 text-xs leading-relaxed">
                Contact us for curriculum mapping, DPA agreements, or bulk school licences at{" "}
                <a href="mailto:hello@youngaiexplorers.com" className="text-brand-gold hover:underline">hello@youngaiexplorers.com</a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
