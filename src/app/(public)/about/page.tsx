import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { dummyResume } from "@/lib/dummy-data"
import {
  Award,
  Calendar,
  Cloud,
  Code2,
  Database,
  Download,
  GitBranch,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const skillCategories = {
  Frontend: [
    { name: "React/Next.js", level: 95, icon: Code2 },
    { name: "TypeScript", level: 90, icon: Code2 },
    { name: "Tailwind CSS", level: 85, icon: Globe },
    { name: "Vue.js", level: 75, icon: Code2 },
  ],
  Backend: [
    { name: "Node.js", level: 85, icon: Database },
    { name: "Python", level: 80, icon: Database },
    { name: "PostgreSQL", level: 85, icon: Database },
    { name: "MongoDB", level: 75, icon: Database },
  ],
  "Tools & Cloud": [
    { name: "AWS", level: 70, icon: Cloud },
    { name: "Docker", level: 75, icon: Cloud },
    { name: "Git", level: 90, icon: GitBranch },
    { name: "CI/CD", level: 80, icon: Cloud },
  ],
}

export default function AboutPage() {
  const resume = dummyResume

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">About Me</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Passionate full-stack developer with a love for creating innovative solutions that bridge the gap between
            design and functionality.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Personal Info */}
          <div className="lg:col-span-1 space-y-8">
            {/* Profile Card */}
            <Card>
              <CardHeader className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src="/professional-headshot.png"
                    alt="Alex Johnson"
                    width={128}
                    height={128}
                    className="w-full h-full rounded-full object-cover border-4 border-primary/20"
                  />
                </div>
                <CardTitle className="text-2xl">{resume.personalInfo.fullName ?? ''}</CardTitle>
                <CardDescription className="text-lg">Full-Stack Developer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{resume.personalInfo.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{resume.personalInfo.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Available for projects</span>
                </div>
                <div className="pt-4">
                  <Button asChild className="w-full">
                    <Link href="/contact">
                      <Mail className="w-4 h-4 mr-2" />
                      Get In Touch
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Years of Experience</span>
                  <span className="font-semibold">5+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Projects Completed</span>
                  <span className="font-semibold">50+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Technologies Mastered</span>
                  <span className="font-semibold">20+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Coffee Consumed</span>
                  <span className="font-semibold">∞</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* About Summary */}
            <section>
              <h2 className="text-3xl font-bold mb-6">My Story</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed">{resume.summary ?? ''}</p>
                <p className="text-muted-foreground leading-relaxed">
                  My journey in web development started during my computer science studies at UC Berkeley, where I
                  discovered my passion for creating digital experiences that solve real-world problems. Since then,
                  I've had the privilege of working with startups and established companies, helping them build scalable
                  applications that serve thousands of users.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                  or sharing my knowledge through blog posts and mentoring fellow developers. I believe in continuous
                  learning and staying up-to-date with the latest industry trends and best practices.
                </p>
              </div>
            </section>

            {/* Skills Section */}
            <section>
              <h2 className="text-3xl font-bold mb-8">Technical Skills</h2>
              <div className="space-y-8">
                {Object.entries(skillCategories).map(([category, skills]) => (
                  <Card key={category}>
                    <CardHeader>
                      <CardTitle className="text-xl">{category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        {skills.map((skill) => {
                          const Icon = skill.icon
                          return (
                            <div key={skill.name} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Icon className="w-4 h-4 text-primary" />
                                  <span className="font-medium">{skill.name}</span>
                                </div>
                                <span className="text-sm text-muted-foreground">{skill.level}%</span>
                              </div>
                              <Progress value={skill.level} className="h-2" />
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Experience Highlights */}
            <section>
              <h2 className="text-3xl font-bold mb-8">Experience Highlights</h2>
              <div className="space-y-6">
                {resume.experience.slice(0, 2).map((exp) => (
                  <Card key={exp.id}>
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <CardTitle className="text-xl">{exp.position}</CardTitle>
                          <CardDescription className="text-lg">{exp.company}</CardDescription>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(exp?.startDate).getFullYear()} - {exp.current ? "Present" : new Date(exp?.endDate || "").getFullYear()}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{exp.description}</p>
                      <div className="space-y-2">
                        {exp.achievements.slice(0, 3).map((achievement, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button asChild variant="outline" size="lg">
                  <Link href="/resume">
                    <Download className="w-4 h-4 mr-2" />
                    View Full Resume
                  </Link>
                </Button>
              </div>
            </section>

            {/* Education & Certifications */}
            <section>
              <h2 className="text-3xl font-bold mb-8">Education & Certifications</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Education */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5" />
                      Education
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {resume.education.map((edu) => (
                      <div key={edu.id} className="space-y-2">
                        <h3 className="font-semibold">
                          {edu.degree} in {edu.field}
                        </h3>
                        <p className="text-muted-foreground">{edu.institution}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(edu?.startDate).getFullYear()} - {new Date(edu?.endDate || "").getFullYear()}
                        </p>
                        {edu.gpa && <p className="text-sm text-muted-foreground">GPA: {edu.gpa}</p>}
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Certifications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {resume.certifications.map((cert) => (
                      <div key={cert.id} className="space-y-1">
                        <h3 className="font-semibold text-sm">{cert.name}</h3>
                        <p className="text-muted-foreground text-sm">{cert.issuer}</p>
                        <p className="text-xs text-muted-foreground">
                          Issued: {new Date(cert?.issueDate || "").getFullYear()}
                          {cert?.expiryDate && ` • Expires: ${new Date(cert.expiryDate || "").getFullYear()}`}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
