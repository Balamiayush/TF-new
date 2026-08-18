"use client";

import Image from "next/image";

const TRUSTED_LOGOS = [
  { name: "esewa", image: "/images/trused-by-imgs/esewa.webp" },
  { name: "everest", image: "/images/trused-by-imgs/everest.webp" },
  { name: "laxmi", image: "/images/trused-by-imgs/laxmi.webp" },
  { name: "sagilo", image: "/images/trused-by-imgs/sagilo.webp" },
  {
    name: "siddhartha-bank",
    image: "/images/trused-by-imgs/siddhartha-bank.webp",
  },
  { name: "surya", image: "/images/trused-by-imgs/surya.webp" },
  { name: "vianet", image: "/images/trused-by-imgs/vianet.webp" },
  { name: "world-link", image: "/images/trused-by-imgs/world-link.webp" },
  { name: "yango", image: "/images/trused-by-imgs/yango.webp" },
];

export default function TrustedMarquee() {
  return (
    <div className="w-full max-w-[480px]">
      <p className="mb-3 text-sm font-medium text-slate-600">Trusted by</p>

      <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="animate-marquee flex shrink-0 items-center gap-3 pr-3">
          {TRUSTED_LOGOS.map((logo, index) => (
            <div
              key={`first-${index}`}
              className="relative flex h-[38px] w-[100px] shrink-0 items-center overflow-hidden rounded-md border border-slate-200 bg-white/50 p-1.5 shadow-2xs"
            >
              <Image
                src={logo.image}
                alt={logo.name}
                fill
                className="object-contain opacity-80 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </div>
          ))}
        </div>

        {/* Duplicated Group for Infinite Loop */}
        <div
          className="animate-marquee flex shrink-0 items-center gap-3 pr-3"
          aria-hidden="true"
        >
          {TRUSTED_LOGOS.map((logo, index) => (
            <div
              key={`second-${index}`}
              className="relative flex h-[38px] w-[100px] shrink-0 items-center overflow-hidden rounded-md border border-slate-200 bg-white/50 p-1.5 shadow-2xs"
            >
              <Image
                src={logo.image}
                alt={logo.name}
                fill
                className="object-contain opacity-80 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
