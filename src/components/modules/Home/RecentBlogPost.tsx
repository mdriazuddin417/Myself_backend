import { Button } from "@/components/ui/button"
import { BlogPost } from "@/lib/types"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import SingleBlogPost from "../blogs/SingleBlogPost"

const RecentBlogPost = async() => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/v1/post`, {
    next: {
      tags: ["POSTS"],
    },
  });
  const { data: recentBlogPosts } = await res.json()

    return (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Latest Blog Posts</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Insights and tutorials about web development, technology trends, and best practices
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {recentBlogPosts?.slice(0,3).map((post: BlogPost) => (<SingleBlogPost key={post.id} post={post} />))}
            </div>

            <div className="text-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/blog">
                  Read All Posts
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
    );
};

export default RecentBlogPost;