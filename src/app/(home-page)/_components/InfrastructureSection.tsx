"use client";
import React, { useRef, useState } from "react";

import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";

import { DropdownArrow } from "@/shared/icons/DropdownArrow";
import GitterImage from "@/shared/ui/GitterImg";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    logo: "vianet",
    quote:
      "“ThirdFactor supports our digital onboarding, helping teams spot forged documents while verifying customers.”",
    bgGradient: "bg-[#C262F6]",
    imageSrc:
      "https://images.pexels.com/photos/9784237/pexels-photo-9784237.jpeg",
    stats: [
      { value: "70%", label: "Fewer manual review escalations" },
      { value: "3x", label: "Faster document verification cycles" },
      { value: "99%+", label: "Local document accuracy target" },
    ],
  },
  {
    id: 2,
    logo: "vianet",
    quote:
      "“ThirdFactor supports our digital onboarding, helping teams spot forged documents while verifying customers.”",
    bgGradient: "bg-[#0088D4]", // Blue card background
    imageSrc:
      "https://images.pexels.com/photos/9784237/pexels-photo-9784237.jpeg",
    stats: [
      { value: "70%", label: "Fewer manual review escalations" },
      { value: "3x", label: "Faster document verification cycles" },
      { value: "99%+", label: "Local document accuracy target" },
    ],
  },
];

export default function Infrastructure() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollToCard = (index: number) => {
    setCurrentIndex(index);
    if (scrollContainerRef.current) {
      const isDesktop = window.innerWidth >= 1024;
      const cardWidth = isDesktop ? 880 : 334;
      const gap = 24;
      scrollContainerRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: "smooth",
      });
    }
  };

  const handlePrev = () => {
    const nextIndex =
      currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    scrollToCard(nextIndex);
  };

  const handleNext = () => {
    const nextIndex =
      currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
    scrollToCard(nextIndex);
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#EDF4FF47] pt-16 pb-16 lg:pt-30 lg:pb-20">
      <GitterImage />

      <div className="relative z-10">
        <LayoutWrapper>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <h2 className="max-w-[358px] text-[26px] leading-[115%] font-medium tracking-tight text-black lg:max-w-[646px] lg:text-[42px]">
              Infrastructure trusted in high volume, regulated environments.
            </h2>

            <div className="hidden items-center gap-3 self-end md:self-auto lg:flex">
              <div className="flex items-center gap-1.5">
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
          </div>
        </LayoutWrapper>

        <div className="w-full pr-0 pl-6 lg:pl-[calc(max(0px,100vw-1376px)/2)]">
          <div className="mt-8 lg:mt-14">
            <div
              ref={scrollContainerRef}
              className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-4 [scrollbar-width:none] lg:px-8 [&::-webkit-scrollbar]:hidden"
            >
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  /* Changed h-[334px] -> min-h-[334px] h-auto on mobile so gaps don't cause text overflow */
                  className={`relative flex shrink-0 snap-start overflow-hidden text-white opacity-100 ${item.bgGradient} h-auto min-h-[334px] w-[334px] flex-col justify-between rounded-[8px] p-4 lg:h-[472px] lg:min-h-[472px] lg:w-[880px] lg:flex-row lg:p-0`}
                >
                  {/* Content Box with your requested gap-8 */}
                  <div className="z-10 flex h-full w-full flex-col gap-8 lg:w-[480px] lg:justify-between lg:p-10">
                    <div className="flex flex-col gap-[24px]">
                      <div className="flex items-center text-[22px] font-bold tracking-tight lowercase lg:text-[28px]">
                        v<span className="text-red-500">i</span>anet
                      </div>

                      <p className="font-geist text-[20px] leading-[125%] font-normal tracking-tight text-white/95 lg:text-[24px] lg:font-medium">
                        {item.quote}
                      </p>
                    </div>

                    {/* Stats List Block (Gap: 16px) */}
                    <div className="flex flex-col gap-[16px] lg:grid lg:grid-cols-3 lg:gap-4 lg:border-t lg:border-white/20 lg:pt-6">
                      {item.stats.map((stat, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between lg:flex-col lg:items-start lg:gap-0"
                        >
                          <span className="font-geist w-[70px] shrink-0 text-[24px] leading-none font-medium lg:w-auto lg:text-[28px]">
                            {stat.value}
                          </span>
                          <span className="font-inter text-[14px] leading-[120%] text-white/90 max-md:max-w-[162px] lg:mt-1.5 lg:text-[11px] lg:text-white/80">
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Desktop Side Image */}
                  <div className="relative hidden h-[472px] w-[520px] lg:block">
                    {item.imageSrc ? (
                      <Image
                        fill
                        src={item.imageSrc}
                        alt="Venue showcase"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-black/10" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// if new card added then layout should be in pink blue pink blue 