"use client";

import SingleProjectTableRow from "@/components/modules/admin/project/SingleProjectTableRow";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Project } from "@/lib/types";
import { FolderOpen, Plus, Search } from "lucide-react";
import { useState } from "react";
import ProjectDialog from "./ProjectDialog";

const init_project: Project = {

  title: "",
  description: "",
  longDescription: "",
  technologies: [],
  githubUrl: "",
  liveUrl: "",
  images: [],
  featured: true,
  status: "IN-PROGRESS",
};

export default function AdminProjectsTable({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(
    init_project
  );

  const filteredProjects = initialProjects?.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Projects
              </h1>
              <p className="text-muted-foreground">
                Manage your portfolio projects ({initialProjects?.length} total)
              </p>
            </div>

            <ProjectDialog
              useCase="add"
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
            >
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Project
              </Button>
            </ProjectDialog>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="PLANNED">Planned</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Projects Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen className="h-5 w-5" />
                Projects ({filteredProjects.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Project</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Featured</TableHead>
                    <TableHead>Technologies</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.map((project) => (
                    <SingleProjectTableRow key={project.id} project={project} />
                  ))}
                </TableBody>
              </Table>

              {filteredProjects.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No projects found matching your criteria.
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
