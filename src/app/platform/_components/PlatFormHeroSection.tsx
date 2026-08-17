"use client";
import ArrowIcon from "@/shared/icons/ArrowIcon";
import PhoneIcon from "@/shared/icons/PhoneIcon";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import Button from "@/shared/ui/buttons/Button";
import { useState } from "react";
import {
  DEFAULT_DITHER_SETTINGS,
  DitherControls,
  hexToRgba,
  type DitherSettings,
} from "@/shared/ui/DitherControls";
import { DitherHoverBackground } from "@/shared/ui/DitherHoverBackground";

export default function PlatFormHeroSection() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [dither, setDither] = useState<DitherSettings>(DEFAULT_DITHER_SETTINGS);

  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-[#E9F1FF14]">
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
      <LayoutWrapper className=" relative z-100">
        <div className="flex flex-col gap-21">
          <div className="">
            <h1 className="max-w-[558px] text-[64px] leading-[1] tracking-[-0.3px]">
              Approve the right customer at scale
            </h1>
            <p className="text-alpha-light-900 mt-[24px] max-w-[450px] text-[16px] tracking-[-0.4px]">
              Verify customers globally using identity, device, and behavioral
              signals with progressive checks that adapt to risk.
            </p>
          </div>
          <div className="flex gap-4">
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
      </LayoutWrapper>
    </div>
  );
}
