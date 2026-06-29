'use client'

import { useTransition } from 'react'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { signOut } from '@/app/dashboard/actions'

type Props = {
  className?: string
}

export function SignOutButton({ className }: Props) {
  const [pending, startTransition] = useTransition()

  return (
    <Button
      type="button"
      variant="ghost"
      disabled={pending}
      onClick={() => startTransition(() => signOut())}
      className={className ?? 'rounded-full text-sm font-semibold text-brand-purple/60 dark:text-brand-cream/60'}
    >
      <LogOut className="h-4 w-4 mr-2" /> Sign Out
    </Button>
  )
}
