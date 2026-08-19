import React from "react";
import BlogOverview from "./_components/BlogOverview";
import { getBlogCategories, getBlogPosts } from "@/server/blog";

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

    return {
      id: post.id,
      slug: post.slug || post.id,
      title: post.title,
      category: categoryTitle,
      categoryId: post.category,
      date: post.created
        ? new Date(post.created).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "",
      image: post.image,
      collectionId: post.collectionId,
    };
  });

  return <BlogOverview categories={categories} initialPosts={blogPosts} />;
}


