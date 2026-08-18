"use client";

import BookADemoPageArrowIcon from "@/shared/icons/BookADemoPageArrowIcon";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import React, { useEffect, useRef, useState } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  motion,
} from "framer-motion";
import Image from "next/image";

function Counter({ value, suffix = "%" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const count = useMotionValue(0);

  const springValue = useSpring(count, {
    stiffness: 45,
    damping: 18,
    restDelta: 0.001,
  });

  const displayValue = useTransform(springValue, (latest) =>
    Number.isInteger(value) ? Math.round(latest).toString() : latest.toFixed(2),
  );

  useEffect(() => {
    if (isInView) {
      count.set(value);
    }
  }, [isInView, count, value]);

  return (
    <span ref={ref}>
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
}

const STATS = [
  {
    value: 95,
    suffix: "%",
    label: "KYC alerts auto-resolved with AI",
  },
  {
    value: 150,
    suffix: "+",
    label: "KYC alerts auto-resolved with AI",
  },
  {
    value: 99.65,
    suffix: "%",
    label: "KYC alerts auto-resolved with AI",
  },
];

const FEATURES = [
  {
    id: 0,
    title: "Make progressive KYC decisions",
    img: "https://res.cloudinary.com/dfajjqglx/image/upload/v1786956732/52164bc469f3580b410dcb8f516aa66ca5fa3dba_fkezfy.png",
    video:
      "https://res.cloudinary.com/dfajjqglx/video/upload/v1786956732/ascii-animation_hi8ly9.mp4",
    description:
      "Assess risk continuously using passive signals first, then apply additional verification where needed.",
  },
  {
    id: 1,
    title: "Make progressive KYC decisions",
    img: "https://res.cloudinary.com/dfajjqglx/image/upload/v1786956732/52164bc469f3580b410dcb8f516aa66ca5fa3dba_fkezfy.png",
    video:
      "https://res.cloudinary.com/dfajjqglx/video/upload/v1786956732/ascii-animation_hi8ly9.mp4",
    description:
      "Assess risk continuously using passive signals first, then apply additional verification where needed.",
  },
  {
    id: 2,
    title: "Make progressive KYC decisions",
    img: "https://res.cloudinary.com/dfajjqglx/image/upload/v1786956732/52164bc469f3580b410dcb8f516aa66ca5fa3dba_fkezfy.png",
    video:
      "https://res.cloudinary.com/dfajjqglx/video/upload/v1786956732/ascii-animation_hi8ly9.mp4",
    description:
      "Assess risk continuously using passive signals first, then apply additional verification where needed.",
  },
];

export default function ResolveSection() {
  const [activeCard, setActiveCard] = useState<number>(0);
  const [loadedVideos, setLoadedVideos] = useState<Record<number, boolean>>({});

  const handleVideoLoaded = (id: number) => {
    setLoadedVideos((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="w-full py-12 md:py-16 lg:pt-[120px] lg:pb-[95px]">
      <LayoutWrapper>
        <h3 className="max-w-[400px] text-[28px] leading-[1.2] font-medium tracking-[-0.3px] text-black sm:text-[36px] lg:text-[42px] xl:max-w-[620px]">
          Resolve risk early, keep onboarding flowing
        </h3>

        <div className="mt-10 flex flex-col flex-wrap gap-8 md:mt-16 md:flex-row md:gap-12 lg:mt-21 lg:flex-nowrap lg:gap-21">
          {STATS.map((stat, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              <div className="flex items-center gap-1">
                <BookADemoPageArrowIcon className="h-[40px] w-[40px] lg:h-[54px] lg:w-[54px]" />
                <p className="text-[40px] leading-[100%] font-semibold text-slate-900 lg:text-[54px] lg:font-normal">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
              </div>
              <p className="text-sm text-slate-600 lg:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex w-full flex-col items-stretch gap-4 md:mt-16 md:flex-wrap md:gap-6 lg:mt-21 lg:flex-row lg:flex-nowrap lg:gap-3">
          {FEATURES.map((feature) => {
            const isActive = activeCard === feature.id;
            const isVideoReady = loadedVideos[feature.id];

            return (
              <motion.div
                key={feature.id}
                onMouseEnter={() => setActiveCard(feature.id)}
                onClick={() => setActiveCard(feature.id)}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className={`relative isolate flex min-h-[320px] flex-1 cursor-pointer flex-col justify-between overflow-hidden rounded-lg p-6 transition-colors duration-300 lg:h-[398px] lg:p-8 ${
                  isActive ? "bg-[#F7D2E4]" : "bg-slate-100"
                }`}
              >
                {/* Content */}
                <div className="relative z-10 flex flex-col gap-6">
                  <p className="max-w-[286px] text-[20px] leading-[1.2] font-medium text-black transition-colors duration-300 lg:text-[24px]">
                    {feature.title}
                  </p>
                  <p className="max-w-[306px] text-sm text-slate-800 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                <div className="pointer-events-none absolute bottom-0 left-1/2 h-[180px] w-[90%] max-w-[400px] -translate-x-1/2 overflow-hidden sm:h-[200px] md:w-[85%] lg:w-full">
                  {/* Static Image */}
                  <div
                    className={`relative h-full w-full transition-opacity duration-300 ${
                      isActive && isVideoReady ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <Image
                      className="h-full w-full object-cover object-bottom"
                      fill
                      sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 33vw"
                      src={feature.img}
                      alt={feature.title}
                    />
                  </div>

                  {/* Video Layer */}
                  {feature.video && (
                    <div
                      className={`absolute inset-0 h-full w-full bg-[#F7D2E4] transition-opacity duration-300 ${
                        isActive && isVideoReady ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        onLoadedData={() => handleVideoLoaded(feature.id)}
                        className="h-full w-full scale-x-[1.1] object-cover object-bottom mix-blend-lighten [clip-path:inset(2px_0px_2px_0px)]"
                        src={feature.video}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </LayoutWrapper>
    </div>
  );
}
