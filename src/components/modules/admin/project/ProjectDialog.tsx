import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Project } from "@/lib/types";
import { createProject, updateProject } from "@/services/ProjectService";
import { Edit } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  children: React.ReactNode;
  selectedProject: Project | null;
  setSelectedProject: React.Dispatch<React.SetStateAction<Project | null>>;
  useCase: string;
}

const ProjectDialog = ({
  children,
  selectedProject,
  setSelectedProject = () => {},
  useCase = "add",
}: Props) => {
    const session = useSession();
  const [isEditing, setIsEditing] = useState(useCase === "add" ? true : false);
  const [open, setOpen] = useState(false); // control dialog
  const updateProjectById = async () => {
    const startToastId = toast.loading("Updating project...");
    const result = await updateProject(
      selectedProject?.id as string,
      selectedProject
    );
    toast.dismiss(startToastId);
    setOpen(false);
    if (result) {
      setSelectedProject(null);
      setIsEditing(false);
      setOpen(false); // ✅ close dialog
      toast.success("Project updated successfully");
    }
  };
  const addProject = async () => {
    const startToastId = toast.loading("Creating project...");
    const result = await createProject({ ...selectedProject, userId: session.data?.user?.id });
    toast.dismiss(startToastId);
    setOpen(false);
    if (result) {
      setSelectedProject(null);
      setIsEditing(false);
      setOpen(false); // ✅ close dialog
      toast.success("Project created successfully");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {useCase === "edit" ? selectedProject?.title : "New Project"}
          </DialogTitle>
          <DialogDescription>Project details and management</DialogDescription>
        </DialogHeader>
        {selectedProject && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Title</Label>
                <Input
                  value={selectedProject.title}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setSelectedProject({
                      ...selectedProject,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>Status</Label>
                <Select
                  value={selectedProject.status}
                  disabled={!isEditing}
                  onValueChange={(value) =>
                    setSelectedProject({
                      ...selectedProject,
                      status: value as any,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                    <SelectItem value="IN-PROGRESS">In Progress</SelectItem>
                    <SelectItem value="PLANNED">Planned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={selectedProject.description}
                disabled={!isEditing}
                onChange={(e) =>
                  setSelectedProject({
                    ...selectedProject,
                    description: e.target.value,
                  })
                }
                rows={3}
              />
            </div>

            <div>
              <Label>Long Description</Label>
              <Textarea
                value={selectedProject.longDescription}
                disabled={!isEditing}
                onChange={(e) =>
                  setSelectedProject({
                    ...selectedProject,
                    longDescription: e.target.value,
                  })
                }
                rows={6}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>GitHub URL</Label>
                <Input
                  value={selectedProject.githubUrl || ""}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setSelectedProject({
                      ...selectedProject,
                      githubUrl: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>Live URL</Label>
                <Input
                  value={selectedProject.liveUrl || ""}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setSelectedProject({
                      ...selectedProject,
                      liveUrl: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div>
              <Label>Technologies (comma separated)</Label>
              <Input
                value={selectedProject.technologies.join(", ")}
                disabled={!isEditing}
                onChange={(e) =>
                  setSelectedProject({
                    ...selectedProject,
                    technologies: e.target.value
                      .split(",")
                      .map((t) => t.trim()),
                  })
                }
              />
            </div>

            {useCase === "edit" && (
              <div className="flex justify-between">
                {useCase === "edit" && (
                  <div className="flex gap-2">
                    {!isEditing ? (
                      <Button onClick={() => setIsEditing(true)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    ) : (
                      <>
                        <Button onClick={() => updateProjectById()}>
                          Save Changes
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setOpen(false);
                            setIsEditing(false);
                            setSelectedProject(null);
                          }}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
            <div className="flex justify-end">
              {useCase === "add" && (
                <Button onClick={() => addProject()}>Submit</Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDialog;
