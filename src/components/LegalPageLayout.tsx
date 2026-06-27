import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Logo } from '@/components/Logo'

interface LegalPageLayoutProps {
  title: string
  lastUpdated: string
  children: React.ReactNode
}

export function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-brand-gradient dark:bg-brand-gradient-dark text-brand-purple dark:text-brand-cream">
      <header className="border-b border-brand-purple/10 dark:border-brand-gold/10 bg-brand-surface/80 dark:bg-brand-purple-dark/60">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/"><Logo showWordmark size="md" /></Link>
          <Link href="/" className="text-sm font-medium text-brand-purple/60 dark:text-brand-cream/60 hover:text-brand-gold transition-colors inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-6 py-12 max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold mb-3">Legal</p>
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">{title}</h1>
        <p className="text-sm text-brand-purple/50 dark:text-brand-cream/50 mb-10">Last updated: {lastUpdated}</p>
        <div className="prose prose-brand dark:prose-invert max-w-none space-y-6 text-brand-purple/80 dark:text-brand-cream/80 leading-relaxed [&_h2]:text-xl [&_h2]:font-heading [&_h2]:font-bold [&_h2]:text-brand-purple [&_h2]:dark:text-brand-cream [&_h2]:mt-10 [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2">
          {children}
        </div>
        <div className="mt-12 pt-8 border-t border-brand-purple/10 dark:border-brand-gold/10 flex flex-wrap gap-4 text-sm">
          <Link href="/privacy" className="hover:text-brand-gold transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-brand-gold transition-colors">Terms of Service</Link>
          <Link href="/cookies" className="hover:text-brand-gold transition-colors">Cookie Policy</Link>
          <Link href="mailto:hello@youngaiexplorers.com" className="hover:text-brand-gold transition-colors">hello@youngaiexplorers.com</Link>
        </div>
      </main>
    </div>
  )
}
