import { SchoolInquiryForm } from '@/components/SchoolInquiryForm'

export default function SchoolWorkshopPage() {
  return (
    <SchoolInquiryForm
      type="workshop"
      title="Book an Interactive Workshop"
      description="Hands-on AI literacy workshops for classrooms, led by Young AI Explorers educators. Available in-person or virtual worldwide."
      showDate
      showStudentCount
    />
  )
}
