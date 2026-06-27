'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import {
  saveCurriculumToDb,
  addCustomTopicToDb,
  removeCustomTopicFromDb,
  linkChildToParent,
  syncCurriculumToLinkedChildren,
  approveCustomTopic,
  rejectCustomTopic,
} from '@/lib/db/platform'
import type { CurriculumSettings } from '@/data/curriculum'
import { parseCurriculumSettings } from '@/lib/curriculum-utils'

export async function saveCurriculumSettings(settings: CurriculumSettings) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const payload = parseCurriculumSettings(settings)
  await saveCurriculumToDb(user.id, payload)
  await syncCurriculumToLinkedChildren(user.id, payload)
  await supabase.auth.updateUser({ data: { curriculum_settings: payload } })

  revalidatePath('/dashboard/parent')
  revalidatePath('/dashboard/student')
  revalidatePath('/community')
  return { success: true }
}

export async function addCustomTopicAction(title: string, description: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const result = await addCustomTopicToDb(user.id, {
    title,
    description,
    createdBy: 'parent',
  }, { isApproved: true })

  revalidatePath('/dashboard/parent')
  revalidatePath('/dashboard/student')
  return result
}

export async function createCustomTopicViaVee(title: string, description: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const result = await addCustomTopicToDb(user.id, {
    title,
    description,
    createdBy: 'vision_vee',
  }, { isApproved: false })

  revalidatePath('/dashboard/parent')
  revalidatePath('/dashboard/student')
  return result
}

export async function approveCustomTopicAction(topicId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const result = await approveCustomTopic(user.id, topicId)
  revalidatePath('/dashboard/parent')
  revalidatePath('/dashboard/student')
  return result
}

export async function rejectCustomTopicAction(topicId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const result = await rejectCustomTopic(user.id, topicId)
  revalidatePath('/dashboard/parent')
  revalidatePath('/dashboard/student')
  return result
}

export async function removeCustomTopicAction(topicId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }
  return removeCustomTopicFromDb(user.id, topicId)
}

export async function applyCurriculumToChildEmail(childEmail: string, settings?: CurriculumSettings) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const payload = settings ? parseCurriculumSettings(settings) : undefined
  const result = await linkChildToParent(user.id, childEmail, payload)
  revalidatePath('/dashboard/parent')
  revalidatePath('/dashboard/student')
  return result
}

export async function joinMatchQuizAction(countryCode: string, nickname: string, topicId?: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const profile = await supabase.from('profiles').select('allow_match_quiz').eq('id', user.id).single()
  if (profile.data?.allow_match_quiz === false) return { error: 'Match Quiz disabled by parent' }

  const { joinMatchQueue } = await import('@/lib/db/platform')
  return joinMatchQueue(user.id, countryCode, nickname, topicId)
}

export async function leaveMatchQueueAction() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }
  const { leaveMatchQueue } = await import('@/lib/db/platform')
  await leaveMatchQueue(user.id)
  return { success: true }
}

export async function postIdeaAction(countryCode: string, topicTitle: string, ideaText: string, nickname: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }
  const { postCommunityIdea } = await import('@/lib/db/platform')
  return postCommunityIdea(user.id, countryCode, topicTitle, ideaText, nickname)
}
