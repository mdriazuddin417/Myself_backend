import type { BlogPost, ContactMessage, Project, Resume, User } from "./types"

// Dummy user data
export const dummyUsers: User[] = [
  {
    id: "1",
    email: "admin@portfolio.com",
    password: "admin123", // In real app, this would be hashed
    name: "Alex Johnson",
    role: "admin",
    avatar: "/professional-headshot.png",
    bio: "Full-stack developer passionate about creating innovative web solutions.",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    email: "user@example.com",
    password: "user123",
    name: "Jane Smith",
    role: "user",
    createdAt: new Date("2023-06-01"),
    updatedAt: new Date("2024-01-01"),
  },
]

// Dummy blog posts
export const dummyBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Modern Web Applications with Next.js 14",
    slug: "building-modern-web-apps-nextjs-14",
    content: `# Building Modern Web Applications with Next.js 14

Next.js 14 introduces several groundbreaking features that revolutionize how we build web applications. In this comprehensive guide, we'll explore the new App Router, Server Components, and advanced optimization techniques.

## Key Features

### App Router
The new App Router provides a more intuitive way to structure your applications with file-based routing that supports nested layouts, loading states, and error boundaries.

### Server Components
Server Components allow you to render components on the server, reducing bundle size and improving performance significantly.

### Turbopack
The new bundler built in Rust provides lightning-fast development builds and hot module replacement.

## Getting Started

\`\`\`bash
npx create-next-app@latest my-app --typescript --tailwind --eslint
\`\`\`

This command creates a new Next.js application with TypeScript, Tailwind CSS, and ESLint configured out of the box.

## Conclusion

Next.js 14 represents a significant leap forward in web development, offering developers powerful tools to build fast, scalable applications with excellent developer experience.`,
    excerpt:
      "Explore the latest features in Next.js 14 including App Router, Server Components, and Turbopack for building modern web applications.",
    featuredImage: "/nextjs-development-coding.jpg",
    published: true,
    publishedAt: new Date("2024-01-15"),
    authorId: "1",
    author: dummyUsers[0],
    tags: ["Next.js", "React", "Web Development", "JavaScript"],
    readTime: 8,
    views: 1250,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "The Future of TypeScript: Advanced Types and Patterns",
    slug: "future-typescript-advanced-types-patterns",
    content: `# The Future of TypeScript: Advanced Types and Patterns

TypeScript continues to evolve with powerful type system features that enable better code safety and developer productivity. Let's explore advanced patterns and upcoming features.

## Advanced Type Patterns

### Conditional Types
Conditional types allow you to create types that depend on a condition, enabling powerful type-level programming.

\`\`\`typescript
type ApiResponse<T> = T extends string 
  ? { message: T } 
  : { data: T };
\`\`\`

### Template Literal Types
Create types from string templates for better API design and validation.

\`\`\`typescript
type EventName<T extends string> = \`on\${Capitalize<T>}\`;
type ClickEvent = EventName<'click'>; // 'onClick'
\`\`\`

## Best Practices

1. Use strict mode for better type safety
2. Leverage utility types for common patterns
3. Create custom type guards for runtime validation
4. Use branded types for domain modeling

## Conclusion

TypeScript's advanced type system enables us to write more robust and maintainable code while catching errors at compile time.`,
    excerpt:
      "Dive deep into TypeScript's advanced type system features and learn patterns for building type-safe applications.",
    featuredImage: "/typescript-code.png",
    published: true,
    publishedAt: new Date("2024-01-20"),
    authorId: "1",
    author: dummyUsers[0],
    tags: ["TypeScript", "Programming", "Type Safety", "Advanced"],
    readTime: 12,
    views: 890,
    createdAt: new Date("2024-01-18"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "3",
    title: "Mastering CSS Grid and Flexbox for Modern Layouts",
    slug: "mastering-css-grid-flexbox-modern-layouts",
    content: `# Mastering CSS Grid and Flexbox for Modern Layouts

Modern CSS layout techniques have revolutionized how we approach web design. CSS Grid and Flexbox provide powerful tools for creating responsive, flexible layouts.

## CSS Grid Fundamentals

CSS Grid is a two-dimensional layout system that excels at creating complex layouts with precise control over both rows and columns.

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
\`\`\`

## Flexbox for Component Layout

Flexbox is perfect for one-dimensional layouts and component-level design patterns.

\`\`\`css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
\`\`\`

## Combining Grid and Flexbox

The real power comes from combining both techniques strategically throughout your application.

## Responsive Design Patterns

Learn how to create layouts that adapt beautifully to any screen size using modern CSS techniques.`,
    excerpt:
      "Learn how to create beautiful, responsive layouts using CSS Grid and Flexbox with practical examples and best practices.",
    featuredImage: "/css-grid-flexbox-layout-design.jpg",
    published: false,
    authorId: "1",
    author: dummyUsers[0],
    tags: ["CSS", "Layout", "Responsive Design", "Web Design"],
    readTime: 10,
    views: 0,
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-25"),
  },
]

