"use client"


import { ResumeEditor } from "@/components/modules/resume/resume-editor"
import { Navigation } from "@/components/navigation"

// import { useAuth } from "@/hooks/use-auth"
import { dummyResume } from "@/lib/dummy-data"
import type { Resume } from "@/lib/types"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ResumeEditPage() {
  // const { isAuthenticated, isAdmin, loading } = useAuth()
  const router = useRouter()
  const [resume, setResume] = useState<Resume>(dummyResume)

  // useEffect(() => {
  //   if (!loading && (!isAuthenticated || !isAdmin)) {
  //     router.push("/login")
  //   }
  // }, [isAuthenticated, isAdmin, loading, router])

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-background flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
  //         <p className="text-muted-foreground">Loading...</p>
  //       </div>
  //     </div>
  //   )
  // }

  // if (!isAuthenticated || !isAdmin) {
  //   return null
  // }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <ResumeEditor resume={resume} onSave={setResume} />
      </main>

    </div>
  )
}
