"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface AccordionItem {
  id: number;
  title: string;
  description: string;
  src?: string;
}

interface FeatureAccordionProps {
  data: AccordionItem[];
  isParentActive: boolean;
  onAccordionChange: (activeIndex: number) => void;
}

export default function FeatureAccordion({
  data,
  isParentActive,
  onAccordionChange,
}: FeatureAccordionProps) {
  const accordionData = data;
  const [accordion, setAccordion] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isParentActive) {
      onAccordionChange(accordion);
    }
  }, [accordion, isParentActive, onAccordionChange]);

  useEffect(() => {
    if (isMobile) return;

    const interval = setInterval(() => {
      setAccordion((prev) => (prev + 1) % accordionData.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [accordionData.length, isMobile]);

  return (
    <div className="flex w-full flex-col gap-2.5">
      {accordionData.map((item, index) => {
        const isOpen = isMobile ? true : accordion === index;
        const isCurrentlySelected = accordion === index;

        return (
          <div
            key={item.id}
            onClick={() => setAccordion(index)}
            className={`w-full cursor-pointer rounded-xl p-3.5 transition-all duration-200 sm:p-4 ${
              isCurrentlySelected
                ? "border border-[#E2E8F0] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                : "border border-[#E2E8F0]/50 bg-white/70 hover:bg-white"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`mt-2 h-2.5 w-3.5 shrink-0 rounded-xs transition-colors duration-300 ${
                  isCurrentlySelected ? "bg-slate-900" : "bg-neutral-300"
                }`}
              />

              <div className="flex-1">
                <p className="text-[14px] leading-tight font-medium text-slate-900 sm:text-[15px]">
                  {item.title}
                </p>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={
                        isMobile
                          ? false
                          : {
                              height: 0,
                              opacity: 0,
                              filter: "blur(8px)",
                            }
                      }
                      animate={{
                        height: "auto",
                        opacity: 1,
                        filter: "blur(0px)",
                      }}
                      exit={
                        isMobile
                          ? undefined
                          : {
                              height: 0,
                              opacity: 0,
                              filter: "blur(8px)",
                            }
                      }
                      transition={{
                        duration: 0.3,
                        ease: "easeOut",
                      }}
                      className="overflow-hidden"
                    >
                      <p className="mt-1.5 text-[12px] leading-relaxed font-normal text-[#262E41] sm:text-[13px]">
                        {item.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
