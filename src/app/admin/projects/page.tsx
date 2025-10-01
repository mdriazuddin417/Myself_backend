"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FolderOpen, Search, Eye, Edit, Trash2, Plus, Star } from "lucide-react"
import { dummyProjects } from "@/lib/dummy-data"

export default function AdminProjectsPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [projects, setProjects] = useState(dummyProjects)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedProject, setSelectedProject] = useState<(typeof dummyProjects)[0] | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!user || user.role !== "admin") {
    return null
  }

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const toggleFeatured = (projectId: string) => {
    setProjects(
      projects.map((project) => (project.id === projectId ? { ...project, featured: !project.featured } : project)),
    )
  }

  const deleteProject = (projectId: string) => {
    setProjects(projects.filter((project) => project.id !== projectId))
  }

  const updateProject = (updatedProject: (typeof dummyProjects)[0]) => {
    setProjects(projects.map((project) => (project.id === updatedProject.id ? updatedProject : project)))
    setSelectedProject(null)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Projects</h1>
              <p className="text-muted-foreground">Manage your portfolio projects ({projects.length} total)</p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Project
            </Button>
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
                <SelectItem value="planned">Planned</SelectItem>
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
                    <TableRow key={project.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{project.title}</div>
                          <div className="text-sm text-muted-foreground line-clamp-1">{project.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            project.status === "completed"
                              ? "default"
                              : project.status === "in-progress"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {project.status.replace("-", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => toggleFeatured(project.id)}>
                          <Star className={`h-4 w-4 ${project.featured ? "fill-yellow-400 text-yellow-400" : ""}`} />
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
                      <TableCell>{project.updatedAt.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedProject(project)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>{project.title}</DialogTitle>
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
                                          <SelectItem value="completed">Completed</SelectItem>
                                          <SelectItem value="in-progress">In Progress</SelectItem>
                                          <SelectItem value="planned">Planned</SelectItem>
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
                                          technologies: e.target.value.split(",").map((t) => t.trim()),
                                        })
                                      }
                                    />
                                  </div>

                                  <div className="flex justify-between">
                                    <div className="flex gap-2">
                                      {!isEditing ? (
                                        <Button onClick={() => setIsEditing(true)}>
                                          <Edit className="h-4 w-4 mr-2" />
                                          Edit
                                        </Button>
                                      ) : (
                                        <>
                                          <Button onClick={() => updateProject(selectedProject)}>Save Changes</Button>
                                          <Button
                                            variant="outline"
                                            onClick={() => {
                                              setIsEditing(false)
                                              setSelectedProject(project)
                                            }}
                                          >
                                            Cancel
                                          </Button>
                                        </>
                                      )}
                                    </div>
                                    <Button
                                      variant="destructive"
                                      onClick={() => {
                                        deleteProject(project.id)
                                        setSelectedProject(null)
                                      }}
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          <Button variant="ghost" size="sm" onClick={() => toggleFeatured(project.id)}>
                            <Star className={`h-4 w-4 ${project.featured ? "fill-yellow-400 text-yellow-400" : ""}`} />
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteProject(project.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredProjects.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">No projects found matching your criteria.</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
