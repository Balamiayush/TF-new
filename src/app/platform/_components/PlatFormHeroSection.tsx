"use client";

import ArrowIcon from "@/shared/icons/ArrowIcon";
import PhoneIcon from "@/shared/icons/PhoneIcon";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import Button from "@/shared/ui/buttons/Button";
import {
  DEFAULT_DITHER_SETTINGS,
  DitherControls,
  hexToRgba,
  type DitherSettings,
} from "@/shared/ui/DitherControls";
import { DitherHoverBackground } from "@/shared/ui/DitherHoverBackground";
import TrustedMarquee from "@/shared/ui/TrustedMarquee";
import Image from "next/image";
import { useState } from "react";

export default function PlatFormHeroSection() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [dither, setDither] = useState<DitherSettings>(DEFAULT_DITHER_SETTINGS);
  const TRUSTED_LOGOS = [
    { name: "esewa", image: "/images/trused-by-imgs/esewa.webp" },
    { name: "everest", image: "/images/trused-by-imgs/everest.webp" },
    { name: "laxmi", image: "/images/trused-by-imgs/laxmi.webp" },
    { name: "sagilo", image: "/images/trused-by-imgs/sagilo.webp" },
    {
      name: "siddhartha-bank",
      image: "/images/trused-by-imgs/siddhartha-bank.webp",
    },
  ];
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#E9F1FF14] pt-[120px] md:pt-20 lg:pt-0">
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

      <LayoutWrapper className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        <div className="flex max-w-[558px] flex-col gap-8 md:gap-10 lg:gap-12">
          <div>
            <h1 className="text-4xl leading-[1.05] font-medium tracking-[-0.3px] text-slate-900 md:text-6xl lg:text-[64px]">
              Approve the right customer at scale
            </h1>
            <p className="mt-4 max-w-[450px] text-sm tracking-[-0.4px] text-slate-600 md:text-base">
              Verify customers globally using identity, device, and behavioral
              signals with progressive checks that adapt to risk.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              href="/book-a-demo"
              variant="secondary"
              hasRightIcon
              className="group"
            >
              Get a demo
              <div className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-xs bg-slate-200 p-1.5">
                <ArrowIcon
                  className="absolute h-4 w-4 -translate-x-6 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
                  strokeWidth={2}
                />
                <ArrowIcon
                  className="h-4 w-4 transition-all duration-300 ease-out group-hover:translate-x-6 group-hover:opacity-0"
                  strokeWidth={2}
                />
              </div>
            </Button>

            <Button onClick={() => setIsContactOpen(true)} variant="contactus">
              <PhoneIcon />
              Contact us
            </Button>
          </div>
        </div>

        <div className="w-full lg:max-w-[44.44vw]">
          <div className="relative h-[400px] w-full overflow-hidden rounded-lg lg:h-[35vw]">
            <Image
              alt="Verification Platform Preview"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 44.44vw"
              className="object-cover"
              src="https://res.cloudinary.com/dfajjqglx/image/upload/v1787037228/dfaaf_bt076x.png"
            />
          </div>
          <div className="lg:mt-[24px] mt-[72px] flex flex-col items-center gap-4 lg:flex-row">
            {/* <p className="text-[15px] font-medium text-slate-600">Trusted by</p>
            <div className="flex flex-wrap items-center gap-3">
              {TRUSTED_LOGOS.map((logo, index) => (
                <div
                  key={index}
                  className="relative flex h-[38px] w-[100px] items-center"
                >
                  <Image
                    src={logo.image}
                    alt={logo.name}
                    fill
                    className="object-contain opacity-80 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                  />
                </div>
              ))}
            </div> */}
            <TrustedMarquee/>
          </div>
        </div>
      </LayoutWrapper>
    </div>
  );
}
