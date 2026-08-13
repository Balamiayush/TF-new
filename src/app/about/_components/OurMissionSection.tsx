"use client";
import React from "react";
import Image from "next/image";

import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import { motion } from "framer-motion";

export default function OurMission() {
  return (
    <section className="w-full bg-white pt-12 pb-8 lg:py-20">
      <LayoutWrapper>
        <div className="flex flex-col gap-6 lg:gap-21">
          <div className="flex flex-col gap-6 lg:gap-[84px]">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
              <h2 className="font-geist text-[32px] leading-[115%] font-medium tracking-[-0.3px] text-slate-900 md:w-1/3">
                Our Mission
              </h2>
              <p className="font-geist text-[16px] leading-[130%] font-normal tracking-[-0.15px] text-slate-900 md:w-1/2">
                Prevent fraud and ensure data sovereignty. Bridge the gap
                between proving you exist and being allowed to act. Help people
                prove identity and operate with trust across digital systems.
                Keep humans at the center of every digital interaction.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <motion.div
                initial={{
                  opacity: 0,
                  y: 30,
                  clipPath: "inset(10% 10% 10% 10% round 8px)",
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  clipPath: "inset(0% 0% 0% 0% round 8px)",
                }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                className="relative h-[286px] w-full overflow-hidden rounded-lg lg:h-[465px]"
              >
                <Image
                  src="https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg"
                  alt="Team working in meeting room"
                  fill
                  className="object-cover"
                />
              </motion.div>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 30,
                  clipPath: "inset(10% 10% 10% 10% round 8px)",
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  clipPath: "inset(0% 0% 0% 0% round 8px)",
                }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.25, 1, 0.5, 1],
                }}
                className="relative h-[137px] w-[243px] w-full overflow-hidden rounded-lg lg:h-[356px]"
              >
                <Image
                  src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
                  alt="Team collaboration"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center lg:gap-10">
            <div className="flex max-w-[540px] flex-col gap-4">
              <h2 className="font-geist text-[32px] leading-[115%] font-medium tracking-[-0.3px] text-slate-900">
                Our Vision
              </h2>
              <p className="font-geist text-[16px] leading-[130%] font-normal tracking-[-0.15px] text-slate-900">
                Prevent fraud and ensure data sovereignty. Bridge the gap
                between proving you exist and being allowed to act. Help people
                prove identity and operate with trust across digital systems.
                Keep humans at the center of every digital interaction.
              </p>
            </div>

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
                clipPath: "inset(10% 10% 10% 10% round 8px)",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                clipPath: "inset(0% 0% 0% 0% round 8px)",
              }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              className="relative h-[240px] w-full shrink-0 overflow-hidden rounded-lg bg-[#FF62DC] md:w-[320px]"
            >
              <Image
                src="https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg"
                alt="Third Factor KYC App"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
