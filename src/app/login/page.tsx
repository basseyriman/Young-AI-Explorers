import { login } from './actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { Logo } from '@/components/Logo'
import Link from 'next/link'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const message = params.message as string

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
            Sign in to continue your adventure.
          </p>
        </div>

        {message && (
          <div className="mb-4 rounded-xl bg-red-50 dark:bg-red-950/30 p-4 border border-red-200 dark:border-red-800">
            <p className="text-sm font-semibold text-red-600 dark:text-red-400 text-center">{message}</p>
          </div>
        )}

        <Card className="border border-brand-purple/10 dark:border-brand-gold/15 bg-brand-surface dark:bg-brand-purple-dark shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-brand-purple/8 dark:border-brand-gold/8 pb-6 text-center items-center">
            <CardTitle className="text-2xl font-bold text-brand-purple dark:text-brand-cream">Welcome Back</CardTitle>
            <CardDescription className="text-brand-purple/50 dark:text-brand-cream/50 font-medium">
              Enter your details below to log in or create an account.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-brand-purple dark:text-brand-cream font-semibold">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="h-12 rounded-xl border-brand-purple/15 dark:border-brand-gold/15 bg-brand-warm dark:bg-brand-purple-dark/50 text-brand-purple dark:text-brand-cream placeholder:text-brand-purple/40 dark:placeholder:text-brand-cream/40 focus-visible:ring-brand-gold/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-brand-purple dark:text-brand-cream font-semibold">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="h-12 rounded-xl border-brand-purple/15 dark:border-brand-gold/15 bg-brand-warm dark:bg-brand-purple-dark/50 text-brand-purple dark:text-brand-cream focus-visible:ring-brand-gold/50"
                />
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <Button
                  type="submit"
                  formAction={login}
                  className="w-full h-12 rounded-full bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark font-semibold hover:opacity-90 transition-opacity shadow-[0_8px_30px_rgba(74,45,110,0.2)] dark:shadow-[0_8px_30px_rgba(201,160,78,0.15)]"
                >
                  Log in
                </Button>

                <p className="text-center text-sm text-brand-purple/50 dark:text-brand-cream/50 pt-2">
                  Don&apos;t have an account?{' '}
                  <Link href="/signup" className="text-brand-gold font-semibold hover:underline">
                    Sign up here
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
