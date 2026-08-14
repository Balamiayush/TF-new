"use client";

import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IntegrateProps } from "./type";


export default function Integrate({ stepsData }: IntegrateProps) {
  const [activeTab, setActiveTab] = useState(0);

  // Auto-advance progress and change active image/tab every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % stepsData.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [stepsData.length]);

  const cardGap = 20;
  const inactiveCardWidth = 218;
  const activeCardWidth = 302;
  const containerWidth = 580;

  const displayItems = [
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
  ];

  const virtualActiveIndex = activeTab + 1;

  // FIX: Accurately calculate width of preceding cards to center the active card
  const precedingWidth = displayItems
    .slice(0, virtualActiveIndex)
    .reduce((acc, _, idx) => {
      const isCardActive = displayItems[idx].originalIndex === activeTab;
      const width = isCardActive ? activeCardWidth : inactiveCardWidth;
      return acc + width + cardGap;
    }, 0);

  const trackOffset = containerWidth / 2 - activeCardWidth / 2 - precedingWidth;

  const springTransition = {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
    mass: 0.8,
  };

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
                    onClick={() => setActiveTab(index)}
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

          <div className="relative mt-8 flex min-h-[657px] w-full items-center overflow-hidden rounded-2xl bg-[#E08EF8] lg:mt-0 lg:w-[580px]">
         <div className="absolute right-0 bottom-1 left-1/2 -translate-x-1/2 flex items-center justify-center gap-1 z-10">
              {stepsData.map((_, idx) => {
                const isActive = activeTab === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className="h-1.5 w-[100px] bg-white/40 rounded-full cursor-pointer overflow-hidden"
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
              transition={springTransition}
              style={{ willChange: "transform" }}
            >
              {displayItems.map((step) => {
                const isActive = activeTab === step.originalIndex;
                return (
                  <motion.div
                    key={step.key}
                    onClick={() => setActiveTab(step.originalIndex)}
                    layout
                    animate={{
                      width: isActive ? activeCardWidth : inactiveCardWidth,
                      height: isActive ? 610 : 438,
                    }}
                    transition={springTransition}
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
                      />
                    )}
                  </motion.div>
                );
              })}
              <div></div>
            </motion.div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}