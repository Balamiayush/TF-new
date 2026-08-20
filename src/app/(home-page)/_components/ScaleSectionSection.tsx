"use client";

import React, { useRef } from "react";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { PixelGridSvg } from "@/shared/ui/PixelGridSvg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  CustomEase.create("punch", "M0,0 C0.7,0 0.16,1 1,1");
  gsap.defaults({ ease: "punch" });
}



const statsData = [
  { targetValue: 2.6, suffix: "M", label: "MCP calls/month" },
  { targetValue: 400, suffix: "M", label: "API calls/week" },
  { targetValue: 76, suffix: "k", label: "active customer agents" },
  { targetValue: 15, suffix: "M", label: "emails synced/day" },
];

export default function ScaleSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgWrapperRef = useRef<HTMLDivElement | null>(null);
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);

 useGSAP(
  () => {
    const container = containerRef.current;
    if (!container) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 75%",
        once: true,
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      "#fillSvg path",
      { opacity: 0 }, // Starts at opacity 0
      {
        opacity: 1,   
        stagger: { each: 0.005, from: "end" },
        duration: 0.4, 
      }
    );

    // Counter animation
    statsData.forEach((stat, idx) => {
      const el = numbersRef.current[idx];
      if (!el) return;

      const obj = { val: 0 };
      tl.to(
        obj,
        {
          val: stat.targetValue,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => {
            const formattedVal =
              stat.targetValue % 1 !== 0
                ? obj.val.toFixed(1)
                : Math.floor(obj.val).toString();
            el.innerText = `${formattedVal}${stat.suffix}`;
          },
        },
        "<+=0.1" // Starts slightly after the SVG opacity animation begins
      );
    });
  },
  { scope: containerRef }
);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[526px] w-full overflow-hidden bg-white max-lg:pt-8 lg:min-h-screen"
    >
      <div
        ref={svgWrapperRef}
        className="pointer-events-none absolute right-0 bottom-0 z-0 origin-bottom-right"
      >
        <PixelGridSvg className="pointer-events-none z-0 h-full w-full origin-bottom-right object-cover" />
      </div>

      <div className="relative z-10 flex flex-col lg:min-h-screen lg:py-20">
        <LayoutWrapper>
          <div className="lg:max-w-[720px]">
            <h2 className="font-geist text-[26px] leading-[110%] font-medium tracking-[-0.6px] max-lg:max-w-[300px] lg:text-[42px]">
              <span className="animated-heading-dark text-[#0F172A]">
                Run at any scale.{" "}
              </span>
              <span className="animated-heading-light text-[#6F7988CC]">
                Production-grade for your team and agents.
              </span>
            </h2>

            <div className="mt-14 grid gap-x-12 gap-y-6 lg:mt-[120px] lg:grid-cols-2">
              {statsData.map((stat, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="animated-indicator bg-brand-500 h-full w-[2px] shrink-0 lg:w-[4px]" />

                  <div>
                    <span
                      ref={(el) => {
                        numbersRef.current[index] = el;
                      }}
                      className="animated-stat-title font-geist block text-[24px] leading-[100%] font-medium text-[#1C1D1F] lg:text-[32px]"
                    >
                      0{stat.suffix}
                    </span>

                    <p className="animated-stat-sub font-inter mt-1.5 text-[14px] leading-[120%] text-[#505967]">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </LayoutWrapper>
      </div>
    </section>
  );
}
