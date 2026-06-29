import Image from 'next/image'

type CustomTopicHeroProps = {
  title: string
  illustrationUrl?: string | null
  badgeName?: string | null
  variant?: 'lesson' | 'compact'
}

export function CustomTopicHero({ title, illustrationUrl, badgeName, variant = 'lesson' }: CustomTopicHeroProps) {
  const isDataUrl = illustrationUrl?.startsWith('data:')
  const aspect = variant === 'lesson' ? 'aspect-[5/4] md:aspect-[4/3]' : 'aspect-[16/10]'

  if (illustrationUrl) {
    return (
      <div className={`relative w-full max-w-4xl mx-auto rounded-[32px] overflow-hidden shadow-2xl shadow-brand-purple/10 border-4 border-brand-gold/25 bg-brand-warm ${aspect}`}>
        {isDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={illustrationUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <Image src={illustrationUrl} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 896px" priority={variant === 'lesson'} />
        )}
      </div>
    )
  }

  return (
    <div className={`relative w-full max-w-4xl mx-auto rounded-[32px] overflow-hidden shadow-2xl shadow-brand-purple/10 border-4 border-brand-gold/25 bg-gradient-to-br from-brand-purple/10 via-brand-warm to-brand-gold/10 ${aspect} flex flex-col items-center justify-center p-10 text-center`}>
      <div className="text-6xl mb-4" aria-hidden>✨</div>
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold mb-2">Vision Vee Custom Topic</p>
      <p className="text-lg text-brand-purple/70 dark:text-brand-cream/70 max-w-md">
        {badgeName ? `Earn the "${badgeName}" badge when you pass the quiz.` : 'Illustration coming soon — your lesson is ready to explore!'}
      </p>
    </div>
  )
}
