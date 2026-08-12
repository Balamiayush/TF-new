"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";

import { TimelineProps } from "./type";

gsap.registerPlugin(ScrollTrigger);

export default function TImelineMobile({
  timelineData = [],
}: TimelineProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
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

      lineRefs.current.forEach((el) => {
        if (!el) return;
        const targetHeight = el.dataset.targetHeight;
        gsap.fromTo(
          el,
          { height: 0 },
          {
            height: targetHeight,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="block bg-[#F4F6FB] px-4 py-12 md:hidden"
    >
      <LayoutWrapper>
        <h3 className="font-geist mb-8 text-[24px] font-medium leading-[1.2] tracking-[-0.6px] text-slate-900">
          Our story
        </h3>

        <div className="relative flex flex-col items-center">
          {/* Continuous Vertical Timeline Line behind cards */}
          <div className="absolute top-0 bottom-0 z-0 flex w-[48px] flex-col items-center overflow-hidden">
            <div
              ref={(el) => {
                lineRefs.current[0] = el;
              }}
              data-target-height="100%"
              style={{ height: 0 }}
              className="w-full h-full bg-gradient-to-b from-[#3B82F6] via-[#2563EB] to-[#E879F9]"
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
                <div className="flex flex-col gap-[12px] rounded-[6px] border border-slate-100 bg-[var(--b-w-white,#FFFFFF)] p-2.5 ">
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

                  {/* Description */}
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