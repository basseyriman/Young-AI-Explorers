'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { saveBadgeToDb, getUserBadges } from '@/lib/db/platform'

export async function saveBadge(topicNumber: number | string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const topicKey = String(topicNumber)
  const existing = await getUserBadges(user.id)
  const normalized = existing.map(String)

  if (!normalized.includes(topicKey)) {
    try {
      await saveBadgeToDb(user.id, topicKey)
    } catch {
      // Fallback to metadata if tables not migrated yet
      const metaBadges = user.user_metadata?.earned_badges || []
      if (!metaBadges.includes(topicNumber)) {
        await supabase.auth.updateUser({
          data: { earned_badges: [...metaBadges, topicNumber] },
        })
      }
    }
    revalidatePath('/dashboard/student')
    revalidatePath('/community')
  }
}
