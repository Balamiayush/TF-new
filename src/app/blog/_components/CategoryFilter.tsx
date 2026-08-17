import React from "react";
import Button from "@/shared/ui/buttons/Button";
import { CategoryFilterProps } from "../type";

export default function CategoryFilter({
  categories,
  activeCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex w-full items-center gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] md:flex-wrap md:overflow-visible md:pb-0 max-md:[&::-webkit-scrollbar]:hidden">
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        return (
          <div
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className="group shrink-0 cursor-pointer"
          >
            <Button
              variant="tertiary"
              className={isActive ? "bg-[#000000] text-white" : "bg-[#F1F1F1]"}
            >
              {category.name}{" "}
              <span
                className={`font-geist-pixel-square ${
                  isActive
                    ? "text-white"
                    : "text-blue-500 group-hover:text-white"
                }`}
              >
                [{category.count}]
              </span>
            </Button>
          </div>
        );
      })}
    </div>
  );
}
