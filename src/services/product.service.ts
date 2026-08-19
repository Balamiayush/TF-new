import { notFound } from "next/navigation";
import {
  Product,
  ProductsResponse,
  ProductDetail,
} from "./types/product.type";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://pb.thirdfactor.ai/";

export async function getProductDropDown(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/api/product`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }


  const result: ProductsResponse = await res.json();
console.log(result);


  return result.data ?? [];
}

export async function getProductDetail(
  slug: string
): Promise<ProductDetail> {
  const res = await fetch(`${BASE_URL}/api/product/details/${slug}`, {
    next: { revalidate: 60 },
  });

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error(
      `Failed to fetch product detail. Status: ${res.status}`
    );
  }

  const result = await res.json();

  if (!result?.data) {
    notFound();
  }

  return result.data as ProductDetail;
}


// import { getProductDetails, getProducts } from "@/lib/server/products";
// import { Product, ProductDetail } from "./types/product.type";

// export async function getProductDropDown(): Promise<Product[]> {
//   try {
//     const products = await getProducts();

//     return products.map((p: any) => ({
//       slug: p.slug,
//       title: p.title,
//       description: p.description,
//       icon: p.icon,
//     }));
//   } catch (error) {
//     console.error("Failed to fetch product dropdown:", error);
//     return [];
//   }
// }

// export async function getProductDetail(
//   slug: string
// ): Promise<ProductDetail> {
//   try {
//     const product = await getProductDetails(slug);

//     if (!product) {
//       throw new Error(`Product not found: ${slug}`);
//     }

//     return product as ProductDetail;
//   } catch (error) {
//     console.error(`Failed to fetch product detail for "${slug}":`, error);
//     throw error; // rethrow so page can handle it (e.g. notFound())
//   }
// }