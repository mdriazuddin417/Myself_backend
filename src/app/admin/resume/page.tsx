"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Save, Eye } from "lucide-react"
import { resumeData } from "@/lib/dummy-data"
import Link from "next/link"

export default function AdminResumePage() {
  const [resume, setResume] = useState(resumeData)
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    // In a real app, this would save to database
    setIsEditing(false)
    alert("Resume saved successfully!")
  }

  const addExperience = () => {
    setResume({
      ...resume,
      experience: [
        ...resume.experience,
        {
          position: "",
          company: "",
          duration: "",
          location: "",
          responsibilities: [""],
        },
      ],
    })
  }

  const removeExperience = (index: number) => {
    setResume({
      ...resume,
      experience: resume.experience.filter((_, i) => i !== index),
    })
  }

  const addEducation = () => {
    setResume({
      ...resume,
      education: [
        ...resume.education,
        {
          degree: "",
          institution: "",
          year: "",
          location: "",
          gpa: "",
        },
      ],
    })
  }

  const removeEducation = (index: number) => {
    setResume({
      ...resume,
      education: resume.education.filter((_, i) => i !== index),
    })
  }

  const addSkillCategory = () => {
    setResume({
      ...resume,
      skills: [
        ...resume.skills,
        {
          category: "",
          items: [],
        },
      ],
    })
  }

  const removeSkillCategory = (index: number) => {
    setResume({
      ...resume,
      skills: resume.skills.filter((_, i) => i !== index),
    })
  }

  const addCertification = () => {
    setResume({
      ...resume,
      certifications: [
        ...resume.certifications,
        {
          name: "",
          issuer: "",
          date: "",
          credentialId: "",
        },
      ],
    })
  }

  const removeCertification = (index: number) => {
    setResume({
      ...resume,
      certifications: resume.certifications.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Resume Management</h1>
              <p className="text-muted-foreground">Edit and manage your resume content</p>
            </div>
            <div className="flex gap-2">
              <Link href="/resume">
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <Eye className="h-4 w-4" />
                  Preview
                </Button>
              </Link>
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
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
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={resume.personalInfo.fullName}
                      onChange={(e) =>
                        setResume({
                          ...resume,
                          personalInfo: { ...resume.personalInfo, fullName: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">Professional Title</Label>
                    <Input
                      id="title"
                      value={resume.personalInfo.title}
                      onChange={(e) =>
                        setResume({
                          ...resume,
                          personalInfo: { ...resume.personalInfo, title: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={resume.personalInfo.email}
                      onChange={(e) =>
                        setResume({
                          ...resume,
                          personalInfo: { ...resume.personalInfo, email: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={resume.personalInfo.phone}
                      onChange={(e) =>
                        setResume({
                          ...resume,
                          personalInfo: { ...resume.personalInfo, phone: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={resume.personalInfo.location}
                      onChange={(e) =>
                        setResume({
                          ...resume,
                          personalInfo: { ...resume.personalInfo, location: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={resume.personalInfo.website}
                      onChange={(e) =>
                        setResume({
                          ...resume,
                          personalInfo: { ...resume.personalInfo, website: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="summary">Professional Summary</Label>
                  <Textarea
                    id="summary"
                    rows={4}
                    value={resume.personalInfo.summary}
                    onChange={(e) =>
                      setResume({
                        ...resume,
                        personalInfo: { ...resume.personalInfo, summary: e.target.value },
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Professional Experience</CardTitle>
                <Button onClick={addExperience} size="sm" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Experience
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {resume.experience.map((job, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold">Experience {index + 1}</h4>
                      <Button onClick={() => removeExperience(index)} size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Position</Label>
                        <Input
                          value={job.position}
                          onChange={(e) => {
                            const newExperience = [...resume.experience]
                            newExperience[index].position = e.target.value
                            setResume({ ...resume, experience: newExperience })
                          }}
                        />
                      </div>
                      <div>
                        <Label>Company</Label>
                        <Input
                          value={job.company}
                          onChange={(e) => {
                            const newExperience = [...resume.experience]
                            newExperience[index].company = e.target.value
                            setResume({ ...resume, experience: newExperience })
                          }}
                        />
                      </div>
                      <div>
                        <Label>Duration</Label>
                        <Input
                          value={job.duration}
                          onChange={(e) => {
                            const newExperience = [...resume.experience]
                            newExperience[index].duration = e.target.value
                            setResume({ ...resume, experience: newExperience })
                          }}
                        />
                      </div>
                      <div>
                        <Label>Location</Label>
                        <Input
                          value={job.location}
                          onChange={(e) => {
                            const newExperience = [...resume.experience]
                            newExperience[index].location = e.target.value
                            setResume({ ...resume, experience: newExperience })
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Responsibilities (one per line)</Label>
                      <Textarea
                        rows={4}
                        value={job.responsibilities.join("\n")}
                        onChange={(e) => {
                          const newExperience = [...resume.experience]
                          newExperience[index].responsibilities = e.target.value.split("\n").filter((r) => r.trim())
                          setResume({ ...resume, experience: newExperience })
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Education */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Education</CardTitle>
                <Button onClick={addEducation} size="sm" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Education
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {resume.education.map((edu, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold">Education {index + 1}</h4>
                      <Button onClick={() => removeEducation(index)} size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Degree</Label>
                        <Input
                          value={edu.degree}
                          onChange={(e) => {
                            const newEducation = [...resume.education]
                            newEducation[index].degree = e.target.value
                            setResume({ ...resume, education: newEducation })
                          }}
                        />
                      </div>
                      <div>
                        <Label>Institution</Label>
                        <Input
                          value={edu.institution}
                          onChange={(e) => {
                            const newEducation = [...resume.education]
                            newEducation[index].institution = e.target.value
                            setResume({ ...resume, education: newEducation })
                          }}
                        />
                      </div>
                      <div>
                        <Label>Year</Label>
                        <Input
                          value={edu.year}
                          onChange={(e) => {
                            const newEducation = [...resume.education]
                            newEducation[index].year = e.target.value
                            setResume({ ...resume, education: newEducation })
                          }}
                        />
                      </div>
                      <div>
                        <Label>Location</Label>
                        <Input
                          value={edu.location}
                          onChange={(e) => {
                            const newEducation = [...resume.education]
                            newEducation[index].location = e.target.value
                            setResume({ ...resume, education: newEducation })
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Technical Skills</CardTitle>
                <Button onClick={addSkillCategory} size="sm" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Category
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {resume.skills.map((skillCategory, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold">Skill Category {index + 1}</h4>
                      <Button onClick={() => removeSkillCategory(index)} size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div>
                      <Label>Category Name</Label>
                      <Input
                        value={skillCategory.category}
                        onChange={(e) => {
                          const newSkills = [...resume.skills]
                          newSkills[index].category = e.target.value
                          setResume({ ...resume, skills: newSkills })
                        }}
                      />
                    </div>
                    <div>
                      <Label>Skills (comma separated)</Label>
                      <Textarea
                        rows={3}
                        value={skillCategory.items.join(", ")}
                        onChange={(e) => {
                          const newSkills = [...resume.skills]
                          newSkills[index].items = e.target.value
                            .split(",")
                            .map((s) => s.trim())
                            .filter((s) => s)
                          setResume({ ...resume, skills: newSkills })
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Certifications</CardTitle>
                <Button onClick={addCertification} size="sm" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Certification
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {resume.certifications.map((cert, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold">Certification {index + 1}</h4>
                      <Button onClick={() => removeCertification(index)} size="sm" variant="destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Certification Name</Label>
                        <Input
                          value={cert.name}
                          onChange={(e) => {
                            const newCertifications = [...resume.certifications]
                            newCertifications[index].name = e.target.value
                            setResume({ ...resume, certifications: newCertifications })
                          }}
                        />
                      </div>
                      <div>
                        <Label>Issuer</Label>
                        <Input
                          value={cert.issuer}
                          onChange={(e) => {
                            const newCertifications = [...resume.certifications]
                            newCertifications[index].issuer = e.target.value
                            setResume({ ...resume, certifications: newCertifications })
                          }}
                        />
                      </div>
                      <div>
                        <Label>Date</Label>
                        <Input
                          value={cert.date}
                          onChange={(e) => {
                            const newCertifications = [...resume.certifications]
                            newCertifications[index].date = e.target.value
                            setResume({ ...resume, certifications: newCertifications })
                          }}
                        />
                      </div>
                      <div>
                        <Label>Credential ID</Label>
                        <Input
                          value={cert.credentialId || ""}
                          onChange={(e) => {
                            const newCertifications = [...resume.certifications]
                            newCertifications[index].credentialId = e.target.value
                            setResume({ ...resume, certifications: newCertifications })
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
