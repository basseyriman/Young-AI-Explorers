import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { getProfile } from '@/lib/db/platform'

export type DashboardRole = 'student' | 'parent' | 'teacher' | 'admin'

const ROLE_DASHBOARD: Record<DashboardRole, string> = {
  student: '/dashboard/student',
  parent: '/dashboard/parent',
  teacher: '/dashboard/teacher',
  admin: '/dashboard/admin',
}

export async function requireAuth() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')
  return user
}

export async function getUserRole(userId: string, metadata?: Record<string, unknown>): Promise<DashboardRole> {
  const profile = await getProfile(userId)
  const role = profile?.role ?? (metadata?.role as string) ?? 'student'
  if (role === 'parent' || role === 'teacher' || role === 'admin') return role
  return 'student'
}

export async function requireRole(allowed: DashboardRole[]) {
  const user = await requireAuth()
  const role = await getUserRole(user.id, user.user_metadata)
  if (!allowed.includes(role)) {
    redirect(ROLE_DASHBOARD[role])
  }
  return { user, role }
}

export function dashboardPathForRole(role: string | undefined): string {
  if (role === 'parent') return ROLE_DASHBOARD.parent
  if (role === 'teacher') return ROLE_DASHBOARD.teacher
  if (role === 'admin') return ROLE_DASHBOARD.admin
  return ROLE_DASHBOARD.student
}
