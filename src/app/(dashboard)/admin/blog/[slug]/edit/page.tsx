import AddBlogsForm from "@/components/modules/blogs/AddBlogsForm";
import { getBlogBySlug } from "@/services/PostServices";

const EditSingleBlog = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const post = await getBlogBySlug(slug);

  return (
    <div>
      <AddBlogsForm post={post} useCase={"edit"} />
    </div>
  );
};

export default EditSingleBlog;
