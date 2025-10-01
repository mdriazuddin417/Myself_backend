import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { dummyBlogPosts } from "@/lib/dummy-data"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const RecentBlogPost = () => {
      const recentBlogPosts = dummyBlogPosts.filter((post) => post.published).slice(0, 3)
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
              {recentBlogPosts.map((post) => (
                <Card key={post.id} className="group hover:shadow-lg transition-all duration-300">
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
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span>{post.publishedAt?.toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{post.readTime} min read</span>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </CardTitle>
                    <CardDescription>{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
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