import Image from 'next/image'
import type { QuizQuestion } from '@/data/lessons'

type BookStyleCustomLessonProps = {
  title: string
  storyLabel?: string | null
  introduction: string
  mainLesson: string
  funFacts: string[]
  illustrationUrl?: string | null
  quizPreview?: QuizQuestion | null
  badgeName?: string | null
}

function extractStoryLabel(introduction: string): string {
  const meet = introduction.match(/Meet ([A-Z][A-Za-z0-9 .'-]{2,28})/)
  if (meet) return `Meet ${meet[1].trim().replace(/[.,!]$/, '')}`
  if (/Vision Vee/i.test(introduction)) return 'Meet Vision Vee'
  return 'The Adventure Begins'
}

export function BookStyleCustomLesson({
  title,
  storyLabel,
  introduction,
  mainLesson,
  funFacts,
  illustrationUrl,
  quizPreview,
  badgeName,
}: BookStyleCustomLessonProps) {
  const label = storyLabel?.trim() || extractStoryLabel(introduction)
  const paragraphs = mainLesson.split(/\n\n+/).filter(Boolean)

  return (
    <article className="mx-auto w-full max-w-[210mm] rounded-2xl bg-white text-[#1E293B] shadow-[0_20px_60px_rgba(0,0,0,0.25)] overflow-hidden font-[Inter,sans-serif]">
      <div className="px-6 py-8 md:px-10 md:py-10 flex flex-col min-h-[min(80vh,297mm)]">
        <header className="mb-4 border-b-4 border-[#0EA5E9] pb-2">
          <span className="block text-xs font-bold uppercase tracking-[0.2em] text-[#0EA5E9]">
            Vision Vee Custom Topic
          </span>
          <h1 className="font-[Outfit,sans-serif] text-2xl md:text-3xl font-extrabold leading-tight text-[#0F172A] mt-1">
            {title}
          </h1>
          {badgeName && (
            <p className="text-xs font-semibold text-[#8B5CF6] mt-2 uppercase tracking-wide">
              Earn the &ldquo;{badgeName}&rdquo; badge
            </p>
          )}
        </header>

        <div className="relative w-full h-[min(52vw,420px)] mb-4 rounded-2xl overflow-hidden border-4 border-[#0EA5E9] bg-[#F8FAFC] shadow-[0_10px_25px_rgba(14,165,233,0.12)]">
          {illustrationUrl ? (
            illustrationUrl.startsWith('data:') ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={illustrationUrl} alt={title} className="w-full h-full object-cover" />
            ) : (
              <Image src={illustrationUrl} alt={title} fill className="object-cover object-[center_70%]" sizes="(max-width: 768px) 100vw, 800px" priority />
            )
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#F8FAFC] to-[#E2E8F0] px-6 text-center">
              <span className="text-6xl" aria-hidden>🎨</span>
              <p className="text-sm font-semibold text-[#0EA5E9] uppercase tracking-wider">Book illustration</p>
              <p className="text-sm text-[#64748B] max-w-xs">
                A custom chapter illustration will appear here after generation. Ask a parent to regenerate this topic if it stays blank.
              </p>
            </div>
          )}
        </div>

        <section className="rounded-2xl border-l-[8px] border-[#0EA5E9] bg-[#F8FAFC] px-4 py-3 mb-2">
          <span className="block text-[9.5pt] font-bold uppercase tracking-wide text-[#0EA5E9] mb-1">{label}</span>
          <p className="text-[11.5pt] leading-relaxed italic text-[#334155]">{introduction}</p>
        </section>

        <section className="rounded-2xl border-l-[8px] border-[#8B5CF6] bg-[#F8FAFC] px-4 py-3 mb-2">
          <span className="block text-[9.5pt] font-bold uppercase tracking-wide text-[#8B5CF6] mb-1">The Lesson</span>
          <div className="space-y-3 text-[11pt] leading-relaxed text-[#334155]">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {funFacts[0] && (
          <section className="rounded-2xl border-l-[8px] border-[#F472B6] bg-[#F8FAFC] px-4 py-3 mb-2">
            <span className="block text-[9.5pt] font-bold uppercase tracking-wide text-[#F472B6] mb-1">Mind-Blowing Fact</span>
            <p className="text-[11pt] leading-relaxed text-[#334155]">{funFacts[0]}</p>
          </section>
        )}

        {quizPreview && (
          <section className="rounded-2xl border-l-[8px] border-[#10B981] bg-[#F8FAFC] px-4 py-3 mb-2">
            <span className="block text-[9.5pt] font-bold uppercase tracking-wide text-[#10B981] mb-1">Mini-Quiz</span>
            <p className="text-[11pt] font-medium text-[#334155] mb-2">{quizPreview.question}</p>
            {quizPreview.options.slice(0, 3).map((opt, i) => (
              <span
                key={i}
                className="block mt-1 rounded-lg border border-[#E2E8F0] bg-white px-3 py-1.5 text-[10.5pt] text-[#475569]"
              >
                {String.fromCharCode(65 + i)}) {opt}
              </span>
            ))}
          </section>
        )}

        <footer className="mt-auto pt-6 flex justify-between text-[10pt] text-[#94A3B8] border-t border-[#E2E8F0]">
          <span>Young AI Explorers</span>
          <span>RimansTech Industries</span>
        </footer>
      </div>
    </article>
  )
}
