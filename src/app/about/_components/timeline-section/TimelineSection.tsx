"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";

import { TimelineItem, TimelineProps } from "./type";

gsap.registerPlugin(ScrollTrigger);

export default function TimelineSection({
  timelineData = [],
}: TimelineProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const total = timelineData.length;
        if (!total) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
          defaults: { ease: "none" },
        });

        tl.fromTo(
          trackRef.current,
          { xPercent: 0 },
          { xPercent: -35, duration: 1 },
          0,
        );

        timelineData.forEach((item, index) => {
          const step = 1 / total;
          const start = index * step;
          const end = (index + 1) * step;

          const fillStart = start;
          const fillEnd = Math.min(1, end - step * 0.15);

          const revealStart = Math.max(0, start - 0.1);
          const revealMid = start + 0.03;

          const barEl = barRefs.current[index];
          const cardEl = cardRefs.current[index];

          if (barEl) {
            tl.fromTo(
              barEl,
              { scaleX: 0 },
              { scaleX: 1, duration: Math.max(fillEnd - fillStart, 0.0001) },
              fillStart,
            );
          }

          if (cardEl) {
            const fromY = item.position === "top" ? -12 : 12;

            tl.fromTo(
              cardEl,
              { opacity: 0.3, scale: 0.94, y: fromY, filter: "blur(1px)" },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                filter: "blur(0px)",
                ease: "power1.out",
                duration: Math.max(revealMid - revealStart, 0.0001),
              },
              revealStart,
            );
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [timelineData]);

  return (
    <section
      ref={sectionRef}
      className="relative hidden bg-[#F4F6FB] md:block md:h-[300vh]"
    >
      <div className="sticky -top-10 hidden min-h-screen w-full flex-col justify-between overflow-hidden py-[72px] md:flex">
        <LayoutWrapper>
          <h3 className="font-geist text-[24px] leading-[1.2] font-medium tracking-[-0.6px] text-slate-900">
            Our story
          </h3>
        </LayoutWrapper>

        <div className="flex w-full flex-1 items-center overflow-hidden">
          <LayoutWrapper>
            <div ref={trackRef} className="flex w-max gap-0">
              {timelineData.map((item, index) => (
                <TimelineBlock
                  key={item.id}
                  item={item}
                  barRef={(el) => {
                    barRefs.current[index] = el;
                  }}
                  cardRef={(el) => {
                    cardRefs.current[index] = el;
                  }}
                />
              ))}
            </div>
          </LayoutWrapper>
        </div>
      </div>
    </section>
  );
}

function TimelineBlock({
  item,
  barRef,
  cardRef,
}: {
  item: TimelineItem;
  barRef: (el: HTMLDivElement | null) => void;
  cardRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div className="flex w-[680px] shrink-0 flex-col justify-center">
      {/* Top Container Space */}
      {item.position === "top" ? (
        <div
          ref={cardRef}
          style={{
            opacity: 0.3,
            transform: "scale(0.94) translateY(-12px)",
            filter: "blur(1px)",
          }}
        >
          <TimelineCard item={item} isTop={true} />
        </div>
      ) : (
        <div className="h-[310px]" />
      )}

      {/* Progress Bar Container with Filling Track */}
      <div className="relative h-[56px] w-full overflow-hidden bg-slate-200/50">
        <div
          ref={barRef}
          style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
          className={`h-full w-full bg-gradient-to-r ${item.barGradient}`}
        />
        <Image
          alt="gitter"
          fill
          className="pointer-events-none absolute z-10 h-full w-full object-cover"
          src={"/gitter.png"}
        />
      </div>

      {/* Bottom Container Space */}
      {item.position === "bottom" ? (
        <div
          ref={cardRef}
          style={{
            opacity: 0.3,
            transform: "scale(0.94) translateY(12px)",
            filter: "blur(1px)",
          }}
        >
          <TimelineCard item={item} isTop={false} />
        </div>
      ) : (
        <div className="h-[310px]" />
      )}
    </div>
  );
}

function TimelineCard({
  item,
  isTop,
}: {
  item: TimelineItem;
  isTop: boolean;
}) {
  return (
    <div
      className={`flex h-[310px] w-[680px] flex-col ${
        isTop ? "justify-end pb-3" : "justify-start pt-3"
      }`}
    >
      <div
        className={`mb-3 flex h-[120px] w-[107.5px] flex-col gap-[12px] border-l-[1.5px] border-slate-300 pl-[18px] ${
          isTop ? "justify-start" : "justify-end"
        }`}
      >
        <span className="font-geist text-[14px] leading-tight text-nowrap text-slate-400">
          {item.date}
        </span>
        <h4 className="font-geist text-[20px] leading-tight font-medium text-nowrap text-slate-900">
          {item.title}
        </h4>
      </div>

      {/* White Card Container */}
      <div className="flex h-[174px] w-[680px] items-center gap-[12px] rounded-[8px] border border-slate-200/60 bg-white p-[6px] shadow-sm">
        {item.image && (
          <div className="relative h-[162px] w-[295px] shrink-0 overflow-hidden rounded-[6px]">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <p className="font-geist max-w-[345px] text-[14px] leading-[140%] tracking-[-0.2px] text-slate-600">
          {item.description}
        </p>
      </div>
    </div>
  );
}