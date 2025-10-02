import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Project } from "@/lib/types";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FeatureProject = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/v1/project`, {
    next: {
      tags: ["PROJECTS"],
    },
  });
  const { data: allFeaturedBlogs } = await res.json()

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Here are some of my recent projects that showcase my skills in
            full-stack development
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {allFeaturedBlogs?.length>0&&allFeaturedBlogs?.reverse()?.slice(0, 3).map((project:Project) => (
            <Card
              key={project.id}
              className="group hover:shadow-lg transition-all duration-300 pt-0"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <Image
                  src={project?.images?.[0] || "https://swasthx-bucket.s3.ap-south-1.amazonaws.com/5ffee6fa772c-434f-bd01-3bf8daa560db.jpeg"}
                  alt={project.title}
                  width={600}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription className="text-base">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-3">
                  {project.githubUrl && (
                    <Button asChild variant="outline" size="sm">
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Link>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button asChild size="sm">
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/projects">
              View All Projects
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeatureProject;
