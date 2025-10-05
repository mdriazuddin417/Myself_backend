"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import type { Resume } from "@/lib/types"
import { Eye, Plus, Save, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { useState } from "react"
import { toast } from "sonner"

interface ResumeEditorProps {
  resume: Resume
  onSave: (resume: Resume) => void
}

export function ResumeEditor({ resume, onSave }: ResumeEditorProps) {
  const router = useRouter()
  const [editedResume, setEditedResume] = useState<Resume>(resume)


  const handleSave = async() => {
    // onSave(editedResume)
    await localStorage.setItem('resume_info', JSON.stringify(editedResume));
    router.push('/resume');

    
    toast.success("Resume saved successfully")
  }

  const updatePersonalInfo = (field: string, value: string) => {
    setEditedResume((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }))
  }

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: [],
    }
    setEditedResume((prev) => ({
      ...prev,
      experience: [...prev.experience, newExp],
    }))
  }

  const updateExperience = (id: string, field: string, value: string | string[]) => {
    setEditedResume((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }))
  }

  const removeExperience = (id: string) => {
    setEditedResume((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }))
  }

  const addEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      gpa: "",
      achievements: [],
    }
    setEditedResume((prev) => ({
      ...prev,
      education: [...prev.education, newEdu],
    }))
  }

  const updateEducation = (id: string, field: string, value: string | string[]) => {
    setEditedResume((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    }))
  }

  const removeEducation = (id: string) => {
    setEditedResume((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }))
  }

  const addSkillCategory = () => {
    const newCategory = {
      category: "New Category",
      items: [],
    }
    setEditedResume((prev) => ({
      ...prev,
      skills: [...prev.skills, newCategory],
    }))
  }

  const updateSkillCategory = (index: number, field: string, value: string | string[]) => {
    setEditedResume((prev) => ({
      ...prev,
      skills: prev.skills.map((skill, i) => (i === index ? { ...skill, [field]: value } : skill)),
    }))
  }

  const removeSkillCategory = (index: number) => {
    setEditedResume((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }))
  }

  const addCertification = () => {
    const newCert = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      date: "",
      url: "",
    }
    setEditedResume((prev) => ({
      ...prev,
      certifications: [...prev.certifications, newCert],
    }))
  }

  const updateCertification = (id: string, field: string, value: string) => {
    setEditedResume((prev) => ({
      ...prev,
      certifications: prev.certifications.map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert)),
    }))
  }

  const removeCertification = (id: string) => {
    setEditedResume((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((cert) => cert.id !== id),
    }))
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Edit Resume</h1>
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link href="/resume">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Link>
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={editedResume.personalInfo.name}
                  onChange={(e) => updatePersonalInfo("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editedResume.personalInfo.email}
                  onChange={(e) => updatePersonalInfo("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={editedResume.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={editedResume.personalInfo.location}
                  onChange={(e) => updatePersonalInfo("location", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={editedResume.personalInfo.website}
                  onChange={(e) => updatePersonalInfo("website", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={editedResume.personalInfo.linkedin}
                  onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  value={editedResume.personalInfo.github}
                  onChange={(e) => updatePersonalInfo("github", e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="summary">Professional Summary</Label>
              <Textarea
                id="summary"
                rows={4}
                value={editedResume.personalInfo.summary}
                onChange={(e) => updatePersonalInfo("summary", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Experience */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Professional Experience</CardTitle>
              <Button onClick={addExperience} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {editedResume.experience.map((exp, index) => (
              <div key={exp.id} className="space-y-4 p-4 border border-border rounded-lg">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">Experience {index + 1}</h3>
                  <Button onClick={() => removeExperience(exp.id)} variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Position</Label>
                    <Input
                      value={exp.position}
                      onChange={(e) => updateExperience(exp.id, "position", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      value={exp.startDate}
                      onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      value={exp.endDate}
                      onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                      disabled={exp.current}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    rows={3}
                    value={exp.description}
                    onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Achievements (one per line)</Label>
                  <Textarea
                    rows={4}
                    value={exp.achievements.join("\n")}
                    onChange={(e) => updateExperience(exp.id, "achievements", e.target.value.split("\n") ?? [])}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Education */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Education</CardTitle>
              <Button onClick={addEducation} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Education
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {editedResume.education.map((edu, index) => (
              <div key={edu.id} className="space-y-4 p-4 border border-border rounded-lg">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">Education {index + 1}</h3>
                  <Button onClick={() => removeEducation(edu.id)} variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Institution</Label>
                    <Input
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Degree</Label>
                    <Input value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Field of Study</Label>
                    <Input value={edu.field} onChange={(e) => updateEducation(edu.id, "field", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>GPA (optional)</Label>
                    <Input value={edu.gpa} onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input value={edu.endDate} onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Achievements (one per line)</Label>
                  <Textarea
                    rows={3}
                    value={edu.achievements.join("\n")}
                    onChange={(e) => updateEducation(edu.id, "achievements", e.target.value.split("\n"))}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Skills */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Technical Skills</CardTitle>
              <Button onClick={addSkillCategory} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {editedResume.skills.map((skillGroup, index) => (
              <div key={index} className="space-y-4 p-4 border border-border rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1 space-y-2">
                    <Label>Category Name</Label>
                    <Input
                      value={skillGroup.category}
                      onChange={(e) => updateSkillCategory(index, "category", e.target.value)}
                    />
                  </div>
                  <Button onClick={() => removeSkillCategory(index)} variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Skills (comma-separated)</Label>
                  <Textarea
                    rows={2}
                    value={skillGroup.items.join(", ")}
                    onChange={(e) =>
                      updateSkillCategory(
                        index,
                        "items",
                        e.target.value.split(",").map((item) => item.trim()),
                      )
                    }
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Certifications</CardTitle>
              <Button onClick={addCertification} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Certification
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {editedResume.certifications.map((cert, index) => (
              <div key={cert.id} className="space-y-4 p-4 border border-border rounded-lg">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">Certification {index + 1}</h3>
                  <Button onClick={() => removeCertification(cert.id)} variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Certification Name</Label>
                    <Input value={cert.name} onChange={(e) => updateCertification(cert.id, "name", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Issuer</Label>
                    <Input
                      value={cert.issuer}
                      onChange={(e) => updateCertification(cert.id, "issuer", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Input value={cert.date} onChange={(e) => updateCertification(cert.id, "date", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>URL (optional)</Label>
                    <Input value={cert.url} onChange={(e) => updateCertification(cert.id, "url", e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
