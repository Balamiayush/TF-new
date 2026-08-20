"use client";

import Image from "next/image";
import React, { useState } from "react";

interface VideoStep {
  src: string;
  title: string;
}

const STEPS: VideoStep[] = [
  {
    src: "/images/hero/hero-section-video/1.webm",
    title: "Live Face Verification",
  },
  {
    src: "/images/hero/hero-section-video/liveness-verification.webm",
    title: "Document Upload",
  },
  {
    src: "/images/hero/hero-section-video/liveness-verification.webm",
    title: "Liveness Verification",
  },
];

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export function SvgTf({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M19.8222 10.1061C19.8222 10.4757 19.8035 10.8402 19.7642 11.1996C19.303 15.5767 16.1041 19.1154 11.9486 20V13.9767C13.3492 13.2427 14.3056 11.7711 14.3056 10.077C14.3056 8.34363 13.3031 6.84294 11.8479 6.12595C11.2639 5.83677 10.6062 5.67592 9.91106 5.67592C7.48412 5.67592 5.5166 7.64719 5.5166 10.077C5.5166 11.7711 6.47129 13.2409 7.87185 13.9751V20C7.32186 19.8819 6.78732 19.7194 6.27495 19.5107C4.73101 18.8913 3.37656 17.8868 2.32624 16.6119C0.874509 14.8547 0 12.5839 0 10.1061C0 7.62836 0.874509 5.35937 2.32624 3.602C3.37656 2.32717 4.73101 1.32273 6.27495 0.703287C7.40039 0.24812 8.62678 0 9.91106 0C15.023 0 19.2296 3.94594 19.7642 9.01268C19.8035 9.37204 19.8222 9.73651 19.8222 10.1061Z"
        fill="#007BE5"
      />
    </svg>
  );
}

export function FingerprintCard() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleVideoEnded = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % STEPS.length);
  };

  const currentStep = STEPS[currentVideoIndex];

  return (
    <div className="relative flex h-[420px] min-w-[328px] flex-col overflow-hidden rounded-2xl border-4 border-white/60 p-5 lg:h-[518px]">
      <Image
        alt="thirdfactor.ai background"
        fill
        className="absolute z-[-1]"
        priority
        src="/images/hero/hero-section-video/bg-img.webp"
      />

      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <Image
          alt="thirdfactor.ai logo"
          width={110}
          height={20}
          priority
          src="/logos/thirdfactor-logo.svg"
        />

        <div className="flex items-center gap-1.5 rounded-full border border-white/80 bg-white/90 py-1 pr-2 pl-1">
          <div className="relative flex h-4 w-4 overflow-hidden rounded-full">
            <span className="flex h-full w-full items-center justify-center bg-blue-900 text-[9px] font-bold text-white">
              NP
            </span>
          </div>
          <span className="text-[11px] font-semibold text-slate-800">EN</span>
        </div>
      </div>

      {/* Main Title */}
      <h2 className="font-geist mt-4 text-[20px] leading-[120%] font-medium tracking-[-0.13px] text-slate-900">
        Third Factor KYC
      </h2>

      {/* Step Info Row */}
      <div className="mt-3 flex items-center justify-between">
        <span className="font-geist text-[14px] font-medium text-[#2B548F]">
          {currentStep.title}
        </span>

        {/* Step Indicators */}
        <div className="flex items-center gap-1.5">
          {STEPS.map((_, idx) => {
            const isActive = idx === currentVideoIndex;
            const isCompleted = idx < currentVideoIndex;

            return (
              <React.Fragment key={idx}>
                {/* Connecting Line */}
                {idx > 0 && (
                  <span
                    className={`h-[1px] w-2.5 transition-colors duration-300 ${
                      idx <= currentVideoIndex ? "bg-[#007BE5]" : "bg-white"
                    }`}
                  />
                )}

                {/* Step Node */}
                <div
                  className={`flex h-[22px] w-[22px] items-center justify-center rounded-full transition-all duration-300 ${
                    isActive
                      ? "text-white"
                      : isCompleted
                      ? "bg-[#93C5FD] text-white"
                      : "border-2 border-dashed border-[#1E3A8A]/40 bg-transparent"
                  }`}
                >
                  {isActive ? (
                    <SvgTf className="" />
                  ) : isCompleted ? (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : null}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Video Frame */}
      <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border border-white/80 bg-white/40">
        <video
          key={currentVideoIndex}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleVideoEnded}
          onLoadedData={(e) => {
            e.currentTarget.play().catch(() => {});
          }}
          className="h-full w-full object-cover"
          src={currentStep.src}
        />
      </div>
    </div>
  );
}