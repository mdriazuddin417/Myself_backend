"use client";

import CustomAlertDialog from "@/components/shared/CustomAlertDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

import { Project } from "@/lib/types";
import { deleteProjectById } from "@/services/ProjectService";
import { Eye, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ProjectDialog from "./ProjectDialog";

const SingleProjectTableRow = ({ project }: { project: Project }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);



  const deleteProject = async (projectId: string) => {
    const startToastId = toast.loading("Deleting project...");
    const result = await deleteProjectById(projectId);
    toast.dismiss(startToastId);
    if (result) {
      toast.success("Project deleted successfully");
    }
  };
 

  return (
    <TableRow>
      <TableCell>
        <div>
          <div className="font-medium">{project.title}</div>
          <div className="text-sm text-muted-foreground line-clamp-1">
            {project.description}
          </div>
        </div>
      </TableCell>
      <TableCell>
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
      </TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="sm"

        >
          <Star
            className={`h-4 w-4 ${
              project.featured ? "fill-yellow-400 text-yellow-400" : ""
            }`}
          />
        </Button>
      </TableCell>
      <TableCell>
        <div className="flex flex-wrap gap-1">
          {project.technologies.slice(0, 2).map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{project.technologies.length - 2}
            </Badge>
          )}
        </div>
      </TableCell>
      <TableCell>{new Date(project.updatedAt ??'')?.toLocaleDateString()}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <ProjectDialog
            selectedProject={selectedProject!}
            setSelectedProject={setSelectedProject}
            useCase="edit"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedProject(project)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </ProjectDialog>

          <Button
            variant="ghost"
            size="sm"
           
          >
            <Star
              className={`h-4 w-4 ${
                project.featured ? "fill-yellow-400 text-yellow-400" : ""
              }`}
            />
          </Button>

          <CustomAlertDialog
            onConfirm={() => deleteProject(project.id as string)}
            title="Delete Project"
            description="Are you sure you want to delete this project? This action cannot be undone."
          >
            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CustomAlertDialog>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default SingleProjectTableRow;
