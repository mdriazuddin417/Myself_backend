import AdminBlogTable from "@/components/modules/admin/blog/AdminBlogTable";
import { getAllBlog } from "@/services/PostServices";

const AdminBlogsPageWrapper = async() => {
  const blogPosts = await getAllBlog();

  return <AdminBlogTable initialBlogPosts={blogPosts} />;
};

export default AdminBlogsPageWrapper;