import SingleBlogPost from "@/components/modules/blogs/SingleBlogPost";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { generateMetadata } from "@/lib/metadata";
import { BlogPost } from "@/lib/types";
import { getAllBlog } from "@/services/PostServices";
import { ArrowRight, Calendar, Clock, Eye, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = generateMetadata({
  title: "Blog",
  description:
    "Insights, tutorials, and thoughts on web development, technology trends, and best practices. Learn about React, Next.js, TypeScript, and modern web technologies.",
});

export default async function BlogPage() {
  const publishedPosts = await getAllBlog();
  const featuredPost = publishedPosts?.[0] || null;
  const otherPosts = publishedPosts?.slice(1);

  // Get unique tags for filter
  const allTags = Array.from(
    new Set(publishedPosts?.flatMap((post: BlogPost) => post?.tags))
  );

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">Blog</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Insights, tutorials, and thoughts on web development, technology
            trends, and best practices
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search articles..." className="pl-10" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                All
              </Button>
              {allTags?.slice(0, 5)?.map((tag, index) => (
                <Button key={index} variant="ghost" size="sm">
                  {tag as string}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Featured Article</h2>
            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative overflow-hidden">
                  <Image
                    src={
                      featuredPost.featuredImage ||
                      "/placeholder.svg?height=400&width=600"
                    }
                    alt={featuredPost.title}
                    width={600}
                    height={400}
                    className="w-full h-64 lg:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredPost.tags.slice(0, 3).map((tag : string) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                    <Link href={`/blog/${featuredPost.slug}`}>
                      {featuredPost.title}
                    </Link>
                  </h3>
                  <p className="text-muted-foreground mb-6 text-pretty">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(
                          featuredPost.publishedAt
                        )?.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{featuredPost.readTime} min read</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span>{featuredPost.views} views</span>
                    </div>
                  </div>
                  <Button asChild className="w-fit">
                    <Link href={`/blog/${featuredPost.slug}`}>
                      Read Article
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Other Posts Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">All Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts?.map((post: BlogPost) => (
              <SingleBlogPost key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-muted/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Subscribe to get notified about new articles and insights on web
            development and technology trends.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
