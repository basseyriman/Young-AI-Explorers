import { signup } from '@/app/login/actions'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Brain, ArrowLeft } from 'lucide-react'
import { Logo } from '@/components/Logo'
import Link from 'next/link'

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const message = params.message as string

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 font-sans text-slate-900 selection:bg-purple-500/30 p-4 relative overflow-hidden">
      {/* Premium Light Background setup */}
      <div className="absolute inset-0 bg-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(233,213,255,0.7),rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')] opacity-50" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-purple-600 mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
        
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl overflow-hidden mb-4 shadow-sm bg-white border border-slate-200">
            <Logo className="h-8 w-8 text-purple-600" />
          </div>
          <h1 className="font-heading text-3xl font-black tracking-tight text-slate-900">
            Young AI Explorers
          </h1>
          <p className="mt-2 text-sm text-slate-600 font-medium">
            Create an account to start your journey.
          </p>
        </div>

        {message && (
          <div className="mb-4 rounded-md bg-red-50 p-4 border-2 border-red-200">
            <p className="text-sm font-semibold text-red-600 text-center">{message}</p>
          </div>
        )}

        <Card className="border-2 border-slate-100 bg-white shadow-xl rounded-[24px] overflow-hidden">
          <CardHeader className="bg-slate-50 border-b border-slate-100 pb-6">
            <CardTitle className="text-2xl font-bold text-slate-900">Sign Up</CardTitle>
            <CardDescription className="text-slate-500 font-medium">Join the next generation of innovators.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form action={signup} className="space-y-4">
              
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-slate-700 font-bold">Full Name</Label>
                <Input 
                  id="fullName" 
                  name="fullName" 
                  type="text" 
                  placeholder="John Doe" 
                  required 
                  className="border-2 border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus-visible:ring-purple-500 font-medium h-12 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-bold">Email</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  required 
                  className="border-2 border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus-visible:ring-purple-500 font-medium h-12 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 font-bold">Password</Label>
                <Input 
                  id="password" 
                  name="password" 
                  type="password" 
                  required 
                  minLength={6}
                  placeholder="At least 6 characters"
                  className="border-2 border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus-visible:ring-purple-500 font-medium h-12 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="text-slate-700 font-bold">I am a...</Label>
                <select 
                  id="role" 
                  name="role" 
                  required
                  defaultValue="student"
                  className="flex h-12 w-full rounded-xl border-2 border-slate-200 bg-slate-50 px-3 py-1 text-base font-medium text-slate-900 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
                >
                  <option value="student">Student</option>
                  <option value="parent">Parent / Guardian</option>
                  <option value="teacher">Teacher / Educator</option>
                </select>
              </div>
              
              <div className="flex flex-col gap-3 pt-4">
                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white border-2 border-transparent shadow-lg shadow-purple-600/20 transition-all hover:shadow-xl hover:shadow-purple-600/30 hover:-translate-y-0.5 font-bold h-12 rounded-full text-base"
                >
                  Sign up
                </Button>
                
                <div className="text-center text-sm font-medium text-slate-500 mt-4">
                  Already have an account?{' '}
                  <Link href="/login" className="text-purple-600 font-bold hover:text-purple-700 hover:underline underline-offset-4">
                    Log in here
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
