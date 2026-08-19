"use client";

import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IntegrateProps } from "./type";
import Image from "next/image";

export default function IntegrateMobile({ stepsData }: IntegrateProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="block min-h-screen w-full bg-gradient-to-b from-[#FBEAF9] to-[#E8B9E5] py-12 xl:hidden">
      <LayoutWrapper>
        <h2 className="text-alpha-light-1000 text-[26px] max-w-[309px]  leading-[115%] font-medium tracking-tight lg:text-[48px]">
          Integrate in
          Days, Not Weeks
        </h2>

        <div className="mt-8 flex flex-col">
          {stepsData.map((step, index) => {
            const isActive = activeTab === index;

            return (
              <div
                key={step.id}
                className="first:border-none border-alpha-light-100 border-t py-4 transition-colors last:border-b"
              >
                <button
                  type="button"
                  onClick={() => setActiveTab(index)}
                  className="w-full text-left focus:outline-none"
                >
                  <p
                    className={`text-[20px] leading-[110%] font-medium transition-colors duration-200 ${
                      isActive
                        ? "text-alpha-light-1000"
                        : "hover:text-alpha-light-1000 text-[#1A1A1AB2]"
                    }`}
                  >
                    {step.title}
                  </p>
                </button>

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
                        <div className="img-container relative h-[370px] w-full overflow-clip flex items-center justify-center rounded-md bg-[#E18CFF]">
                          {step.imgSrc && (
                            <Image
                            fill
                              src={step.imgSrc}
                              alt={step.title}
                              className=" object-contain w-[170px]"
                            />
                          )}
                        </div>

                        <p className="font-geist text-alpha-light-1000 text-[16px] leading-[135%] tracking-tight">
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
