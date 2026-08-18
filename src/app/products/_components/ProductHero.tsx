"use client";
import { useState } from "react";
import Image from "next/image";

import { productsMenuData } from "@/shared/data/products-menu";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import Button from "@/shared/ui/buttons/Button";
import { DropDown } from "@/shared/ui/DropDown";

import { DitherHoverBackground } from "@/shared/ui/DitherHoverBackground";
import {
  DEFAULT_DITHER_SETTINGS,
  DitherControls,
  hexToRgba,
  type DitherSettings,
} from "@/shared/ui/DitherControls";
import TrustedMarquee from "@/shared/ui/TrustedMarquee";

export default function ProductionHero() {
  const onboardingItems = productsMenuData.categories[0]?.items ?? [];
  const [dither, setDither] = useState<DitherSettings>(DEFAULT_DITHER_SETTINGS);

  return (
    <div className="bg-brand-50 relative flex h-full w-full flex-col justify-center overflow-hidden pt-[120px] lg:pt-[168px] xl:h-[850px] mx-auto">
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
      />
      <DitherControls value={dither} onChange={setDither} />

      <LayoutWrapper className="relative z-10 mx-auto w-full ">

        <div className="flex flex-col justify-between lg:max-w-[520px] lg:pb-[69px]">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <span>Feature</span>
              <span>/</span>
              <span>Onboarding</span>
              <span>/</span>
              <DropDown label="KYC Onboarding" items={onboardingItems} />
            </div>

            <div className="mt-4 flex flex-col gap-6">
              <h1 className="text-[36px] leading-[1.1] font-semibold tracking-[-0.02em] text-black sm:text-[48px] lg:max-w-[479px]">
                Make confident onboarding decisions with adaptable KYC
              </h1>

              <p className="font-inter text-alpha-light-900 text-[16px] leading-[1.3] lg:max-w-[479px]">
                Verify customers globally using identity, device, and behavioral
                signals with progressive checks that adapt to risk.
              </p>
            </div>

            <div className="email-address mt-12 flex h-[52px] w-full max-w-[442px] items-center justify-between bg-white p-1.5 pl-6 shadow-[inset_0px_4px_8px_0px_#FFFFFF33]">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-transparent text-[14px] font-medium text-slate-950 placeholder:text-[#94A3B8] focus:outline-none"
              />
              <Button>Contact us</Button>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 xl:mt-20">
            <TrustedMarquee />
          </div>
        </div>
      </LayoutWrapper>

     <div className="relative z-[100] w-full max-lg:mt-10 max-lg:px-4 lg:absolute lg:right-0 lg:top-[168px] lg:w-[48vw] xl:w-[52vw]">
        <div className="relative h-[40vw] w-full">
          <Image
            alt="Dashboard Preview"
            fill
            src="https://i.pinimg.com/1200x/50/6f/a8/506fa8197b20a1fa08369a463f973282.jpg"
            className="object-cover w-full h-full"
            priority
          />
        </div>
      </div>
    </div>
  );
}