"use client";

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
import { getAllProject } from "@/services/ProjectService";
import { Edit } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const BestProjectAdmin = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    const response = await getAllProject();
    setProjects(response);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Projects</CardTitle>
          <CardDescription>Your latest projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projects.slice(0, 3).map((project: Project) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-medium line-clamp-1">{project.title}</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span>
                      {project.createdAt
                        ? new Date(project.createdAt).toLocaleDateString()
                        : "Draft"}
                    </span>
                    <Badge
                      variant={
                        project.status === "COMPLETED"
                          ? "default"
                          : project.status === "IN-PROGRESS"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {project.status.replace("-", " ")}
                    </Badge>
                    {project.featured && (
                      <Badge variant="destructive">Featured</Badge>
                    )}
                  </div>
                </div>
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/admin/projects`}>
                    <Edit className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <Button asChild variant="outline" className="w-full bg-transparent">
              <Link href="/admin/projects">View All Projects</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BestProjectAdmin;
