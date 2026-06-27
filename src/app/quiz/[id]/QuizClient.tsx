'use client'

import { useState } from 'react'
import { CheckCircle2, XCircle, ArrowRight, Trophy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { saveBadge } from './actions'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import type { QuizQuestion } from '@/data/lessons'

const bookOrder: (number | string)[] = [
  "intro", 11, 34, 9, 4, 27,
  1, 15, 2, 3, 12, 35, 16,
  13, 7, 28, 23, 14,
  5, 22, 19, 20, 21, 36,
  10, 29, 24, 25, 26,
  17, 18, 30, 32, 33, 6, 31, 8, 37
];

export default function QuizClient({ 
  questions, 
  lessonTitle, 
  topicNumber,
  badgeName,
}: { 
  questions: QuizQuestion[], 
  lessonTitle: string, 
  topicNumber: number | string
  badgeName?: string
}) {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const currentQ = questions[currentIdx]

  const handleSelect = (option: string) => {
    if (isAnswered) return
    setSelectedAnswer(option)
  }

  const handleSubmit = () => {
    if (!selectedAnswer) return
    
    setIsAnswered(true)
    if (selectedAnswer === currentQ.answer) {
      setScore(s => s + 1)
    }
  }

  const handleNext = async () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(i => i + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
    } else {
      setIsFinished(true)
      if (score + (selectedAnswer === currentQ.answer ? 1 : 0) > 0) {
        setIsSaving(true)
        try {
          const supabase = createClient()
          const { data: { user } } = await supabase.auth.getUser()
          
          if (user) {
            const existingBadges = user.user_metadata?.earned_badges || []
            if (!existingBadges.includes(topicNumber)) {
              await supabase.auth.updateUser({
                data: { earned_badges: [...existingBadges, topicNumber] }
              })
            }
          }
          
          await saveBadge(topicNumber)
        } catch (e) {
          console.error("Failed to save badge", e)
        }
        setIsSaving(false)
      }
    }
  }

  if (isFinished) {
    const finalScore = score
    const passed = finalScore > 0

    return (
      <div className="flex flex-col items-center justify-center py-10 text-center animate-in zoom-in duration-700">
        <div className="relative mb-10 group">
          <div className="absolute inset-0 bg-brand-gold/30 blur-[80px] rounded-full group-hover:bg-brand-gold/40 transition-colors duration-700" />
          <div className="relative flex h-40 w-40 items-center justify-center rounded-[40px] bg-brand-gold shadow-2xl shadow-brand-gold/20 transform transition-transform duration-500 hover:scale-105 hover:rotate-3 border-4 border-brand-surface">
            <Trophy className="h-20 w-20 text-brand-purple-dark drop-shadow-md" />
          </div>
        </div>
        
        <h2 className="font-heading text-5xl font-black text-brand-purple dark:text-brand-cream mb-6 drop-shadow-sm tracking-tight">
          {passed ? (badgeName ? `${badgeName} Badge!` : 'Badge Earned!') : 'Good Try!'}
        </h2>
        <p className="text-xl text-brand-purple/60 dark:text-brand-cream/60 mb-10 max-w-md font-medium leading-relaxed">
          You scored <span className="font-bold text-brand-purple dark:text-brand-cream">{finalScore}</span> out of {questions.length} on the {lessonTitle} quiz.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link href="/dashboard/student" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full px-8 rounded-full border-2 border-brand-purple/15 bg-brand-surface text-brand-purple hover:bg-brand-warm font-bold h-14 transition-all duration-300 hover:-translate-y-1">
              Back to Dashboard
            </Button>
          </Link>
          {(() => {
            const currentIndex = bookOrder.indexOf(topicNumber);
            const nextChapterId = currentIndex !== -1 && currentIndex < bookOrder.length - 1 ? bookOrder[currentIndex + 1] : null;
            if (!nextChapterId) return null;
            return (
              <Link href={`/lesson/${nextChapterId}`} className="w-full sm:w-auto">
                <Button size="lg" className="w-full px-8 rounded-full bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark hover:opacity-90 font-bold h-14 shadow-lg shadow-brand-purple/20 dark:shadow-brand-gold/20 transition-all duration-300 hover:-translate-y-1">
                  Next Chapter <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            );
          })()}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 duration-700">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-sm font-bold tracking-widest uppercase text-brand-gold">Question {currentIdx + 1} of {questions.length}</h2>
        <div className="flex gap-2">
          {questions.map((_, i) => (
            <div 
              key={i} 
              className={`h-2.5 w-10 rounded-full transition-all duration-500 ${
                i === currentIdx ? 'bg-brand-purple dark:bg-brand-gold shadow-md shadow-brand-purple/20 w-16' 
                : i < currentIdx ? 'bg-emerald-500 w-10' 
                : 'bg-brand-purple/15 dark:bg-brand-gold/15 w-10'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative rounded-[32px] border-2 border-brand-purple/10 dark:border-brand-gold/15 bg-brand-surface dark:bg-brand-purple-dark p-8 md:p-12 shadow-xl">
        <div className="relative z-10">
          <h3 className="font-heading text-3xl font-black text-brand-purple dark:text-brand-cream mb-10 leading-tight">
            {currentQ.question}
          </h3>

          <div className="space-y-4">
            {currentQ.options.map((option: string, i: number) => {
              const isSelected = selectedAnswer === option
              const isCorrect = option === currentQ.answer
              
              let buttonStateClasses = "bg-brand-warm dark:bg-brand-purple-dark/50 hover:bg-brand-purple/5 border-2 border-brand-purple/10 text-brand-purple/80 dark:text-brand-cream/80 hover:border-brand-purple/20"
              
              if (isAnswered) {
                if (isCorrect) {
                  buttonStateClasses = "bg-emerald-50 border-2 border-emerald-500 text-emerald-700 shadow-md shadow-emerald-500/10"
                } else if (isSelected) {
                  buttonStateClasses = "bg-rose-50 border-2 border-rose-500 text-rose-700"
                }
              } else if (isSelected) {
                buttonStateClasses = "bg-brand-gold/10 border-2 border-brand-gold text-brand-purple dark:text-brand-cream shadow-md shadow-brand-gold/10 scale-[1.02]"
              }

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(option)}
                  disabled={isAnswered}
                  className={`w-full text-left p-6 rounded-[24px] transition-all duration-300 flex items-center justify-between group ${buttonStateClasses}`}
                >
                  <span className="text-lg font-bold">{option}</span>
                  {isAnswered && isCorrect && <CheckCircle2 className="h-8 w-8 text-emerald-500 animate-in zoom-in duration-300" />}
                  {isAnswered && isSelected && !isCorrect && <XCircle className="h-8 w-8 text-rose-500 animate-in zoom-in duration-300" />}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        {!isAnswered ? (
          <Button 
            onClick={handleSubmit} 
            disabled={!selectedAnswer}
            size="lg"
            className="rounded-full px-12 h-14 bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark hover:opacity-90 font-bold text-lg disabled:opacity-50 shadow-lg shadow-brand-purple/20 dark:shadow-brand-gold/20 transition-all duration-300 hover:-translate-y-1"
          >
            Check Answer
          </Button>
        ) : (
          <Button 
            onClick={handleNext} 
            size="lg"
            disabled={isSaving}
            className="rounded-full px-12 h-14 bg-emerald-500 text-white hover:bg-emerald-600 font-bold text-lg shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-1"
          >
            {isSaving ? "Saving..." : currentIdx === questions.length - 1 ? "Finish Quiz" : "Next Question"}
            {!isSaving && <ArrowRight className="ml-2 h-5 w-5" />}
          </Button>
        )}
      </div>
    </div>
  )
}
