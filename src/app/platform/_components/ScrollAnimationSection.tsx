"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function FeatureItems() {
  return (
    <div
      id="img-details"
      className="flex lg:flex-row flex-col w-full justify-between lg:gap-0 gap-5 pt-8 opacity-0 md:px-6 lg:px-0 max-md:px-4"
    >
      <div className="flex flex-col items-start gap-2">
        <p className="text-left text-[16px] text-[#0F172A] lg:text-[18px] leading-[110%]">
          Cross-account linking
        </p>
        <p className="max-w-[355px] text-left text-[14px] leading-[130%] text-[#1A1A1ACC]">
          Surface linked accounts through shared identifiers across users and
          devices.
        </p>
      </div>
      <div className="flex flex-col items-start gap-2">
        <p className="text-left text-[16px] text-[#0F172A] lg:text-[18px] leading-[110%]">
          Cross-account linking
        </p>
        <p className="max-w-[355px] text-left text-[14px] leading-[130%] text-[#1A1A1ACC]">
          Surface linked accounts through shared identifiers across users and
          devices.
        </p>
      </div>
      <div className="flex flex-col items-start gap-2">
        <p className="text-left text-[16px] text-[#0F172A] lg:text-[18px] leading-[110%]">
          Cross-account linking
        </p>
        <p className="max-w-[355px] text-left text-[14px] leading-[130%] text-[#1A1A1ACC]">
          Surface linked accounts through shared identifiers across users and
          devices.
        </p>
      </div>
    </div>
  );
}

export default function ScrollAnimationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerLogoRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const containerEl = containerRef.current;
      if (!containerEl) return;

      const cards = gsap.utils.toArray<HTMLElement>(".boxes");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerEl,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      const getContainerCenter = () => {
        const rect = containerEl.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      };

      tl.to(
        cards,
        {
          x: (_, target) => {
            const targetRect = target.getBoundingClientRect();
            return (
              getContainerCenter().x - (targetRect.left + targetRect.width / 2)
            );
          },
          y: (_, target) => {
            const targetRect = target.getBoundingClientRect();
            return (
              getContainerCenter().y - (targetRect.top + targetRect.height / 2)
            );
          },
          scale: 0.25,
          opacity: 0,
          duration: 1,
          force3D: true,
        },
        "a",
      )
        .to(
          containerEl,
          {
            backgroundColor: "#E8F4FF",
            duration: 0.8,
          },
          "-=0.3",
        )
        .to(
          centerLogoRef.current,
          {
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
          },
          "<",
        )
        .to(
          "#max-width-container",
          {
            maxWidth: 1376,
            duration: 0.8,
          },
          "<",
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
          "-=0.2",
        )
        .to("#img-details", {
          opacity: 1,
          duration: 0.5,
        });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      id="ScrollAnimPlatformMain"
      className="relative min-h-screen h-auto w-full overflow-hidden bg-white py-12 lg:py-16 flex flex-col justify-center items-center"
    >
      <div
        ref={centerLogoRef}
        className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      >
        <Image
          src="https://res.cloudinary.com/dfajjqglx/image/upload/v1786967308/svgtf_t3tib8.svg"
          alt="Platform Central Graphic"
          width={120}
          height={120}
          className="max-lg:w-[50px]"
          priority
        />
      </div>

      <div
        id="max-width-container"
        className="relative mx-auto flex h-auto min-h-fit w-full items-center justify-center transition-all duration-300 lg:max-w-[1000px]"
      >
        <div className="boxes absolute top-[10%] left-5 z-10 lg:left-10">
          <div className="box w-[150px] overflow-hidden rounded-lg lg:w-[283px]">
            <div className="Img relative h-[100px] w-full lg:h-[187px]">
              <Image
                fill
                alt="Onboarding"
                className="h-full w-full object-cover"
                src="https://res.cloudinary.com/dfajjqglx/image/upload/v1786620030/Container-5_l5etry.png"
              />
            </div>
            <p className="bg-slate-100 p-2 text-[14px] leading-none text-slate-800 lg:p-4">
              Onboarding
            </p>
          </div>
        </div>

        <div className="boxes absolute top-[5%] right-10 z-10">
          <div className="box w-[150px] overflow-hidden rounded-lg lg:w-[283px]">
            <div className="Img relative h-[100px] w-full lg:h-[187px]">
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

        <div className="boxes absolute bottom-[10%] left-10 z-10">
          <div className="box w-[150px] overflow-hidden rounded-lg lg:w-[283px]">
            <div className="Img relative h-[100px] w-full lg:h-[187px]">
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

        <div className="boxes absolute right-10 bottom-[8%] z-10">
          <div className="box w-[150px] overflow-hidden rounded-lg lg:w-[283px]">
            <div className="Img relative h-[100px] w-full lg:h-[187px]">
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

        <div ref={textContentRef} className="z-30 w-full text-center opacity-0 py-4">
          <h2 className="text-3xl leading-[100%] font-semibold tracking-[-0.3px] text-[#3B82F6] md:text-5xl lg:text-[64px]">
            Meet Obsidian
          </h2>
          <p className="mt-3 mb-6 text-sm leading-[120%] text-slate-700 md:mt-4 md:mb-8 md:text-lg lg:text-[16px]">
            One trust platform makes every digital interaction trustworthy.
          </p>
          
          <div
            ref={imageContainerRef}
            className="relative mx-auto w-full max-w-[358px] md:max-w-[700px] lg:max-w-[900px] aspect-[16/9] overflow-hidden rounded-lg"
          >
            <Image
              alt="Obsidian Platform Dashboard"
              fill
              priority
              className="object-cover w-full h-full"
              src="https://i.pinimg.com/1200x/c3/7c/8d/c37c8d887c04bce699b62739ed1d18f1.jpg"
            />
          </div>

          <FeatureItems />
        </div>
      </div>
    </div>
  );
}