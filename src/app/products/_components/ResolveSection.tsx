import BookADemoPageArrowIcon from "@/shared/icons/BookADemoPageArrowIcon";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import Image from "next/image";
import React from "react";

export default function ResolveSection() {
  return (
    <div className="w-full py-12 md:py-16 lg:pt-[120px] lg:pb-[95px]">
      <LayoutWrapper>
        <h3 className="max-w-[620px] text-[28px] sm:text-[36px] lg:text-[42px] leading-[1.2] font-medium tracking-[-0.3px] text-black">
          Resolve risk early, keep onboarding flowing
        </h3>

        <div className="mt-10 md:mt-16 lg:mt-21 flex flex-col md:flex-row flex-wrap lg:flex-nowrap gap-8 md:gap-12 lg:gap-21">
          <div className="flex flex-col gap-3">
            <div className="flex gap-1 items-center">
              <BookADemoPageArrowIcon className="h-[40px] w-[40px] lg:h-[54px] lg:w-[54px]" />
              <p className="text-[40px] lg:text-[54px] leading-[100%] text-slate-900 font-semibold lg:font-normal">
                95%
              </p>
            </div>
            <p className="text-sm lg:text-base text-slate-600">
              KYC alerts auto-resolved with AI
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex gap-1 items-center">
              <BookADemoPageArrowIcon className="h-[40px] w-[40px] lg:h-[54px] lg:w-[54px]" />
              <p className="text-[40px] lg:text-[54px] leading-[100%] text-slate-900 font-semibold lg:font-normal">
                95%
              </p>
            </div>
            <p className="text-sm lg:text-base text-slate-600">
              KYC alerts auto-resolved with AI
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex gap-1 items-center">
              <BookADemoPageArrowIcon className="h-[40px] w-[40px] lg:h-[54px] lg:w-[54px]" />
              <p className="text-[40px] lg:text-[54px] leading-[100%] text-slate-900 font-semibold lg:font-normal">
                95%
              </p>
            </div>
            <p className="text-sm lg:text-base text-slate-600">
              KYC alerts auto-resolved with AI
            </p>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-10 md:mt-16 lg:mt-21 flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap w-full items-stretch gap-4 md:gap-6 lg:gap-3">
          {/* Card 1 */}
          <div className="flex min-h-[320px] lg:h-[398px] flex-1 flex-col gap-6 rounded-lg bg-[#CB6BED] p-6 lg:p-8">
            <p className="text-alpha-dark-1000 max-w-[286px] text-[20px] lg:text-[24px] leading-[1.2] font-medium">
              Make progressive KYC decisions
            </p>
            <p className="text-alpha-dark-1000 max-w-[306px] text-sm">
              Assess risk continuously using passive signals first, then apply
              additional verification where needed.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex min-h-[320px] lg:h-[398px] flex-1 flex-col gap-6 rounded-lg bg-slate-100 p-6 lg:p-8">
            <p className="max-w-[286px] text-[20px] lg:text-[24px] leading-[1.2] font-medium text-black">
              Make progressive KYC decisions
            </p>
            <p className="max-w-[306px] text-sm text-black">
              Assess risk continuously using passive signals first, then apply
              additional verification where needed.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex min-h-[320px] lg:h-[398px] flex-1 flex-col gap-6 rounded-lg bg-slate-100 p-6 lg:p-8">
            <p className="max-w-[286px] text-[20px] lg:text-[24px] leading-[1.2] font-medium text-black">
              Make progressive KYC decisions
            </p>
            <p className="max-w-[306px] text-sm text-black">
              Assess risk continuously using passive signals first, then apply
              additional verification where needed.
            </p>
          </div>
        </div>
      </LayoutWrapper>
    </div>
  );
}