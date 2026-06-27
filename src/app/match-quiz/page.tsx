"use client";

import { useState, useEffect, useTransition, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Swords, Trophy, Clock } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ALL_QUIZZES } from "@/data/lessons";
import { BOOK_LESSONS, TOPIC_MARKETING } from "@/data/curriculum";
import { joinMatchQuizAction, leaveMatchQueueAction } from "@/app/dashboard/parent/actions";

type MatchPhase = "lobby" | "matching" | "playing" | "results";

function MatchQuizContent() {
  const searchParams = useSearchParams();
  const initialCountry = searchParams.get("country") ?? "GB";

  const [countryCode, setCountryCode] = useState(initialCountry);
  const [phase, setPhase] = useState<MatchPhase>("lobby");
  const [opponent, setOpponent] = useState("");
  const [topicId, setTopicId] = useState<number>(11);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [myScore, setMyScore] = useState(0);
  const [theirScore, setTheirScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [nickname, setNickname] = useState("Explorer");

  const questions = ALL_QUIZZES[topicId] ?? ALL_QUIZZES[11];
  const topicTitle = BOOK_LESSONS.find((l) => l.id === topicId)?.title ?? "Machine Learning";

  useEffect(() => {
    return () => { leaveMatchQueueAction(); };
  }, []);

  const startMatch = () => {
    setPhase("matching");
    setError(null);
    const randomTopic = [1, 11, 13, 5, 17, 27][Math.floor(Math.random() * 6)] as number;
    setTopicId(randomTopic);

    startTransition(async () => {
      const result = await joinMatchQuizAction(countryCode, nickname, String(randomTopic));

      if (result.error) {
        setError(result.error);
        setPhase("lobby");
        return;
      }

      if (result.matched && result.opponentNickname) {
        setOpponent(result.opponentNickname);
        setPhase("playing");
        setQuestionIdx(0);
        setMyScore(0);
        setTheirScore(0);
      } else {
        setTimeout(async () => {
          const retry = await joinMatchQuizAction(countryCode, nickname, String(randomTopic));
          if (retry.matched && retry.opponentNickname) {
            setOpponent(retry.opponentNickname);
            setPhase("playing");
          } else {
            setError("Waiting for another explorer in your country. Try again in a moment.");
            setPhase("lobby");
            await leaveMatchQueueAction();
          }
        }, 3000);
      }
    });
  };

  useEffect(() => {
    if (phase !== "playing" || selected === null) return;
    const timer = setTimeout(() => {
      const correct = questions[questionIdx]?.answer;
      const gotIt = selected === Number(correct);
      setMyScore((s) => s + (gotIt ? 1 : 0));
      setTheirScore((s) => s + (Math.random() > 0.4 ? 1 : 0));
      if (questionIdx + 1 >= questions.length) {
        setPhase("results");
      } else {
        setQuestionIdx((i) => i + 1);
        setSelected(null);
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, [selected, phase, questionIdx, questions]);

  return (
    <div className="min-h-screen bg-brand-gradient dark:bg-brand-gradient-dark text-brand-purple dark:text-brand-cream">
      <header className="border-b border-brand-purple/10 dark:border-brand-gold/10 bg-brand-surface/80 dark:bg-brand-purple-dark/60">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/"><Logo showWordmark size="md" /></Link>
          <Link href="/community" className="text-sm font-medium text-brand-gold flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Communities
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-2xl">
        <div className="text-center mb-10">
          <Swords className="h-10 w-10 text-brand-gold mx-auto mb-4" />
          <h1 className="text-3xl font-heading font-bold mb-2">Match Quiz</h1>
          <p className="text-brand-purple/60 dark:text-brand-cream/60 text-sm">
            Live Supabase matchmaking · {TOPIC_MARKETING.matchQuizLine} · nickname only
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400">{error}</div>
        )}

        {phase === "lobby" && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 space-y-4">
              <label className="text-sm font-semibold">Country Code</label>
              <input value={countryCode} onChange={(e) => setCountryCode(e.target.value.toUpperCase())} className="w-full px-4 py-3 rounded-xl border border-brand-purple/15 bg-brand-warm dark:bg-brand-purple-dark/50 text-sm" placeholder="GB, NG, US…" />
              <label className="text-sm font-semibold">Your Nickname</label>
              <input value={nickname} onChange={(e) => setNickname(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-brand-purple/15 bg-brand-warm dark:bg-brand-purple-dark/50 text-sm" />
            </div>
            <button type="button" onClick={startMatch} disabled={pending} className="w-full py-4 rounded-full bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark font-bold text-lg hover:opacity-90 disabled:opacity-50">
              Find Match in {countryCode}
            </button>
            <p className="text-xs text-center text-brand-purple/45">Sign in required. Parent can disable in dashboard.</p>
          </div>
        )}

        {phase === "matching" && (
          <div className="text-center py-16">
            <Clock className="h-12 w-12 text-brand-gold mx-auto mb-4 animate-pulse" />
            <p className="font-semibold text-lg">Searching Supabase match queue…</p>
          </div>
        )}

        {phase === "playing" && questions[questionIdx] && (
          <div className="space-y-6">
            <div className="flex justify-between items-center p-4 rounded-xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10">
              <div className="text-sm font-bold">You · {myScore}</div>
              <div className="text-xs text-brand-gold uppercase tracking-wider">{topicTitle}</div>
              <div className="text-sm font-bold">{opponent} · {theirScore}</div>
            </div>
            <div className="p-8 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10">
              <p className="text-xs text-brand-gold uppercase tracking-wider mb-3">Question {questionIdx + 1} of {questions.length}</p>
              <h2 className="text-xl font-bold mb-6">{questions[questionIdx].question}</h2>
              <div className="space-y-3">
                {questions[questionIdx].options.map((opt, i) => (
                  <button key={i} type="button" disabled={selected !== null} onClick={() => setSelected(i)} className={`w-full text-left p-4 rounded-xl border transition-all ${selected === i ? "border-brand-gold bg-brand-gold/10" : "border-brand-purple/15 hover:border-brand-gold/40"}`}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {phase === "results" && (
          <div className="text-center space-y-6">
            <Trophy className="h-16 w-16 text-brand-gold mx-auto" />
            <h2 className="text-2xl font-heading font-bold">
              {myScore > theirScore ? "You Win!" : myScore === theirScore ? "Draw!" : "Great Effort!"}
            </h2>
            <p className="text-brand-purple/60">You {myScore}/{questions.length} vs {opponent} {theirScore}/{questions.length}</p>
            <button type="button" onClick={() => { setPhase("lobby"); setSelected(null); setError(null); }} className="px-8 py-3 rounded-full bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark font-semibold">
              Play Again
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default function MatchQuizPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-brand-gradient flex items-center justify-center">Loading…</div>}>
      <MatchQuizContent />
    </Suspense>
  );
}
