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
      className="flex lg:flex-row  flex-col  w-full justify-between lg:gap-0 gap-5 pt-8 opacity-0 max-md:px-4 "
    >
      <div className="flex flex-col items-start gap-2">
        <p className="text-left text-[18px] leading-[110%]">
          Cross-account linking
        </p>
        <p className="max-w-[355px] text-left text-[14px] leading-[130%]">
          Surface linked accounts through shared identifiers across users and
          devices.
        </p>
      </div>
      <div className="flex flex-col items-start gap-2">
        <p className="text-left text-[18px] leading-[110%]">
          Cross-account linking
        </p>
        <p className="max-w-[355px] text-left text-[14px] leading-[130%]">
          Surface linked accounts through shared identifiers across users and
          devices.
        </p>
      </div>
      <div className="flex flex-col items-start gap-2">
        <p className="text-left text-[18px] leading-[110%]">
          Cross-account linking
        </p>
        <p className="max-w-[355px] text-left text-[14px] leading-[130%]">
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
          anticipatePin: 1, // Prevents micro-stuttering on pinned entrance
        },
      });

      // Cache center bounds to prevent layout thrashing on scrub
      const getContainerCenter = () => {
        const rect = containerEl.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      };

      // Step 1: Scale down cards & converge to screen center
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
          centerLogoRef.current,
          {
            yPercent: 40,
          },
          "a",
        )

        // Step 2: Background color transition & center graphic scale down
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
        .to(
          "#max-width-container",
          {
            maxWidth: 1376,
            duration: 0.8,
          },
          "<",
        )
        .to(
          imageContainerRef.current,
          {
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            ease: "power2.inOut",
          },
          "-=0.4",
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
      className="relative  min-h-screen lg:min-h-[120vh] w-full overflow-hidden bg-white lg:pb-[84px]"
    >
      <div
        id="max-width-container"
        className="relative mx-auto flex  min-h-screen lg:min-h-[120vh] w-full items-center justify-center transition-all duration-300 lg:max-w-[1000px]"
      >
        {/* Central Graphic */}
        <div
          ref={centerLogoRef}
          className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
        >
          <Image
            src="https://res.cloudinary.com/dfajjqglx/image/upload/v1786967308/svgtf_t3tib8.svg"
            alt="Platform Central Graphic"
            width={120}
            height={120}
            priority
          />
        </div>

        {/* Card 1: Top-Left */}
        <div className="boxes absolute top-[20%] left-5 z-10 lg:left-10">
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

        {/* Card 2: Top-Right */}
        <div className="boxes absolute top-[15%] right-10 z-10">
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

        {/* Card 3: Bottom-Left */}
        <div className="boxes absolute bottom-[20%] left-10 z-10">
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

        {/* Card 4: Bottom-Right */}
        <div className="boxes absolute right-10 bottom-[18%] z-10">
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

        {/* Revealed Section: Title, Scaled Image & Features */}
        <div ref={textContentRef} className="z-30 w-full text-center opacity-0">
          <h2 className="text-3xl leading-[100%] font-semibold tracking-[-0.3px] text-[#3B82F6] md:text-5xl lg:text-[64px]">
            Meet Obsidian
          </h2>
          <p className="mt-3 mb-8 text-sm leading-[120%] text-slate-700 md:mt-4 md:mb-12 md:text-lg lg:mb-[64px] lg:text-[16px]">
            One trust platform makes every digital interaction trustworthy.
          </p>

          {/* Fixed Smooth Dashboard Image Reveal */}
          <div
            ref={imageContainerRef}
            className="relative mx-auto h-[220px] w-full  rounded-lg   md:h-[450px] lg:h-[44.44vw]"
            style={{
              clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)",
              willChange: "clip-path, transform",
            }}
          >
            <Image
              alt="Obsidian Platform Dashboard"
              fill
              priority
              className="object-cover w-full h-full "
              src="https://i.pinimg.com/1200x/c3/7c/8d/c37c8d887c04bce699b62739ed1d18f1.jpg"
            />
          </div>

          <FeatureItems />
        </div>
      </div>
    </div>
  );
}