// Dummy projects
export const dummyProjects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce solution built with Next.js, TypeScript, and Stripe integration.",
    longDescription: `A comprehensive e-commerce platform featuring user authentication, product catalog, shopping cart, payment processing, and admin dashboard. Built with modern technologies for optimal performance and user experience.

Key Features:
- User authentication and authorization
- Product catalog with search and filtering
- Shopping cart and wishlist functionality
- Secure payment processing with Stripe
- Order management and tracking
- Admin dashboard for inventory management
- Responsive design for all devices
- SEO optimization for better visibility

The platform handles high traffic loads and provides a seamless shopping experience across all devices.`,
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "PostgreSQL", "Prisma"],
    githubUrl: "https://github.com/alexjohnson/ecommerce-platform",
    liveUrl: "https://ecommerce-demo.vercel.app",
    images: ["/ecommerce-homepage.png", "/product-catalog.png", "/shopping-cart-checkout.jpg"],
    featured: true,
    status: "completed",
    startDate: new Date("2023-08-01"),
    endDate: new Date("2023-11-15"),
    createdAt: new Date("2023-08-01"),
    updatedAt: new Date("2023-11-15"),
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates and team features.",
    longDescription: `A powerful task management application designed for teams and individuals to organize, track, and collaborate on projects efficiently. Features real-time synchronization and intuitive user interface.

Key Features:
- Real-time collaboration with WebSocket integration
- Drag-and-drop task organization
- Team management and permissions
- File attachments and comments
- Time tracking and reporting
- Mobile-responsive design
- Dark/light theme support
- Advanced filtering and search

Perfect for agile teams and project management workflows.`,
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Express", "Material-UI"],
    githubUrl: "https://github.com/alexjohnson/task-manager",
    liveUrl: "https://taskflow-app.netlify.app",
    images: ["/task-management-dashboard.png", "/kanban-board-tasks.jpg", "/team-collaboration.png"],
    featured: true,
    status: "completed",
    startDate: new Date("2023-05-01"),
    endDate: new Date("2023-07-30"),
    createdAt: new Date("2023-05-01"),
    updatedAt: new Date("2023-07-30"),
  },
  {
    id: "3",
    title: "Weather Analytics Dashboard",
    description: "A data visualization dashboard for weather analytics with interactive charts and forecasting.",
    longDescription: `An advanced weather analytics platform that aggregates data from multiple sources to provide comprehensive weather insights, forecasting, and historical analysis through interactive visualizations.

Key Features:
- Real-time weather data integration
- Interactive charts and graphs
- Historical weather analysis
- Weather forecasting algorithms
- Location-based weather tracking
- Export functionality for reports
- Responsive dashboard design
- API integration with multiple weather services

Ideal for meteorologists, researchers, and weather enthusiasts.`,
    technologies: ["Vue.js", "D3.js", "Python", "FastAPI", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com/alexjohnson/weather-dashboard",
    images: ["/weather-dashboard-analytics.jpg", "/weather-charts-graphs.jpg"],
    featured: false,
    status: "in-progress",
    startDate: new Date("2024-01-01"),
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-25"),
  },
]

// Dummy resume data
export const dummyResume: Resume = {
  id: "1",
  personalInfo: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    summary:
      "Passionate full-stack developer with 5+ years of experience building scalable web applications. Expertise in React, Node.js, and cloud technologies. Strong advocate for clean code, test-driven development, and user-centered design.",
  },
  experience: [
    {
      id: "1",
      company: "TechCorp Inc.",
      position: "Senior Full-Stack Developer",
      startDate: "2022-03",
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
      company: "StartupXYZ",
      position: "Full-Stack Developer",
      startDate: "2020-06",
      endDate: "2022-02",
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
      company: "Digital Agency Pro",
      position: "Frontend Developer",
      startDate: "2019-01",
      endDate: "2020-05",
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
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2015-08",
      endDate: "2019-05",
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
      items: ["React", "Next.js", "TypeScript", "Vue.js", "HTML5", "CSS3", "Tailwind CSS", "SASS"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express", "Python", "FastAPI", "PostgreSQL", "MongoDB", "Redis", "GraphQL"],
    },
    {
      category: "Cloud & DevOps",
      items: ["AWS", "Vercel", "Docker", "Kubernetes", "CI/CD", "GitHub Actions", "Terraform"],
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
    {
      id: "3",
      name: "Certified Kubernetes Administrator",
      issuer: "Cloud Native Computing Foundation",
      date: "2022-11",
      url: "https://www.cncf.io/certification/cka/",
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
