export const getBlogBySlug = async (slug: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/post/${slug}`);
  return await res.json();
};
export const getProjectBySlug = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project/${id}`);
  return await res.json();
};
