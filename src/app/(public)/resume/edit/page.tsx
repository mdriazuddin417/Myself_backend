"use client"


import { ResumeEditor } from "@/components/modules/resume/resume-editor"

// import { useAuth } from "@/hooks/use-auth"
import { dummyResume } from "@/lib/dummy-data"

export default function ResumeEditPage() {

  return (
    <div className="min-h-screen bg-background">
        <ResumeEditor resume={dummyResume} />
    </div>
  )
}
