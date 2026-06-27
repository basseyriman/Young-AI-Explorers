import { SignupForm } from '@/components/SignupForm'
import { ArrowLeft } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { getCountries } from '@/lib/db/platform'
import Link from 'next/link'

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const message = params.message as string
  const roleParam = typeof params.role === 'string' ? params.role : 'student'
  const defaultRole = ['student', 'parent', 'teacher'].includes(roleParam) ? roleParam : 'student'
  const countries = await getCountries()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-brand-gradient dark:bg-brand-gradient-dark font-sans text-brand-purple dark:text-brand-cream selection:bg-brand-gold/30 p-4 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(201,160,78,0.12),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(201,160,78,0.08),rgba(26,15,46,0))]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-brand-purple/50 hover:text-brand-gold dark:text-brand-cream/50 dark:hover:text-brand-gold mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>

        <div className="mb-8 flex flex-col items-center text-center">
          <Logo showWordmark size="lg" />
          <p className="mt-4 text-sm text-brand-purple/60 dark:text-brand-cream/60 font-medium">
            Join Young AI Explorers in your country.
          </p>
        </div>

        {message && (
          <div className="mb-4 rounded-xl bg-red-50 dark:bg-red-950/30 p-4 border border-red-200 dark:border-red-800">
            <p className="text-sm font-semibold text-red-600 dark:text-red-400 text-center">{message}</p>
          </div>
        )}

        <SignupForm countries={countries} defaultRole={defaultRole} />
      </div>
    </div>
  )
}
