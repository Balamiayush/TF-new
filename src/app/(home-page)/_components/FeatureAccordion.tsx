'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

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
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
    <div className="flex md:flex-col flex-row flex-nowrap overflow-x-auto w-full gap-4 pb-2 snap-x snap-mandatory">
      {accordionData.map((item, index) => {
        const isOpen = isMobile ? true : accordion === index;
        const isCurrentlySelectedPhoto = accordion === index;

        return (
          <div
            key={item.id}
            onClick={() => setAccordion(index)}
            className={`rounded-lg w-full max-md:w-[85vw] max-md:shrink-0 snap-start p-4 transition-all ease-linear duration-300 cursor-pointer ${
              isCurrentlySelectedPhoto
                ? 'bg-white border border-[#1D4ED8]/20'
                : 'bg-white/60'
            }`}
          >
            <div className="flex gap-3 ">
              <div
                className={`w-4 h-2.5 rounded-xs shrink-0  mt-2 transition-colors duration-300 ${
                  isCurrentlySelectedPhoto ? 'bg-slate-900' : 'bg-neutral-300'
                }`}
              ></div>

              <div className="flex-1">
                <p className="text-body1 font-medium">{item.title}</p>

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
      duration: 0.35,
      ease: "easeOut",
    }}
    className="overflow-hidden"
  >
    <p className="text-label1 mt-2">{item.description}</p>
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