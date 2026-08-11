"use client";

import Image from "next/image";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import Label from "@/shared/typography/Label";

export default function TrustedBy() {
  const organizations = [
    { name: "esewa", image: "/images/trused-by-imgs/esewa.webp" },
    { name: "everest", image: "/images/trused-by-imgs/everest.webp" },
    { name: "laxmi", image: "/images/trused-by-imgs/laxmi.webp" },
    { name: "sagilo", image: "/images/trused-by-imgs/sagilo.webp" },
    { name: "siddhartha-bank", image: "/images/trused-by-imgs/siddhartha-bank.webp" },
    { name: "surya", image: "/images/trused-by-imgs/surya.webp" },
    { name: "vianet", image: "/images/trused-by-imgs/vianet.webp" },
    { name: "world-link", image: "/images/trused-by-imgs/world-link.webp" },
    { name: "yango", image: "/images/trused-by-imgs/yango.webp" },
  ];

  return (
    <section className="flex w-full items-center justify-center border-t border-slate-200 pt-8 pb-20 overflow-hidden">
      <LayoutWrapper>
        <div className="flex w-full flex-col items-center justify-center gap-6">
          <Label as="Label L">Trusted by</Label>

          {/* ================= MOBILE MARQUEE ================= */}
          <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] md:hidden">
            <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8">
              {organizations.map((item) => (
                <div key={`m1-${item.name}`} className="relative h-[32px] w-[90px] shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain grayscale opacity-85"
                  />
                </div>
              ))}
            </div>

            {/* Duplicated track for infinite seamless loop */}
            <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8" aria-hidden="true">
              {organizations.map((item) => (
                <div key={`m2-${item.name}`} className="relative h-[32px] w-[90px] shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain grayscale opacity-85"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ================= DESKTOP GRID / FLEX ================= */}
          <div className="hidden w-full lg:flex-nowrap flex-wrap items-center justify-center gap-8 lg:gap-10 md:flex">
            {organizations.map((item) => (
              <div
                key={item.name}
                className="relative h-[36px] w-[110px] lg:h-[40px] lg:w-[128px]"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain grayscale opacity-80 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}