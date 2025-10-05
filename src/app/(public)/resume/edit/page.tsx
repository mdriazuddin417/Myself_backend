"use client"


import { ResumeEditor } from "@/components/modules/resume/resume-editor"

// import { useAuth } from "@/hooks/use-auth"
import { dummyResume } from "@/lib/dummy-data"
import type { Resume } from "@/lib/types"
import { useState } from "react"

export default function ResumeEditPage() {

  const [resume, setResume] = useState<Resume>(dummyResume)

  return (
    <div className="min-h-screen bg-background">
        <ResumeEditor resume={resume} onSave={setResume} />
    </div>
  )
}
