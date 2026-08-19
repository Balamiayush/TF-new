import { BlogPost, Category } from "./types/blogs.type";

const PB_BASE_URL =
  process.env.NEXT_PUBLIC_POCKETBASE_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://pb.thirdfactor.ai";

export async function getBlogCategories(): Promise<Category[]> {
  try {
    const res = await fetch(
      `${PB_BASE_URL.replace(/\/$/, "")}/api/collections/blog_categories/records`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const data = await res.json();

    return (data.items || []).map((item: any) => ({
      id: item.id,
      name: item.name || item.title || "General",
      count: item.count ?? 0,
    }));
  } catch (error) {
    console.error("Failed to fetch blog categories:", error);
    return [];
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(
      `${PB_BASE_URL.replace(/\/$/, "")}/api/collections/blog_posts/records?expand=category&sort=-created`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const data = await res.json();

    return (data.items || []).map((item: any) => {
      // Build valid PocketBase image URL
      const imageUrl = item.image
        ? `${PB_BASE_URL.replace(/\/$/, "")}/api/files/${item.collectionId || item.collectionName || "blog_posts"}/${item.id}/${item.image}`
        : "/placeholder-blog.png";

      // Resolve category name from expand relation, fallback to category ID
      const categoryName =
        item.expand?.category?.name ||
        item.expand?.category?.title ||
        "General";

      return {
        id: item.id,
        title: item.title,
        slug: item.slug,
        category: categoryName,
        categoryId: item.category, // Stored to match category IDs cleanly
        date: new Date(item.created).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        image: imageUrl,
        description: item.description,
        is_featured: item.is_featured,
      };
    });
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return [];
  }
}