import { signup } from '@/app/login/actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { CountrySelect } from '@/components/CountrySelect'
import { getCountries } from '@/lib/db/platform'
import Link from 'next/link'

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const message = params.message as string
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

        <Card className="border border-brand-purple/10 dark:border-brand-gold/15 bg-brand-surface dark:bg-brand-purple-dark shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-brand-purple/8 dark:border-brand-gold/8 pb-6">
            <CardTitle className="text-2xl font-bold text-brand-purple dark:text-brand-cream">Create Account</CardTitle>
            <CardDescription className="text-brand-purple/50 dark:text-brand-cream/50">38+ topics · Global explorer community</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form action={signup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-brand-purple dark:text-brand-cream font-semibold">Full Name</Label>
                <Input id="fullName" name="fullName" type="text" placeholder="Your name" required className="h-12 rounded-xl border-brand-purple/15 dark:border-brand-gold/15 bg-brand-warm dark:bg-brand-purple-dark/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-brand-purple dark:text-brand-cream font-semibold">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required className="h-12 rounded-xl border-brand-purple/15 dark:border-brand-gold/15 bg-brand-warm dark:bg-brand-purple-dark/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-brand-purple dark:text-brand-cream font-semibold">Password</Label>
                <Input id="password" name="password" type="password" required minLength={6} placeholder="At least 6 characters" className="h-12 rounded-xl border-brand-purple/15 dark:border-brand-gold/15 bg-brand-warm dark:bg-brand-purple-dark/50" />
              </div>
              <div className="space-y-2">
                <Label className="text-brand-purple dark:text-brand-cream font-semibold">Country / Region</Label>
                <CountrySelect countries={countries.length ? countries : [{ code: 'GB', name: 'United Kingdom', flag_emoji: '🇬🇧', is_featured: true }]} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="text-brand-purple dark:text-brand-cream font-semibold">I am a…</Label>
                <select id="role" name="role" required defaultValue="student" className="flex h-12 w-full rounded-xl border-2 border-brand-purple/15 dark:border-brand-gold/15 bg-brand-warm dark:bg-brand-purple-dark/50 px-3 text-sm font-medium text-brand-purple dark:text-brand-cream">
                  <option value="student">Student</option>
                  <option value="parent">Parent / Guardian</option>
                  <option value="teacher">Teacher / Educator</option>
                </select>
              </div>
              <Button type="submit" className="w-full h-12 rounded-full bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark font-semibold mt-2">
                Create Account
              </Button>
              <p className="text-center text-sm text-brand-purple/50 dark:text-brand-cream/50 pt-2">
                Already have an account?{' '}
                <Link href="/login" className="text-brand-gold font-semibold hover:underline">Sign in</Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
