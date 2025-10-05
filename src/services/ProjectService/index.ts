"use server";

import { Project } from "@/lib/types";
import { revalidateTag } from "next/cache";

export const getAllProject = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/v1/project`);
  const data = await res.json();
  return data.data;
};
export const getProjectById = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/v1/project/${id}`);
  const data = await res.json();
  return data;
};
export const deleteProjectById = async (id: string) => {

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/v1/project/${id}`,{
    method: "DELETE",
  });
  const data = await res.json();
  if (data) {
    revalidateTag("PROJECTS");
  }
  return data;
};
export const createProject = async (projectData: Partial<Project>) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/v1/project`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });
  const result = await res.json();

 if (result) {
    revalidateTag("PROJECTS");
  }
  return result;
};
export const updateProject = async (id:string,updateBody: Partial<Project>) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/v1/project/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateBody),
  });

  const result = await res.json();

  if (result) {
    revalidateTag("PROJECTS");
  }
  return result;
};

