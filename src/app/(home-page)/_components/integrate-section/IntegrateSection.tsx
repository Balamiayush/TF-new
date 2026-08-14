"use client";

import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IntegrateProps } from "./type";

// Hoisted outside the component — these never change between renders.
const CARD_GAP = 20;
const INACTIVE_CARD_WIDTH = 218;
const ACTIVE_CARD_WIDTH = 302;
const CONTAINER_WIDTH = 580;
const AUTO_ADVANCE_MS = 5000;

const SPRING_TRANSITION = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

export default function Integrate({ stepsData }: IntegrateProps) {
  const [activeTab, setActiveTab] = useState(0);

  // Auto-advance every 5s. Restarts whenever activeTab changes (including
  // manual selection), so a manual click doesn't leave a stale timer that
  // fires early/late.
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % stepsData.length);
    }, AUTO_ADVANCE_MS);

    return () => clearInterval(timer);
  }, [activeTab, stepsData.length]);

  const handleSelectTab = useCallback((index: number) => {
    setActiveTab(index);
  }, []);

  const displayItems = useMemo(
    () => [
      {
        ...stepsData[stepsData.length - 1],
        originalIndex: stepsData.length - 1,
        key: "clone-prev",
      },
      ...stepsData.map((item, idx) => ({
        ...item,
        originalIndex: idx,
        key: item.id,
      })),
      { ...stepsData[0], originalIndex: 0, key: "clone-next" },
    ],
    [stepsData]
  );

  const virtualActiveIndex = activeTab + 1;

  // Accurately calculate width of preceding cards to center the active card
  const precedingWidth = useMemo(() => {
    return displayItems.slice(0, virtualActiveIndex).reduce((acc, _, idx) => {
      const isCardActive = displayItems[idx].originalIndex === activeTab;
      const width = isCardActive ? ACTIVE_CARD_WIDTH : INACTIVE_CARD_WIDTH;
      return acc + width + CARD_GAP;
    }, 0);
  }, [displayItems, virtualActiveIndex, activeTab]);

  const trackOffset = useMemo(
    () => CONTAINER_WIDTH / 2 - ACTIVE_CARD_WIDTH / 2 - precedingWidth,
    [precedingWidth]
  );

  return (
    <section className="hidden min-h-screen w-full py-21 pb-30 lg:hidden xl:block">
      <LayoutWrapper>
        <div className="flex min-h-[753px] w-full flex-col justify-between rounded-xl bg-gradient-to-br from-[#FBEAF9] to-[#E8B9E5] p-12 lg:flex-row lg:items-center">
          <div className="flex w-full flex-col justify-between self-stretch lg:max-w-[430px]">
            <h2 className="font-geist text-[26px] leading-[115%] font-medium tracking-tight text-[#1A1A1A] lg:text-[42px]">
              Integrate in Days,
              <br />
              Not Weeks
            </h2>

            <div className="mt-8 flex flex-col lg:mt-12">
              {stepsData.map((step, index) => {
                const isActive = activeTab === index;
                return (
                  <div
                    key={step.id}
                    onClick={() => handleSelectTab(index)}
                    className="cursor-pointer border-t border-[#1A1A1A]/10 py-4 transition-colors"
                  >
                    <h3
                      className={`font-geist text-[20px] leading-[110%] font-medium tracking-tight transition-colors duration-300 ${
                        isActive
                          ? "text-[#1A1A1A]"
                          : "text-[#1A1A1A]/50 hover:text-[#1A1A1A]/80"
                      }`}
                    >
                      {step.title}
                    </h3>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.35,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <p className="font-geist mt-3 text-[16px] leading-[135%] font-medium tracking-tight text-[#1A1A1A]/80">
                            {step.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              <div className="border-t border-[#1A1A1A]/10" />
            </div>
          </div>

          <div className="relative mt-8 flex min-h-[657px] w-full items-center overflow-hidden rounded-xl bg-[#E08EF8] lg:mt-0 lg:w-[580px]">
            <div className="absolute right-0 bottom-2 left-1/2 -translate-x-1/2 flex items-center justify-center gap-1 z-10 w-full ">
              {stepsData.map((_, idx) => {
                const isActive = activeTab === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => handleSelectTab(idx)}
                    className="h-1.5 w-[125px] bg-white/40 rounded-full cursor-pointer overflow-hidden"
                  >
                    <motion.div
                      className="h-full bg-white"
                      initial={{ width: "0%" }}
                      animate={{
                        width: isActive ? "100%" : "0%",
                      }}
                      transition={{
                        duration: isActive ? 5 : 0.2,
                        ease: isActive ? "linear" : "easeOut",
                      }}
                    />
                  </div>
                );
              })}
            </div>

            <motion.div
              className="absolute left-0 flex items-center gap-[20px]"
              animate={{ x: trackOffset }}
              transition={SPRING_TRANSITION}
              style={{ willChange: "transform" }}
            >
              {displayItems.map((step) => {
                const isActive = activeTab === step.originalIndex;
                return (
                  <motion.div
                    key={step.key}
                    onClick={() => handleSelectTab(step.originalIndex)}
                    layout
                    animate={{
                      width: isActive ? ACTIVE_CARD_WIDTH : INACTIVE_CARD_WIDTH,
                      height: isActive ? 610 : 438,
                    }}
                    transition={SPRING_TRANSITION}
                    style={{ willChange: "width, height, transform" }}
                    className={`relative shrink-0 cursor-pointer overflow-hidden transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-70 hover:opacity-90"
                    }`}
                  >
                    {step.imgSrc && (
                      <img
                        src={step.imgSrc}
                        alt={step.title}
                        className="h-full w-full object-cover"
                        loading={isActive ? "eager" : "lazy"}
                        decoding="async"
                      />
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}