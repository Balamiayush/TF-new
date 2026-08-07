"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { Fingerprint } from "lucide-react";

export  function FingerprintCard() {
  // Nested horizontal ellipses that share a common vertical center create a wireframe globe.
  const globeRings = [
    { w: 302, h: 302 },
    { w: 302, h: 244.5 },
    { w: 302, h: 180.79 },
    { w: 302, h: 132.17 },
    { w: 302, h: 78.75 },
    { w: 302, h: 41.09 },
  ];
  const eyeRef = useRef<HTMLDivElement>(null);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });

  const followPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const eyeBounds = eyeRef.current?.getBoundingClientRect();
    if (!eyeBounds) return;

    const horizontal =
      (event.clientX - (eyeBounds.left + eyeBounds.width / 2)) /
      (eyeBounds.width / 2);
    const vertical =
      (event.clientY - (eyeBounds.top + eyeBounds.height / 2)) /
      (eyeBounds.height / 2);
    const distance = Math.hypot(horizontal, vertical);
    const limit = distance > 1 ? 1 / distance : 1;

    setPupilOffset({
      x: horizontal * limit * 14,
      y: vertical * limit * 14,
    });
  };

  return (
    <div
      className="relative h-[420px] overflow-hidden rounded-lg border border-slate-100 bg-white lg:h-[518px]"
      onPointerMove={followPointer}
      onPointerLeave={() => setPupilOffset({ x: 0, y: 0 })}
    >
      {/* Lower castle-crenellation base — soft blue, extends far beyond bounds */}
      <img
        src="/images/hero/fingerprint-globe.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-[-41px] left-1/2 h-[217px] w-[555%] max-w-none -translate-x-1/2"
      />
      {/* Small white teeth pattern overlay */}
      <img
        src="/images/hero/fingerprint-bottom.svg"
        alt=""
        aria-hidden
        className="pointer-events-none absolute top-[59.14%] left-1/2 h-auto w-[555%] max-w-none -translate-x-1/2 opacity-90"
      />

      {/* Wireframe globe centered near the top */}
      <div className="pointer-events-none absolute top-[9px] left-1/2 h-[302px] w-[302px] -translate-x-1/2">
        {globeRings.map(({ w, h }, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-slate-200/70"
            style={{ width: `${w}px`, height: `${h}px` }}
          />
        ))}
        {/* Horizontal magenta glow behind the orb */}
        <div className="absolute top-1/2 left-1/2 h-[60px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-[#e18cff]/70 to-transparent blur-md" />
        {/* The pupil follows the visitor inside its soft violet eye. */}
        <div
          ref={eyeRef}
          className="absolute top-1/2 left-1/2 flex h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#E18CFF] shadow-[0_0_28px_6px_rgba(225,140,255,0.55)]"
        >
          <span
            aria-hidden
            className="h-[24px] w-[24px] rounded-full bg-[#2d1440] shadow-[0_1px_4px_rgba(45,20,64,0.35)] transition-transform duration-100 ease-out motion-reduce:transition-none"
            style={{
              transform: `translate3d(${pupilOffset.x}px, ${pupilOffset.y}px, 0)`,
            }}
          >
            <span className="absolute top-[5px] left-[5px] h-[6px] w-[6px] rounded-full bg-white/90" />
          </span>
        </div>
      </div>

      {/* Fingerprint pill at bottom */}
      <div className="absolute bottom-6 left-1/2 flex h-[109px] w-[306px] -translate-x-1/2 items-center justify-end rounded-full border-[1.2px] border-slate-200 bg-white/70 py-1.5 pr-[7px] pl-[196px] backdrop-blur-xl">
        <div className="flex h-[97px] w-[127px] items-center justify-center rounded-full border border-slate-200 bg-white">
          <Fingerprint className="h-16 w-16 text-slate-700" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}

export  function DashboardCard() {
  return (
    <div className="flex h-[420px] flex-col overflow-hidden rounded-lg bg-white/50 p-1 backdrop-blur-xl lg:h-[518px]">
      {/* Tabs */}
      <div className="flex w-full items-center border-b border-[#1a1a1a]/[0.06]">
        <DashboardTab active label="Dashboard" icon={<TabIconDashboard />} />
        <DashboardTab label="Analytics" icon={<TabIconTrending />} />
        <DashboardTab label="Session Replay" icon={<TabIconVideo />} />
        <DashboardTab label="Metric Trees" icon={<TabIconFork />} />
      </div>

      {/* Content area: blue #5e93da frame with dashboard inset from top-left */}
      <div className="relative flex-1 overflow-hidden bg-[#5e93da]">
        <div className="absolute inset-0 top-[42px] left-[40px] overflow-hidden rounded-tl-sm bg-white">
          <Image
            src="/images/hero/dashboard-preview.png"
            alt="thirdfactor.ai dashboard preview"
            fill
            priority
            className="object-cover object-left-top"
            sizes="(min-width: 1024px) 878px, 100vw"
          />
        </div>
      </div>
    </div>
  );
}

export  function DashboardTab({
  label,
  icon,
  active = false,
}: {
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <div
      className={`flex flex-1 items-center gap-2.5 border-r border-[#1a1a1a]/[0.06] px-4 py-3 last:border-r-0 ${
        active ? "bg-white/80" : "bg-white/40"
      }`}
    >
      <span
        className={`inline-flex h-3.5 w-3.5 items-center justify-center ${
          active ? "text-[#0070ae]" : "text-[#1a1a1a]/70"
        }`}
      >
        {icon}
      </span>
      <span
        className={`font-inter text-[14px] leading-[1.3] tracking-[-0.4px] whitespace-nowrap ${
          active ? "text-[#0070ae]" : "text-[#1a1a1a]/70"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export  function TabIconDashboard() {
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

export  function TabIconTrending() {
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

export  function TabIconVideo() {
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

export  function TabIconFork() {
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
