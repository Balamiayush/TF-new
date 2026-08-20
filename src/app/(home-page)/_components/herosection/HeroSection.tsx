"use client";

import { useEffect, useState } from "react";

import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";

import {
  DEFAULT_DITHER_SETTINGS,
  DitherControls,
  hexToRgba,
  type DitherSettings,
} from "@/shared/ui/DitherControls";
import { DitherHoverBackground } from "@/shared/ui/DitherHoverBackground";

import { FingerprintCard } from "./HeroSectionAnim";
import Button from "@/shared/ui/buttons/Button";
import { motion, AnimatePresence } from "framer-motion";
import ArrowIcon from "@/shared/icons/ArrowIcon";
import PhoneIcon from "@/shared/icons/PhoneIcon";

import HeroSectionDashboardCard from "./HeroSectionDashboardCard";
import GitterImage from "@/shared/ui/GitterImg";
import ContactUs from "@/shared/layouts/contact-us/ContactUs";
import ContactUsButton from "@/shared/ui/buttons/ContactUsButton";

export default function HeroSection() {
  const [dither, setDither] = useState<DitherSettings>(DEFAULT_DITHER_SETTINGS);
  const [capabilityIndex, setCapabilityIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  const labels = ["NRB Compliant", "VAPT Certified", "Sub-0.1ms 1:N Search"];
  const textSuffal = ["compliance", "OCR", "deepfake detection"];

  const capability = labels[capabilityIndex];

  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCapabilityIndex((currentIndex) => (currentIndex + 1) % labels.length);
    }, 3200);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const shuffleInterval = window.setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % textSuffal.length);
    }, 2500);

    return () => window.clearInterval(shuffleInterval);
  }, [textSuffal.length]);

  const showNextCapability = () => {
    setCapabilityIndex((currentIndex) => (currentIndex + 1) % labels.length);
  };

  return (
    <div className="relative isolate min-h-screen w-full overflow-hidden bg-[#fafcff] pt-[120px] lg:pt-[168px]">
      <GitterImage />

      <div className="absolute top-0 right-0 h-[200px] w-[2000px] rotate-10 bg-[#95C5FF]/64 blur-[500px] lg:hidden" />
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

      <LayoutWrapper>
        <div className="relative z-100">
          <div className="hidden gap-1 md:flex">
            {labels.map((label, index) => (
              <div key={index} className="flex items-center gap-1">
                <div className="bg-brand-200 h-2 w-2"></div>
                <p className="font-inter p-1.5 text-xs font-medium">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex w-full flex-col items-start justify-between gap-6 md:flex-row md:items-center lg:flex-row">
            <h1 className="max-w-[680px] text-[32px] leading-[110%] font-medium tracking-[-0.6px] md:text-[40px] lg:text-[48px]">
              AI native trust infrastructure <br className="block lg:hidden" />{" "}
              for{" "}
              <span className="font-geist-pixel-circle vertical-bottom inline-grid overflow-hidden text-[#0088D4]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={textSuffal[textIndex]}
                    initial={{ y: "100%", opacity: 0, filter: "blur(4px)" }}
                    animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: "-100%", opacity: 0, filter: "blur(4px)" }}
                    transition={{
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="col-start-1 row-start-1"
                  >
                    {textSuffal[textIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>{" "}
              at scale
            </h1>
            <div className="flex flex-col gap-6">
              <div className="max-w-[435px]">
                <p className="font-inter text-[16px] leading-[1.3] tracking-[-0.4px] text-[#1a1a1a]/80">
                  Transforming users into verified identities boosts security
                  and trust. This process should be seamless, ensuring swift
                  onboarding while safeguarding our community.
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

                <ContactUsButton>
                  <PhoneIcon />
                  Contact us
                </ContactUsButton>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-100 mt-12 grid grid-cols-1 gap-4 md:grid-cols-[280px_1fr] lg:grid-cols-[328px_1fr]">
          <div className="hidden md:block">
            <FingerprintCard />
          </div>
          <HeroSectionDashboardCard />
        </div>
      </LayoutWrapper>
    </div>
  );
}
