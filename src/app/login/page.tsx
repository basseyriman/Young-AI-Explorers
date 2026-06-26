import { login, signup } from './actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Brain, ArrowLeft } from 'lucide-react'
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 dark:bg-[#020617] font-sans text-slate-900 dark:text-white selection:bg-blue-500/30 p-4 relative overflow-hidden">
      {/* Premium Background setup */}
      <div className="absolute inset-0 bg-slate-50 dark:bg-[#020617]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(219,234,254,0.7),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(139,92,246,0.15),rgba(2,6,23,0))]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')] opacity-[0.03] dark:opacity-20" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
        
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl overflow-hidden mb-4 shadow-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <Logo className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="font-heading text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Young AI Explorers
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
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
