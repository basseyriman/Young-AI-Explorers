'use client'

import { useState } from 'react'
import Link from 'next/link'
import { signup } from '@/app/login/actions'
import { TOPIC_MARKETING } from '@/data/curriculum'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CountrySelect } from '@/components/CountrySelect'
import type { CountryRow } from '@/lib/db/platform'

interface Props {
  countries: CountryRow[]
  defaultRole: string
}

export function SignupForm({ countries, defaultRole }: Props) {
  const [role, setRole] = useState(defaultRole)
  const isStudent = role === 'student'
  const currentYear = new Date().getFullYear()
  const fieldClass =
    'h-12 rounded-xl border-brand-purple/15 dark:border-brand-cream/25 bg-brand-warm dark:bg-brand-purple-dark text-brand-purple dark:text-brand-cream placeholder:text-brand-purple/40 dark:placeholder:text-brand-cream/50'

  return (
    <Card className="border border-brand-purple/10 dark:border-brand-gold/15 bg-brand-surface dark:bg-brand-purple-dark shadow-xl rounded-2xl overflow-hidden">
      <CardHeader className="border-b border-brand-purple/8 dark:border-brand-gold/8 pb-6">
        <CardTitle className="text-2xl font-bold text-brand-purple dark:text-brand-cream">Create Account</CardTitle>
        <CardDescription className="text-brand-purple/50 dark:text-brand-cream/50">{TOPIC_MARKETING.platformLine}</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form action={signup} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-brand-purple dark:text-brand-cream font-semibold">Full Name</Label>
              <Input id="fullName" name="fullName" type="text" placeholder="Your name" required className={fieldClass} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-brand-purple dark:text-brand-cream font-semibold">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required className={fieldClass} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-brand-purple dark:text-brand-cream font-semibold">Password</Label>
              <Input id="password" name="password" type="password" required minLength={6} placeholder="At least 6 characters" className={fieldClass} />
            </div>
            <div className="space-y-2">
              <Label className="text-brand-purple dark:text-brand-cream font-semibold">Country / Region</Label>
              <CountrySelect countries={countries.length ? countries : [{ code: 'GB', name: 'United Kingdom', flag_emoji: '🇬🇧', is_featured: true }]} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-brand-purple dark:text-brand-cream font-semibold">I am a…</Label>
            <select
              id="role"
              name="role"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={`flex h-12 w-full rounded-xl border-2 px-3 text-sm font-medium ${fieldClass}`}
            >
              <option value="student">Student (child)</option>
              <option value="parent">Parent / Guardian</option>
              <option value="teacher">Teacher / Educator</option>
            </select>
          </div>

          {isStudent && (
            <div className="space-y-4 p-4 rounded-xl bg-brand-gold/5 border border-brand-gold/20">
              <p className="text-sm font-semibold text-brand-purple dark:text-brand-cream">Parent / Guardian Consent (required for students)</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="birthYear" className="text-brand-purple dark:text-brand-cream font-semibold">Birth Year</Label>
                  <Input id="birthYear" name="birthYear" type="number" min={1995} max={currentYear} placeholder="e.g. 2015" required={isStudent} className={fieldClass} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parentEmail" className="text-brand-purple dark:text-brand-cream font-semibold">Parent / Guardian Email</Label>
                  <Input id="parentEmail" name="parentEmail" type="email" placeholder="parent@example.com" required={isStudent} className={fieldClass} />
                </div>
              </div>
              <label className="flex items-start gap-3 text-sm cursor-pointer">
                <input type="checkbox" name="parentConsent" required={isStudent} className="mt-1 rounded" />
                <span className="text-brand-purple/70 dark:text-brand-cream/70">
                  I confirm my parent or guardian has reviewed the{' '}
                  <Link href="/privacy" className="text-brand-gold hover:underline" target="_blank">Privacy Policy</Link>
                  {' '}and consents to my use of Young AI Explorers.
                </span>
              </label>
            </div>
          )}

          {role === 'teacher' && (
            <div className="space-y-2 p-4 rounded-xl bg-brand-gold/5 border border-brand-gold/20">
              <Label htmlFor="inviteCode" className="text-brand-purple dark:text-brand-cream font-semibold">School Pilot Invite Code (Optional)</Label>
              <Input id="inviteCode" name="inviteCode" type="text" placeholder="e.g. PILOT-ABCDE" className={fieldClass} />
              <p className="text-[10px] text-brand-purple/50 dark:text-brand-cream/55 leading-relaxed">
                If your school has been approved for a pilot program, enter the code provided by your administrator.
              </p>
            </div>
          )}

          <label className="flex items-start gap-3 text-sm cursor-pointer">
            <input type="checkbox" name="termsConsent" required className="mt-1 rounded" />
            <span className="text-brand-purple/70 dark:text-brand-cream/70">
              I agree to the{' '}
              <Link href="/terms" className="text-brand-gold hover:underline" target="_blank">Terms of Service</Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-brand-gold hover:underline" target="_blank">Privacy Policy</Link>.
            </span>
          </label>

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
  )
}
