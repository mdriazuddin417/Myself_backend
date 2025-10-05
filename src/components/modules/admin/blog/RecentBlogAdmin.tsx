
"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { BlogPost } from "@/lib/types";
import { getAllBlog } from "@/services/PostServices";
import { Edit } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const RecentBlogAdmin =  () => {
 const [blogs,setBlogs] = useState<BlogPost[]>([]);

  const fetchBlogs = async () => {
    const response = await getAllBlog();
   setBlogs(response);
  };
  

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Blog Posts</CardTitle>
          <CardDescription>Your latest articles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {blogs.slice(0,3).map((post: BlogPost) => (
              <div
                key={post.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-medium line-clamp-1">{post.title}</h3>
                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                    <span>
                      {new Date(post.publishedAt ??'')?.toLocaleDateString() || "Draft"}
                    </span>
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
    </div>
  );
};

export default RecentBlogAdmin;
