import React from "react";
import BlogOverview from "./_components/BlogOverview";
import { getBlogCategories, getBlogPosts } from "@/server/blog";
import { calculateReadTime } from "@/utils/get-calculate-time";
import { formatDate } from "@/utils/get-format-date";

export default async function BlogPage() {
  const [rawCategories, rawPosts] = await Promise.all([
    getBlogCategories(),
    getBlogPosts(),
  ]);

  const categoryCounts: Record<string, number> = {};
  rawPosts.forEach((post: any) => {
    if (post.category) {
      categoryCounts[post.category] = (categoryCounts[post.category] || 0) + 1;
    }
  });

  const categories = rawCategories.map((cat: any) => ({
    id: cat.id,
    name: cat.title || cat.name || "General",
    title: cat.title || cat.name || "General",
    count: categoryCounts[cat.id] || 0,
  }));

  const blogPosts = rawPosts.map((post: any) => {
    const categoryTitle =
      post.expand?.category?.title || post.expand?.category?.name || "General";

    const htmlContent = post.content || post.body || post.description || "";
    const readTimeMinutes = calculateReadTime(htmlContent);

    return {
      id: post.id,
      slug: post.slug || post.id,
      title: post.title,
      category: categoryTitle,
      categoryId: post.category,
      readTime: `${readTimeMinutes} min read`,
      readTimeMinutes,
      date: formatDate(post.created),
      image: post.image,
      collectionId: post.collectionId,
    };
  });

  return <BlogOverview categories={categories} initialPosts={blogPosts} />;
}
