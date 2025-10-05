import SingleBlogPost from "@/components/modules/blogs/SingleBlogPost";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getBlogBySlug } from "@/services/PostServices";
import { ArrowLeft, Calendar, Clock, Eye, Heart, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";


export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  return {
    title: blog?.title,
    description: blog?.content,
  };
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = [post]

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Button asChild variant="ghost" className="pl-0">
            <Link href="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag: string) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
            {post.title}
          </h1>

          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            {post.excerpt}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.publishedAt ?? "").toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} min read</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{post.views} views</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Like
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {post.featuredImage && (
            <div className="relative overflow-hidden rounded-xl mb-8">
              <Image
                src={post.featuredImage || "https://swasthx-bucket.s3.ap-south-1.amazonaws.com/5ffee6fa772c-434f-bd01-3bf8daa560db.jpeg"}
                alt={post.title}
                width={800}
                height={400}
                className="w-full h-64 lg:h-96 object-cover"
                priority
              />
            </div>
          )}
        </header>

        {/* Article Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none mb-16">
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="mb-4 leading-relaxed text-muted-foreground">
                  {children}
                </p>
              ),
              code: ({ children }) => (
                <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
                  {children}
                </pre>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>

        <Separator className="mb-12" />

        {/* Author Info */}
        <div className="mb-16">
          <Card>
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={
                      post.author.picture ||
                      "/placeholder.svg?height=64&width=64"
                    }
                    alt={post.author.name}
                    width={64}
                    height={64}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{post.author.name}</h3>
                  <p className="text-muted-foreground mb-4">
                    {post.author.bio ||
                      "Full-stack developer passionate about creating innovative web solutions."}
                  </p>
                  <div className="flex gap-4">
                    <Button asChild variant="outline" size="sm">
                      <Link href="/about">View Profile</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/contact">Contact</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (<SingleBlogPost post={relatedPost} key={relatedPost.slug}/>))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
