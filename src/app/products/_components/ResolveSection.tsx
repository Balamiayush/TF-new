"use client";

import BookADemoPageArrowIcon from "@/shared/icons/BookADemoPageArrowIcon";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import React, { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring, useTransform, motion } from "framer-motion";

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
    Number.isInteger(value) ? Math.round(latest).toString() : latest.toFixed(2)
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
    description:
      "Assess risk continuously using passive signals first, then apply additional verification where needed.",
  },
  {
    id: 1,
    title: "Make progressive KYC decisions",
    description:
      "Assess risk continuously using passive signals first, then apply additional verification where needed.",
  },
  {
    id: 2,
    title: "Make progressive KYC decisions",
    description:
      "Assess risk continuously using passive signals first, then apply additional verification where needed.",
  },
];

export default function ResolveSection() {
  const [activeCard, setActiveCard] = useState<number>(0);

  return (
    <div className="w-full py-12 md:py-16 lg:pt-[120px] lg:pb-[95px]">
      <LayoutWrapper>
        <h3 className="xl:max-w-[620px] max-w-[400px] text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.2] font-medium tracking-[-0.3px] text-black">
          Resolve risk early, keep onboarding flowing
        </h3>

        <div className="mt-10 md:mt-16 lg:mt-21 flex flex-col md:flex-row flex-wrap lg:flex-nowrap gap-8 md:gap-12 lg:gap-21">
          {STATS.map((stat, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              <div className="flex gap-1 items-center">
                <BookADemoPageArrowIcon className="h-[40px] w-[40px] lg:h-[54px] lg:w-[54px]" />
                <p className="text-[40px] lg:text-[54px] leading-[100%] text-slate-900 font-semibold lg:font-normal">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
              </div>
              <p className="text-sm lg:text-base text-slate-600">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

  
        <div className="mt-10 md:mt-16 lg:mt-21 flex flex-col lg:flex-row md:flex-wrap lg:flex-nowrap w-full items-stretch gap-4 md:gap-6 lg:gap-3">
          {FEATURES.map((feature) => {
            const isActive = activeCard === feature.id;

            return (
              <motion.div
                key={feature.id}
                onMouseEnter={() => setActiveCard(feature.id)}
                onClick={() => setActiveCard(feature.id)}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className={`cursor-pointer flex min-h-[320px] lg:h-[398px] flex-1 flex-col gap-6 rounded-lg p-6 lg:p-8 transition-colors duration-300 ${
                  isActive ? "bg-[#CB6BED]" : "bg-slate-100"
                }`}
              >
                <p
                  className={`max-w-[286px] text-[20px] lg:text-[24px] leading-[1.2] font-medium transition-colors duration-300 ${
                    isActive ? "text-alpha-dark-1000" : "text-black"
                  }`}
                >
                  {feature.title}
                </p>
                <p
                  className={`max-w-[306px] text-sm transition-colors duration-300 ${
                    isActive ? "text-alpha-dark-1000" : "text-black"
                  }`}
                >
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </LayoutWrapper>
    </div>
  );
}