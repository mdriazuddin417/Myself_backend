

"use client"

import SingleBlogTableRow from "@/components/modules/admin/blog/SingleBlogTableRow"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BlogPost } from "@/lib/types"
import { Edit, Eye, Plus, Search, TrendingUp } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function AdminBlogTable({initialBlogPosts}: {initialBlogPosts: BlogPost[]}) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "published" | "draft">("all")

  // Filter posts based on search and status
  const filteredPosts = initialBlogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "published" && post.published) ||
      (filterStatus === "draft" && !post.published)
    return matchesSearch && matchesStatus
  })

  const publishedCount = initialBlogPosts.filter((post) => post.published).length
  const draftCount = initialBlogPosts.filter((post) => !post.published).length
  const totalViews = initialBlogPosts.reduce((sum, post) => sum + post.views, 0)

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Blog Management</h1>
            <p className="text-muted-foreground">Manage your blog posts and articles</p>
          </div>
          <Button asChild>
            <Link href="/admin/blog/new">
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published Posts</CardTitle>
              <Eye className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{publishedCount}</div>
              <p className="text-xs text-muted-foreground">Live on your blog</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Draft Posts</CardTitle>
              <Edit className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{draftCount}</div>
              <p className="text-xs text-muted-foreground">Waiting to be published</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">All time views</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Posts</CardTitle>
            <CardDescription>Manage and organize your blog content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterStatus === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("all")}
                >
                  All ({initialBlogPosts.length})
                </Button>
                <Button
                  variant={filterStatus === "published" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("published")}
                >
                  Published ({publishedCount})
                </Button>
                <Button
                  variant={filterStatus === "draft" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilterStatus("draft")}
                >
                  Drafts ({draftCount})
                </Button>
              </div>
            </div>

            {/* Posts Table */}
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-[70px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.map((post) => (<SingleBlogTableRow key={post.id} post={post} />))}
                </TableBody>
              </Table>
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No posts found matching your criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
