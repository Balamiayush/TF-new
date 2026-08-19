"use client";

import React from "react";
import Image from "next/image";

interface TrustedMarqueeProps {
  className?: string;
}

const TRUSTED_LOGOS = [
  { name: "esewa", image: "/images/trused-by-imgs/esewa.webp" },
  { name: "siddhartha-bank", image: "/images/trused-by-imgs/siddhartha-bank.webp" },
  { name: "world-link", image: "/images/trused-by-imgs/world-link.webp" },
  { name: "surya", image: "/images/trused-by-imgs/surya.webp" },
  { name: "everest", image: "/images/trused-by-imgs/everest.webp" },
  { name: "laxmi", image: "/images/trused-by-imgs/laxmi.webp" },
  { name: "sagilo", image: "/images/trused-by-imgs/sagilo.webp" },
  { name: "vianet", image: "/images/trused-by-imgs/vianet.webp" },
  { name: "yango", image: "/images/trused-by-imgs/yango.webp" },
];

export default function TrustedMarquee({ className = "" }: TrustedMarqueeProps) {
  return (
    <div className={`flex w-full  items-center gap-4 ${className}`}>
      {/* Label */}
      <span className="shrink-0 text-base font-normal text-slate-800 whitespace-nowrap">
        Trusted by:
      </span>

      {/* Marquee Track Container */}
      <div 
        className="relative flex w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        {/* First Loop Track */}
        <div className="animate-marquee flex shrink-0 items-center gap-3 pr-3">
          {TRUSTED_LOGOS.map((logo, index) => (
            <div
              key={`first-${index}`}
              className="relative flex h-[38px] w-[110px] shrink-0 items-center justify-center overflow-hidden "
            >
              <Image
                src={logo.image}
                alt={logo.name}
                fill
                className="object-contain p-1 opacity-85 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </div>
          ))}
        </div>

        {/* Duplicated Loop Track */}
        <div
          className="animate-marquee flex shrink-0 items-center gap-3 pr-3"
          aria-hidden="true"
        >
          {TRUSTED_LOGOS.map((logo, index) => (
            <div
              key={`second-${index}`}
              className="relative flex h-[38px] w-[110px] shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200/80 bg-white/60 p-2 shadow-xs transition-colors hover:border-slate-300"
            >
              <Image
                src={logo.image}
                alt={logo.name}
                fill
                className="object-contain p-1 opacity-85 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}