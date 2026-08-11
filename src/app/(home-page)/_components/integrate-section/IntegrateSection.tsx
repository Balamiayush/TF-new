"use client";

import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface StepsDataType {
  id: string;
  title: string;
  description: string;
  imgSrc: string;
}

interface IntegrateProps {
  stepsData: StepsDataType[];
}

export default function Integrate({ stepsData }: IntegrateProps) {
  const [activeTab, setActiveTab] = useState(0);

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
  const precedingWidth = virtualActiveIndex * (inactiveCardWidth + cardGap);
  const trackOffset = containerWidth / 2 - activeCardWidth / 2 - precedingWidth;

  return (
    <section className="min-h-screen w-full py-21 pb-30 lg:block hidden">
      <LayoutWrapper>
        <div className="flex min-h-[753px] w-full flex-col justify-between rounded-xl bg-gradient-to-br from-[#FBEAF9] to-[#E8B9E5] p-12 lg:flex-row lg:items-center">
          <div className="flex lg:max-w-[430px] w-full flex-col justify-between self-stretch">
            <h2 className="font-geist text-[26px] lg:text-[48px] leading-[115%] font-medium tracking-tight text-[#1A1A1A]">
              Integrate in
              <br />
              Days, Not Weeks
            </h2>

            <div className="lg:mt-12 mt-8 flex flex-col">
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

                    {/* Animated accordion description */}
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

          {/* Right Side: Sliding Carousel Container */}
          <div className="relative mt-8 flex h-[580px] w-full items-center overflow-hidden rounded-2xl bg-[#E08EF8] lg:mt-0 lg:w-[580px]">
            <motion.div
              className="absolute left-0 flex items-center gap-[20px]"
              animate={{ x: trackOffset }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
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
                      height: isActive ? 500 : 438,
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 28 }}
                    className={`relative shrink-0 cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-opacity duration-300 ${
                      isActive
                        ? "bg-red-500 opacity-100"
                        : "bg-red-500/80 opacity-70 hover:opacity-90"
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
            </motion.div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}