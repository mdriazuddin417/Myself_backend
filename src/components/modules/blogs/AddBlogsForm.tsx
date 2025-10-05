"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import RichTextEditor from "@/components/shared/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { BlogPost } from "@/lib/types";
import Image from "next/image";
import { toast } from "sonner";

const blogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  excerpt: z.string().max(300).optional(),
  content: z.string().min(10, "Content must be at least 10 characters"),
  featuredImage: z.string().optional(),
  published: z.boolean().optional(),
  publishedAt: z.string().optional(),
  tags: z.string().optional(),
  readTime: z.string().optional(),
});

type FormValues = z.infer<typeof blogSchema>;

type AddBlogsFormProps = {
  useCase?: "create" | "edit";
  post?: BlogPost;
};

export default function AddBlogsForm({
  post,
  useCase = "create",
}: AddBlogsFormProps) {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      published: false,
      tags: "",
      readTime: "10",
      publishedAt: "",
      featuredImage: "",
    },
  });


  // Pre-fill form for edit mode
  useEffect(() => {
    console.log({ post });
    if (post) {
      form.reset({
        title: post.title,
        excerpt: post.excerpt || "",
        content: post.content,
        published: post.published,
        publishedAt: post.publishedAt?.toString() || "",
        tags: post.tags?.join(", ") || "",
        readTime: post.readTime?.toString() || "10",
        featuredImage: post.featuredImage || "",
      });
      setImagePreview(post.featuredImage || null);
    }
  }, [post]);

  const onSubmit = async (data: FormValues) => {
  const action = useCase === "edit" ? "Updating" : "Creating";
  const successAction = useCase === "edit" ? "updated" : "created";
  const toastId = toast.loading(`${action} blog post...`);
  try {
    const res = await fetch(
      useCase === "edit"
        ? `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/post/${post?.id}`
        : `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/post`,
      {
        method: useCase === "edit" ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,tags:data?.tags?.split(","),
          readTime:data?.readTime?parseInt(data?.readTime):0,
        })
      }
    );
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      toast.error(err?.message || `Failed to ${useCase} blog post`);
      return;
    }

    await res.json();
    toast.success(`Blog post ${successAction}`, { id: toastId });
    router.push(`/admin/blog`);
  } catch (err) {
    console.error(err);
    toast.error("An unexpected error occurred", { id: toastId });
  } finally {
    toast.dismiss(toastId);
  }
};
//   const onSubmit = async (data: FormValues) => {
//   const action = useCase === "edit" ? "Updating" : "Creating";
//   const successAction = useCase === "edit" ? "updated" : "created";

//   const toastId = toast.loading(`${action} blog post...`);

//   try {
//     // const fd = new FormData();
//     // fd.append("title", data.title);
//     // fd.append("excerpt", data.excerpt || "");
//     // fd.append("content", data.content);
//     // fd.append("published", String(Boolean(data.published)));
//     // if (data.publishedAt) fd.append("publishedAt", data.publishedAt);
//     // fd.append("tags", data.tags || "");
//     // fd.append("readTime", String(data.readTime ?? 0));

//     // if (
//     //   typeof window !== "undefined" &&
//     //   typeof data.featuredImage === "object" &&
//     //   data.featuredImage &&
//     //   (data.featuredImage as any) instanceof File
//     // ) {
//     //   fd.append("featuredImage", data.featuredImage as File);
//     // }

//     const res = await fetch(
//       useCase === "edit"
//         ? `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/post/${post?.id}`
//         : `${process.env.NEXT_PUBLIC_BASE_API}/api/v1/post`,
//       {
//         method: useCase === "edit" ? "PATCH" : "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data)
//       }
//     );

//     if (!res.ok) {
//       const err = await res.json().catch(() => ({}));
//       toast.error(err?.message || `Failed to ${useCase} blog post`);
//       return;
//     }

//     await res.json();
//     toast.success(`Blog post ${successAction}`, { id: toastId });
//     router.push(`/admin/blog`);
//   } catch (err) {
//     console.error(err);
//     toast.error("An unexpected error occurred", { id: toastId });
//   } finally {
//     toast.dismiss(toastId);
//   }
// };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>
                {useCase === "edit" ? "Edit blog post" : "Create new blog post"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Title */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="My awesome post" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Excerpt */}
                  <FormField
                    control={form.control}
                    name="excerpt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Excerpt</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={3}
                            placeholder="Short summary (optional)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Content */}
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                          <RichTextEditor
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Tags */}
                    <FormField
                      control={form.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tags</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="react,nextjs,tailwind"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Read time */}
                    <FormField
                      control={form.control}
                      name="readTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Read time (minutes)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Featured Image */}
                  <FormField
                    control={form.control}
                    name="featuredImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Featured image</FormLabel>
                        <FormControl>
                             <Input type="url" {...field} />
                          {/* <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                form.setValue("featuredImage", file.name, {
                                  shouldValidate: true,
                                });
                                onImageChange(file);
                              }
                            }}
                            className="block w-full text-sm text-muted-foreground"
                          /> */}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div>
                    {imagePreview && (
                      <Image
                        src={imagePreview}
                        alt="preview"
                        className="mt-3 max-h-40 rounded-md"
                        height={400}
                        width={400}
                      />
                    )}
                  </div>

                  {/* Publish */}
                  <FormField
                    control={form.control}
                    name="published"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center gap-2">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                          />
                        </FormControl>
                        <FormLabel className="!mt-0">Publish now</FormLabel>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting
                        ? useCase === "edit"
                          ? "Updating..."
                          : "Creating..."
                        : useCase === "edit"
                        ? "Update post"
                        : "Create post"}
                    </Button>
                  </div>
                </form>
              </Form>

              <Separator className="my-6" />
              <div className="text-sm text-muted-foreground">
                Tip: For a rich-text editing experience integrate a WYSIWYG
                (e.g. TipTap) or a Markdown editor.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
