"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

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

// Inner Pixel Overlay Engine for Image Box
interface PixelOverlayRef {
  flash: (onCovered: () => void) => Promise<void>;
}

const PixelOverlay = React.forwardRef<PixelOverlayRef, { pixelSize?: number; color?: string }>(
  ({ pixelSize = 28, color = "#2563eb" }, ref) => {
    const gridRef = useRef<HTMLDivElement | null>(null);
    const pixelsRef = useRef<{ element: HTMLDivElement; order: number }[]>([]);

    const buildGrid = useCallback(() => {
      const container = gridRef.current;
      if (!container) return;

      container.replaceChildren();
      pixelsRef.current = [];

      const rect = container.getBoundingClientRect();
      const cols = Math.ceil(rect.width / pixelSize) || 20;
      const rows = Math.ceil(rect.height / pixelSize) || 15;

      container.style.gridTemplateColumns = `repeat(${cols}, ${pixelSize}px)`;
      container.style.gridTemplateRows = `repeat(${rows}, ${pixelSize}px)`;

      const fragment = document.createDocumentFragment();

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const el = document.createElement("div");
          el.style.backgroundColor = color;
          el.style.opacity = "0";
          el.style.transform = "scale(0)";
          el.style.outline = `1px solid ${color}`;
          el.style.willChange = "transform, opacity";

          const baseOrder = Math.hypot(c, r) / Math.hypot(cols, rows);
          const noise = (Math.random() - 0.5) * 0.45;
          const order = Math.max(0, Math.min(1, baseOrder + noise));

          fragment.appendChild(el);
          pixelsRef.current.push({ element: el, order });
        }
      }

      container.appendChild(fragment);
    }, [pixelSize, color]);

    useEffect(() => {
      buildGrid();
      window.addEventListener("resize", buildGrid);
      return () => window.removeEventListener("resize", buildGrid);
    }, [buildGrid]);

    React.useImperativeHandle(ref, () => ({
      flash: (onCovered) => {
        return new Promise<void>((resolve) => {
          const pixels = pixelsRef.current;
          if (!pixels.length) {
            onCovered();
            resolve();
            return;
          }

          const sorted = [...pixels].sort((a, b) => a.order - b.order);
          const elements = sorted.map((p) => p.element);

          const tl = gsap.timeline({
            onComplete: resolve,
          });

          // Phase 1: Cover Image with Pixels
          tl.to(elements, {
            opacity: 1,
            scale: 1,
            duration: 0.04,
            ease: "power1.inOut",
            stagger: { each: 0.00025, from: "start" },
          })
            // Phase 2: Swap state while fully covered
            .call(onCovered)
            // Phase 3: Reveal new image
            .to(elements, {
              opacity: 0,
              scale: 0,
              duration: 0.06,
              ease: "power3.inOut",
              stagger: { each: 0.00025, from: "start" },
            }, "+=0.01");
        });
      },
    }));

    return (
      <div
        ref={gridRef}
        className="pointer-events-none absolute inset-0 z-50 grid h-full w-full content-center justify-center overflow-hidden"
      />
    );
  }
);
PixelOverlay.displayName = "PixelOverlay";

export default function HeroSectionDashboardCard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const pixelOverlayRef = useRef<PixelOverlayRef | null>(null);
  const isAnimatingRef = useRef(false);

  // Smoothly trigger transition sequence
  const changeTab = useCallback((nextIndex: number) => {
    if (nextIndex === activeIndex || isAnimatingRef.current) return;
    isAnimatingRef.current = true;
    setActiveIndex(nextIndex);

    if (pixelOverlayRef.current) {
      pixelOverlayRef.current.flash(() => {
        setDisplayedIndex(nextIndex);
      }).then(() => {
        isAnimatingRef.current = false;
      });
    } else {
      setDisplayedIndex(nextIndex);
      isAnimatingRef.current = false;
    }
  }, [activeIndex]);

  // Auto switch interval
  useEffect(() => {
    const timer = setInterval(() => {
      const next = (activeIndex + 1) % TABS.length;
      changeTab(next);
    }, 5000);

    return () => clearInterval(timer);
  }, [activeIndex, changeTab]);

  return (
    <div className="bg-alpha-dark-400 relative z-10 mb-[50px] flex h-[420px] flex-col overflow-hidden rounded-lg p-1 lg:h-[518px]">
      <div className="bg-alpha-dark-500 hidden w-full items-center border-b border-[#1a1a1a]/[0.06] lg:flex">
        {TABS.map((tab, index) => (
          <DashboardTab
            key={tab.label}
            label={tab.label}
            icon={tab.icon}
            active={activeIndex === index}
            onClick={() => changeTab(index)}
          />
        ))}
      </div>

      <div className="border-alpha-dark-500 relative flex-1 overflow-hidden bg-[#F4D7FF] max-lg:rounded-[6px] max-lg:border max-lg:p-2">
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute inset-0 lg:top-[42px] lg:left-[40px]  top-[28px] left-[28px] overflow-hidden rounded-l-lg rounded-b-[0] bg-white "
        >
          <PixelOverlay ref={pixelOverlayRef} pixelSize={32} color="#ffffff" />

          <div className="relative h-full w-full">
            <Image
              src={DASHBOARD_IMAGES[displayedIndex] || DASHBOARD_IMAGES[0]}
              alt="dashboard preview"
              fill
              className="object-cover object-left-top"
              sizes="(min-width: 1024px) 878px, 100vw"
              priority
            />
          </div>
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
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    fill="none"
    viewBox="0 0 14 14"
  >
    <path
      fill="#0070AE"
      d="M11.813 2.188h.75a.75.75 0 0 0-.75-.75zm0 9.625v.75a.75.75 0 0 0 .75-.75zm-9.625 0h-.75c0 .414.335.75.75.75zm0-9.625v-.75a.75.75 0 0 0-.75.75zm9.625 0h-.75v9.625h1.5V2.188zm0 9.625v-.75H2.188v1.5h9.625zm-9.625 0h.75V2.188h-1.5v9.625zm0-9.625v.75h9.625v-1.5H2.188z"
    ></path>
    <path
      fill="#0070AE"
      d="M7 7.563h-.75v1.5H7v-1.5m4.813 1.5h.75v-1.5h-.75v1.5M7 8.313v.75h4.813v-1.5H7zM7 6.438h.75v-1.5H7v1.5m-4.812-1.5h-.75v1.5h.75v-1.5M7 5.688v-.75H2.188v1.5H7z"
    ></path>
    <path
      fill="#0070AE"
      d="M6.25 11.813v.75h1.5v-.75h-1.5m1.5-9.625v-.75h-1.5v.75h1.5m-.75 0h-.75v9.625h1.5V2.188z"
    ></path>
  </svg>
  );
}

export function TabIconTrending() {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    fill="none"
    viewBox="0 0 14 14"
  >
    <path
      stroke="#1A1A1A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity="0.7"
      strokeWidth="1.5"
      d="m1.604 7.602 1.313-1.769 1.75 2.917 2.916-6.562 2.917 9.625 1.896-3.61"
    ></path>
  </svg>
  );
}

export function TabIconVideo() {
  return (
     <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    fill="none"
    viewBox="0 0 14 14"
  >
    <path
      stroke="#1A1A1A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity="0.7"
      strokeWidth="1.5"
      d="M2.77 2.188h8.46M6.707 7.729h.438m-.438 0v-.146m0 .146v.146m-5.104-4.23h10.792v8.168H1.604zm4.667 2.626v2.917l1.896-1.459z"
    ></path>
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
