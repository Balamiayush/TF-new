"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";

const timelineData = [
  {
    id: 1,
    date: "January 2026",
    title: "Launch",
    description:
      "Third Factor AI launches on stage at the Nepal Fintech Alliance 2026 event. A KYC platform built for accuracy, speed, and simple integration. Identity verification at onboarding, done well.",
    image: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg",
    barGradient: "bg-[#60A5FA]",
    mobileGradient: "bg-[#60A5FA]",
    position: "bottom",
  },
  {
    id: 2,
    date: "April 2026",
    title: "Pension Management Office goes live",
    description:
      "More than 300,000 pensioners. The challenge was not verifying identity once. It was confirming presence every month. Traditional KYC had no answer. We built one.",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
    barGradient: "bg-[#2563EB]",
    mobileGradient: "bg-[#2563EB]",
    position: "top",
  },
  {
    id: 3,
    date: "May 2026",
    title: "Vianet signs",
    description:
      "An ISP with no regulatory requirement for KYC. Their challenge was continuously trusting who they were serving. The pattern became clear. This was not a KYC problem. It was a trust infrastructure problem.",
    image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
    barGradient: "bg-[#D96EFF]",
    mobileGradient: "bg-[#D96EFF]",
    position: "bottom",
  },
];

export default function TimelineSection() {
  const targetRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Softer, more fluid spring — lower stiffness + higher damping
  // reduces overshoot/jitter and makes the scrub feel buttery.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.6,
    restDelta: 0.0005,
  });

  const x = useTransform(smoothProgress, [0, 1], ["0%", "-35%"]);

  return (
    <section ref={targetRef} className="relative bg-[#F4F6FB] md:h-[300vh]">
      {/* ---------- Mobile / Responsive Layout ---------- */}
      <div className="block px-4 py-12 md:hidden">
        <LayoutWrapper>
          <h3 className="font-geist mb-8 text-[24px] leading-[1.2] font-medium tracking-[-0.6px] text-slate-900">
            Our story
          </h3>

          <div className="relative flex flex-col items-center">
            {timelineData.map((item, index) => (
              <React.Fragment key={item.id}>
                {/* Top Connector Line for First Item */}
                {index === 0 && (
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: 60 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`w-[48px] ${item.mobileGradient}`}
                  />
                )}

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
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
                </motion.div>

                {/* Connecting Vertical Bar between items */}
                {index < timelineData.length && (
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: 80 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`w-[48px] ${item.mobileGradient}`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </LayoutWrapper>
      </div>

      {/* ---------- Desktop Scroll-Scrubbed Layout ---------- */}
      <div className="sticky top-0 hidden min-h-screen w-full flex-col justify-between overflow-hidden py-[72px] md:flex">
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
                  scrollYProgress={smoothProgress}
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

  // Widen the fill range slightly beyond the raw segment so the bar
  // finishes filling a touch before the next card fully snaps in —
  // this overlap is what makes it read as continuous, not stepped.
  const fillStart = start;
  const fillEnd = Math.min(1, end - step * 0.15);

  const scaleX = useTransform(scrollYProgress, [fillStart, fillEnd], [0, 1]);

  // Card reveal & emphasis transitions — wider easing window + extra
  // keyframe softens the snap when a card comes into focus.
  const revealStart = Math.max(0, start - 0.1);
  const revealMid = start + 0.03;

  const cardOpacity = useTransform(
    scrollYProgress,
    [revealStart, revealMid, Math.min(1, end)],
    [0.3, 1, 1],
  );

  const cardScale = useTransform(
    scrollYProgress,
    [revealStart, revealMid, Math.min(1, end)],
    [0.94, 1, 1],
  );

  const cardY = useTransform(
    scrollYProgress,
    [revealStart, revealMid],
    [item.position === "top" ? -12 : 12, 0],
  );

  const cardBlur = useTransform(
    scrollYProgress,
    [revealStart, revealMid],
    ["blur(1px)", "blur(0px)"],
  );

  return (
    <div className="flex w-[680px] shrink-0 flex-col justify-center">
      {/* Top Container Space */}
      {item.position === "top" ? (
        <motion.div
          style={{
            opacity: cardOpacity,
            scale: cardScale,
            y: cardY,
            filter: cardBlur,
          }}
        >
          <TimelineCard item={item} isTop={true} />
        </motion.div>
      ) : (
        <div className="h-[310px]" />
      )}

      {/* Progress Bar Container with Filling Track */}
      <div className="relative h-[56px] w-full overflow-hidden bg-slate-200/50">
        <motion.div
          style={{
            scaleX,
            transformOrigin: "left center",
          }}
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
        <motion.div
          style={{
            opacity: cardOpacity,
            scale: cardScale,
            y: cardY,
            filter: cardBlur,
          }}
        >
          <TimelineCard item={item} isTop={false} />
        </motion.div>
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
  item: (typeof timelineData)[0];
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
