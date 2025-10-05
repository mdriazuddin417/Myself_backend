import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getProjectById } from "@/services/PostServices"
import { ArrowLeft, Calendar, Clock, Code2, ExternalLink, Github, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const project = await getProjectById(id);

  

  return {
    title: project?.title,
    description: project?.description,
  };
};

export default async function ProjectPage({ params }: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await getProjectById(id);

  console.log({project});

  if (!project) {
    return notFound()
  }

  const relatedProjects = [project]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "in-progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "planned":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="pl-0">
            <Link href="/projects">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
          </Button>
        </div>

        {/* Project Header */}
        <header className="mb-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge className={getStatusColor(project.status)}>{project?.status?.replace("-", " ") ||""}</Badge>
                {project.featured && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Featured
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">{project.title}</h1>

              <p className="text-xl text-muted-foreground mb-8 text-pretty">{project.description}</p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {project.githubUrl && (
                  <Button asChild variant="outline" size="lg">
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-5 h-5 mr-2" />
                      View Source Code
                    </Link>
                  </Button>
                )}
                {project.liveUrl && (
                  <Button asChild size="lg">
                    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-5 h-5 mr-2" />
                      Live Demo
                    </Link>
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-6 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <div>
                    <div className="font-medium text-foreground">Timeline</div>
                    <div>
                      {new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate)?.toLocaleDateString() || "Ongoing"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <div>
                    <div className="font-medium text-foreground">Duration</div>
                    <div>
                      {project?.endDate
                        ? `${Math.ceil((new Date(project.endDate).getTime() - new Date(project.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30))} months`
                        : "Ongoing"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-xl">
                <Image
                  src={project?.images?.[0] || "https://swasthx-bucket.s3.ap-south-1.amazonaws.com/5ffee6fa772c-434f-bd01-3bf8daa560db.jpeg"}
                  alt={project?.title || "Project Image"}
                  width={600}
                  height={400}
                  className="w-full h-64 lg:h-80 object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Project Description */}
            <section>
              <h2 className="text-2xl font-bold mb-6">About This Project</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {project?.longDescription}
                </div>
              </div>
            </section>

            {/* Project Gallery */}
            {project?.images?.length > 1 && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {project?.images?.slice(1)?.map((image:string, index:number) => (
                    <div key={index} className="relative overflow-hidden rounded-lg">
                      <Image
                        src={image || "https://swasthx-bucket.s3.ap-south-1.amazonaws.com/5ffee6fa772c-434f-bd01-3bf8daa560db.jpeg"}
                        alt={`${project.title} screenshot ${index + 2}`}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Technical Implementation */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Technical Implementation</h2>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code2 className="w-5 h-5" />
                    Architecture & Technologies
                  </CardTitle>
                  <CardDescription>Key technical decisions and implementation details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Frontend</h4>
                    <div className="flex flex-wrap gap-2">
                      {project?.technologies
                        ?.filter((tech :string) =>
                          [
                            "React",
                            "Next.js",
                            "Vue.js",
                            "TypeScript",
                            "JavaScript",
                            "Tailwind CSS",
                            "CSS",
                            "HTML",
                          ]?.includes(tech),
                        )
                        ?.map((tech:string) => (
                          <Badge key={tech} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Backend & Database</h4>
                    <div className="flex flex-wrap gap-2">
                      {project?.technologies
                        ?.filter((tech:string) =>
                          ["Node.js", "Python", "PostgreSQL", "MongoDB", "Express", "FastAPI", "Prisma"]?.includes(tech),
                        )
                        ?.map((tech:string) => (
                          <Badge key={tech} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Tools & Services</h4>
                    <div className="flex flex-wrap gap-2">
                      {project?.technologies
                        ?.filter((tech:string) =>
                          ["Docker", "AWS", "Vercel", "Stripe", "Socket.io", "D3.js", "Material-UI"]?.includes(tech),
                        )
                        ?.map((tech:string) => (
                          <Badge key={tech} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Project Info */}
            <Card>
              <CardHeader>
                <CardTitle>Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Status</div>
                  <Badge className={getStatusColor(project?.status)}>{project?.status?.replace("-", " ")}</Badge>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Start Date</div>
                  <div>{new Date(project?.startDate).toLocaleDateString()}</div>
                </div>
                {project?.endDate && (
                  <div>
                    <div className="text-sm font-medium text-muted-foreground mb-1">Completion Date</div>
                    <div>{new Date(project?.endDate).toLocaleDateString()}</div>
                  </div>
                )}
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Technologies</div>
                  <div className="flex flex-wrap gap-1">
                    {project?.technologies?.map((tech:string) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Links */}
            <Card>
              <CardHeader>
                <CardTitle>Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {project?.githubUrl && (
                  <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                    <Link href={project?.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      Source Code
                    </Link>
                  </Button>
                )}
                {project?.liveUrl && (
                  <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                    <Link href={project?.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Contact CTA */}
            <Card>
              <CardHeader>
                <CardTitle>Interested in Similar Work?</CardTitle>
                <CardDescription>Let&apos;s discuss your project requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/contact">Get In Touch</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Projects */}
        {relatedProjects?.length > 0 && (
          <section className="mt-16">
            <Separator className="mb-12" />
            <h2 className="text-2xl font-bold mb-8">Related Projects</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProjects?.map((relatedProject,index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={relatedProject?.images?.[0] || "https://swasthx-bucket.s3.ap-south-1.amazonaws.com/5ffee6fa772c-434f-bd01-3bf8daa560db.jpeg"}
                      alt={relatedProject?.title}
                      width={300}
                      height={150}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                      <Link href={`/projects/${relatedProject?.id}`}>{relatedProject?.title}</Link>
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{relatedProject?.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {relatedProject?.technologies?.slice(0, 3).map((tech:string) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
