import { requireRole } from '@/lib/auth/dashboard-access'
import { getCountries, getProfile, getCurriculumFromDb } from '@/lib/db/platform'
import { TeacherDashboardClient } from '@/components/teacher/TeacherDashboardClient'

export default async function TeacherDashboardPage() {
  const { user } = await requireRole(['teacher', 'admin'])

  const profile = await getProfile(user.id)
  const countries = await getCountries()
  const country = countries.find((c) => c.code === profile?.country_code)
  const userName = profile?.full_name?.split(' ')[0] ?? user.user_metadata?.full_name?.split(' ')[0] ?? 'Educator'
  const curriculum = await getCurriculumFromDb(user.id)

  return (
    <TeacherDashboardClient
      userEmail={user.email ?? ''}
      userName={userName}
      countryName={country?.name}
      countryFlag={country?.flag_emoji}
      initialCurriculum={curriculum}
    />
  )
}
