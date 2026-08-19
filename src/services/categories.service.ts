export interface BlogPost {
  title: string;
  description: string;
  is_featured: boolean;
  slug: string;
  author: string;
  author_role: string;
  category: string;
  image: string;
  created: string;
  meta_title: string;
  meta_description: string;
}

export interface BlogResponse {
  success: boolean;
  message: string;
  data: BlogPost[];
}

const API_URL = "/api/blog/categories";

export async function getBlogs(): Promise<BlogPost[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }

  const result: BlogResponse = await response.json();

  return result.data;
}