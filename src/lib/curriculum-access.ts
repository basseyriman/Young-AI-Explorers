import { redirect } from 'next/navigation'
import { isTopicEnabled, topicIdKey, type CurriculumSettings, type TopicId } from '@/data/curriculum'
import { getCurriculumFromDb, mergeCurriculumWithFallback } from '@/lib/db/platform'
import type { DashboardRole } from '@/lib/auth/dashboard-access'

export async function getEffectiveCurriculum(
  userId: string,
  metadata?: Record<string, unknown>
): Promise<CurriculumSettings> {
  let dbSettings: CurriculumSettings | null = null
  try {
    dbSettings = await getCurriculumFromDb(userId)
  } catch {
    /* tables may not exist yet */
  }
  return mergeCurriculumWithFallback(dbSettings, metadata)
}

export function isTopicAllowed(settings: CurriculumSettings, topicId: TopicId): boolean {
  return isTopicEnabled(topicId, settings)
}

/** Redirect students away from disabled topics; staff roles may preview all topics. */
export async function requireTopicAccess(
  userId: string,
  topicId: TopicId,
  role: DashboardRole,
  metadata?: Record<string, unknown>
): Promise<CurriculumSettings> {
  const settings = await getEffectiveCurriculum(userId, metadata)
  if (role === 'student' && !isTopicAllowed(settings, topicId)) {
    redirect(`/dashboard/student?blocked=${encodeURIComponent(topicIdKey(topicId))}`)
  }
  return settings
}

export async function getUserRoleFromProfile(
  userId: string,
  metadata?: Record<string, unknown>
): Promise<DashboardRole> {
  const { getProfile } = await import('@/lib/db/platform')
  const profile = await getProfile(userId)
  const role = profile?.role ?? (metadata?.role as string) ?? 'student'
  if (role === 'parent' || role === 'teacher' || role === 'admin') return role
  return 'student'
}
