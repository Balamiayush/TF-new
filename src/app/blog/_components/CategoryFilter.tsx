import React, { memo, useEffect } from "react";
import Button from "@/shared/ui/buttons/Button";
import { CategoryFilterProps } from "../type";

const ALL_CATEGORY_ID = "-1";

function CategoryFilter({
  categories = [],
  activeCategory = ALL_CATEGORY_ID,
  onSelectCategory,
}: CategoryFilterProps) {
  useEffect(() => {
    console.log("Categories in Filter:", categories);
    console.log("Current Active Category ID:", activeCategory);
  }, [categories, activeCategory]);

  const totalCount = categories.reduce(
    (acc, cat: any) => acc + (cat.count ?? 0),
    0
  );

  const allCategoryItem = {
    id: ALL_CATEGORY_ID,
    title: "All",
    count: totalCount,
  };

  const categoryList = [allCategoryItem, ...categories];

  return (
    <div className="flex w-full items-center gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] md:flex-wrap md:overflow-visible md:pb-0 max-md:[&::-webkit-scrollbar]:hidden">
      {categoryList.map((category: any) => {
        const isActive = String(activeCategory) === String(category.id);
        const categoryLabel = category.title || category.name || "All";
        const categoryCount = category.count ?? 0;

        return (
          <div
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className="group shrink-0 cursor-pointer"
          >
            <Button
              variant="tertiary"
              className={isActive ? "bg-[#000000] text-white" : "bg-[#F1F1F1] hover:bg-[#D9D9D9] hover:text-[#101010] "}
            >
              {categoryLabel}{" "}
              <span
                className={`font-geist-pixel-square ${
                  isActive ? "text-white" : "text-blue-500  " 
                }`}
              >
                [{categoryCount}]
              </span>
            </Button>
          </div>
        );
      })}
    </div>
  );
}

export default memo(CategoryFilter);