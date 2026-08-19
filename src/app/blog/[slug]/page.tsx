import { notFound } from "next/navigation";
import BlogDetailsPage from "./_component/BlogDetailsPage";
import { getBlogPostBySlug } from "@/server/blog";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const rawPost: any = await getBlogPostBySlug(slug);

  if (!rawPost) {
    notFound();
  }

  const blogDetails = {
    ...rawPost,
    id: rawPost.id,
    slug: rawPost.slug || rawPost.id,
    title: rawPost.title,
    description: rawPost.description || "",
    content: rawPost.description || "",
    category:
      rawPost.expand?.category?.title ||
      rawPost.expand?.category?.name ||
      rawPost.category ||
      "General",
    categoryId: rawPost.category,
    date: rawPost.created
      ? new Date(rawPost.created).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "",
    image: rawPost.image,
    author: rawPost.author || "Unknown",
    author_role: rawPost.author_role || "",
    collectionId: rawPost.collectionId,
  };

  return <BlogDetailsPage blogDetails={blogDetails} />;
}
