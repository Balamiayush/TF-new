"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";

import { TimelineProps } from "./type";

gsap.registerPlugin(ScrollTrigger, CustomEase);
if (typeof window !== "undefined") {
  CustomEase.create("punch", "M0,0 C0.7,0 0.16,1 1,1");
  gsap.defaults({ ease: "punch" });
}

export default function TImelineMobile({
  timelineData = [],
}: TimelineProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Cards Animation
      cardRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // 2. Line Progress Animation via transform scaleY
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top 70%",
              end: "bottom bottom",
              scrub: 0.5,
            },
          }
        );
      }
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="block bg-[#F4F6FB] px-4 py-12 sm:px-6 md:px-8 lg:hidden"
    >
      <LayoutWrapper>
        <h3 className="font-geist mb-8 text-[24px] font-medium leading-[1.2] tracking-[-0.6px] text-slate-900">
          Our story
        </h3>

        <div className="relative flex flex-col items-center">
         <div className="absolute top-0 bottom-0 z-0 flex w-[56px] flex-col items-center overflow-hidden  bg-slate-200">
       
            <div
              ref={lineRef}
              style={{ transformOrigin: "top" }}
              className="h-full w-full bg-gradient-to-b from-[#3B82F6] via-[#2563EB] to-[#E879F9]"
            />
          </div>

          {/* Timeline Cards Container */}
          <div className="relative z-10 flex flex-col items-center gap-[60px] py-[40px]">
            {timelineData.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                style={{ opacity: 0 }}
                className="relative flex h-[340px] w-[335px] flex-col justify-between gap-[12px] rounded-[8px] border border-slate-200/80 bg-white/70 p-4 shadow-xl shadow-slate-200/40 backdrop-blur-md backdrop-saturate-150"
              >
                {/* Date & Title */}
                <div className="flex flex-col gap-0.5">
                  <span className="font-geist text-[12px] leading-tight text-slate-500">
                    {item.date}
                  </span>
                  <h4 className="font-geist text-[16px] font-medium leading-tight text-slate-900">
                    {item.title}
                  </h4>
                </div>

                {/* Inner White Container */}
                <div className="flex flex-col gap-[12px] rounded-[6px] border border-slate-100 bg-[var(--b-w-white,#FFFFFF)] p-2.5">
                  {item.image && (
                    <div className="relative h-[135px] w-full shrink-0 overflow-hidden rounded-[4px]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

         
                  <p className="font-geist line-clamp-3 text-[12px] leading-[135%] tracking-[-0.1px] text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </LayoutWrapper>
    </div>
  );
}