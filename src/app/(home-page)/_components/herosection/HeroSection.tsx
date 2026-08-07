"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Phone } from "lucide-react";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import { FingerprintCard, DashboardCard } from "./HeroSectionAnim";

import {
  DitherControls,
  DEFAULT_DITHER_SETTINGS,
  hexToRgba,
  type DitherSettings,
} from "@/shared/ui/DitherControls";
import { DitherHoverBackground } from "@/shared/ui/DitherHoverBackground";

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
    <div className="relative isolate min-h-screen w-full overflow-hidden bg-[#fafcff]">
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
