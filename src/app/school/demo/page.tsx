import { SchoolInquiryForm } from '@/components/SchoolInquiryForm'

export default function SchoolDemoPage() {
  return (
    <SchoolInquiryForm
      type="demo"
      title="Request a School Demo"
      description="Book a live walkthrough of Young AI Explorers for your leadership team or classroom. We will show the curriculum, parent controls, and Vision Vee assistant."
      showStudentCount
    />
  )
}
