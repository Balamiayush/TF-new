"use client";

import { DropdownArrow } from "@/shared/icons/DropdownArrow";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import Image from "next/image";
import React, { useRef, useState } from "react";

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
    const nextIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
    scrollToCard(nextIndex);
  };

  const handleNext = () => {
    const nextIndex = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;
    scrollToCard(nextIndex);
  };

  return (
    <section className="relative w-full bg-[#EDF4FF47] pt-16 lg:pt-30 pb-16 lg:pb-20 overflow-hidden">
      <Image
        alt="gitter"
        fill
        className="w-full h-full absolute pointer-events-none object-cover z-0"
        src={"/gitter.png"}
      />
      
      <div className="relative z-10">
        <LayoutWrapper>
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <h2 className="text-[26px] lg:max-w-[732px] max-w-[358px] lg:text-[48px] leading-[115%] font-medium tracking-tight text-black">
              Infrastructure trusted in high volume, regulated environments.
            </h2>

            <div className="lg:flex hidden items-center gap-3 self-end md:self-auto">
              <div className="flex items-center gap-1.5">
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
              </div>
            </div>
          </div>
        </LayoutWrapper>

        <div className="w-full pl-6 lg:pl-[calc(max(0px,100vw-1376px)/2)] pr-0">
          <div className="mt-8 lg:mt-14">
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 lg:px-8 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  /* Changed h-[334px] -> min-h-[334px] h-auto on mobile so gaps don't cause text overflow */
                  className={`relative flex shrink-0 opacity-100 snap-start text-white overflow-hidden ${item.bgGradient}
                    w-[334px] min-h-[334px] h-auto rounded-[8px] p-4 flex-col justify-between
                    lg:w-[880px] lg:h-[472px] lg:min-h-[472px]  lg:p-0 lg:flex-row`}
                >
                  {/* Content Box with your requested gap-8 */}
                  <div className="z-10 flex flex-col gap-8 h-full w-full lg:w-[480px] lg:p-10 lg:justify-between">
                    
                    <div className="flex flex-col gap-[24px]">
                      <div className="text-[22px] lg:text-[28px] font-bold tracking-tight lowercase flex items-center">
                        v<span className="text-red-500">i</span>anet
                      </div>

                      <p className="font-geist text-[20px] lg:text-[24px] leading-[125%] font-normal lg:font-medium tracking-tight text-white/95">
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
                          <span className="font-geist text-[24px] lg:text-[28px] leading-none font-medium w-[70px] lg:w-auto shrink-0">
                            {stat.value}
                          </span>
                          <span className="font-inter max-md:max-w-[162px] text-[14px] lg:text-[11px] leading-[120%] text-white/90 lg:text-white/80 lg:mt-1.5">
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Desktop Side Image */}
                  <div className="hidden lg:block relative flex-1 overflow-hidden h-[472px]">
                    {item.imageSrc ? (
                      <img
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