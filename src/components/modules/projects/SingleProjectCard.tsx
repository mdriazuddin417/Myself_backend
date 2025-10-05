import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getStatusColor } from "@/lib/colorFunction";
import { Project } from "@/lib/types";
import {
  Calendar,
  ExternalLink,
  Github
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SingleProjectCard = ({ project }: { project: Project }) => {
  return (
    <Card
      className="group hover:shadow-lg transition-all duration-300 overflow-hidden pt-0"
    >
      <div className="relative overflow-hidden">
        <Image
          src={project?.images[0] || "https://swasthx-bucket.s3.ap-south-1.amazonaws.com/5ffee6fa772c-434f-bd01-3bf8daa560db.jpeg"}
          alt={project.title}
          width={600}
          height={300}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <Badge className={getStatusColor(project.status)}>
            {project.status.replace("-", " ")}
          </Badge>
        </div>
      </div>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl group-hover:text-primary transition-colors">
              <Link href={`/projects/${project.id}`}>{project.title}</Link>
            </CardTitle>
            <CardDescription className="mt-2">
              {project.description}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.slice(0, 5).map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {String(tech)}
            </Badge>
          ))}
          {project.technologies.length > 5 && (
            <Badge variant="outline" className="text-xs">
              +{project.technologies.length - 5} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{new Date(project?.startDate ??'').getFullYear()}</span>
          </div>

          <div className="flex gap-2">
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
        </div>
      </CardContent>
    </Card>
  );
};

export default SingleProjectCard;
