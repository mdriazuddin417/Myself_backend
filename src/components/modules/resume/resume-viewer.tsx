"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Resume } from "@/lib/types";
import {
  Download,
  Edit,
  ExternalLink,
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import Link from "next/link";

interface ResumeViewerProps {
  resume: Resume;
}

export function ResumeViewer({ resume }: ResumeViewerProps) {
  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Resume</h1>
        <div className="flex space-x-4">
          <Link href="/resume/edit">
          <Button>
            <Edit className="h-4 w-4 mr-2" />
            Resume Build
          </Button>
        </Link>

        <Button onClick={handleDownload}>
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
        </div>
      </div>

      {/* Resume Content */}
      <div  className="bg-card border border-border rounded-lg p-8 space-y-8 print:border-0 print:shadow-none">
        {/* Personal Info */}
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold">{resume.personalInfo.name}</h1>
          <p className="text-xl text-muted-foreground">
            {resume.personalInfo.summary}
          </p>

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <a
                href={`mailto:${resume.personalInfo.email}`}
                className="hover:text-foreground"
              >
                {resume.personalInfo.email}
              </a>
            </div>
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              <span>{resume.personalInfo.phone}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{resume.personalInfo.location}</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a
              href={resume.personalInfo.website}
              className="flex items-center gap-1 text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Globe className="h-4 w-4" />
              Website
            </a>
            <a
              href={resume.personalInfo.linkedin}
              className="flex items-center gap-1 text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href={resume.personalInfo.github}
              className="flex items-center gap-1 text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </header>

        <Separator />

        {/* Experience */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">
            Professional Experience
          </h2>
          <div className="space-y-6">
            {resume.experience.map((exp) => (
              <div key={exp.id} className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div>
                    <h3 className="text-lg font-semibold">{exp.position}</h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </div>
                </div>
                <p className="text-muted-foreground">{exp.description}</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                  {exp.achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* Education */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Education</h2>
          <div className="space-y-6">
            {resume.education.map((edu) => (
              <div key={edu.id} className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {edu.degree} in {edu.field}
                    </h3>
                    <p className="text-primary font-medium">
                      {edu.institution}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {edu.startDate} - {edu.endDate}
                    {edu.gpa && <span className="ml-2">GPA: {edu.gpa}</span>}
                  </div>
                </div>
                {edu.achievements.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
                    {edu.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* Skills */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Technical Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resume.skills.map((skillGroup) => (
              <div key={skillGroup.category}>
                <h3 className="font-semibold mb-3">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* Certifications */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {resume.certifications.map((cert) => (
              <Card key={cert.id} className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold">{cert.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {cert.issuer}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {cert.date}
                      </p>
                    </div>
                    {cert.url && (
                      <Button asChild variant="ghost" size="sm">
                        <Link
                          href={cert.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
