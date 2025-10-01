"use client"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, Users, Eye, Calendar, Globe, Smartphone, Monitor, ArrowUp, ArrowDown } from "lucide-react"
import { dummyBlogPosts, dummyProjects, dummyContactMessages } from "@/lib/dummy-data"

// Mock analytics data
const analyticsData = {
  pageViews: {
    total: 15420,
    change: 12.5,
    trend: "up",
  },
  uniqueVisitors: {
    total: 8340,
    change: 8.2,
    trend: "up",
  },
  bounceRate: {
    total: 32.1,
    change: -5.3,
    trend: "down",
  },
  avgSessionDuration: {
    total: "3m 42s",
    change: 15.7,
    trend: "up",
  },
  topPages: [
    { path: "/", views: 4520, change: 8.5 },
    { path: "/blog", views: 3210, change: 15.2 },
    { path: "/projects", views: 2890, change: -2.1 },
    { path: "/about", views: 2340, change: 22.3 },
    { path: "/resume", views: 1680, change: 5.7 },
    { path: "/contact", views: 780, change: -8.4 },
  ],
  deviceTypes: [
    { type: "Desktop", percentage: 58.3, visitors: 4865 },
    { type: "Mobile", percentage: 35.2, visitors: 2936 },
    { type: "Tablet", percentage: 6.5, visitors: 542 },
  ],
  referralSources: [
    { source: "Direct", percentage: 42.1, visitors: 3511 },
    { source: "Google", percentage: 28.7, visitors: 2394 },
    { source: "LinkedIn", percentage: 12.3, visitors: 1026 },
    { source: "GitHub", percentage: 8.9, visitors: 742 },
    { source: "Twitter", percentage: 5.2, visitors: 434 },
    { source: "Other", percentage: 2.8, visitors: 233 },
  ],
  monthlyData: [
    { month: "Jan", views: 1200, visitors: 680 },
    { month: "Feb", views: 1450, visitors: 820 },
    { month: "Mar", views: 1680, visitors: 950 },
    { month: "Apr", views: 1320, visitors: 740 },
    { month: "May", views: 1890, visitors: 1050 },
    { month: "Jun", views: 2100, visitors: 1180 },
  ],
}

export default function AdminAnalyticsPage() {
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

  const formatChange = (change: number) => {
    const isPositive = change > 0
    return (
      <div className={`flex items-center gap-1 text-sm ${isPositive ? "text-green-600" : "text-red-600"}`}>
        {isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
        {Math.abs(change)}%
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Website performance and visitor insights</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Page Views</CardTitle>
              <Eye className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.pageViews.total.toLocaleString()}</div>
              {formatChange(analyticsData.pageViews.change)}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
              <Users className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.uniqueVisitors.total.toLocaleString()}</div>
              {formatChange(analyticsData.uniqueVisitors.change)}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.bounceRate.total}%</div>
              {formatChange(analyticsData.bounceRate.change)}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
              <Calendar className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.avgSessionDuration.total}</div>
              {formatChange(analyticsData.avgSessionDuration.change)}
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Top Pages */}
          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
              <CardDescription>Most visited pages this month</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Page</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead>Change</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analyticsData.topPages.map((page, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{page.path}</TableCell>
                      <TableCell>{page.views.toLocaleString()}</TableCell>
                      <TableCell>{formatChange(page.change)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Device Types */}
          <Card>
            <CardHeader>
              <CardTitle>Device Types</CardTitle>
              <CardDescription>Visitor device breakdown</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {analyticsData.deviceTypes.map((device, index) => {
                const Icon = device.type === "Desktop" ? Monitor : device.type === "Mobile" ? Smartphone : Globe
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{device.type}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm text-muted-foreground">{device.visitors.toLocaleString()} visitors</div>
                      <Badge variant="secondary">{device.percentage}%</Badge>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Referral Sources */}
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where your visitors come from</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {analyticsData.referralSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <span className="font-medium">{source.source}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm text-muted-foreground">{source.visitors.toLocaleString()} visitors</div>
                    <Badge variant="outline">{source.percentage}%</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Content Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Content Performance</CardTitle>
              <CardDescription>Blog posts and project engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Top Blog Posts</h4>
                  <div className="space-y-2">
                    {dummyBlogPosts
                      .sort((a, b) => b.views - a.views)
                      .slice(0, 3)
                      .map((post) => (
                        <div key={post.id} className="flex justify-between items-center text-sm">
                          <span className="truncate flex-1 mr-2">{post.title}</span>
                          <Badge variant="secondary">{post.views} views</Badge>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Project Engagement</h4>
                  <div className="space-y-2">
                    {dummyProjects
                      .filter((p) => p.featured)
                      .slice(0, 3)
                      .map((project) => (
                        <div key={project.id} className="flex justify-between items-center text-sm">
                          <span className="truncate flex-1 mr-2">{project.title}</span>
                          <Badge variant={project.status === "completed" ? "default" : "secondary"}>
                            {project.status}
                          </Badge>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Contact Engagement</h4>
                  <div className="text-sm text-muted-foreground">
                    <p>{dummyContactMessages.length} total messages</p>
                    <p>{dummyContactMessages.filter((m) => !m.read).length} unread messages</p>
                    <p>Avg. response time: 2.3 hours</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
