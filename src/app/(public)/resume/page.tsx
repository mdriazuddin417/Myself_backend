"use client";

import { ResumeViewer } from "@/components/modules/resume/resume-viewer";

import { dummyResume } from "@/lib/dummy-data";
import { Resume } from "@/lib/types";
import { useEffect, useState } from "react";


export default function ResumePage() {
  const [resume, setResume] = useState<Resume | null>(null);

  useEffect(() => {
    fetchResume();
  }, []);


  const fetchResume = async () => {
    if(!localStorage.getItem("resume_info")){
      return;
    }
    const storData =await JSON.parse(localStorage.getItem("resume_info") as string);
    if (storData) {
      setResume(storData);
    }
  };



  return (
    <div className="min-h-screen bg-background ">
      <ResumeViewer resume={resume?resume:dummyResume} />
    </div>
  );
}
