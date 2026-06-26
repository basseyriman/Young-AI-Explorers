import { login, signup } from './actions'
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
          <div className="mb-4">
            <Logo showWordmark size="lg" />
          </div>
          <p className="mt-2 text-sm text-brand-purple/60 dark:text-brand-cream/60 font-medium">
            Sign in to continue your adventure.
          </p>
        </div>

        {message && (
          <div className="mb-4 rounded-md bg-red-50 p-4 border-2 border-red-200">
            <p className="text-sm font-semibold text-red-600 text-center">{message}</p>
          </div>
        )}

        <Card className="border-2 border-slate-100 dark:border-white/5 bg-white dark:bg-[#020617]/50 shadow-xl rounded-[24px] overflow-hidden">
          <CardHeader className="bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5 pb-6">
            <CardTitle className="text-2xl font-bold text-slate-900 dark:text-white">Welcome Back</CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400 font-medium">Enter your details below to log in or create an account.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 dark:text-slate-300 font-bold">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  required 
                  className="border-2 border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-blue-500 font-medium h-12 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 dark:text-slate-300 font-bold">Password</Label>
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  required 
                  className="border-2 border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white focus-visible:ring-blue-500 font-medium h-12 rounded-xl"
                />
              </div>
              
              <div className="flex flex-col gap-3 pt-4">
                <Button 
                  type="submit" 
                  formAction={login} 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white border-2 border-transparent shadow-lg shadow-blue-600/20 transition-all hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5 font-bold h-12 rounded-full text-base"
                >
                  Log in
                </Button>
                
                <div className="text-center text-sm font-medium text-slate-550 dark:text-slate-400 mt-4">
                  Don't have an account?{' '}
                  <Link href="/signup" className="text-blue-600 dark:text-blue-400 font-bold hover:text-blue-700 dark:hover:text-blue-300 hover:underline underline-offset-4">
                    Sign up here
                  </Link>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
