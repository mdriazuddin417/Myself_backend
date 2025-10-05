
import { BlogPost, Project } from "@/lib/types";
import { getAllBlog } from "@/services/PostServices";
import { getAllProject } from "@/services/ProjectService";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const allPosts = await getAllBlog();
  const allProject = await getAllProject();



  // Static pages
  const staticPages = [
    {
      url: process.env.NEXT_PUBLIC_BASE_API,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_API}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_API}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_API}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_API}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_API}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ]

  // Blog posts
  const blogPages = allPosts
    .filter((post: BlogPost) => post.published)
    .map((post: BlogPost) => ({
      url: `${process.env.NEXT_PUBLIC_BASE_API}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))

  // Projects
  const projectPages = allProject.map((project: Project) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_API}/projects/${project.id}`,
    lastModified: project.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticPages, ...blogPages, ...projectPages]
}
