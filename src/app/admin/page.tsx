"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, FolderOpen, Mail, Eye, Plus, Edit, BarChart3 } from "lucide-react"
import Link from "next/link"
import { dummyBlogPosts, dummyProjects, dummyContactMessages } from "@/lib/dummy-data"

export default function AdminDashboard() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

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

  const publishedPosts = dummyBlogPosts.filter((post) => post.published)
  const draftPosts = dummyBlogPosts.filter((post) => !post.published)
  const unreadMessages = dummyContactMessages.filter((msg) => !msg.read)
  const totalViews = dummyBlogPosts.reduce((sum, post) => sum + post.views, 0)

  const stats = [
    {
      title: "Published Posts",
      value: publishedPosts.length,
      description: `${draftPosts.length} drafts`,
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: "Projects",
      value: dummyProjects.length,
      description: `${dummyProjects.filter((p) => p.featured).length} featured`,
      icon: FolderOpen,
      color: "text-green-600",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: "Messages",
      value: dummyContactMessages.length,
      description: `${unreadMessages.length} unread`,
      icon: Mail,
      color: "text-orange-600",
      bgColor: "bg-orange-100 dark:bg-orange-900/20",
    },
    {
      title: "Total Views",
      value: totalViews.toLocaleString(),
      description: "All time",
      icon: Eye,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
  ]

  const quickActions = [
    {
      title: "New Blog Post",
      description: "Create a new article",
      icon: Plus,
      href: "/admin/blog/new",
      color: "bg-primary text-primary-foreground",
    },
    {
      title: "Manage Blog",
      description: "Edit existing posts",
      icon: Edit,
      href: "/admin/blog",
      color: "bg-secondary text-secondary-foreground",
    },
    {
      title: "View Analytics",
      description: "Check performance",
      icon: BarChart3,
      href: "/admin/analytics",
      color: "bg-accent text-accent-foreground",
    },
  ]

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <div className={`p-2 rounded-full ${stat.bgColor}`}>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {quickActions.map((action) => {
                  const Icon = action.icon
                  return (
                    <Button
                      key={action.title}
                      asChild
                      variant="outline"
                      className="w-full justify-start h-auto p-4 bg-transparent"
                    >
                      <Link href={action.href}>
                        <div className={`p-2 rounded-md mr-3 ${action.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{action.title}</div>
                          <div className="text-sm text-muted-foreground">{action.description}</div>
                        </div>
                      </Link>
                    </Button>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Posts */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Blog Posts</CardTitle>
                <CardDescription>Your latest articles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dummyBlogPosts.slice(0, 3).map((post) => (
                    <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium line-clamp-1">{post.title}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span>{post.publishedAt?.toLocaleDateString() || "Draft"}</span>
                          <Badge variant={post.published ? "default" : "secondary"}>
                            {post.published ? "Published" : "Draft"}
                          </Badge>
                          <span>{post.views} views</span>
                        </div>
                      </div>
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/admin/blog/${post.id}/edit`}>
                          <Edit className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href="/admin/blog">View All Posts</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Messages */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>Latest contact form submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dummyContactMessages.slice(0, 3).map((message) => (
                    <div key={message.id} className="flex items-start justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{message.name}</h3>
                          {!message.read && (
                            <Badge variant="destructive" className="text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-1">{message.subject}</p>
                        <p className="text-xs text-muted-foreground mt-1">{message.createdAt.toLocaleDateString()}</p>
                      </div>
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/admin/messages/${message.id}`}>View</Link>
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href="/admin/messages">View All Messages</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
