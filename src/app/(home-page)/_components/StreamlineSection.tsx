"use client";

import dynamic from "next/dynamic";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import { streamlineData } from "@/shared/data/stream-line-data";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Streamline() {
  return (
    <div className="relative w-full bg-white py-8 xl:py-21">
      <LayoutWrapper className="">
        <div className="flex flex-col gap-6">
          <h1 className="text-[26px] leading-[110%] font-medium tracking-[-0.6px] text-black xl:text-[42px]">
            Streamline{" "}
            <span className="font-geist-pixel-square text-blue-500">
              user verification
            </span>{" "}
            <br />
            from one dashboard.
          </h1>
          <p className="max-w-[554px] text-[16px] leading-[1.4] tracking-[-0.3px] text-[#64748B]">
            Identity events like onboarding and screening rely on separate
            tools. Third Factor unifies them into one platform with a single
            integration and audit trail.
          </p>
        </div>
      </LayoutWrapper>

      <LayoutWrapper className="pr-0! xl:pr-8!">
        <div className="mt-12 flex space-x-3 overflow-x-auto pb-8 [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing max-lg:cursor-grab xl:mt-21 xl:flex-col xl:gap-3 xl:space-x-0 xl:overflow-x-visible xl:pb-0 [&::-webkit-scrollbar]:hidden">
          {/* Row 1 */}
          <div className="flex shrink-0 flex-row gap-3 xl:shrink xl:flex-row">
            {streamlineData.slice(0, 2).map((card, index) => (
              <div
                key={index}
                className="relative flex h-[335px] w-[326px] shrink-0 flex-col justify-between overflow-hidden rounded-[8px] bg-slate-100 p-[16px] transition-all duration-300 hover:bg-blue-100 xl:h-[266px] xl:w-auto xl:flex-1 xl:shrink xl:flex-row xl:p-8"
              >
                <div className="z-10 flex flex-col justify-start">
                  <h3 className="font-geist text-[22px] leading-[100%] font-medium tracking-[0.6px] text-[#1A1A1A] xl:text-[24px]">
                    {card.title}
                  </h3>
                  <p
                    className={`font-inter mt-4 xl:mt-[22px] ${card.maxwidth} text-[14px] leading-[130%] tracking-[-0.15px] text-[#1A1A1ABF]`}
                  >
                    {card.desc}
                  </p>
                </div>

                <div className="relative mt-4 flex h-[200px] items-center justify-center self-center xl:absolute xl:top-4 xl:right-6 xl:bottom-4 xl:mt-0 xl:h-auto xl:w-[208px]">
                  <Lottie
                    animationData={card.lottie}
                    loop={true}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex shrink-0 flex-row gap-3 xl:shrink xl:flex-row">
            {streamlineData.slice(2, 5).map((card, index) => (
              <div
                key={index}
                className={`relative flex h-[335px] w-[326px] shrink-0 flex-col justify-between overflow-hidden rounded-[8px] bg-[#F1F5F9] p-[16px] transition-all duration-300 hover:bg-blue-100 xl:h-[266px] xl:shrink xl:flex-row xl:p-8 ${
                  index === 0 ? "xl:w-[504px]" : "xl:flex-1"
                }`}
              >
                <div className="z-10 flex flex-col justify-start">
                  <h3 className="font-geist text-[24px] leading-[100%] font-medium tracking-[0.6px] text-[#1A1A1A]">
                    {card.title}
                  </h3>
                  <p
                    className={`font-inter mt-3 xl:mt-[22px] ${card.maxwidth} text-[14px] leading-[130%] tracking-[-0.15px] text-[#1A1A1ABF]`}
                  >
                    {card.desc}
                  </p>
                </div>

                <div className="relative mt-4 flex h-[160px] w-full items-center justify-center self-center xl:absolute xl:top-4 xl:right-6 xl:bottom-4 xl:mt-0 xl:h-auto xl:w-[208px]">
                  <Lottie
                    animationData={card.lottie}
                    loop={true}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </LayoutWrapper>
    </div>
  );
}
