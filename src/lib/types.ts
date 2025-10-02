// Database schema types using dummy data structures
export interface User {
  id: string
  email: string
  password: string
  name: string
  role: "admin" | "user"
  avatar?: string
  bio?: string
  createdAt: Date
  updatedAt: Date
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  featuredImage?: string
  published: boolean
  publishedAt?: Date
  authorId: string
  author: User
  tags: string[]
  readTime: number
  views: number
  createdAt: Date
  updatedAt: Date
}

export interface Project {
  id?: string
  title: string
  slug?: string
  description: string
  longDescription: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  images: string[]
  featured: boolean
  status: "COMPLETED" | "IN-PROGRESS" | "PLANNED"
  startDate?: Date
  endDate?: Date
  createdAt?: Date
  updatedAt?: Date
}

export interface Resume {
  id: string
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
    website: string
    linkedin: string
    github: string
    summary: string
  }
  experience: Array<{
    id: string
    company: string
    position: string
    startDate: string
    endDate?: string
    current: boolean
    description: string
    achievements: string[]
  }>
  education: Array<{
    id: string
    institution: string
    degree: string
    field: string
    startDate: string
    endDate: string
    gpa?: string
    achievements: string[]
  }>
  skills: Array<{
    category: string
    items: string[]
  }>
  certifications: Array<{
    id: string
    name: string
    issuer: string
    date: string
    url?: string
  }>
  createdAt: Date
  updatedAt: Date
}

export interface WorkExperience {
  id: string
  company: string
  position: string
  location: string
  startDate: Date
  endDate?: Date
  current: boolean
  description: string
  achievements: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: Date
  endDate?: Date
  gpa?: string
  description?: string
}

export interface Skill {
  id: string
  name: string
  category: "technical" | "soft" | "language" | "tool"
  proficiency: 1 | 2 | 3 | 4 | 5
}

export interface Certification {
  id: string
  name: string
  issuer: string
  issueDate: Date
  expiryDate?: Date
  credentialId?: string
  url?: string
}

export interface Language {
  id: string
  name: string
  proficiency: "native" | "fluent" | "conversational" | "basic"
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: Date
}
