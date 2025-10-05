"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Github, Globe, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react"
import { useState } from "react"

export default function ContactClientPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: "", email: "", subject: "", message: "" })

    // Reset success message after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Get In Touch</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? I&apos;d love to hear from you. Let&apos;s discuss how we can work
              together to bring your ideas to life.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Let&apos;s Connect</h2>
                <p className="text-muted-foreground mb-8">
                  I&apos;m always open to discussing new opportunities, interesting projects, or just having a chat about
                  technology and development.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p className="text-muted-foreground">alex.johnson@email.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Location</h3>
                    <p className="text-muted-foreground">San Francisco, CA</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Follow Me</h3>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/alexjohnson"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-card border rounded-lg hover:bg-accent transition-colors"
                  >
                    <Github className="h-6 w-6" />
                  </a>
                  <a
                    href="https://linkedin.com/in/alexjohnson"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-card border rounded-lg hover:bg-accent transition-colors"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a
                    href="https://alexjohnson.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-card border rounded-lg hover:bg-accent transition-colors"
                  >
                    <Globe className="h-6 w-6" />
                  </a>
                </div>
              </div>

              {/* Availability */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Availability</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-foreground">Available for new projects</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    I&apos;m currently accepting new freelance projects and consulting opportunities. Typical response time
                    is within 24 hours.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">
                      Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What's this about?"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project or inquiry..."
                        rows={6}
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
