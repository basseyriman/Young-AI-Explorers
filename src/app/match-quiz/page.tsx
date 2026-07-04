"use client";

import { useState, useEffect, useTransition, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Swords, Trophy, Clock } from "lucide-react";
import { Logo } from "@/components/Logo";
import { ALL_QUIZZES } from "@/data/lessons";
import { BOOK_LESSONS, TOPIC_MARKETING } from "@/data/curriculum";
import { joinMatchQuizAction, leaveMatchQueueAction, checkActiveMatchSessionAction, updateMatchScoreAction, getMatchSessionAction } from "@/app/dashboard/parent/actions";

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
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);

  const questions = ALL_QUIZZES[topicId] ?? ALL_QUIZZES[11];
  const topicTitle = BOOK_LESSONS.find((l) => l.id === topicId)?.title ?? "Machine Learning";

  const [pollIntervalId, setPollIntervalId] = useState<any>(null);

  useEffect(() => {
    return () => {
      leaveMatchQueueAction();
      if (pollIntervalId) clearInterval(pollIntervalId);
    };
  }, [pollIntervalId]);

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

      if (result.matched && result.opponentNickname && result.session) {
        setOpponent(result.opponentNickname);
        setSessionId(result.session.id);
        setPhase("playing");
        setQuestionIdx(0);
        setMyScore(0);
        setTheirScore(0);
      } else {
        const startTime = Date.now();
        const interval = setInterval(async () => {
          if (Date.now() - startTime > 15000) {
            clearInterval(interval);
            setError("Waiting for another explorer in your country. Try again in a moment.");
            setPhase("lobby");
            await leaveMatchQueueAction();
            return;
          }

          const check = await checkActiveMatchSessionAction();
          if ('matched' in check && check.matched && check.session && check.opponentNickname) {
            clearInterval(interval);
            setOpponent(check.opponentNickname);
            setSessionId(check.session.id);
            setPhase("playing");
            setQuestionIdx(0);
            setMyScore(0);
            setTheirScore(0);
          }
        }, 1500);
        setPollIntervalId(interval);
      }
    });
  };

  useEffect(() => {
    if (phase !== "playing" || selected === null) return;
    const timer = setTimeout(() => {
      const correct = questions[questionIdx]?.answer;
      const gotIt = selected === Number(correct);
      const newScore = myScore + (gotIt ? 1 : 0);
      setMyScore(newScore);

      if (sessionId) {
        updateMatchScoreAction(sessionId, newScore);
      }

      if (questionIdx + 1 >= questions.length) {
        setPhase("results");
      } else {
        setQuestionIdx((i) => i + 1);
        setSelected(null);
      }
    }, 1200);
    return () => clearTimeout(timer);
  }, [selected, phase, questionIdx, questions, sessionId, myScore]);

  useEffect(() => {
    if (phase !== "playing" || !sessionId) return;

    const interval = setInterval(async () => {
      const res = await getMatchSessionAction(sessionId);
      if (res && res.success && res.theirScore !== undefined) {
        setTheirScore(res.theirScore);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [phase, sessionId]);

  // 1. Question timer countdown
  useEffect(() => {
    if (phase !== "playing" || selected !== null) return;
    if (timeLeft <= 0) {
      setSelected(-1); // Timed out
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, phase, selected]);

  // 2. Reset timer when question index changes
  useEffect(() => {
    setTimeLeft(15);
  }, [questionIdx]);

  return (
    <div className="min-h-screen bg-brand-gradient dark:bg-brand-gradient-dark text-brand-purple dark:bg-brand-cream">
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
            <div className="p-6 rounded-2xl bg-brand-surface dark:bg-brand-warm/5 border border-brand-purple/10 dark:border-brand-gold/15 space-y-4 shadow-sm">
              <label className="text-sm font-bold block text-brand-purple dark:text-brand-cream">Room Code or Country Code</label>
              <p className="text-xs text-brand-purple/60 dark:text-brand-cream/65 leading-relaxed">
                Enter your **Classroom Code** (e.g. `CLASS-ABCDE`) to play with a classmate, create a custom **Room Code** (e.g. `ROOM-101`), or enter a **Country Code** (e.g. `GB`, `US`, `NG`) to find global peers.
              </p>
              <input 
                value={countryCode} 
                onChange={(e) => setCountryCode(e.target.value.toUpperCase())} 
                className="w-full px-4 py-3 rounded-xl border border-brand-purple/15 dark:border-brand-gold/20 bg-brand-warm/30 dark:bg-brand-purple-dark/50 text-sm focus:outline-none focus:border-brand-gold text-brand-purple dark:text-brand-cream font-semibold uppercase tracking-wider" 
                placeholder="e.g. CLASS-R2XCV or GB" 
              />
              <label className="text-sm font-bold block text-brand-purple dark:text-brand-cream">Your Nickname</label>
              <input 
                value={nickname} 
                onChange={(e) => setNickname(e.target.value)} 
                className="w-full px-4 py-3 rounded-xl border border-brand-purple/15 dark:border-brand-gold/20 bg-brand-warm/30 dark:bg-brand-purple-dark/50 text-sm focus:outline-none focus:border-brand-gold text-brand-purple dark:text-brand-cream font-medium" 
              />
            </div>
            <button type="button" onClick={startMatch} disabled={pending} className="w-full py-4 rounded-full bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark font-bold text-lg hover:opacity-90 disabled:opacity-50 transition-opacity">
              Find Match in &quot;{countryCode}&quot;
            </button>
            <p className="text-xs text-center text-brand-purple/45 dark:text-brand-cream/45">Sign in required. Parent can disable in dashboard.</p>
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
              {/* Question Countdown Timer bar */}
              <div className="w-full bg-brand-purple/10 dark:bg-brand-gold/10 h-1.5 rounded-full overflow-hidden mb-6">
                <div 
                  className={`h-full transition-all duration-1000 ease-linear ${timeLeft <= 5 ? "bg-red-500 animate-pulse" : "bg-brand-gold"}`}
                  style={{ width: `${(timeLeft / 15) * 100}%` }}
                />
              </div>

              <div className="flex justify-between items-center mb-3">
                <p className="text-xs text-brand-gold uppercase tracking-wider font-semibold">Question {questionIdx + 1} of {questions.length}</p>
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${timeLeft <= 5 ? "text-red-500 bg-red-500/10 animate-pulse" : "text-brand-gold bg-brand-gold/10"}`}>{timeLeft}s remaining</span>
              </div>

              <h2 className="text-xl font-bold mb-6">{questions[questionIdx].question}</h2>
              <div className="space-y-3">
                {questions[questionIdx].options.map((opt, i) => {
                  const correct = Number(questions[questionIdx]?.answer);
                  const isCorrect = i === correct;
                  const isSelected = selected === i;
                  const showFeedback = selected !== null;
                  
                  let btnStyle = "border-brand-purple/15 hover:border-brand-gold/40 text-brand-purple dark:text-brand-cream";
                  if (showFeedback) {
                    if (isCorrect) {
                      btnStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold";
                    } else if (isSelected) {
                      btnStyle = "border-red-500 bg-red-500/10 text-red-600 dark:text-red-400 font-semibold";
                    } else {
                      btnStyle = "border-brand-purple/5 opacity-55";
                    }
                  }

                  return (
                    <button 
                      key={i} 
                      type="button" 
                      disabled={selected !== null} 
                      onClick={() => setSelected(i)} 
                      className={`w-full text-left p-4 rounded-xl border transition-all ${btnStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {selected === -1 && (
                <div className="mt-4 text-center text-sm font-semibold text-red-500 animate-pulse">
                  ⏰ Time's up! Moving to next question...
                </div>
              )}
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
