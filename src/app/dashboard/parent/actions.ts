'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { CurriculumSettings, DEFAULT_CURRICULUM } from '@/data/curriculum'
import { parseCurriculumSettings } from '@/lib/curriculum-utils'

export async function saveCurriculumSettings(settings: CurriculumSettings) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const payload = parseCurriculumSettings(settings)

  const { error } = await supabase.auth.updateUser({
    data: {
      curriculum_settings: payload,
      // Template parents can share with linked child accounts (future)
      family_curriculum_template: payload,
    },
  })

  if (error) return { error: error.message }

  revalidatePath('/dashboard/parent')
  revalidatePath('/dashboard/student')
  return { success: true }
}

export async function createCustomTopicViaVee(title: string, description: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const current = parseCurriculumSettings(user.user_metadata?.curriculum_settings ?? DEFAULT_CURRICULUM)
  const newTopic = {
    id: `vee-${Date.now()}`,
    title,
    description,
    createdBy: 'vision_vee' as const,
    createdAt: new Date().toISOString(),
  }

  const updated: CurriculumSettings = {
    ...current,
    customTopics: [...current.customTopics, newTopic],
  }

  const { error } = await supabase.auth.updateUser({
    data: { curriculum_settings: updated },
  })

  if (error) return { error: error.message }
  revalidatePath('/dashboard/parent')
  revalidatePath('/dashboard/student')
  return { success: true, topic: newTopic }
}

export async function applyCurriculumToChildEmail(childEmail: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const template = parseCurriculumSettings(user.user_metadata?.curriculum_settings ?? DEFAULT_CURRICULUM)

  // Store intent — full child linking requires Supabase admin/service role in production
  const linked = Array.isArray(user.user_metadata?.linked_children)
    ? user.user_metadata.linked_children
    : []

  const { error } = await supabase.auth.updateUser({
    data: {
      linked_children: [...linked, { email: childEmail, curriculum: template, linkedAt: new Date().toISOString() }],
    },
  })

  if (error) return { error: error.message }
  return { success: true, message: `Curriculum plan saved for ${childEmail}. Child will sync on next login.` }
}
