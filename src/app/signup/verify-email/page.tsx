import Link from 'next/link'
import { ArrowLeft, Mail } from 'lucide-react'
import { Logo } from '@/components/Logo'

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; role?: string }>
}) {
  const params = await searchParams
  const email = params.email ?? 'your email'
  const role = params.role ?? 'student'

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-gradient dark:bg-brand-gradient-dark font-sans text-brand-purple dark:text-brand-cream p-4">
      <div className="w-full max-w-md text-center">
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-brand-purple/50 hover:text-brand-gold mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
        <Logo showWordmark size="lg" className="justify-center mb-8" />
        <div className="p-8 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-gold/20 shadow-xl">
          <Mail className="h-12 w-12 text-brand-gold mx-auto mb-4" />
          <h1 className="text-2xl font-heading font-bold mb-3">Verify your email</h1>
          <p className="text-brand-purple/60 dark:text-brand-cream/60 mb-4 leading-relaxed">
            We sent a confirmation link to <strong className="text-brand-purple dark:text-brand-cream">{email}</strong>.
            {role === 'student' && ' For child safety, student accounts must verify email before accessing lessons.'}
          </p>
          <p className="text-sm text-brand-purple/50 dark:text-brand-cream/50 mb-6">
            Check your inbox and spam folder. After confirming,{' '}
            <Link href="/login" className="text-brand-gold font-semibold hover:underline">sign in</Link>.
          </p>
          <Link href="/privacy" className="text-xs text-brand-purple/40 hover:text-brand-gold">How we protect your data →</Link>
        </div>
      </div>
    </div>
  )
}
