"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import React, { useRef, useState } from "react";

import PhoneIcon from "@/shared/icons/PhoneIcon";
import UserAddedIcon from "@/shared/icons/UserAddedIcon";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import Button from "@/shared/ui/buttons/Button";
import { DropdownArrow } from "@/shared/icons/DropdownArrow";

gsap.registerPlugin(ScrollTrigger);

const STEPS_DATA = [
  {
    id: 1,
    tag: "Onboarding",
    title: "Verify consumers and businesses with confidence.",
    description:
      "One trust platform makes every digital interaction trustworthy.",
    image:
      "https://i.pinimg.com/1200x/54/42/7e/54427e6a1a808807e3b3e909d58de075.jpg",
    subFeatures: [
      "Agentic AML Ops",
      "Transaction Monitoring",
      "Customer Risk Rating",
      "Sanctions Screening",
      "Case Management",
      "Sponsor Monitor",
    ],
  },
  {
    id: 2,
    tag: "Fraud Prevention",
    title: "Stop fraud before it enters your funnel.",
    description:
      "Blocklists, watchlists and behavior signals unified in one graph stop known bad actors instantly.",
    image:
      "https://i.pinimg.com/1200x/4b/41/88/4b418864b00bc52845e4db6735593bee.jpg",
    subFeatures: [
      "Agentic AML Ops",
      "Transaction Monitoring",
      "Customer Risk Rating",
      "Sanctions Screening",
      "Case Management",
      "Sponsor Monitor",
    ],
  },
  {
    id: 3,
    tag: "AML Compliance",
    title: "Automate financial crime operations.",
    description:
      "Screen every counterparty and transaction against AML, PEP and sanctions lists — with agentic case work.",
    image:
      "https://i.pinimg.com/1200x/c3/7c/8d/c37c8d887c04bce699b62739ed1d18f1.jpg",
    subFeatures: [
      "Agentic AML Ops",
      "Transaction Monitoring",
      "Customer Risk Rating",
      "Sanctions Screening",
      "Case Management",
      "Sponsor Monitor",
    ],
  },
  {
    id: 4,
    tag: "Cyber security",
    title: "Session-level trust, not one-time login.",
    description:
      "Continuous device fingerprint, IP intelligence and behavior biometrics catch account takeover, bots and mule accounts.",
    image:
      "https://i.pinimg.com/736x/1b/41/5b/1b415bb5950c9d3a11324c447e40b530.jpg",
    subFeatures: [
      "Agentic AML Ops",
      "Transaction Monitoring",
      "Customer Risk Rating",
      "Sanctions Screening",
      "Case Management",
      "Sponsor Monitor",
    ],
  },
];

