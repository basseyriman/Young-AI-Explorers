'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function saveBadge(topicNumber: number) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error("Not authenticated")

  // Use user_metadata to store badges to avoid schema issues
  let existingBadges = user.user_metadata?.earned_badges || []
  
  if (!existingBadges.includes(topicNumber)) {
    const newBadges = [...existingBadges, topicNumber]
    
    // Attempt to update
    const { error: updateError } = await supabase.auth.updateUser({
      data: { earned_badges: newBadges }
    })
      
    if (updateError) {
      console.error("Failed to update badges", updateError)
    } else {
      revalidatePath('/dashboard/student')
    }
  }
}
