"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import Button from "@/shared/ui/buttons/Button";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    id: "cdd",
    label: "Customer Due Diligence",
    title: "Run KYC as a continuous risk process, not a onetime check",
    bgColor: "bg-blue-500",
  },
  {
    id: "crr",
    label: "Customer Risk Rating",
    title: "Continuously evaluate risk and update customer profiles in real time",
    bgColor: "bg-[#CB6BED]",
  },
  {
    id: "kyb",
    label: "KYB Owner Screening",
    title: "Verify ultimate beneficial owners across global registry data",
    bgColor: "bg-blue-500",
  },
  {
    id: "idv",
    label: "Workforce IDV",
    title: "Seamless workforce identity verification for enterprise security",
    bgColor: "bg-[#CB6BED]",
  },
];

export default function StickyProductSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        blockRefs.current.forEach((block, index) => {
          if (!block) return;
          ScrollTrigger.create({
            trigger: block,
            start: "top 30%",
            end: "bottom 30%",
            onEnter: () => setActiveIndex(index),
            onEnterBack: () => setActiveIndex(index),
          });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleTabClick = (index: number) => {
    setActiveIndex(index);
    const targetBlock = blockRefs.current[index];
    if (targetBlock) {
      targetBlock.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="bg-brand-50 min-h-screen w-full py-12 md:py-16 lg:py-24"
    >
      <LayoutWrapper>
        <div className="relative flex w-full flex-col justify-between gap-10 lg:flex-row lg:gap-12">
          <div className="top-40 flex w-full flex-col lg:sticky lg:h-full lg:max-w-[562px]">
            <h3
              ref={titleRef}
              className="max-w-[498px] text-[28px] font-medium leading-[1.2] tracking-[-0.3px] text-black transition-all duration-300 lg:text-[42px]"
            >
              {FEATURES[activeIndex].title}
            </h3>

            <div className="mt-6 flex w-full gap-2 overflow-x-auto pb-2 scrollbar-none md:mt-8 lg:mt-[48px] lg:flex-wrap lg:overflow-visible lg:pb-0">
              {FEATURES.map((feature, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={feature.id}
                    onClick={() => handleTabClick(idx)}
                    className={`shrink-0 whitespace-nowrap px-4 py-2 text-[14px] font-medium transition-all duration-200 sm:text-[16px] ${
                      isActive
                        ? "text-alpha-light-1000 bg-white shadow-xs"
                        : "bg-alpha-dark-400 text-alpha-light-1000"
                    }`}
                  >
                    {feature.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-[48px]">
              <Button>Book a demo</Button>
            </div>
          </div>

          <div className="flex w-full flex-col gap-6 sm:gap-8 lg:w-auto lg:gap-10">
            {FEATURES.map((feature, idx) => (
              <div
                key={feature.id}
                ref={(el) => {
                  blockRefs.current[idx] = el;
                }}
                className={`h-[280px] w-full rounded-xl sm:h-[380px] lg:h-[479px] lg:w-[659px] ${feature.bgColor}`}
              />
            ))}
          </div>
        </div>
      </LayoutWrapper>
    </div>
  );
}