import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import React from "react";

export default function BehindObsidian() {
  return (
    <div>
      <LayoutWrapper>
        <p className="text-[42px] max-w-[435px] leading-[110%] tracking-[-0.3px]">
          The Intelligence Behind Obsidian
        </p>
        {/* <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={handlePrev}
                              aria-label="Previous slide"
                              className="flex h-10 w-10 items-center justify-center cursor-pointer bg-[#E2E8F0] text-gray-700 transition-colors hover:bg-gray-300"
                            >
                              <DropdownArrow className="rotate-[90deg]" />
                            </button>
                            <button
                              type="button"
                              onClick={handleNext}
                              aria-label="Next slide"
                              className="flex h-10 w-10 items-center justify-center cursor-pointer bg-[#E2E8F0] text-gray-700 transition-colors hover:bg-gray-300"
                            >
                              <DropdownArrow className="rotate-[-90deg]" />
                            </button>
                          </div> */}
      </LayoutWrapper>
    </div>
  );
}
