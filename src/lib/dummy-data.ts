import type { ContactMessage, Resume } from "./types"


// Dummy resume data
export const dummyResume: Resume = {
  id: "1",
  personalInfo: {
    name: "MD Riaz Uddin",
    email: "mdriazuddin417@gmail.com",
    phone: "+88017865529647",
    location: "https://github.com/mdriazuddin417",
    website: "https://github.com/mdriazuddin417",
    linkedin: "https://www.linkedin.com/in/riaz-uddin-457421214/",
    github: "https://github.com/mdriazuddin417",
    summary:
      "Passionate full-stack developer with 5+ years of experience building scalable web applications. Expertise in React, Node.js, and cloud technologies. Strong advocate for clean code, test-driven development, and user-centered design.",
  },
  experience: [
    {
      id: "1",
      company: "Knoct.io",
      position: "Full-Stack Developer",
      startDate: "2022-23",
      current: true,
      description:
        "Lead development of customer-facing web applications serving 100K+ users. Architect and implement scalable solutions using modern web technologies.",
      achievements: [
        "Improved application performance by 40% through code optimization and caching strategies",
        "Led migration from legacy PHP system to modern React/Node.js stack",
        "Mentored 3 junior developers and established code review processes",
        "Implemented CI/CD pipeline reducing deployment time by 60%",
      ],
    },
    {
      id: "2",
      company: "AarogyaId",
      position: "Full-Stack Developer",
      startDate: "2020-06",
      endDate: "2023-25",
      current: false,
      description:
        "Developed and maintained multiple web applications in a fast-paced startup environment. Collaborated closely with design and product teams.",
      achievements: [
        "Built responsive e-commerce platform handling $2M+ in annual transactions",
        "Developed real-time chat system using WebSocket technology",
        "Integrated payment systems (Stripe, PayPal) with 99.9% uptime",
        "Optimized database queries reducing load times by 50%",
      ],
    },
    {
      id: "3",
      company: "Swasthx",
      position: "Frontend Developer",
      startDate: "2025-",
      endDate: "---",
      current: false,
      description:
        "Created responsive websites and web applications for diverse clients. Focused on performance optimization and accessibility.",
      achievements: [
        "Delivered 20+ client projects with 100% on-time completion rate",
        "Achieved average Lighthouse scores of 95+ across all projects",
        "Implemented accessibility standards (WCAG 2.1) for all deliverables",
        "Reduced client website load times by average of 35%",
      ],
    },
  ],
  education: [
    {
      id: "1",
      institution: "National University of Bangladesh",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2018-22",
      endDate: "2022-05",
      gpa: "3.8",
      achievements: [
        "Magna Cum Laude graduate",
        "President of Computer Science Student Association",
        "Dean's List for 6 consecutive semesters",
        "Completed senior capstone project on machine learning applications",
      ],
    },
  ],
  skills: [
    {
      category: "Frontend",
      items: ["React", "Next.js", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "SASS"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express",  "FastAPI", "PostgreSQL", "MongoDB", "Redis", "GraphQL"],
    },
    {
      category: "Cloud & DevOps",
      items: ["AWS", "Vercel", "Docker", "CI/CD", "GitHub Actions", "Terraform"],
    },
    {
      category: "Tools & Others",
      items: ["Git", "Jest", "Cypress", "Figma", "Postman", "Jira", "Agile/Scrum"],
    },
  ],
  certifications: [
    {
      id: "1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023-06",
      url: "https://aws.amazon.com/certification/",
    },
    {
      id: "2",
      name: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      date: "2023-03",
      url: "https://cloud.google.com/certification",
    },
  ],
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-02-15"),
}

// Dummy contact messages
export const dummyContactMessages: ContactMessage[] = [
  {
    id: "1",
    name: "Sarah Wilson",
    email: "sarah.wilson@company.com",
    subject: "Project Collaboration Opportunity",
    message:
      "Hi Alex, I came across your portfolio and I'm impressed with your work. We have an exciting project that might be a great fit for your skills. Would you be interested in discussing a potential collaboration?",
    read: false,
    createdAt: new Date("2024-01-25"),
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike.chen@startup.io",
    subject: "Full-Stack Developer Position",
    message:
      "Hello, we're a growing startup looking for a senior full-stack developer. Your experience with Next.js and TypeScript caught our attention. Are you open to new opportunities?",
    read: true,
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily@designstudio.com",
    subject: "Website Development Inquiry",
    message:
      "Hi Alex, we need help developing a new website for our design studio. Could we schedule a call to discuss the project requirements and timeline?",
    read: false,
    createdAt: new Date("2024-01-18"),
  },
]

export const resumeData = dummyResume
