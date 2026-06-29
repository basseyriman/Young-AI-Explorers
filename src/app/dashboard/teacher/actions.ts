'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

// Helper to check role
async function checkTeacherOrAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'teacher' && profile?.role !== 'admin') {
    throw new Error('Unauthorized')
  }
  return user
}

/**
 * Creates a new classroom with a unique code.
 */
export async function createClassroomAction(name: string) {
  const user = await checkTeacherOrAdmin()
  const supabase = await createClient()

  // Generate unique class code
  const code = 'CLASS-' + Math.random().toString(36).substring(2, 7).toUpperCase()

  const { data, error } = await supabase
    .from('classrooms')
    .insert({
      teacher_id: user.id,
      name,
      class_code: code,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating classroom:', error)
    return { error: error.message }
  }

  revalidatePath('/dashboard/teacher')
  return { success: true, classroom: data }
}

/**
 * Fetches all classrooms and student roster for the active teacher.
 */
export async function getClassroomsWithStudentsAction() {
  const user = await checkTeacherOrAdmin()
  const supabase = await createClient()

  // Fetch classrooms
  const { data: classrooms, error: classError } = await supabase
    .from('classrooms')
    .select('*')
    .eq('teacher_id', user.id)
    .order('created_at', { ascending: false })

  if (classError) {
    console.error('Error fetching classrooms:', classError)
    return { error: classError.message }
  }

  // Fetch classroom students and their profiles/progress
  const enrichedClassrooms = await Promise.all(
    classrooms.map(async (cls) => {
      // Fetch student links
      const { data: links, error: linkError } = await supabase
        .from('classroom_students')
        .select('student_id')
        .eq('classroom_id', cls.id)

      if (linkError || !links?.length) {
        return { ...cls, students: [] }
      }

      const studentIds = links.map((l) => l.student_id)

      // Fetch profiles
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('id, full_name, nickname, email, country_code')
        .in('id', studentIds)

      if (profileError) {
        return { ...cls, students: [] }
      }

      // Fetch progress (lessons completed, quizzes attempted)
      const studentsWithProgress = await Promise.all(
        profiles.map(async (profile) => {
          const { data: progress } = await supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', profile.id)

          const { data: badges } = await supabase
            .from('user_badges')
            .select('badge_name')
            .eq('user_id', profile.id)

          const completedLessons = progress?.filter((p) => p.completed_at) ?? []
          const quizScores = progress?.filter((p) => p.quiz_score !== null) ?? []

          return {
            ...profile,
            lessonsCount: completedLessons.length,
            quizzesCount: quizScores.length,
            avgQuizScore: quizScores.length
              ? Math.round(quizScores.reduce((acc, q) => acc + (q.quiz_score ?? 0), 0) / quizScores.length)
              : null,
            badgeNames: badges?.map((b) => b.badge_name) ?? [],
          }
        })
      )

      return {
        ...cls,
        students: studentsWithProgress,
      }
    })
  )

  return { success: true, classrooms: enrichedClassrooms }
}

/**
 * Joins a classroom using the class code (student).
 */
export async function joinClassroomAction(classCode: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  // Check if class exists
  const { data: classroom, error: classError } = await supabase
    .from('classrooms')
    .select('id, name')
    .eq('class_code', classCode.trim().toUpperCase())
    .single()

  if (classError || !classroom) {
    return { error: 'Classroom not found. Please verify the code.' }
  }

  // Link student
  const { error: linkError } = await supabase
    .from('classroom_students')
    .insert({
      classroom_id: classroom.id,
      student_id: user.id,
    })

  if (linkError) {
    if (linkError.code === '23505') {
      return { error: 'You are already in this classroom!' }
    }
    console.error('Error joining classroom:', linkError)
    return { error: linkError.message }
  }

  revalidatePath('/dashboard/student')
  return { success: true, classroomName: classroom.name }
}

/**
 * Checks if the student is currently linked to any classrooms.
 */
export async function getStudentClassroomsAction() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { data: links, error } = await supabase
    .from('classroom_students')
    .select('classroom_id, classrooms(name, class_code)')
    .eq('student_id', user.id)

  if (error) {
    console.error('Error fetching student classrooms:', error)
    return { error: error.message }
  }

  return { success: true, classrooms: links ?? [] }
}

/**
 * Admin: list school inquiries.
 */
export async function getSchoolInquiriesAction() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // Check admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    throw new Error('Unauthorized')
  }

  const { data: inquiries, error } = await supabase
    .from('school_inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching school inquiries:', error)
    return { error: error.message }
  }

  return { success: true, inquiries }
}

/**
 * Admin: Activate school pilot from an inquiry.
 */
export async function activateSchoolPilotAction(inquiryId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  // Check admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    throw new Error('Unauthorized')
  }

  // Fetch inquiry
  const { data: inquiry, error: fetchError } = await supabase
    .from('school_inquiries')
    .select('*')
    .eq('id', inquiryId)
    .single()

  if (fetchError || !inquiry) {
    return { error: 'Inquiry not found' }
  }

  // Generate unique pilot invite code
  const inviteCode = 'PILOT-' + Math.random().toString(36).substring(2, 7).toUpperCase()

  // Create active pilot
  const { data: pilot, error: pilotError } = await supabase
    .from('school_pilots')
    .insert({
      name: inquiry.school_name,
      invite_code: inviteCode,
      status: 'active',
    })
    .select()
    .single()

  if (pilotError) {
    console.error('Error creating pilot:', pilotError)
    return { error: pilotError.message }
  }

  // Delete/Update inquiry to prevent duplicates (or keep it)
  // Let's just update the inquiry type if we wanted, or delete it
  await supabase
    .from('school_inquiries')
    .delete()
    .eq('id', inquiryId)

  revalidatePath('/dashboard/admin')
  return { success: true, inviteCode }
}
