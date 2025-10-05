import SingleProjectCard from "@/components/modules/projects/SingleProjectCard"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { generateMetadata } from "@/lib/metadata"
import { Project } from "@/lib/types"
import { Filter, Search, Star } from "lucide-react"
import Link from "next/link"

export const metadata = generateMetadata({
  title: "Projects",
  description:
    "Explore my portfolio of web applications, mobile apps, and innovative solutions built with React, Next.js, TypeScript, and modern technologies.",
})

export default async function ProjectsPage() {
   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/v1/project`, {
    next: {
      tags: ["PROJECTS"],
    },
  });
  const { data: allProjects } = await res.json()

  // Get unique technologies for filter
  const allTechnologies: string[] = Array.from(new Set(allProjects?.flatMap((project: Project) => project.technologies))) as string[]



  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Projects</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            A showcase of my work spanning web applications, mobile apps, and innovative solutions built with modern
            technologies
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search projects..." className="pl-10" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                All Projects
              </Button>
              <Button variant="ghost" size="sm">
                Featured
              </Button>
              <Button variant="ghost" size="sm">
                Web Apps
              </Button>
              <Button variant="ghost" size="sm">
                Mobile
              </Button>
              <Button variant="ghost" size="sm">
                Open Source
              </Button>
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        {allProjects.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-8">
              <Star className="w-5 h-5 text-yellow-500" />
              <h2 className="text-2xl font-bold">Featured Projects</h2>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              {allProjects.slice(0,3).map((project: Project) => (<SingleProjectCard key={project.id} project={project} />))}
            </div>
          </section>
        )}

        {/* All Projects Grid */}
        <section>
          <h2 className="text-2xl font-bold mb-8">All Projects</h2>
          <div className="grid md:grid-cols-4 lg:grid-cols-3 gap-6">
            {allProjects.map((project: Project) => (<SingleProjectCard key={project.id} project={project} />))}
          </div>
        </section>

        {/* Technology Filter */}
        <section className="mt-16 bg-muted/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Technologies I Work With</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {allTechnologies?.length>0&&allTechnologies.map((tech : string) => (
              <Badge
                key={tech}
                variant="outline"
                className="text-sm py-2 px-4 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
              >
                {tech}
              </Badge>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">Interested in working together on a project?</p>
            <Button asChild size="lg">
              <Link href="/contact">Let&apos;s Collaborate</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
