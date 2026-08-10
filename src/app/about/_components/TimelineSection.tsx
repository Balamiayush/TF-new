"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";

const timelineData = [
  {
    id: 1,
    date: "January 2026",
    title: "Launch",
    description:
      "Third Factor AI launches on stage at the Nepal Fintech Alliance 2026 event. A KYC platform built for accuracy, speed, and simple integration. Identity verification at onboarding, done well.",
    image: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg",
    barGradient: "from-[#3B82F6] to-[#60A5FA]",
    position: "bottom",
  },
  {
    id: 2,
    date: "April 2026",
    title: "Pension Management Office goes live",
    description:
      "More than 300,000 pensioners. The challenge was not verifying identity once. It was confirming presence every month. Traditional KYC had no answer. We built one.",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
    barGradient: "from-[#2563EB] to-[#1D4ED8]",
    position: "top",
  },
  {
    id: 3,
    date: "May 2026",
    title: "Vianet signs",
    description:
      "An ISP with no regulatory requirement for KYC. Their challenge was continuously trusting who they were serving. The pattern became clear. This was not a KYC problem. It was a trust infrastructure problem.",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    barGradient: "from-[#E879F9] to-[#F0ABFC]",
    position: "bottom",
  },
];

export default function TimelineSection() {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-68%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#F4F6FB]">
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden py-[72px]">
        <LayoutWrapper>
          <h3 className="font-geist text-[24px] leading-[1.2] font-medium tracking-[-0.6px] text-slate-900">
            Our story
          </h3>
        </LayoutWrapper>

        <div className="flex w-full flex-1 items-center overflow-hidden">
          <LayoutWrapper>
            <motion.div style={{ x }} className="flex w-max gap-0">
              {timelineData.map((item, index) => (
                <TimelineBlock
                  key={item.id}
                  item={item}
                  index={index}
                  total={timelineData.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </motion.div>
          </LayoutWrapper>
        </div>
      </div>
    </section>
  );
}

function TimelineBlock({
  item,
  index,
  total,
  scrollYProgress,
}: {
  item: (typeof timelineData)[0];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const step = 1 / total;
  const start = index * step;
  const end = (index + 1) * step;

  // Ensure input sequence is strictly non-decreasing and safely bounded between 0 and 1
  const inputStart = Math.max(0, start - 0.1);
  const inputMidStart = start;
  const inputMidEnd = Math.max(start, end - 0.1);
  const inputEnd = Math.min(1, end);

  const opacity = useTransform(
    scrollYProgress,
    [inputStart, inputMidStart, inputMidEnd, inputEnd],
    [0.35, 1, 1, 0.35],
  );

  return (
    <motion.div
      style={{ opacity }}
      className="flex w-[700px] shrink-0 flex-col justify-center transition-opacity duration-300"
    >
      {item.position === "top" ? (
        <TimelineCard item={item} isTop={true} />
      ) : (
        <div className="h-[280px]" />
      )}

      <div className={`h-[56px] w-full bg-gradient-to-r ${item.barGradient}`} />

      {item.position === "bottom" ? (
        <TimelineCard item={item} isTop={false} />
      ) : (
        <div className="h-[280px]" />
      )}
    </motion.div>
  );
}

function TimelineCard({
  item,
  isTop,
}: {
  item: (typeof timelineData)[0];
  isTop: boolean;
}) {
  return (
    <div
      className={`flex h-[280px] w-[700px] flex-col ${
        isTop ? "justify-end pb-4" : "justify-start pt-4"
      }`}
    >
      <div className="mb-3 flex h-full flex-col gap-1 border-l-[1.5px] border-slate-300 pl-4.5">
        <span className="font-geist text-[14px] leading-tight text-slate-400">
          {item.date}
        </span>
        <h4 className="font-geist text-[20px] leading-tight font-medium text-slate-900">
          {item.title}
        </h4>
      </div>

      <div className="flex w-full items-center gap-4 rounded-xl border border-slate-200/60 bg-white/90 p-3 shadow-sm backdrop-blur-sm">
        {item.image && (
          <div className="relative h-[120px] w-[200px] shrink-0 overflow-hidden rounded-lg">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <p className="font-geist pr-2 text-[14px] leading-[140%] tracking-[-0.2px] text-slate-600">
          {item.description}
        </p>
      </div>
    </div>
  );
}
