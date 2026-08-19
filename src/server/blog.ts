import { pb } from "@/lib/pb";

import { PB_COLLECTION } from "@/shared/constants";

import type { BlogCategoryRecord, BlogPostRecord } from "@/shared/types";

export async function getBlogCategories() {
  try {
    const records = await pb
      .collection<BlogCategoryRecord>(PB_COLLECTION.BLOG_CATEGORIES)
      .getFullList();

    return records;
  } catch (error) {
    console.error("Error fetching Blog Category records:", error);

    return [];
  }
}

export async function getBlogPosts() {
  try {
    const records = await pb
      .collection<BlogPostRecord>(PB_COLLECTION.BLOG_POSTS)
      .getFullList({
        sort: "-created",
        expand: "category",
      });

    return records;
  } catch (error) {
    console.error("Error fetching Blog Post records:", error);

    return [];
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const record = await pb
      .collection<BlogPostRecord>(PB_COLLECTION.BLOG_POSTS)
      .getFirstListItem(`slug = "${slug}"`, {
        expand: "category",
      });

    return record;
  } catch (error) {
    console.error("Error fetching Blog Post record by slug:", error);

    return null;
  }
}
