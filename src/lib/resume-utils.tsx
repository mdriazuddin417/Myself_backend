import { dummyResume } from "./dummy-data"
import type { Resume } from "./types"

export class ResumeService {
  static getResume(): Resume {
    return dummyResume
  }

  static updateResume(updates: Partial<Resume>): Resume {
    Object.assign(dummyResume, {
      ...updates,
      updatedAt: new Date(),
    })
    return dummyResume
  }

  static exportToPDF(): void {
    // In a real app, this would generate a PDF using a library like jsPDF or Puppeteer
    window.print()
  }

  static validateResume(resume: Resume): { isValid: boolean; errors: string[] } {
    const errors: string[] = []

    // Personal info validation
    if (!resume.personalInfo.name.trim()) {
      errors.push("Name is required")
    }
    if (!resume.personalInfo.email.trim()) {
      errors.push("Email is required")
    }
    if (!resume.personalInfo.summary.trim()) {
      errors.push("Professional summary is required")
    }

    // Experience validation
    if (resume.experience.length === 0) {
      errors.push("At least one work experience is required")
    }

    resume.experience.forEach((exp, index) => {
      if (!exp.company.trim()) {
        errors.push(`Experience ${index + 1}: Company name is required`)
      }
      if (!exp.position.trim()) {
        errors.push(`Experience ${index + 1}: Position is required`)
      }
      if (!exp.startDate.trim()) {
        errors.push(`Experience ${index + 1}: Start date is required`)
      }
    })

    // Education validation
    if (resume.education.length === 0) {
      errors.push("At least one education entry is required")
    }

    resume.education.forEach((edu, index) => {
      if (!edu.institution.trim()) {
        errors.push(`Education ${index + 1}: Institution is required`)
      }
      if (!edu.degree.trim()) {
        errors.push(`Education ${index + 1}: Degree is required`)
      }
    })

    // Skills validation
    if (resume.skills.length === 0) {
      errors.push("At least one skill category is required")
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }

  static generateResumePreview(resume: Resume): string {
    // Generate a text preview of the resume
    let preview = `${resume.personalInfo.name}\n`
    preview += `${resume.personalInfo.email} | ${resume.personalInfo.phone}\n`
    preview += `${resume.personalInfo.location}\n\n`
    preview += `SUMMARY\n${resume.personalInfo.summary}\n\n`

    preview += `EXPERIENCE\n`
    resume.experience.forEach((exp) => {
      preview += `${exp.position} at ${exp.company}\n`
      preview += `${exp.startDate} - ${exp.current ? "Present" : exp.endDate}\n`
      preview += `${exp.description}\n\n`
    })

    preview += `EDUCATION\n`
    resume.education.forEach((edu) => {
      preview += `${edu.degree} in ${edu.field}\n`
      preview += `${edu.institution}, ${edu.startDate} - ${edu.endDate}\n\n`
    })

    preview += `SKILLS\n`
    resume.skills.forEach((skillGroup) => {
      preview += `${skillGroup.category}: ${skillGroup.items.join(", ")}\n`
    })

    return preview
  }
}
