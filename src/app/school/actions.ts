'use server'

import { createClient } from '@/utils/supabase/server'

export type InquiryType = 'demo' | 'workshop' | 'pilot'

export async function submitSchoolInquiry(formData: FormData) {
  const inquiryType = formData.get('inquiryType') as InquiryType
  const schoolName = (formData.get('schoolName') as string)?.trim()
  const contactName = (formData.get('contactName') as string)?.trim()
  const contactEmail = (formData.get('contactEmail') as string)?.trim()
  const countryCode = (formData.get('countryCode') as string)?.trim() || 'GB'
  const message = (formData.get('message') as string)?.trim() || null
  const preferredDate = (formData.get('preferredDate') as string)?.trim() || null
  const studentCountRaw = formData.get('studentCount') as string
  const studentCount = studentCountRaw ? parseInt(studentCountRaw, 10) : null

  if (!schoolName || !contactName || !contactEmail) {
    return { error: 'Please fill in all required fields.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.from('school_inquiries').insert({
    inquiry_type: inquiryType,
    school_name: schoolName,
    contact_name: contactName,
    contact_email: contactEmail,
    country_code: countryCode,
    message,
    preferred_date: preferredDate,
    student_count: studentCount,
  })

  if (error) {
    return {
      error: 'Could not save your request. Please email hello@youngaiexplorers.com directly.',
    }
  }

  return { success: true }
}
