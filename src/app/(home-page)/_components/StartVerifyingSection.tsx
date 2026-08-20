"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import Button from "@/shared/ui/buttons/Button";
import { DitherHoverBackground } from "@/shared/ui/DitherHoverBackground";
import {
  DEFAULT_DITHER_SETTINGS,
  DitherControls,
  hexToRgba,
  type DitherSettings,
} from "@/shared/ui/DitherControls";
gsap.registerPlugin(ScrollTrigger, CustomEase);
if (typeof window !== "undefined") {
  CustomEase.create("punch", "M0,0 C0.7,0 0.16,1 1,1");
  gsap.defaults({ ease: "punch" });
}

const floatingImages = [
  {
    id: 1,
    src: "https://res.cloudinary.com/dfajjqglx/image/upload/v1786618591/Frame_1618874835_rgg1pu.png",
    alt: "KYC Mobile Screen",
    className: "top-[10%] left-[8%] w-[150px] h-[100px] lg:w-[307px] lg:h-[203px] ",
    speed: 25,
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/dfajjqglx/image/upload/v1786618591/Frame_1618874837_tbygvv.png",
    alt: "Document Verification",
    className: "top-[15%] right-[6%] w-[150px] h-[100px] lg:w-[305px] lg:h-[200px]",
    speed: 30,
  },
  {
    id: 3,
    src: "https://res.cloudinary.com/dfajjqglx/image/upload/v1786618591/Frame_1618874836_qb4s6w.png",
    alt: "Liveness Capture",
    className: "bottom-[12%] left-[6%] w-[150px] h-[100px] lg:w-[197px] lg:h-[138px]",
    speed: 35,
  },
  {
    id: 4,
    src: "https://res.cloudinary.com/dfajjqglx/image/upload/v1786618591/Frame_1618874840_hmcnoc.png",
    alt: "Face Verification",
    className: "bottom-[0%] left-[45%] hidden lg:block -translate-x-1/2 w-[157px] h-[100px] lg:w-[197px] lg:h-[138px]",
    speed: 30,
  },
  {
    id: 5,
    src: "https://res.cloudinary.com/dfajjqglx/image/upload/v1786618591/Frame_1618874837_tbygvv.png",
    alt: "Dashboard Verification Stream",
    className: "bottom-[0%] right-3  w-[157px] h-[100px] lg:w-[217px] lg:h-[202px]",
    speed: 25,
  },
];

export default function StartVerifyingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dither, setDither] = useState<DitherSettings>(DEFAULT_DITHER_SETTINGS);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".parallax-card");

      cards.forEach((card) => {
        const speed = parseFloat(card.dataset.speed || "0");

        gsap.to(card, {
          yPercent: -speed * 3,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex h-[90vh] lg:min-h-screen w-full items-center justify-center overflow-hidden bg-[#2563EB] px-4 py-32"
    >
      <DitherHoverBackground
      
        baseColor="transparent"
        gridColor={hexToRgba(dither.gridColor, dither.gridAlpha)}
        gridSize={dither.gridSize}
        dotRadius={dither.dotRadius}
        ditherColor={hexToRgba("#fff", 0.1)}
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

      {floatingImages.map((img) => (
        <div
          key={img.id}
          data-speed={img.speed}
          className={`parallax-card absolute z-100 overflow-hidden transition-shadow duration-300 ${img.className}`}
        >
          <div className="relative h-full w-full">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      ))}

      <div className="z-10 flex max-w-[800px] flex-col items-center text-center">
        <h1 className="font-geist text-[26px] lg:text-[50px] leading-[100%] font-normal tracking-[-0.4px] text-white">
          Start Verifying with <br /> Confidence
        </h1>

        <div className="mt-8 flex items-center gap-3">
          <Button variant="secondary">Log in</Button>
          <Button variant="primary" className="hover:bg-[#3B82F6]" href="/book-a-demo">Book a demo</Button>
        </div> 
      </div>
    </section>
  );
}