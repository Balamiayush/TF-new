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

export default function IntegrateMobile({ stepsData }: IntegrateProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="block min-h-screen w-full bg-gradient-to-b from-[#FBEAF9] to-[#E8B9E5] py-12 lg:hidden">
      <LayoutWrapper>
        <h2 className="text-[26px] leading-[115%] font-medium tracking-tight text-alpha-light-1000 lg:text-[48px]">
          Integrate in
          <br />
          Days, Not Weeks
        </h2>

        <div className="mt-8 flex flex-col">
          {stepsData.map((step, index) => {
            const isActive = activeTab === index;

            return (
              <div
                key={step.id}
                className="border-t border-alpha-light-100 py-4 transition-colors last:border-b"
              >
                {/* Accordion Title Header */}
                <button
                  type="button"
                  onClick={() => setActiveTab(index)}
                  className="w-full text-left focus:outline-none"
                >
                  <p
                    className={`text-[20px] font-medium leading-[110%] transition-colors duration-200 ${
                      isActive
                        ? "text-alpha-light-1000"
                        : "text-[#1A1A1AB2] hover:text-alpha-light-1000"
                    }`}
                  >
                    {step.title}
                  </p>
                </button>

                {/* Animated Collapsible Content */}
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
                      <div className="mt-4 flex flex-col gap-[20px]">
                        {/* Image Container */}
                        <div className="img-container relative h-[370px] w-full overflow-clip rounded-md bg-[#E18CFF]">
                          {step.imgSrc && (
                            <img
                              src={step.imgSrc}
                              alt={step.title}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>

                        {/* Step Description */}
                        <p className="font-geist text-[16px] leading-[135%] tracking-tight text-alpha-light-1000">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </LayoutWrapper>
    </div>
  );
}