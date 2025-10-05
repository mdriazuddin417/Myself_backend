"use client";

import BestProjectAdmin from "@/components/modules/admin/blog/BestProjectAdmin";
import RecentBlogAdmin from "@/components/modules/admin/blog/RecentBlogAdmin";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  dummyBlogPosts,
  dummyContactMessages,
  dummyProjects,
} from "@/lib/dummy-data";
import { BookOpen, Edit, Eye, FolderOpen, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const user = {
    name: "Riaz Uddin",
  };

  // useEffect(() => {
  //   if (!isLoading && (!user || user.role !== "admin")) {
  //     router.push("/login")
  //   }
  // }, [user, isLoading, router])

  // if (isLoading) {
  //   return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  // }

  // if (!user || user.role !== "admin") {
  //   return null
  // }

  const publishedPosts = dummyBlogPosts.filter((post) => post.published);
  const draftPosts = dummyBlogPosts.filter((post) => !post.published);
  const unreadMessages = dummyContactMessages.filter((msg) => !msg.read);
  const totalViews = dummyBlogPosts.reduce((sum, post) => sum + post.views, 0);

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
      title: "Total Views",
      value: totalViews.toLocaleString(),
      description: "All time",
      icon: Eye,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
  ];

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
  ];

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
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-full ${stat.bgColor}`}>
                    <Icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <BestProjectAdmin/>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <RecentBlogAdmin/>
          </div>
        </div>
      </div>
    </div>
  );
}
