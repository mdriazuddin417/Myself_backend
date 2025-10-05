"use server";

import { BlogPost } from "@/lib/types";
import { revalidateTag } from "next/cache";

export const getBlogBySlug = async (slug: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/v1/post/${slug}`);
  return await res.json();
};
export const getProjectById = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/v1/project/${id}`);
  const data = await res.json();
  return data.data;
};

export const getAllBlog = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/v1/post`,{
    next: {
      tags: ["POSTS"],
    }
  });
  const data = await res.json();
  return data.data;
};

export const deleteBlogById = async (id: string) => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/v1/post/${id}`,{
    method: "DELETE",
  });
  const data = await res.json();
  if (data) {
    revalidateTag("POSTS");
  }
  return data;
};
export const createBlog = async (blogData:  Partial<BlogPost>) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/v1/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blogData),
  });
  const result = await res.json();

 if (result) {
    revalidateTag("POSTS");
  }
  return result;
};
export const updateBlog = async (id:string,updateBody: Partial<BlogPost>) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/v1/post/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateBody),
  });

  const result = await res.json();

  if (result) {
    revalidateTag("POSTS");
  }
  return result;
};
