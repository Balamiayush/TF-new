"use client";


import Image from "next/image";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import Button from "@/shared/ui/buttons/Button";
import CardCom from "@/shared/ui/card/CardCom";
import {
  DEFAULT_DITHER_SETTINGS,
  DitherControls,
  hexToRgba,
  type DitherSettings,
} from "@/shared/ui/DitherControls";
import { DitherHoverBackground } from "@/shared/ui/DitherHoverBackground";
import { useState } from "react";

const storiesData = [
  {
    id: 1,
    category: "Marketing",
    date: "JUL 7, 2026",
    title:
      "Fraudology: Closing the chargeback representment gap between issuers and",
 
    imageSrc:
      "https://images.pexels.com/photos/4427925/pexels-photo-4427925.jpeg",
  },
  {
    id: 2,
    category: "Marketing",
    date: "JUL 7, 2026",
    title: "Fraudology: Closing the chargeback representment gap between issuers and",

    imageSrc:
      "https://images.pexels.com/photos/4427925/pexels-photo-4427925.jpeg",
  },
  {
    id: 3,
    category: "Marketing",
    date: "JUL 7, 2026",
    title: "Fraudology: Closing the chargeback representment gap between issuers and",

    imageSrc:
      "https://images.pexels.com/photos/4427925/pexels-photo-4427925.jpeg",
  },
];

export default function ReadAllStories() {
    const [dither, setDither] = useState<DitherSettings>(DEFAULT_DITHER_SETTINGS);
  
  return (
    <section className="relative w-full bg-[#EDF4FF47] lg:py-30 py-12 overflow-hidden ">
  <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 hidden h-[820px] lg:block"
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

      
      <Image
        alt="gitter"
        fill
        className="pointer-events-none  z-[-1] absolute h-full w-full object-cover"
        src={"/gitter.png"}
      />
      <LayoutWrapper className=" max-xl:pl-8 max-md:pl-4 pr-0! relative z-100">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h2 className="font-geist max-w-[300px] text-[26px] font-medium leading-[120%] tracking-[0px] text-[#1A1A1A] lg:max-w-[500px] lg:text-[40px]">
            Get insights, tips, and updates from our team.
          </h2>

          <Button href="/blogs" variant="secondary" className=" max-lg:hidden">Read all stories</Button>
        </div>

        <div className=" lg:mt-21 mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
          {storiesData.map((story) => (
            <CardCom
              key={story.id}
              story={story}
              className=""
            />
          ))}
        </div>
         <Button href="/blogs" variant="secondary" className="lg:hidden! mt-8">Read all stories</Button>
      </LayoutWrapper>
    </section>
  );
}