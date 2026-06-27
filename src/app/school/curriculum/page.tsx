import Link from 'next/link'
import { ArrowLeft, Download } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { PrintButton } from '@/components/PrintButton'
import { BOOK_LESSONS, CORE_TOPICS_LABEL, STARTER_LESSONS_LABEL, FUN_FACTS_LABEL, QUIZZES_LABEL, TOPIC_MARKETING } from '@/data/curriculum'
import { LEGAL_OWNER } from '@/data/legal'

export default function SchoolCurriculumPage() {
  const categories = [...new Set(BOOK_LESSONS.map((l) => l.category))]

  return (
    <div className="min-h-screen bg-brand-gradient dark:bg-brand-gradient-dark text-brand-purple dark:text-brand-cream">
      <header className="border-b border-brand-purple/10 dark:border-brand-gold/10 bg-brand-surface/80 dark:bg-brand-purple-dark/60 print:hidden">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/"><Logo showWordmark size="md" /></Link>
          <div className="flex items-center gap-3">
            <PrintButton />
            <Link href="/" className="text-sm font-medium text-brand-purple/60 dark:text-brand-cream/60 hover:text-brand-gold inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Home
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-3xl print:py-6 print:max-w-none">
        <div className="mb-10 print:mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold mb-2 print:text-black">Curriculum Guide</p>
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3 print:text-black">Young AI Explorers — Classroom Curriculum</h1>
          <p className="text-brand-purple/60 dark:text-brand-cream/60 print:text-gray-700">
            {CORE_TOPICS_LABEL} · {STARTER_LESSONS_LABEL} · {FUN_FACTS_LABEL} · {QUIZZES_LABEL} · {TOPIC_MARKETING.growsWithVisionVee} · For children & schools
          </p>
          <p className="text-sm text-brand-purple/50 dark:text-brand-cream/50 mt-4 print:text-gray-600">
            Author: {LEGAL_OWNER} · Aligned with UNESCO AI Competency Framework · UK Age Appropriate Design Code
          </p>
        </div>

        <div className="space-y-8 print:space-y-6">
          {categories.map((cat, i) => (
            <section key={cat} className="break-inside-avoid">
              <h2 className="text-xl font-heading font-bold mb-3 border-b border-brand-purple/10 pb-2 print:text-black">
                {i + 1}. {cat}
              </h2>
              <ol className="space-y-2 list-decimal list-inside">
                {BOOK_LESSONS.filter((l) => l.category === cat).map((lesson) => (
                  <li key={String(lesson.id)} className="text-sm text-brand-purple/80 dark:text-brand-cream/80 print:text-gray-800">
                    <span className="font-semibold">{lesson.title}</span>
                    {lesson.description && (
                      <span className="text-brand-purple/50 dark:text-brand-cream/50 print:text-gray-600"> — {lesson.description}</span>
                    )}
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-brand-gold/5 border border-brand-gold/20 print:border-gray-300 print:bg-gray-50">
          <h3 className="font-heading font-bold mb-2 print:text-black">Implementation Notes for Teachers</h3>
          <ul className="text-sm space-y-2 text-brand-purple/70 dark:text-brand-cream/70 print:text-gray-700 list-disc pl-5">
            <li>Each topic includes an illustrated lesson, interactive quiz, and badge reward.</li>
            <li>Parents can enable/disable topics and add custom curriculum via the Parent Dashboard.</li>
            <li>Vision Vee AI assistant supports in-class Q&amp;A with child-safe guardrails.</li>
            <li>Vision Vee and parents can add unlimited custom topics beyond the core library.</li>
            <li>Match Quiz enables peer learning with nickname-only identity protection.</li>
            <li>Contact <a href="mailto:hello@youngaiexplorers.com" className="text-brand-gold">hello@youngaiexplorers.com</a> for DPA and institutional licensing.</li>
          </ul>
        </div>

        <div className="mt-8 print:hidden flex gap-3">
          <Link
            href="/school/demo"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark font-semibold text-sm hover:opacity-90"
          >
            <Download className="h-4 w-4" /> Request School Demo
          </Link>
        </div>
      </main>

      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          .dark { color-scheme: light; }
        }
      `}</style>
    </div>
  )
}
