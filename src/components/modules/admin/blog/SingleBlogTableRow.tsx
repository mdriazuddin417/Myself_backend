import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { BlogPost } from "@/lib/types";
import { deleteBlogById } from "@/services/PostServices";
import { Calendar, Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const SingleBlogTableRow = ({ post }: { post: BlogPost }) => {
  const handleDeleteBlog = async () => {
    const startToastId = toast.loading("Deleting blog post...");
    const result = await deleteBlogById(post.id);
    console.log({ result });
    if (result) {
      toast.success("Blog post deleted successfully");
    }
    toast.dismiss(startToastId);
  };

  return (
    <TableRow>
      <TableCell>
        <div>
          <div className="font-medium line-clamp-1">{post.title}</div>
          <div className="text-sm text-muted-foreground line-clamp-1">
            {post.excerpt}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge variant={post.published ? "default" : "secondary"}>
          {post.published ? "Published" : "Draft"}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <Eye className="w-3 h-3 text-muted-foreground" />
          <span>{post.views}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Calendar className="w-3 h-3" />
          <span>
            {new Date(post.publishedAt ?? "")?.toLocaleDateString() ||
              new Date(post.createdAt ?? "").toLocaleDateString()}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/admin/blog/${post.slug}/edit`}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Link>
            </DropdownMenuItem>
            {post.published && (
              <DropdownMenuItem asChild>
                <Link href={`/blog/${post.slug}`} target="_blank">
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => handleDeleteBlog()}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default SingleBlogTableRow;
