
import { ResumeViewer } from "@/components/modules/resume/resume-viewer"

import { dummyResume } from "@/lib/dummy-data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resume - John Doe",
  description: "Professional resume showcasing experience, education, skills, and certifications.",
}

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-background ">
        <ResumeViewer resume={dummyResume} />
    </div>
  )
}
