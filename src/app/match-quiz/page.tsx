"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Swords, Trophy, Clock, Shield } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ALL_QUIZZES } from "@/data/lessons";
import {
  EXPLORER_REGIONS,
  BOOK_LESSONS,
  TOPIC_COUNT_LABEL,
  type ExplorerRegionId,
} from "@/data/curriculum";

type MatchPhase = "lobby" | "matching" | "playing" | "results";

const MOCK_OPPONENTS: Record<ExplorerRegionId, string[]> = {
  uk: ["Explorer_London12", "TechKid_Manchester", "AIStar_Edinburgh"],
  nigeria: ["LagosCoder", "AbujaExplorer", "NaijaTechKid"],
  ghana: ["AccraBrain", "KumasiAI", "GhanaFuture"],
  uganda: ["KampalaBot", "PearlExplorer", "UgandaTech"],
  tanzania: ["DarCoder", "SerengetiAI", "TZExplorer"],
  global: ["GlobalMind_42", "FutureBot", "StarExplorer"],
};

function MatchQuizContent() {
  const searchParams = useSearchParams();
  const initialRegion = (searchParams.get("region") as ExplorerRegionId) || "global";

  const [region, setRegion] = useState<ExplorerRegionId>(initialRegion);
  const [phase, setPhase] = useState<MatchPhase>("lobby");
  const [opponent, setOpponent] = useState("");
  const [topicId, setTopicId] = useState<number>(1);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [myScore, setMyScore] = useState(0);
  const [theirScore, setTheirScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  const questions = ALL_QUIZZES[topicId] ?? ALL_QUIZZES[1];
  const topicTitle = BOOK_LESSONS.find((l) => l.id === topicId)?.title ?? "AI Foundations";
  const regionInfo = EXPLORER_REGIONS.find((r) => r.id === region)!;

  const startMatch = () => {
    setPhase("matching");
    const opponents = MOCK_OPPONENTS[region];
    const randomTopic = [1, 11, 13, 5, 17, 27][Math.floor(Math.random() * 6)] as number;
    setTopicId(randomTopic);

    setTimeout(() => {
      setOpponent(opponents[Math.floor(Math.random() * opponents.length)]);
      setPhase("playing");
      setQuestionIdx(0);
      setMyScore(0);
      setTheirScore(0);
    }, 2000);
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
            Head-to-head quiz with another Young AI Explorer. Parent-approved, region-scoped, and secure.
          </p>
        </div>

        {phase === "lobby" && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10">
              <label className="text-sm font-semibold mb-3 block">Select Your Region</label>
              <div className="flex flex-wrap gap-2">
                {EXPLORER_REGIONS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRegion(r.id)}
                    className={`px-3 py-2 rounded-full text-sm border ${
                      region === r.id ? "bg-brand-gold/15 border-brand-gold text-brand-purple dark:text-brand-cream" : "border-brand-purple/15"
                    }`}
                  >
                    {r.flag} {r.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-2xl bg-brand-purple/5 dark:bg-brand-gold/5 border border-brand-purple/10 dark:border-brand-gold/10 flex items-start gap-3">
              <Shield className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
              <p className="text-sm text-brand-purple/65 dark:text-brand-cream/65">
                Match Quiz pairs you with explorers in {regionInfo.label}. Only nicknames are shown. Questions drawn from {TOPIC_COUNT_LABEL} curriculum topics. Parents can disable this in the Parent Dashboard.
              </p>
            </div>
            <button
              onClick={startMatch}
              className="w-full py-4 rounded-full bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark font-bold text-lg hover:opacity-90 transition-opacity"
            >
              Find Match in {regionInfo.flag} {regionInfo.label}
            </button>
          </div>
        )}

        {phase === "matching" && (
          <div className="text-center py-16">
            <Clock className="h-12 w-12 text-brand-gold mx-auto mb-4 animate-pulse" />
            <p className="font-semibold text-lg">Finding an explorer in {regionInfo.label}…</p>
          </div>
        )}

        {phase === "playing" && questions[questionIdx] && (
          <div className="space-y-6">
            <div className="flex justify-between items-center p-4 rounded-xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10">
              <div className="text-sm font-bold">You · {myScore}</div>
              <div className="text-xs text-brand-gold uppercase tracking-wider">{topicTitle}</div>
              <div className="text-sm font-bold">{opponent} · {theirScore}</div>
            </div>
            <div className="p-8 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/10">
              <p className="text-xs text-brand-gold uppercase tracking-wider mb-3">Question {questionIdx + 1} of {questions.length}</p>
              <h2 className="text-xl font-bold mb-6">{questions[questionIdx].question}</h2>
              <div className="space-y-3">
                {questions[questionIdx].options.map((opt, i) => (
                  <button
                    key={i}
                    disabled={selected !== null}
                    onClick={() => setSelected(i)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      selected === i
                        ? "border-brand-gold bg-brand-gold/10"
                        : "border-brand-purple/15 dark:border-brand-gold/15 hover:border-brand-gold/40"
                    }`}
                  >
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
              {myScore > theirScore ? "You Win!" : myScore === theirScore ? "It's a Draw!" : "Great Effort!"}
            </h2>
            <p className="text-brand-purple/60 dark:text-brand-cream/60">
              You scored {myScore}/{questions.length} vs {opponent}&apos;s {theirScore}/{questions.length}
            </p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => { setPhase("lobby"); setSelected(null); }} className="px-8 py-3 rounded-full bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark font-semibold">
                Play Again
              </button>
              <Link href="/community" className="px-8 py-3 rounded-full border border-brand-purple/20 dark:border-brand-gold/20 font-semibold">
                Back to Community
              </Link>
            </div>
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
