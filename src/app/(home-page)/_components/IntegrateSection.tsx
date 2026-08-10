"use client";

import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const stepsData = [
  {
    id: "selfie",
    title: "Selfie capture",
    description:
      "Passive liveness detection confirms a real person is present. Without asking them to do anything. Works in seconds. Blocks bots, deepfakes, and replay attacks.",
    imgSrc:
      "https://images.pexels.com/photos/31145167/pexels-photo-31145167.jpeg",
  },
  {
    id: "upload",
    title: "Upload document",
    description:
      "Automated OCR and document authenticity verification for passports, driver's licenses, and national IDs across global formats.",
    imgSrc:
      "https://images.pexels.com/photos/15924114/pexels-photo-15924114.jpeg",
  },
  {
    id: "gesture",
    title: "Active gesture",
    description:
      "Prompt users with randomized motion challenges to add an un-spoofable layer of biometric security when required.",
    imgSrc:
      "https://images.pexels.com/photos/38135288/pexels-photo-38135288.jpeg",
  },
  {
    id: "videokyc",
    title: "Video KYC",
    description:
      "High-trust video verification sessions with live agent integration and recorded audit logs for strict regulatory compliance.",
    imgSrc:
      "https://images.pexels.com/photos/38845229/pexels-photo-38845229.jpeg",
  },
];

export default function Integrate() {
  const [activeTab, setActiveTab] = useState(0);

  // Layout metrics
  const cardGap = 20;
  const inactiveCardWidth = 218;

  // Clone elements to enable seamless circular peeking:
  // [Last Item, Item 0, Item 1, Item 2, Item 3, First Item]
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
  const trackOffset = 139 - virtualActiveIndex * (inactiveCardWidth + cardGap);

  return (
    <section className="min-h-screen w-full py-21 pb-30">
      <LayoutWrapper>
        <div className="flex min-h-[753px] w-full flex-col justify-between rounded-xl bg-gradient-to-br from-[#FBEAF9] to-[#E8B9E5] p-12 lg:flex-row lg:items-center">
          {/* Left Side: Accordion Tabs */}
          <div className="flex max-w-[430px] flex-col justify-between self-stretch">
            <h2 className="font-geist text-[48px] leading-[115%] font-medium tracking-tight text-[#1A1A1A]">
              Integrate in
              <br />
              Days, Not Weeks
            </h2>

            <div className="mt-12 flex flex-col">
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
                      width: isActive ? 302 : 218,
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
