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
          },
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
          },
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
        <h3 className="font-geist mb-8 text-[24px] leading-[1.2] font-medium tracking-[-0.6px] text-slate-900">
          Our story
        </h3>

        <div className="relative flex flex-col items-center">
          {timelineData.map((item, index) => (
            <React.Fragment key={item.id}>
              {/* Top Connector Line for First Item */}
              {index === 0 && (
                <div
                  ref={(el) => {
                    lineRefs.current[index * 2] = el;
                  }}
                  data-target-height="60px"
                  style={{ height: 0 }}
                  className={`w-[48px] ${item.mobileGradient}`}
                />
              )}

              <div
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                style={{ opacity: 0 }}
                className="relative z-10 flex h-[340px] w-[335px] flex-col justify-between gap-[12px] rounded-[8px] border border-[#F1F5F9] p-[16px] backdrop-blur-sm"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="font-geist text-[12px] leading-tight text-slate-500">
                    {item.date}
                  </span>
                  <h4 className="font-geist text-[16px] leading-tight font-medium text-slate-900">
                    {item.title}
                  </h4>
                </div>

                {/* Image */}
                {item.image && (
                  <div className="relative h-[135px] w-full shrink-0 overflow-hidden rounded-[6px]">
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

              {/* Connecting Vertical Bar between items */}
              {index < timelineData.length && (
                <div
                  ref={(el) => {
                    lineRefs.current[index * 2 + 1] = el;
                  }}
                  data-target-height="80px"
                  style={{ height: 0 }}
                  className={`w-[48px] ${item.mobileGradient}`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </LayoutWrapper>
    </div>
  );
}