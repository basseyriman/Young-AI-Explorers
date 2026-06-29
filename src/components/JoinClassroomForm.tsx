'use client'

import { useState } from 'react'
import { joinClassroomAction } from '@/app/dashboard/teacher/actions'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { School, Check } from 'lucide-react'

export function JoinClassroomForm() {
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!code.trim()) return

    setLoading(true)
    try {
      const res = await joinClassroomAction(code)
      if (res.success) {
        toast.success(`Successfully joined classroom: ${res.classroomName}!`)
        setCode('')
        // Delay slightly then refresh
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      } else if (res.error) {
        toast.error(res.error)
      }
    } catch (err) {
      toast.error('An error occurred while trying to join the classroom.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-5 rounded-2xl bg-brand-surface dark:bg-brand-purple-dark border border-brand-purple/10 dark:border-brand-gold/15 shadow-sm space-y-4">
      <div className="flex items-center gap-2">
        <School className="h-5 w-5 text-brand-gold" />
        <h4 className="font-heading font-bold text-sm">Join a Classroom</h4>
      </div>
      <p className="text-xs text-brand-purple/50 dark:text-brand-cream/65 leading-relaxed">
        Got a class code from your teacher? Enter it below to join your school's pilot.
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          placeholder="e.g. CLASS-ABCDE"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 bg-brand-warm/30 dark:bg-brand-purple-dark/50 border border-brand-purple/15 dark:border-brand-gold/20 rounded-full px-4 py-2 text-xs font-mono uppercase focus:outline-none focus:border-brand-gold"
          disabled={loading}
        />
        <Button
          type="submit"
          disabled={loading || !code.trim()}
          size="sm"
          className="bg-brand-purple dark:bg-brand-gold text-brand-cream dark:text-brand-purple-dark rounded-full shrink-0 font-bold"
        >
          {loading ? 'Joining...' : 'Join'}
        </Button>
      </form>
    </div>
  )
}
