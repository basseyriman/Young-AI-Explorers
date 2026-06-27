import { SchoolInquiryForm } from '@/components/SchoolInquiryForm'

export default function SchoolPilotPage() {
  return (
    <SchoolInquiryForm
      type="pilot"
      title="Request a School Pilot Programme"
      description="Launch Young AI Explorers in your school with a guided pilot — curriculum mapping, teacher onboarding, and parent consent materials included."
      showStudentCount
      showDate
    />
  )
}
