"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollAnimationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerLogoRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 1,
        },
      });

      const cards = gsap.utils.toArray<HTMLElement>(".boxes");

      // Step 1: Scale down cards & pull them to the exact screen center
      tl.to(cards, {
        x: (index, target) => {
          const targetRect = target.getBoundingClientRect();
          const containerRect = containerRef.current?.getBoundingClientRect();
          if (!containerRect) return 0;
          return (
            containerRect.left +
            containerRect.width / 2 -
            (targetRect.left + targetRect.width / 2)
          );
        },
        y: (index, target) => {
          const targetRect = target.getBoundingClientRect();
          const containerRect = containerRef.current?.getBoundingClientRect();
          if (!containerRect) return 0;
          return (
            containerRect.top +
            containerRect.height / 2 -
            (targetRect.top + targetRect.height / 2)
          );
        },
        scale: 0.25,
        opacity: 0,
        duration: 1,
      })

      // Step 2: Background color transition & center graphic fade out
      .to(
        containerRef.current,
        {
          backgroundColor: "#E8F4FF",
          duration: 0.8,
        },
        "-=0.3"
      )
      .to(
        centerLogoRef.current,
        {
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
        },
        "<"
      )

      .fromTo(
        textContentRef.current,
        {
          opacity: 0,
          scale: 0.9,
          y: 30,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
        },
        "-=0.2"
      ).to('#max-width-container',{
        maxWidth:1376,
      })
      .to(imageContainerRef.current,{
        height:678,
        clipPath: "inset(0% 0 0 0)",
      })

    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      id="ScrollAnimPlatformMain"
      className="relative min-h-screen w-full overflow-hidden bg-white"
    >
      <div id="max-width-container" className="relative mx-auto flex min-h-screen w-full max-w-[1000px] items-center justify-center">
        <div
          ref={centerLogoRef}
          className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
        >
          <Image
            src="https://res.cloudinary.com/dfajjqglx/image/upload/v1786967308/svgtf_t3tib8.svg"
            alt="Platform Central Graphic"
            width={120}
            height={120}
            priority
          />
        </div>

      

        <div className="boxes absolute left-10 top-16 z-10">
          <div className="box w-[283px] overflow-hidden rounded-lg shadow-md">
            <div className="Img relative h-[187px] w-full">
              <Image
                fill
                alt="Onboarding"
                className="h-full w-full object-cover"
                src="https://res.cloudinary.com/dfajjqglx/image/upload/v1786620030/Container-5_l5etry.png"
              />
            </div>
            <p className="bg-slate-100 p-4 text-[14px] leading-none text-slate-800">
              Onboarding
            </p>
          </div>
        </div>

        {/* Card 2: Top-Right */}
        <div className="boxes absolute right-10 top-10 z-10">
          <div className="box w-[283px] overflow-hidden rounded-lg shadow-md">
            <div className="Img relative h-[187px] w-full">
              <Image
                fill
                alt="Verification"
                className="h-full w-full object-cover"
                src="https://res.cloudinary.com/dfajjqglx/image/upload/v1786620030/Container-5_l5etry.png"
              />
            </div>
            <p className="bg-slate-100 p-4 text-[14px] leading-none text-slate-800">
              AML Compliance
            </p>
          </div>
        </div>

        {/* Card 3: Bottom-Left */}
        <div className="boxes absolute bottom-12 left-10 z-10">
          <div className="box w-[283px] overflow-hidden rounded-lg shadow-md">
            <div className="Img relative h-[187px] w-full">
              <Image
                fill
                alt="Data Security"
                className="h-full w-full object-cover"
                src="https://res.cloudinary.com/dfajjqglx/image/upload/v1786620030/Container-5_l5etry.png"
              />
            </div>
            <p className="bg-slate-100 p-4 text-[14px] leading-none text-slate-800">
              Data Security
            </p>
          </div>
        </div>

        {/* Card 4: Bottom-Right */}
        <div className="boxes absolute bottom-10 right-10 z-10">
          <div className="box w-[283px] overflow-hidden rounded-lg shadow-md">
            <div className="Img relative h-[187px] w-full">
              <Image
                fill
                alt="Risk Analysis"
                className="h-full w-full object-cover"
                src="https://res.cloudinary.com/dfajjqglx/image/upload/v1786620030/Container-5_l5etry.png"
              />
            </div>
            <p className="bg-slate-100 p-4 text-[14px] leading-none text-slate-800">
              Risk Analysis
            </p>
          </div>
        </div>
          <div
          ref={textContentRef}
          className="pointer-events-none w-full  z-30 text-center opacity-0"
        >
          <h2 className="text-[64px] font-semibold leading-[100%] tracking-[-0.3px] text-[#3B82F6] md:text-7xl">
            Meet Obsidian
          </h2>
          <p className="mt-4 text-[16px] leading-[120%] text-slate-700 md:text-xl mb-[64px]">
            One trust platform makes every digital interaction trustworthy.
          </p>
          <div ref={imageContainerRef} className=" relative w-full h-[0] "  style={{ clipPath: "inset(50% 0 50% 0)" }}
>
            <Image
            alt=""
            fill
            className=" object-cover"
            src={'https://res.cloudinary.com/dfajjqglx/image/upload/v1786971171/Frame_2147228136_gtghnk.png'}
            />
          </div>
        </div>
      </div>
       
    </div>
  );
}