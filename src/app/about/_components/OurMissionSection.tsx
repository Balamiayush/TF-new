import React from "react";
import Image from "next/image";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";

export default function OurMission() {
  return (
    <section className="w-full bg-white pt-12 pb-8  lg:py-20 ">
      <LayoutWrapper>
        <div className="flex flex-col lg:gap-21 gap-6">
          
         
          <div className="flex flex-col gap-6 lg:gap-[84px] ">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
              <h2 className="font-geist text-[32px] leading-[115%] tracking-[-0.3px] font-medium text-slate-900 md:w-1/3">
                Our Mission
              </h2>
              <p className="font-geist text-[16px] leading-[130%] tracking-[-0.15px] font-normal text-slate-900 md:w-1/2">
                Prevent fraud and ensure data sovereignty. Bridge the gap between
                proving you exist and being allowed to act. Help people prove
                identity and operate with trust across digital systems. Keep humans at
                the center of every digital interaction.
              </p>
            </div>

           
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="relative h-[286px] lg:h-[465px] w-full overflow-hidden rounded-lg">
                <Image
                  src="https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg"
                  alt="Team working in meeting room"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative w-[243px] h-[137px] lg:h-[356px] w-full overflow-hidden rounded-lg">
                <Image
                  src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
                  alt="Team collaboration"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 lg:gap-10  md:flex-row md:items-center">
            <div className="flex max-w-[540px] flex-col gap-4">
              <h2 className="font-geist text-[32px] leading-[115%] tracking-[-0.3px] font-medium text-slate-900">
                Our Vision
              </h2>
              <p className="font-geist text-[16px] leading-[130%] tracking-[-0.15px] font-normal text-slate-900">
                Prevent fraud and ensure data sovereignty. Bridge the gap between
                proving you exist and being allowed to act. Help people prove
                identity and operate with trust across digital systems. Keep humans at
                the center of every digital interaction.
              </p>
            </div>

            <div className="relative h-[240px] w-full overflow-hidden rounded-lg bg-[#FF62DC] md:w-[320px] shrink-0">
              <Image
                src="https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg"
                alt="Third Factor KYC App"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </LayoutWrapper>
    </section>
  );
}