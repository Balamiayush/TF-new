"use client";

import Image from "next/image";
import React, { useRef } from "react";

import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import { DropdownArrow } from "@/shared/icons/DropdownArrow";

const CARDS_DATA = [
  {
    id: 1,
    title: "Single Frame Liveness Detection",
    description: "Blocks deepfakes and spoofs. Verifies real humans from a single image.",
    image: "https://i.pinimg.com/1200x/54/42/7e/54427e6a1a808807e3b3e909d58de075.jpg",
  },
  {
    id: 2,
    title: "Document forgery detection",
    description: "Import a CAD or PDF and lay out chargers directly on the architect's drawing.",
    image: "https://i.pinimg.com/1200x/4b/41/88/4b418864b00bc52845e4db6735593bee.jpg",
  },
  {
    id: 3,
    title: "Extract documents in your language.",
    description: "Our system accurately reads identity documents—no manual entry.",
    image: "https://i.pinimg.com/1200x/c3/7c/8d/c37c8d887c04bce699b62739ed1d18f1.jpg",
  },
  {
    id: 4,
    title: "Billion-Scale Face Matching (1:N search)",
    description: "Import a CAD or PDF and lay out chargers directly on the architect's drawing.",
    image: "https://i.pinimg.com/736x/1b/41/5b/1b415bb5950c9d3a11324c447e40b530.jpg",
  },
];

export default function BehindObsidian() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -389, // Card width (365px) + gap (24px)
        behavior: "smooth",
      });
    }
  };

  const handleNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 389,
        behavior: "smooth",
      });
    }
  };

  return (
   
     <div className="w-full overflow-hidden lg:py-[84px] py-[48px]">
  <LayoutWrapper>
    {/* Header */}
    <div className="flex items-center justify-between ">
      <p className="md:max-w-[435px] max-w-[200px]  text-[26px] lg:text-[32px]  font-medium leading-[110%] tracking-[-0.3px] md:text-[42px]">
        The Intelligence Behind Obsidian
      </p>

      {/* Arrow Buttons */}
      <div className="lg:flex items-center gap-1.5 hidden ">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous slide"
          className="flex h-10 w-10 cursor-pointer items-center justify-center bg-[#E2E8F0] text-gray-700 transition-colors hover:bg-gray-300"
        >
          <DropdownArrow className="rotate-[90deg]" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next slide"
          className="flex h-10 w-10 cursor-pointer items-center justify-center bg-[#E2E8F0] text-gray-700 transition-colors hover:bg-gray-300"
        >
          <DropdownArrow className="rotate-[-90deg]" />
        </button>
      </div>
    </div>
  </LayoutWrapper>

<div className="w-full pl-4 md:pl-8 lg:px-0 lg:pl-[calc(max(0px,100vw-1376px)/2)]">
  <div
    ref={scrollContainerRef}
    className="no-scrollbar mt-8 flex w-full gap-4 overflow-x-auto scroll-smooth pb-4 pr-4 md:mt-12 md:gap-6 md:pr-8 lg:pr-[calc((100vw-1376px)/2)]"
    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
  >
    {CARDS_DATA.map((card) => (
      <div
        key={card.id}
        className="flex h-[400px] w-[280px] shrink-0 flex-col justify-between rounded-lg border border-slate-100 bg-[#F3F7FC] p-3 md:h-[480px] md:w-[365px] md:p-8"
      >
        {/* Image Container */}
        <div className="relative h-[180px] w-full overflow-hidden rounded-lg bg-white/50 md:h-[220px]">
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="object-cover object-top"
          />
        </div>

        {/* Text Container */}
        <div className="flex flex-col gap-2 md:gap-3">
          <p className="max-w-[251px] text-xl font-medium leading-[120%] tracking-[-0.3px] text-slate-900 md:text-[24px]">
            {card.title}
          </p>
          <p className="font-inter text-xs leading-[18px] text-slate-600 md:text-[14px] md:leading-[20px]">
            {card.description}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>
</div>
   
  );
}