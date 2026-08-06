"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Phone, Fingerprint } from "lucide-react";

import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";

import {
  DitherControls,
  DEFAULT_DITHER_SETTINGS,
  hexToRgba,
  type DitherSettings,
} from "@/shared/ui/DitherControls";
import { DitherHoverBackground } from "@/shared/ui/DitherHoverBackground";
import Image from "next/image";

export default function HeroSection() {
  const [dither, setDither] = useState<DitherSettings>(DEFAULT_DITHER_SETTINGS);
  const [capabilityIndex, setCapabilityIndex] = useState(0);
  const labels = ["NRB Compliant", "VAPT Certified", "Sub-0.1ms 1:N Search"];
  const capability = labels[capabilityIndex];

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCapabilityIndex((currentIndex) => (currentIndex + 1) % labels.length);
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, []);

  const showNextCapability = () => {
    setCapabilityIndex((currentIndex) => (currentIndex + 1) % labels.length);
  };

  return (
    <div className="relative isolate min-h-screen w-full overflow-hidden bg-[#fafcff] ">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[820px]"
      >
        <div className="absolute -top-14 -left-16 flex h-[812px] w-[454px] items-center justify-center">
          <div className="h-[832px] w-[127px] -rotate-[24deg] rounded-[130px] bg-[#95c5ff]/60 blur-[140px]" />
        </div>
        <div className="absolute -top-40 left-[27%] flex h-[838px] w-[363px] items-center justify-center">
          <div className="h-[832px] w-[139px] -rotate-[16deg] rounded-[130px] bg-[#95c5ff]/60 blur-[140px]" />
        </div>
        <div className="absolute -top-48 left-[55%] flex h-[834px] w-[351px] items-center justify-center">
          <div className="h-[832px] w-[127px] rotate-[16deg] rounded-[130px] bg-[#95c5ff]/60 blur-[140px]" />
        </div>
        <div className="absolute -top-24 right-[-6%] flex h-[798px] w-[425px] items-center justify-center">
          <div className="h-[832px] w-[95px] rotate-[24deg] rounded-[130px] bg-[#95c5ff]/60 blur-[140px]" />
        </div>
      </div>
      <DitherHoverBackground
        baseColor="transparent"
        gridColor={hexToRgba(dither.gridColor, dither.gridAlpha)}
        gridSize={dither.gridSize}
        dotRadius={dither.dotRadius}
        ditherColor={hexToRgba(dither.ditherColor, dither.ditherAlpha)}
        radiusPercent={dither.radiusPercent}
        followDurationMs={dither.followDurationMs}
        fadeDurationMs={dither.fadeDurationMs}
        intensity={dither.intensity}
        ditherDotSize={dither.ditherDotSize}
        jitter={dither.jitter}
        opacity={dither.opacity}
        blobWobble={dither.blobWobble}
        blobLobes={dither.blobLobes}
        blobMorphMs={dither.blobMorphMs}
        velocitySaturation={dither.velocitySaturation}
        velocityDecayMs={dither.velocityDecayMs}
        imageSource={dither.imageSource}
        imageInvert={dither.imageInvert}
        imageFit={dither.imageFit}
        className="mix-blend-multiply"
      />
      <DitherControls value={dither} onChange={setDither} />

      <LayoutWrapper>
        <div className="relative mt-26.5">
          <div className="flex gap-1">
            {labels.map((label, index) => (
              <p
                key={index}
                className="rounded-lg bg-[#FFFFFF47] px-3 py-1.5 text-[12px] leading-[110%] font-medium text-[#1A1A1A]"
              >
                {label}
              </p>
            ))}
          </div>
          <div className="mt-4 flex w-full items-center justify-between">
            <h1 className="max-w-[673px] text-[48px] leading-[110%] font-medium tracking-[-0.6px]">
              AI native trust infrastructure for{" "}
              <span className="text-[#0088D4]">compliance</span> at scale
            </h1>
            <div className="flex flex-col gap-6">
              <div className="max-w-[435px]">
                <p className="font-inter text-[16px] leading-[1.3] tracking-[-0.4px] text-[#1a1a1a]/80">
                  Transforming users into verified identities boosts security
                  and trust. This process should be seamless, ensuring swift
                  onboarding while safeguarding our community.
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  className="group font-geist relative inline-flex h-10 min-w-[156px] cursor-pointer items-center justify-between gap-2 rounded-md bg-white py-3 pr-1.5 pl-5 text-[14px] font-medium text-[#0f172a] shadow-[inset_0_4px_8px_0_rgba(255,255,255,0.2),0_1px_2px_0_rgba(15,23,42,0.06)] transition-transform hover:-translate-y-px active:scale-[0.98]"
                >
                  <span className="flex-1 text-left">Get a demo</span>
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-[3px] bg-[#1a1a1a]/[0.09]">
                    <ArrowRight
                      className="h-4 w-4 text-[#0f172a] transition-transform group-hover:translate-x-0.5"
                      strokeWidth={2}
                    />
                  </span>
                </button>
                <button
                  type="button"
                  className="font-geist inline-flex h-10 items-center justify-center gap-2.5 rounded-md bg-white/40 px-5 py-3 text-[14px] font-medium text-[#1a1a1a]/80 backdrop-blur-sm transition-colors hover:bg-white/60 active:scale-[0.98]"
                >
                  <Phone className="h-4 w-4" strokeWidth={2} />
                  Contact us
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-[328px_1fr]">
          <FingerprintCard />
          <DashboardCard />
        </div>
      </LayoutWrapper>
    </div>
  );
}

function FingerprintCard() {
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

function DashboardCard() {
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

function DashboardTab({
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

function TabIconDashboard() {
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

function TabIconTrending() {
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

function TabIconVideo() {
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

function TabIconFork() {
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
