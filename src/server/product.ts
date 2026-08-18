import { pb } from "@/lib/pb";

import { PB_COLLECTION } from "@/shared/constants";

import type { ProductCategoryRecord, ProductRecord } from "@/shared/types";

export async function getProductCategories() {
  try {
    const records = await pb
      .collection<ProductCategoryRecord>(PB_COLLECTION.PRODUCT_CATEGORIES)
      .getFullList();

    return records;
  } catch (error) {
    console.error("Error fetching Product Category records:", error);

    return [];
  }
}

export async function getProducts() {
  try {
    const records = await pb
      .collection<ProductRecord>(PB_COLLECTION.PRODUCTS)
      .getFullList({
        sort: "-created",
        expand: "category",
      });

    return records;
  } catch (error) {
    console.error("Error fetching Product records:", error);

    return [];
  }
}
