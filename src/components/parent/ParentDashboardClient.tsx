"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  Shield, Plus, Trash2, Sparkles, Globe, Lock, Users, Save,
  CheckCircle2, XCircle, LogOut, MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import {
  BOOK_LESSONS,
  BASE_LESSON_COUNT,
  TOPIC_COUNT_LABEL,
  EXPLORER_REGIONS,
  topicIdKey,
  type CurriculumSettings,
  type ExplorerRegionId,
} from "@/data/curriculum";
import {
  toggleTopicDisabled,
  addCustomTopic,
  removeCustomTopic,
} from "@/lib/curriculum-utils";
import { saveCurriculumSettings, applyCurriculumToChildEmail } from "@/app/dashboard/parent/actions";

interface Props {
  userEmail: string;
  userName: string;
  initialSettings: CurriculumSettings;
}

export function ParentDashboardClient({ userEmail, userName, initialSettings }: Props) {
  const [settings, setSettings] = useState(initialSettings);
  const [childEmail, setChildEmail] = useState("");
  const [customTitle, setCustomTitle] = useState("");
  const [customDesc, setCustomDesc] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const enabledCount = BOOK_LESSONS.filter((l) => !settings.disabledTopics.some((d) => topicIdKey(d) === topicIdKey(l.id))).length;
  const totalWithCustom = enabledCount + settings.customTopics.length;

  const handleSave = () => {
    startTransition(async () => {
      const result = await saveCurriculumSettings(settings);
      setMessage(result.error ? result.error : "Curriculum saved successfully.");
    });
  };

  const handleLinkChild = () => {
    if (!childEmail.trim()) return;
    startTransition(async () => {
      const result = await applyCurriculumToChildEmail(childEmail.trim());
      setMessage(result.error ?? result.message ?? "Linked.");
    });
  };

  const handleAddCustom = () => {
    if (!customTitle.trim()) return;
    setSettings(addCustomTopic(settings, {
      title: customTitle.trim(),
      description: customDesc.trim() || "A custom topic added to your child's curriculum.",
      createdBy: "parent",
    }));
    setCustomTitle("");
    setCustomDesc("");
  };

  return (
    <div className="min-h-screen bg-brand-gradient dark:bg-brand-gradient-dark text-brand-purple dark:text-brand-cream">
      <header className="border-b border-brand-purple/10 dark:border-brand-gold/10 bg-brand-surface/80 dark:bg-brand-purple-dark/60 backdrop-blur-sm">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/"><Logo showWordmark size="md" /></Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-brand-purple/60 dark:text-brand-cream/60 hidden sm:block">{userEmail}</span>
            <Link href="/login" className="text-sm font-medium text-brand-gold hover:underline">Sign Out</Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-5xl space-y-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-gold mb-2">Parent Dashboard</p>
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
            Welcome, {userName}
          </h1>
          <p className="text-brand-purple/60 dark:text-brand-cream/60 max-w-2xl">
            Control what your child studies. Enable or remove topics from their {TOPIC_COUNT_LABEL} lesson library, add custom topics, and connect with Young AI Explorers worldwide.
          </p>
        </div>

        {message && (
          <div className="p-4 rounded-xl bg-brand-gold/10 border border-brand-gold/20 text-sm font-medium">{message}</div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Base Topics", value: `${BASE_LESSON_COUNT}+` },
            { label: "Enabled for Child", value: String(enabledCount) },
            { label: "Custom Topics", value: String(settings.customTopics.length) },
            { label: "Total Curriculum", value: `${totalWithCustom}+` },
          ].map((s) => (
            <div key={s.label} className="p-5 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10">
              <div className="text-2xl font-bold text-brand-purple dark:text-brand-cream">{s.value}</div>
              <div className="text-xs text-brand-purple/50 dark:text-brand-cream/50 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Region & Privacy */}
        <section className="p-6 md:p-8 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10 space-y-6">
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-brand-gold" strokeWidth={1.5} />
            <h2 className="text-xl font-heading font-bold">Region & Secure Sharing</h2>
          </div>
          <p className="text-sm text-brand-purple/60 dark:text-brand-cream/60">
            Choose your Young AI Explorers community. Sharing is privacy-first: only aggregated topic trends are visible — never personal details.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {EXPLORER_REGIONS.map((r) => (
              <button
                key={r.id}
                onClick={() => setSettings({ ...settings, region: r.id as ExplorerRegionId })}
                className={`p-4 rounded-xl border text-left transition-all ${
                  settings.region === r.id
                    ? "border-brand-gold bg-brand-gold/10"
                    : "border-brand-purple/10 dark:border-brand-gold/10 hover:border-brand-gold/30"
                }`}
              >
                <span className="text-2xl">{r.flag}</span>
                <div className="font-semibold text-sm mt-2">{r.label}</div>
                <div className="text-xs text-brand-purple/50 dark:text-brand-cream/50">{r.explorers.toLocaleString()} explorers</div>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {(["private", "region", "global"] as const).map((level) => (
              <button
                key={level}
                onClick={() => setSettings({ ...settings, sharingLevel: level })}
                className={`px-4 py-2 rounded-full text-sm font-medium border capitalize ${
                  settings.sharingLevel === level
                    ? "bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark border-transparent"
                    : "border-brand-purple/15 dark:border-brand-gold/15"
                }`}
              >
                {level === "private" && <Lock className="inline h-3.5 w-3.5 mr-1" />}
                {level === "region" && <Users className="inline h-3.5 w-3.5 mr-1" />}
                {level === "global" && <Globe className="inline h-3.5 w-3.5 mr-1" />}
                {level}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-3 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={settings.allowMatchQuiz}
              onChange={(e) => setSettings({ ...settings, allowMatchQuiz: e.target.checked })}
              className="rounded border-brand-purple/20"
            />
            Allow Match Quiz with other explorers (parent-approved, region-scoped)
          </label>
        </section>

        {/* Topic controls */}
        <section className="p-6 md:p-8 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10 space-y-6">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-brand-gold" strokeWidth={1.5} />
            <h2 className="text-xl font-heading font-bold">Curriculum Controls</h2>
          </div>
          <p className="text-sm text-brand-purple/60 dark:text-brand-cream/60">
            Toggle any of the {BASE_LESSON_COUNT} core topics on or off. Disabled topics are hidden from your child&apos;s dashboard and learning journey.
          </p>
          <div className="max-h-80 overflow-y-auto space-y-2 pr-2">
            {BOOK_LESSONS.map((lesson) => {
              const enabled = !settings.disabledTopics.some((d) => topicIdKey(d) === topicIdKey(lesson.id));
              return (
                <div
                  key={topicIdKey(lesson.id)}
                  className="flex items-center justify-between p-3 rounded-xl border border-brand-purple/8 dark:border-brand-gold/8 hover:bg-brand-purple/[0.02] dark:hover:bg-brand-gold/[0.02]"
                >
                  <div>
                    <div className="font-medium text-sm">{lesson.title}</div>
                    <div className="text-xs text-brand-purple/45 dark:text-brand-cream/45">{lesson.category}</div>
                  </div>
                  <button
                    onClick={() => setSettings(toggleTopicDisabled(settings, lesson.id, enabled))}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                      enabled
                        ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
                        : "bg-brand-purple/5 text-brand-purple/50 dark:text-brand-cream/40 border border-brand-purple/10"
                    }`}
                  >
                    {enabled ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}
                    {enabled ? "Enabled" : "Disabled"}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Custom topics */}
        <section className="p-6 md:p-8 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10 space-y-6">
          <div className="flex items-center gap-3">
            <Plus className="h-5 w-5 text-brand-gold" strokeWidth={1.5} />
            <h2 className="text-xl font-heading font-bold">Custom Topics</h2>
          </div>
          <p className="text-sm text-brand-purple/60 dark:text-brand-cream/60">
            Add topics to your child&apos;s curriculum — or ask Vision Vee to suggest one via the AI Assistant. Custom topics grow beyond the core {BASE_LESSON_COUNT}+ library.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="Topic title, e.g. AI in Renewable Energy"
              className="flex-1 px-4 py-3 rounded-xl border border-brand-purple/15 dark:border-brand-gold/15 bg-brand-warm dark:bg-brand-purple-dark/50 text-sm"
            />
            <input
              value={customDesc}
              onChange={(e) => setCustomDesc(e.target.value)}
              placeholder="Short description (optional)"
              className="flex-1 px-4 py-3 rounded-xl border border-brand-purple/15 dark:border-brand-gold/15 bg-brand-warm dark:bg-brand-purple-dark/50 text-sm"
            />
            <Button onClick={handleAddCustom} className="rounded-xl bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark shrink-0">
              Add Topic
            </Button>
          </div>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-ai-assistant"))}
            className="flex items-center gap-2 text-sm font-semibold text-brand-gold hover:underline"
          >
            <Sparkles className="h-4 w-4" /> Ask Vision Vee to create a custom topic
          </button>
          {settings.customTopics.length > 0 && (
            <div className="space-y-2">
              {settings.customTopics.map((t) => (
                <div key={t.id} className="flex items-start justify-between p-4 rounded-xl border border-brand-gold/20 bg-brand-gold/5">
                  <div>
                    <div className="font-semibold text-sm">{t.title}</div>
                    <div className="text-xs text-brand-purple/55 dark:text-brand-cream/55 mt-1">{t.description}</div>
                    <div className="text-[10px] uppercase tracking-wider text-brand-gold mt-2">
                      Added by {t.createdBy === "vision_vee" ? "Vision Vee" : "Parent"}
                    </div>
                  </div>
                  <button onClick={() => setSettings(removeCustomTopic(settings, t.id))} className="text-brand-purple/40 hover:text-red-500 p-1">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Link child */}
        <section className="p-6 md:p-8 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10 space-y-4">
          <h2 className="text-xl font-heading font-bold">Apply to Child Account</h2>
          <p className="text-sm text-brand-purple/60 dark:text-brand-cream/60">
            Enter your child&apos;s account email to apply this curriculum plan. They will see only enabled topics plus your custom additions.
          </p>
          <div className="flex gap-3">
            <input
              value={childEmail}
              onChange={(e) => setChildEmail(e.target.value)}
              placeholder="child@email.com"
              className="flex-1 px-4 py-3 rounded-xl border border-brand-purple/15 dark:border-brand-gold/15 bg-brand-warm dark:bg-brand-purple-dark/50 text-sm"
            />
            <Button onClick={handleLinkChild} disabled={pending} variant="outline" className="rounded-xl shrink-0">
              Apply Plan
            </Button>
          </div>
        </section>

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          <Button onClick={handleSave} disabled={pending} className="rounded-full px-8 bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark font-semibold">
            <Save className="h-4 w-4 mr-2" /> Save Curriculum
          </Button>
          <Link href="/community">
            <Button variant="outline" className="rounded-full px-8">
              <Globe className="h-4 w-4 mr-2" /> Explore Communities
            </Button>
          </Link>
          <Link href="/match-quiz">
            <Button variant="outline" className="rounded-full px-8">
              <MessageSquare className="h-4 w-4 mr-2" /> Match Quiz
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
