import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { BlogPost } from "@/lib/types";
import { Calendar, Clock, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SingleBlogPost = ({ post }: { post: BlogPost }) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 pt-0">
      <div className="relative overflow-hidden rounded-t-lg">
        <Image
          src={post.featuredImage || "/placeholder.svg?height=200&width=400"}
          alt={post.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader>
        <div className="flex flex-wrap gap-2 mb-2">
          {post.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <CardTitle className="text-lg group-hover:text-primary transition-colors">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {post.excerpt}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>
                {new Date(post.publishedAt ?? "").toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{post.readTime}m</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>{post.views}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SingleBlogPost;
