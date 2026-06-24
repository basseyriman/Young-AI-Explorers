'use client'

import { useState } from 'react'
import { CheckCircle2, XCircle, ArrowRight, Trophy, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { saveBadge } from './actions'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'

export default function QuizClient({ 
  questions, 
  lessonTitle, 
  topicNumber 
}: { 
  questions: any[], 
  lessonTitle: string, 
  topicNumber: number 
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
      // Save the badge if they passed
      if (score + (selectedAnswer === currentQ.answer ? 1 : 0) > 0) {
        setIsSaving(true)
        try {
          const supabase = createClient()
          const { data: { user } } = await supabase.auth.getUser()
          
          if (user) {
            let existingBadges = user.user_metadata?.earned_badges || []
            if (!existingBadges.includes(topicNumber)) {
              await supabase.auth.updateUser({
                data: { earned_badges: [...existingBadges, topicNumber] }
              })
            }
          }
          
          await saveBadge(topicNumber) // Revalidates the dashboard path
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
          <div className="absolute inset-0 bg-yellow-300/40 blur-[80px] rounded-full group-hover:bg-yellow-300/60 transition-colors duration-700"></div>
          <div className="relative flex h-40 w-40 items-center justify-center rounded-[40px] bg-yellow-400 shadow-2xl shadow-yellow-500/20 transform transition-transform duration-500 hover:scale-105 hover:rotate-3 border-4 border-white">
            <Trophy className="h-20 w-20 text-white drop-shadow-md" />
          </div>
        </div>
        
        <h2 className="font-heading text-5xl font-black text-slate-900 mb-6 drop-shadow-sm tracking-tight">
          {passed ? "Badge Earned!" : "Good Try!"}
        </h2>
        <p className="text-xl text-slate-600 mb-10 max-w-md font-medium leading-relaxed">
          You scored <span className="font-bold text-slate-900">{finalScore}</span> out of {questions.length} on the {lessonTitle} quiz.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link href="/dashboard/student" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full px-8 rounded-full border-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-bold h-14 transition-all duration-300 hover:-translate-y-1">
              Back to Dashboard
            </Button>
          </Link>
          {topicNumber < 37 && (
            <Link href={`/lesson/${topicNumber + 1}`} className="w-full sm:w-auto">
              <Button size="lg" className="w-full px-8 rounded-full bg-blue-600 text-white hover:bg-blue-700 font-bold h-14 shadow-lg shadow-blue-600/20 transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-1 border-2 border-transparent">
                Next Chapter <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 duration-700">
      {/* Progress */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-sm font-bold tracking-widest uppercase text-blue-600">Question {currentIdx + 1} of {questions.length}</h2>
        <div className="flex gap-2">
          {questions.map((_, i) => (
            <div 
              key={i} 
              className={`h-2.5 w-10 rounded-full transition-all duration-500 ${
                i === currentIdx ? 'bg-blue-600 shadow-md shadow-blue-600/20 w-16' 
                : i < currentIdx ? 'bg-emerald-500 w-10' 
                : 'bg-slate-200 w-10'
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* Question */}
      <div className="relative rounded-[32px] border-2 border-slate-100 bg-white p-8 md:p-12 shadow-xl">
        
        <div className="relative z-10">
          <h3 className="font-heading text-3xl font-black text-slate-900 mb-10 leading-tight">
            {currentQ.question}
          </h3>

          <div className="space-y-4">
            {currentQ.options.map((option: string, i: number) => {
              const isSelected = selectedAnswer === option
              const isCorrect = option === currentQ.answer
              
              let buttonStateClasses = "bg-white hover:bg-slate-50 border-2 border-slate-100 text-slate-600 hover:border-slate-300 hover:text-slate-900"
              
              if (isAnswered) {
                if (isCorrect) {
                  buttonStateClasses = "bg-emerald-50 border-2 border-emerald-500 text-emerald-700 shadow-md shadow-emerald-500/10"
                } else if (isSelected) {
                  buttonStateClasses = "bg-rose-50 border-2 border-rose-500 text-rose-700"
                }
              } else if (isSelected) {
                buttonStateClasses = "bg-blue-50 border-2 border-blue-500 text-blue-700 shadow-md shadow-blue-500/10 scale-[1.02]"
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

      {/* Actions */}
      <div className="flex justify-end pt-4">
        {!isAnswered ? (
          <Button 
            onClick={handleSubmit} 
            disabled={!selectedAnswer}
            size="lg"
            className="rounded-full px-12 h-14 bg-blue-600 text-white hover:bg-blue-700 font-bold text-lg disabled:opacity-50 shadow-lg shadow-blue-600/20 transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-1 border-2 border-transparent"
          >
            Check Answer
          </Button>
        ) : (
          <Button 
            onClick={handleNext} 
            size="lg"
            disabled={isSaving}
            className="rounded-full px-12 h-14 bg-emerald-500 text-white hover:bg-emerald-600 font-bold text-lg shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-1 border-2 border-transparent"
          >
            {isSaving ? "Saving..." : currentIdx === questions.length - 1 ? "Finish Quiz" : "Next Question"}
            {!isSaving && <ArrowRight className="ml-2 h-5 w-5" />}
          </Button>
        )}
      </div>
    </div>
  )
}
