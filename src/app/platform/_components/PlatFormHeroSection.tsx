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

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[##EDF4FF1F] pt-[120px] pb-16 md:pt-20 lg:pt-35">
      <Image
      alt=""
      fill
      src={'https://res.cloudinary.com/dfajjqglx/image/upload/v1787225272/Rectangle_8_impaxu.webp'}
      className=" w-full h-full absolute z-[-1]"
      />
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

      <LayoutWrapper className="relative z-10 flex flex-col items-center gap-10 md:gap-12">
        {/* Centered Hero Content */}
        <div className="flex max-w-[720px] flex-col items-center text-center gap-6 md:gap-8">
          <div>
            <h1 className="text-4xl leading-[94%] font-medium tracking-[-0.3px] text-slate-900 md:text-6xl lg:text-[74px]">
              Approve the right customer at scale
            </h1>
            <p className="mt-4 mx-auto max-w-[520px] text-sm tracking-[-0.4px] text-slate-600 md:text-base">
              Verify customers globally using identity, device, and behavioral
              signals with progressive checks that adapt to risk.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
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

        <div className="w-full ">
          <div className=" flex gap-4 lg:flex-row flex-col">
            <div className="relative min-h-[360px] w-full flex flex-1 rounded-xl bg-slate-50 md:col-span-8 md:min-h-[460px]">
            </div>

            {/* Right Side Image Card */}
            <div className="relative min-h-[360px] w-full overflow-hidden rounded-xl md:col-span-4 md:min-h-[506px] lg:max-w-[320px]">
              <Image
                alt="Verification Platform Preview"
                fill
                priority
                // sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
                src="https://res.cloudinary.com/dfajjqglx/image/upload/v1787037228/dfaaf_bt076x.png"
              />
            </div>
          </div>

          {/* Trusted Marquee Bar */}
          <div className="mt-8 flex w-full justify-center">
            <TrustedMarquee />
          </div>
        </div>
      </LayoutWrapper>
    </div>
  );
} 