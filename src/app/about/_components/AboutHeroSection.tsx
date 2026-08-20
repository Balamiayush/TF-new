"use client";

import { useState } from "react";
import Image from "next/image";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import Button from "@/shared/ui/buttons/Button";
import GitterImage from "@/shared/ui/GitterImg";
import { DitherHoverBackground } from "@/shared/ui/DitherHoverBackground";
import {
  DEFAULT_DITHER_SETTINGS,
  hexToRgba,
  type DitherSettings,
} from "@/shared/ui/DitherControls";
import ContactUsButton from "@/shared/ui/buttons/ContactUsButton";

export default function AboutHeroSection() {
  const [dither, setDither] = useState<DitherSettings>(DEFAULT_DITHER_SETTINGS);

  return (
    <div className="relative flex h-[85vh] w-full items-center justify-center bg-[#EDF4FF] ">
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

      <LayoutWrapper className="relative z-10 flex flex-col items-center justify-center py-12">
        <div className="flex flex-col items-center justify-center text-center">
         
          <div className="relative  h-[200px] w-[200px] md:h-[271px] md:w-[271px]">
            <Image
              src="https://res.cloudinary.com/dfajjqglx/image/upload/v1787136563/Group_2147227682_iu9o0d.png"
              alt="Security Key Icon"
              fill
              className="object-contain"
              priority
            />
          </div>

          <h2 className="text-[32px] font-medium leading-[1.2] md:max-w-[500px] lg:max-w-[699px] lg:text-[48px]">
            Humans at the Center. Compliance at the Foundation
          </h2>

          <div className="mt-4 flex flex-col items-center gap-6 lg:mt-6">
            <p className="max-w-[500px] text-[#1A1A1ACC]">
              Transforming users into verified identities boosts security and
              trust. This process should be seamless, ensuring swift onboarding
              while safeguarding our community.
            </p>

            <div className="flex items-center justify-center gap-4">
              <Button variant="secondary">Read Manifesto</Button>
              <ContactUsButton
              className="bg-transparent"
              > 
                Contact us
              </ContactUsButton>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </div>
  );
}