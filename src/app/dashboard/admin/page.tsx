import { requireRole } from '@/lib/auth/dashboard-access'
import { getCountries, getSchoolInquiries } from '@/lib/db/platform'
import { createClient } from '@/utils/supabase/server'
import { AdminDashboardClient } from '@/components/admin/AdminDashboardClient'

async function getPlatformStats() {
  const supabase = await createClient()
  const { data } = await supabase.from('profiles').select('role')
  const rows = data ?? []
  const count = (role: string) => rows.filter((r) => r.role === role).length
  return {
    totalUsers: rows.length,
    students: count('student'),
    parents: count('parent'),
    teachers: count('teacher'),
    admins: count('admin'),
  }
}

export default async function AdminDashboardPage() {
  const { user } = await requireRole(['admin'])

  const stats = await getPlatformStats()
  const countries = await getCountries()
  const inquiries = await getSchoolInquiries()
  const userName = user.user_metadata?.full_name?.split(' ')[0] ?? 'Admin'

  return (
    <AdminDashboardClient
      userEmail={user.email ?? ''}
      userName={userName}
      stats={stats}
      countries={countries}
      inquiries={inquiries}
    />
  )
}