export default function ModularBlocksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(
    () => {
      const stepElements = gsap.utils.toArray<HTMLElement>(".step-block");

      // 1. Active Step Observer (Works across mobile & desktop)
      stepElements.forEach((step, index) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 45%",
          end: "bottom 45%",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
      });

      // 2. Line Fill Animation (Enabled globally for mobile + desktop)
      gsap.to(lineFillRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".steps-container",
          start: "top 35%",
          end: "bottom 65%",
          scrub: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <div
      ref={sectionRef}
      className="relative min-h-screen w-full py-16 md:py-24 lg:py-[120px]"
    >
      <LayoutWrapper>
        {/* Header Section */}
        <div className="flex w-full flex-col justify-between gap-6 lg:flex-row lg:items-end lg:gap-12">
          <h3 className="max-w-[613px] text-[26px] leading-[110%] font-medium tracking-[-0.3px] text-slate-900 md:text-3xl lg:text-[42px]">
            Modular blocks for managing risk in the customer journey.
          </h3>
          <div className="flex flex-col items-start gap-4">
            <p className="max-w-[475px] max-lg:max-w-[358px] text-sm leading-[130%] tracking-[-0.4px] text-[#1A1A1ACC] md:text-base">
              Pick the products you need today. Compose new workflows tomorrow.
              Every module runs on the same Obsidian trust graph.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Button href="/book-a-demo">Book a demo</Button>
              <Button variant="contactus">
                <PhoneIcon />
                Contact us
              </Button>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="relative mt-12 flex flex-col items-start justify-between gap-12 lg:mt-[84px] lg:flex-row">
          <div className="relative flex w-full flex-1 flex-col z-[1]">
<div className="absolute top-[15px] bottom-[15px] left-[15px]  w-[2px] -translate-x-1/2 overflow-hidden">
  <div
    ref={lineFillRef}
    className="relative hidden h-full w-full origin-top opacity-80 before:absolute before:inset-y-0 before:left-0 before:w-[1px] before:bg-[linear-gradient(180deg,transparent_0%,#E4EAF2_15%,#E4EAF2_90%,#FFFFFF_100%)] after:absolute after:inset-y-0 after:right-0 after:w-[1px] after:bg-[linear-gradient(180deg,transparent_0%,#E4EAF2_15%,#E4EAF2_90%,#FFFFFF_100%)] lg:block"
  />
</div>

            <div className="steps-container flex flex-col gap-16 md:gap-24 lg:mt-40 lg:gap-[120px]">
              {STEPS_DATA.map((step, index) => {
                const isActive = activeIndex === index;

                return (
                  <div
                    key={step.id}
                    className={`step-block flex flex-col gap-6 transition-opacity relative z-100 duration-500 ease-out lg:flex-row lg:gap-8 ${
                      isActive ? "opacity-100" : "opacity-100 lg:opacity-35"
                    }`}
                  >
                    <div className="relative z-10 flex items-center gap-4 lg:flex-col lg:items-center lg:gap-0">
                      <div
                        className={`flex h-[30px] w-[30px] relative  shrink-0 items-center justify-center rounded-sm border-[0.73px] transition-all duration-300  ${
                          isActive
                            ? "border-blue-500 bg-blue-600 text-white shadow-[inset_0px_2.91px_2.91px_0px_#FFFFFF40]"
                            : "border-slate-300 bg-slate-100 text-slate-700 "
                        }`}
                      >
                        <p className="text-[16px] leading-none font-medium">
                          {step.id}
                        </p>
                      </div>

                      {/* Mobile Tag inline with badge */}
                      <p className="text-base leading-[110%] font-medium text-slate-900 lg:hidden">
                        {step.tag}
                      </p>
                    </div>

                    <div className="flex w-full flex-col gap-4 lg:max-w-[500px] lg:gap-6 lg:pt-0.5 lg:pl-0 lg:pl-11">
                      <p className="hidden text-[16px]  leading-[110%] font-medium text-slate-900 lg:block">
                        {step.tag}
                      </p>
                      <h4 className="text-[20px] max-lg:max-w-[292px] leading-[110%] font-normal tracking-[-0.3px] text-slate-900 md:text-3xl lg:text-[34px]">
                        {step.title}
                      </h4>
                      <p className="text-sm leading-[130%] max-lg:max-w-[292px] text-slate-600">
                        {step.description}
                      </p>

                      {/* Sub-features */}
                      <div className="flex flex-col gap-1">
                        {step.subFeatures.map((feat, fIdx) => (
                          <div
                            key={fIdx}
                            className="flex items-center justify-between rounded-sm px-4 py-3 text-[14px] font-medium text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-900"
                          >
                            <div className="flex items-center gap-2">
                              <UserAddedIcon />
                              <span>{feat}</span>
                            </div>
                            <div className="flex -rotate-90 flex-col">
                              <DropdownArrow />
                              <DropdownArrow />
                            </div>
                          </div>
                        ))}
                      </div>

                     
                      <div className="mt-4 h-[260px] w-full overflow-hidden rounded-lg border border-slate-200/80 sm:h-[350px] lg:hidden">
                        <div className="relative h-full w-full">
                          <Image
                            src={step.image}
                            alt={step.title}
                            fill
                            className="object-cover object-top"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="sticky top-[120px] hidden h-[580px] w-full max-w-[677px] overflow-hidden rounded-lg border border-slate-200/80 bg-white lg:block">
            <div className="relative h-full w-full">
              {STEPS_DATA.map((step, index) => (
                <div
                  key={step.id}
                  className="absolute inset-0 transition-opacity duration-500 ease-in-out"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    pointerEvents: activeIndex === index ? "auto" : "none",
                  }}
                >
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    className="object-cover object-top"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </div>
  );
}
