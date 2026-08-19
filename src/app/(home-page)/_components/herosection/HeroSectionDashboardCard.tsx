"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DASHBOARD_IMAGES = [
  "/images/hero/hero-section-dasbord-imgs/dasboard-img.webp",
  "/images/hero/hero-section-dasbord-imgs/analytics-img.webp",
  "/images/hero/hero-section-dasbord-imgs/activity-img.webp",
  "/images/hero/hero-section-dasbord-imgs/risk-scoring-img.webp",
];

const TABS = [
  { id: 0, label: "Dashboard", icon: <TabIconDashboard /> },
  { id: 1, label: "Analytics", icon: <TabIconTrending /> },
  { id: 2, label: "Session Replay", icon: <TabIconVideo /> },
  { id: 3, label: "Metric Trees", icon: <TabIconFork /> },
];

export default function HeroSectionDashboardCard() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TABS.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [activeIndex]);

  return (
    <div className="bg-alpha-dark-400 relative z-1000 mb-[50px] flex h-[420px] flex-col overflow-hidden rounded-lg p-1 lg:h-[518px]">
      <div className="bg-alpha-dark-500 hidden w-full items-center border-b border-[#1a1a1a]/[0.06] lg:flex">
        {TABS.map((tab, index) => (
          <DashboardTab
            key={tab.label}
            label={tab.label}
            icon={tab.icon}
            active={activeIndex === index}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      <div className="border-alpha-dark-500 relative flex-1 overflow-hidden bg-[#5e93da] max-lg:rounded-[6px] max-lg:border max-lg:p-2">
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute inset-0 top-[42px] left-[40px] overflow-hidden rounded-l-lg rounded-b-[0] bg-white shadow-xl"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full w-full"
            >
              <Image
                src={DASHBOARD_IMAGES[activeIndex] || DASHBOARD_IMAGES[0]}
                alt="dashboard preview"
                fill
                className="object-cover object-left-top"
                sizes="(min-width: 1024px) 878px, 100vw"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export function DashboardTab({
  label,
  icon,
  active = false,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="bg-alpha-dark-400 relative flex flex-1 cursor-pointer items-center gap-2.5 overflow-hidden border-r border-[#1a1a1a]/[0.06] px-4 py-3 last:border-r-0"
    >
      {active && (
        <motion.div
          key={label}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          className="pointer-events-none absolute inset-0 bg-white"
        />
      )}

      <span
        className={`relative z-10 inline-flex h-3.5 w-3.5 items-center justify-center transition-colors duration-300 [&>svg]:h-3.5 [&>svg]:w-3.5 ${
          active ? "text-[#0070ae]" : "text-[#1a1a1a]/70"
        }`}
      >
        {icon}
      </span>

      <span
        className={`font-inter relative z-10 text-[14px] leading-[1.3] tracking-[-0.4px] whitespace-nowrap transition-colors duration-300 ${
          active ? "text-brand-600" : "text-[#1a1a1a]/70"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export function TabIconDashboard() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="h-full w-full" aria-hidden>
      <rect
        x="1.5"
        y="1.5"
        width="11"
        height="11"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M7 1.5V12.5M1.5 7H12.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export function TabIconTrending() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="h-full w-full" aria-hidden>
      <path
        d="M1.5 10L5 6.5L7.5 9L12.5 4M12.5 4H9M12.5 4V7.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TabIconVideo() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="h-full w-full" aria-hidden>
      <rect
        x="1.5"
        y="3"
        width="8"
        height="8"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M9.5 6L12.5 4V10L9.5 8V6Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TabIconFork() {
  return (
    <svg viewBox="0 0 14 14" fill="none" className="h-full w-full" aria-hidden>
      <circle cx="3.5" cy="3" r="1.5" stroke="currentColor" strokeWidth="1.2" />
      <circle
        cx="10.5"
        cy="3"
        r="1.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="7" cy="11" r="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M3.5 4.5V6.5C3.5 7.5 4 8 5 8H9C10 8 10.5 7.5 10.5 6.5V4.5M7 8V9.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
