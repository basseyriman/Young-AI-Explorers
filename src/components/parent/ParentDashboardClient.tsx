"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  Shield, Plus, Trash2, Sparkles, Globe, Lock, Users, Save,
  CheckCircle2, XCircle, Eye, ChevronUp, Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/components/SignOutButton";
import { Logo } from "@/components/Logo";
import { CountrySelect } from "@/components/CountrySelect";
import {
  BOOK_LESSONS,
  TOPIC_COUNT_LABEL,
  TOPIC_MARKETING,
  topicIdKey,
  type CurriculumSettings,
} from "@/data/curriculum";
import type { CountryRow, LinkedChildRow, PendingCustomTopicRow } from "@/lib/db/platform";
import {
  toggleTopicDisabled,
} from "@/lib/curriculum-utils";
import {
  saveCurriculumSettings,
  applyCurriculumToChildEmail,
  removeCustomTopicAction,
  addCustomTopicAction,
  approveCustomTopicAction,
  rejectCustomTopicAction,
  regenerateCustomTopicAction,
} from "@/app/dashboard/parent/actions";

function PendingTopicReviewPanel({
  topic,
  onRegenerate,
  regenerating,
}: {
  topic: PendingCustomTopicRow
  onRegenerate: () => void
  regenerating: boolean
}) {
  const lesson = topic.lesson_content;
  const quiz = topic.quiz_content ?? [];

  if (topic.content_status === 'generating') {
    return (
      <div className="rounded-xl border border-brand-gold/20 bg-brand-surface dark:bg-brand-purple-dark/60 p-5 flex items-center gap-3 text-sm text-brand-purple/70 dark:text-brand-cream/75">
        <Loader2 className="h-4 w-4 animate-spin text-brand-gold shrink-0" />
        Vision Vee is still writing the lesson and quiz. Check back in a moment, then approve when ready.
      </div>
    );
  }

  if (topic.content_status === 'failed') {
    return (
      <div className="rounded-xl border border-red-300/30 bg-red-50 dark:bg-red-950/20 p-5 space-y-3 text-sm text-red-700 dark:text-red-300">
        <p>Vision Vee could not save the full lesson for this topic. Regenerate it, review the summary, or decline and ask your child to try again.</p>
        <Button type="button" size="sm" variant="outline" disabled={regenerating} onClick={onRegenerate} className="rounded-full border-red-300/40 text-red-700 dark:text-red-200">
          {regenerating ? <><Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" /> Regenerating…</> : 'Regenerate lesson'}
        </Button>
        {topic.description && (
          <p className="text-brand-purple/75 dark:text-brand-cream/80 leading-relaxed pt-1 border-t border-red-300/20">{topic.description}</p>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-brand-purple/10 dark:border-brand-gold/20 bg-brand-surface dark:bg-brand-purple-dark/60 p-5 space-y-5 text-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold">Full topic preview</p>

      {topic.description && (
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-purple/50 dark:text-brand-cream/50 mb-1">Summary</p>
          <p className="text-brand-purple/80 dark:text-brand-cream/85 leading-relaxed">{topic.description}</p>
        </div>
      )}

      {lesson?.introduction && (
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-purple/50 dark:text-brand-cream/50 mb-1">Introduction</p>
          <p className="text-brand-purple/80 dark:text-brand-cream/85 leading-relaxed">{lesson.introduction}</p>
        </div>
      )}

      {lesson?.main_lesson && (
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-purple/50 dark:text-brand-cream/50 mb-1">Main lesson</p>
          <p className="text-brand-purple/80 dark:text-brand-cream/85 leading-relaxed whitespace-pre-wrap">{lesson.main_lesson}</p>
        </div>
      )}

      {lesson?.fun_facts && lesson.fun_facts.length > 0 && (
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-purple/50 dark:text-brand-cream/50 mb-2">Fun facts</p>
          <ul className="space-y-2">
            {lesson.fun_facts.map((fact, i) => (
              <li key={i} className="text-brand-purple/75 dark:text-brand-cream/80 flex gap-2 leading-relaxed">
                <span className="text-brand-gold shrink-0">✦</span>
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {quiz.length > 0 && (
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-purple/50 dark:text-brand-cream/50 mb-2">Quiz questions</p>
          <ol className="space-y-3 list-decimal list-inside">
            {quiz.map((q, i) => (
              <li key={i} className="text-brand-purple/75 dark:text-brand-cream/80 leading-relaxed">
                <span className="font-medium">{q.question}</span>
                <ul className="mt-1.5 ml-4 space-y-0.5 list-disc list-inside text-xs text-brand-purple/60 dark:text-brand-cream/65">
                  {q.options.map((opt) => (
                    <li key={opt} className={opt === q.answer ? 'text-emerald-600 dark:text-emerald-400 font-medium' : undefined}>
                      {opt}{opt === q.answer ? ' (correct)' : ''}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      )}

      {topic.badge_name && (
        <p className="text-xs font-medium text-brand-gold pt-1 border-t border-brand-purple/10 dark:border-brand-gold/15">
          Badge your child can earn: {topic.badge_name}
        </p>
      )}

      {!lesson?.introduction && !lesson?.main_lesson && quiz.length === 0 && (
        <p className="text-brand-purple/60 dark:text-brand-cream/60 italic">
          Full lesson content is not available yet. You can still approve based on the summary above, or wait for Vision Vee to finish generating.
        </p>
      )}
    </div>
  );
}

interface Props {
  userEmail: string;
  userName: string;
  initialSettings: CurriculumSettings;
  countries: CountryRow[];
  linkedChildren: LinkedChildRow[];
  pendingTopics: PendingCustomTopicRow[];
  childProgress?: Record<string, { topic_id: string; status: string }[]>;
}

export function ParentDashboardClient({
  userEmail,
  userName,
  initialSettings,
  countries,
  linkedChildren,
  pendingTopics: initialPending,
  childProgress = {},
}: Props) {
  const [settings, setSettings] = useState(initialSettings);
  const [childEmail, setChildEmail] = useState("");
  const [customTitle, setCustomTitle] = useState("");
  const [customDesc, setCustomDesc] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [pendingTopics, setPendingTopics] = useState(initialPending);
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);
  const [regeneratingTopicId, setRegeneratingTopicId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const getTopicTitle = (topicId: string) => {
    const staticLesson = BOOK_LESSONS.find((l) => String(l.id) === String(topicId));
    if (staticLesson) return staticLesson.title;
    const customTopic = settings.customTopics.find((t) => String(t.id) === String(topicId));
    if (customTopic) return customTopic.title;
    return topicId;
  };

  const enabledCount = BOOK_LESSONS.filter((l) => !settings.disabledTopics.some((d) => topicIdKey(d) === topicIdKey(l.id))).length;
  const totalWithCustom = enabledCount + settings.customTopics.length;
  const currentCountry = countries.find((c) => c.code === settings.countryCode);

  const handleSave = () => {
    startTransition(async () => {
      const result = await saveCurriculumSettings(settings);
      setMessage('error' in result ? (result.error ?? 'Something went wrong.') : "Curriculum saved to your Supabase account.");
    });
  };

  const handleLinkChild = () => {
    if (!childEmail.trim()) return;
    startTransition(async () => {
      const result = await applyCurriculumToChildEmail(childEmail.trim(), settings);
      setMessage('error' in result ? (result.error ?? 'Something went wrong.') : ('message' in result ? result.message : "Linked."));
    });
  };

  const handleAddCustom = () => {
    if (!customTitle.trim()) return;
    startTransition(async () => {
      const result = await addCustomTopicAction(customTitle.trim(), customDesc.trim() || "A custom topic added to your child's curriculum.");
      if ('error' in result && result.error) {
        setMessage(result.error);
        return;
      }
      const topic = 'topic' in result ? result.topic : null;
      if (topic) {
        setSettings({
          ...settings,
          customTopics: [
            ...settings.customTopics,
            {
              id: topic.id,
              title: topic.title,
              description: topic.description ?? '',
              createdBy: 'parent',
              createdAt: topic.created_at,
            },
          ],
        });
      }
      setCustomTitle("");
      setCustomDesc("");
      setMessage("Custom topic added and approved.");
    });
  };

  const handleApproveTopic = (topicId: string) => {
    startTransition(async () => {
      const result = await approveCustomTopicAction(topicId);
      if ('error' in result && result.error) {
        setMessage(result.error);
        return;
      }
      setPendingTopics((prev) => prev.filter((t) => t.id !== topicId));
      const approved = initialPending.find((t) => t.id === topicId) ?? pendingTopics.find((t) => t.id === topicId);
      if (approved) {
        setSettings({
          ...settings,
          customTopics: [
            ...settings.customTopics,
            {
              id: approved.id,
              title: approved.title,
              description: approved.description ?? '',
              createdBy: approved.created_by === 'student' ? 'student' : 'vision_vee',
              createdAt: approved.created_at,
              contentStatus: (approved.content_status as 'ready') ?? 'ready',
              badgeName: approved.badge_name ?? undefined,
            },
          ],
        });
      }
      setMessage("Topic approved — it now appears in your child's curriculum.");
    });
  };

  const handleRejectTopic = (topicId: string) => {
    startTransition(async () => {
      const result = await rejectCustomTopicAction(topicId);
      if ('error' in result && result.error) {
        setMessage(result.error);
        return;
      }
      setPendingTopics((prev) => prev.filter((t) => t.id !== topicId));
      if (expandedTopicId === topicId) setExpandedTopicId(null);
      setMessage("Topic request declined.");
    });
  };

  const handleRegenerateTopic = (topicId: string) => {
    setRegeneratingTopicId(topicId);
    startTransition(async () => {
      const result = await regenerateCustomTopicAction(topicId);
      setRegeneratingTopicId(null);
      if ('error' in result && result.error) {
        setMessage(result.error);
        return;
      }
      setMessage('Lesson regenerated — open View full topic to review, then approve.');
      window.location.reload();
    });
  };

  const handleRemoveCustom = (topicId: string) => {
    startTransition(async () => {
      await removeCustomTopicAction(topicId);
      setSettings({ ...settings, customTopics: settings.customTopics.filter((t) => t.id !== topicId) });
    });
  };

  return (
    <div className="min-h-screen bg-brand-gradient dark:bg-brand-gradient-dark text-brand-purple dark:text-brand-cream">
      <header className="border-b border-brand-purple/10 dark:border-brand-gold/10 bg-brand-surface/80 dark:bg-brand-purple-dark/60">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between gap-4">
          <Link href="/"><Logo showWordmark size="md" /></Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-brand-purple/60 dark:text-brand-cream/60 hidden sm:block truncate max-w-[200px] md:max-w-none">
              {userEmail}
            </span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-5xl space-y-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-gold mb-2">Parent Dashboard</p>
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">Welcome, {userName}</h1>
          <p className="text-brand-purple/60 dark:text-brand-cream/60 max-w-2xl">
            Manage your child&apos;s ever-growing curriculum — {TOPIC_MARKETING.platformLine} All settings stored securely in Supabase.
          </p>
        </div>

        {message && (
          <div className="p-4 rounded-xl bg-brand-gold/10 border border-brand-gold/20 text-sm font-medium">{message}</div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Topics to Explore", value: TOPIC_COUNT_LABEL },
            { label: "Enabled", value: String(enabledCount) },
            { label: "Custom Added", value: String(settings.customTopics.length) },
            { label: "Can Grow To", value: "∞" },
          ].map((s) => (
            <div key={s.label} className="p-5 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10">
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs text-brand-purple/50 dark:text-brand-cream/50 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <section className="p-6 md:p-8 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10 space-y-6">
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-brand-gold" strokeWidth={1.5} />
            <h2 className="text-xl font-heading font-bold">Country & Secure Sharing</h2>
          </div>
          <CountrySelect
            countries={countries}
            defaultValue={settings.countryCode}
            onChange={(code) => setSettings({ ...settings, countryCode: code, region: code })}
          />
          {currentCountry && (
            <p className="text-sm text-brand-purple/60 dark:text-brand-cream/60">
              {currentCountry.flag_emoji} {currentCountry.name} · {currentCountry.explorer_count ?? 0} explorers registered
            </p>
          )}
          <div className="flex flex-wrap gap-3">
            {(["private", "region", "global"] as const).map((level) => (
              <button
                key={level}
                type="button"
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
            <input type="checkbox" checked={settings.allowMatchQuiz} onChange={(e) => setSettings({ ...settings, allowMatchQuiz: e.target.checked })} className="rounded" />
            Allow Match Quiz with other explorers (region-scoped, nickname only)
          </label>
        </section>

        <section className="p-6 md:p-8 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10 space-y-6">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-brand-gold" strokeWidth={1.5} />
            <h2 className="text-xl font-heading font-bold">Curriculum Controls</h2>
          </div>
          <div className="max-h-80 overflow-y-auto space-y-2 pr-2">
            {BOOK_LESSONS.map((lesson) => {
              const enabled = !settings.disabledTopics.some((d) => topicIdKey(d) === topicIdKey(lesson.id));
              return (
                <div key={topicIdKey(lesson.id)} className="flex items-center justify-between p-3 rounded-xl border border-brand-purple/8 dark:border-brand-gold/8">
                  <div>
                    <div className="font-medium text-sm">{lesson.title}</div>
                    <div className="text-xs text-brand-purple/45 dark:text-brand-cream/45">{lesson.category}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSettings(toggleTopicDisabled(settings, lesson.id, enabled))}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                      enabled ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20" : "bg-brand-purple/5 text-brand-purple/50 border border-brand-purple/10"
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

        <section className="p-6 md:p-8 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-gold/25 space-y-6">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-brand-gold" strokeWidth={1.5} />
            <h2 className="text-xl font-heading font-bold">Pending Vision Vee Topics</h2>
          </div>
          <p className="text-sm text-brand-purple/60 dark:text-brand-cream/60">
            Topics suggested by Vision Vee or your child require your approval before they appear in their learning path.
            Review the full lesson and quiz first, then approve or decline.
          </p>
          {pendingTopics.length === 0 ? (
            <p className="text-sm text-brand-purple/45 dark:text-brand-cream/45 italic">No topics awaiting approval.</p>
          ) : (
            pendingTopics.map((t) => {
              const isExpanded = expandedTopicId === t.id;
              return (
              <div key={t.id} className="flex flex-col gap-4 p-4 rounded-xl border border-brand-gold/20 bg-brand-gold/5">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-brand-purple dark:text-brand-cream">{t.title}</div>
                    <div className="text-xs text-brand-purple/70 dark:text-brand-cream/80 mt-1 leading-relaxed line-clamp-2">{t.description}</div>
                    <div className="text-[10px] uppercase tracking-wider text-brand-purple/55 dark:text-brand-cream/65 mt-2">
                      For {t.child_name} · via {t.created_by === 'vision_vee' ? 'Vision Vee' : t.created_by}
                      {t.content_status === 'generating' && ' · Generating lesson…'}
                      {t.content_status === 'failed' && ' · Lesson needs regenerate'}
                      {t.content_status === 'ready' && t.badge_name && ` · Badge: ${t.badge_name}`}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 shrink-0">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setExpandedTopicId(isExpanded ? null : t.id)}
                      className="rounded-full border-brand-gold/30 text-brand-purple dark:text-brand-cream"
                    >
                      {isExpanded ? (
                        <><ChevronUp className="h-3.5 w-3.5 mr-1.5" /> Close preview</>
                      ) : (
                        <><Eye className="h-3.5 w-3.5 mr-1.5" /> View full topic</>
                      )}
                    </Button>
                    <Button size="sm" onClick={() => handleApproveTopic(t.id)} disabled={pending || t.content_status === 'generating' || t.content_status === 'failed'} className="rounded-full bg-emerald-600 text-white hover:bg-emerald-700">
                      Approve
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleRejectTopic(t.id)} disabled={pending} className="rounded-full">
                      Decline
                    </Button>
                  </div>
                </div>
                {isExpanded && (
                  <PendingTopicReviewPanel
                    topic={t}
                    regenerating={regeneratingTopicId === t.id}
                    onRegenerate={() => handleRegenerateTopic(t.id)}
                  />
                )}
              </div>
            );
            })
          )}
        </section>

        <section className="p-6 md:p-8 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10 space-y-6">
          <div className="flex items-center gap-3">
            <Plus className="h-5 w-5 text-brand-gold" strokeWidth={1.5} />
            <h2 className="text-xl font-heading font-bold">Custom Topics — Unlimited</h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input value={customTitle} onChange={(e) => setCustomTitle(e.target.value)} placeholder="Topic title" className="flex-1 px-4 py-3 rounded-xl border border-brand-purple/15 bg-brand-warm dark:bg-brand-purple-dark/50 text-sm" />
            <input value={customDesc} onChange={(e) => setCustomDesc(e.target.value)} placeholder="Description" className="flex-1 px-4 py-3 rounded-xl border border-brand-purple/15 bg-brand-warm dark:bg-brand-purple-dark/50 text-sm" />
            <Button onClick={handleAddCustom} disabled={pending} className="rounded-xl bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark shrink-0">Add</Button>
          </div>
          <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("open-ai-assistant"))} className="flex items-center gap-2 text-sm font-semibold text-brand-gold hover:underline">
            <Sparkles className="h-4 w-4" /> Ask Vision Vee to create a custom topic
          </button>
          {settings.customTopics.map((t) => (
            <div key={t.id} className="flex items-start justify-between p-4 rounded-xl border border-brand-gold/20 bg-brand-gold/5">
              <div>
                <div className="font-semibold text-sm text-brand-purple dark:text-brand-cream">{t.title}</div>
                <div className="text-xs text-brand-purple/70 dark:text-brand-cream/85 mt-1 leading-relaxed">{t.description}</div>
                {t.badgeName && (
                  <div className="text-[10px] uppercase tracking-wider text-brand-gold mt-2">Badge: {t.badgeName}</div>
                )}
                {t.contentStatus === 'ready' && (
                  <Link href={`/lesson/${t.id}`} className="text-xs font-semibold text-brand-gold hover:underline mt-2 inline-block">
                    Preview lesson →
                  </Link>
                )}
              </div>
              <button type="button" onClick={() => handleRemoveCustom(t.id)} className="text-brand-purple/40 dark:text-brand-cream/50 hover:text-red-500 dark:hover:text-red-400 p-1">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </section>

        <section className="p-6 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 space-y-4">
          <h2 className="text-xl font-heading font-bold">Link Child Account</h2>
          <p className="text-sm text-brand-purple/55 dark:text-brand-cream/55">
            Children who entered your email at signup are linked automatically. You can also enter your child&apos;s registered email below to link manually and sync curriculum settings.
          </p>
          {linkedChildren.length > 0 && (
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-gold">Linked explorers</p>
              <div className="grid grid-cols-1 gap-4">
                {linkedChildren.map((c) => {
                  const progressList = childProgress[c.child_id] || [];
                  const completed = progressList.filter((p) => p.status === 'completed');
                  const inProgress = progressList.filter((p) => p.status === 'in_progress');

                  return (
                    <div key={c.child_id} className="p-5 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10 space-y-4 shadow-sm">
                      <div className="flex flex-wrap justify-between items-center gap-2 border-b border-brand-purple/10 dark:border-brand-gold/10 pb-3">
                        <div className="font-heading font-bold text-sm text-brand-purple dark:text-brand-cream">
                          👤 {c.nickname ?? c.full_name ?? 'Explorer'}
                        </div>
                        <div className="text-xs text-brand-purple/60 dark:text-brand-cream/60">
                          {c.email}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                        {/* Completed Section */}
                        <div className="space-y-2">
                          <div className="font-bold text-[10px] uppercase text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Completed ({completed.length})
                          </div>
                          {completed.length === 0 ? (
                            <div className="text-brand-purple/45 dark:text-brand-cream/45 italic pl-3">No completed lessons yet.</div>
                          ) : (
                            <ul className="space-y-1.5 pl-3">
                              {completed.map((p) => (
                                <li key={p.topic_id} className="flex items-center gap-2 text-brand-purple/85 dark:text-brand-cream/80">
                                  <span className="text-emerald-500 font-bold text-sm">✓</span>
                                  <span className="truncate max-w-xs">{getTopicTitle(p.topic_id)}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        {/* In Progress Section */}
                        <div className="space-y-2">
                          <div className="font-bold text-[10px] uppercase text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                            In Progress ({inProgress.length})
                          </div>
                          {inProgress.length === 0 ? (
                            <div className="text-brand-purple/45 dark:text-brand-cream/45 italic pl-3">No lessons in progress.</div>
                          ) : (
                            <ul className="space-y-1.5 pl-3">
                              {inProgress.map((p) => (
                                <li key={p.topic_id} className="flex items-center gap-2 text-brand-purple/85 dark:text-brand-cream/80">
                                  <span className="text-amber-500 font-bold text-[10px]">●</span>
                                  <span className="truncate max-w-xs">{getTopicTitle(p.topic_id)}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          <div className="flex gap-3">
            <input value={childEmail} onChange={(e) => setChildEmail(e.target.value)} placeholder="child@email.com" className="flex-1 px-4 py-3 rounded-xl border border-brand-purple/15 bg-brand-warm dark:bg-brand-purple-dark/50 text-sm" />
            <Button onClick={handleLinkChild} disabled={pending} variant="outline" className="rounded-xl shrink-0">Link & Sync</Button>
          </div>
        </section>

        <div className="flex flex-wrap gap-4">
          <Button onClick={handleSave} disabled={pending} className="rounded-full px-8 bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark font-semibold">
            <Save className="h-4 w-4 mr-2" /> Save to Supabase
          </Button>
          <Link href="/community"><Button variant="outline" className="rounded-full px-8"><Globe className="h-4 w-4 mr-2" /> Communities</Button></Link>
          <Link href="/match-quiz"><Button variant="outline" className="rounded-full px-8">Match Quiz</Button></Link>
        </div>
      </main>
    </div>
  );
}
