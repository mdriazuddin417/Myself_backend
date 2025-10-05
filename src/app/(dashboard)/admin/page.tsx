"use client";

import BestProjectAdmin from "@/components/modules/admin/blog/BestProjectAdmin";
import RecentBlogAdmin from "@/components/modules/admin/blog/RecentBlogAdmin";
import { User } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BlogPost, Project } from "@/lib/types";
import { getAllBlog } from "@/services/PostServices";
import { getAllProject } from "@/services/ProjectService";

import { BookOpen, Eye, FolderOpen } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter()
  const user = session?.user as User | undefined;

  const [allData, setAllData] = useState<{
    blogPosts: BlogPost[];
    projects: Project[];
  }>({
    blogPosts: [],
    projects: [],
  });

  // fetch once, client-side
  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      try {
        const [blogPosts, projects] = await Promise.all([
          getAllBlog(),
          getAllProject(),
        ]);
        if (!ignore) {
          setAllData({ blogPosts, projects });
        }
      } catch (err) {
        // Optional: surface an error UI/toast
        console.error("Failed to load dashboard data", err);
      }
    };
    fetchData();
    return () => {
      ignore = true;
    };
  }, []);

  const { publishedPosts, draftPosts, totalViews, stats } = useMemo(() => {
    const publishedPosts = allData.blogPosts.filter((post) => post.published);
    const draftPosts = allData.blogPosts.filter((post) => !post.published);
    const totalViews = allData.blogPosts.reduce((sum, post) => sum + post.views, 0);

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
        value: allData.projects.length,
        description: `${allData.projects.filter((p) => p.featured).length} featured`,
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

    return { publishedPosts, draftPosts, totalViews, stats };
  }, [allData]);

  // Optional: handle auth loading state (prevents hydration mismatch & undefined reads)
  const greeting =
    status === "loading" ? "..." : (user?.name ?? "there");

    // useEffect(()=>{
    //   if(!user){
    //     router.push('/login')
    //   }
    // },[])

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {greeting}!</p>
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
            <BestProjectAdmin />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <RecentBlogAdmin />
          </div>
        </div>
      </div>
    </div>
  );
}
