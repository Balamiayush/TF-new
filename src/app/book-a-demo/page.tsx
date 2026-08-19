import React from "react";
import TrustedBy from "../(home-page)/_components/TrustedBy";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import BookADemoPageArrowIcon from "@/shared/icons/BookADemoPageArrowIcon";
import FAQ from "../(home-page)/_components/FAQSection";
import Infrastructure from "../(home-page)/_components/InfrastructureSection";
import ContactForm from "./_components/BookADemoForm";
import GitterImage from "@/shared/ui/GitterImg";
import BookADemoForm from "./_components/BookADemoForm";

export default function page() {
  const labels = ["NRB Compliant", "VAPT Certified", "Sub-0.1ms 1:N Search"];

  return (
    <div className="min-h-screen w-full">
      <div className="bg-brand-50 min-h-[800px]  w-full pb-16 lg:pb-24 py-[64px] relative">
        <GitterImage/>
        <LayoutWrapper>
          <div className="flex w-full flex-col relative z-[100] items-center justify-between gap-12 lg:flex-row lg:items-start lg:gap-8">
            <div className="mt-8 w-full max-w-[578px] lg:mt-[104px]">
              <div className="hidden gap-1 pb-10 lg:flex">
                {labels.map((label, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <div className="bg-brand-200 h-2 w-2"></div>
                    <p className="font-inter p-1.5 text-xs font-medium tracking-wider text-slate-700 uppercase">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="max-w-[568px]">
                <h1 className="text-[32px] leading-[114%] font-medium text-[#007BE5] md:text-[40px] md:whitespace-nowrap lg:text-[48px]">
                  The identity <br className="hidden md:inline" /> intelligence
                  layer <br className="hidden md:inline" /> your business can{" "}
                  <span className="font-geist-pixel-circle">trust</span>
                </h1>
                <p className="font-inter mt-4 text-[15px] leading-[140%] text-slate-600 md:text-[16px] lg:leading-[120%]">
                  Your customers change, fraud evolves, and a one-time KYC check
                  isn't enough. ThirdFactor verifies the person, detects fraud,
                  and helps you make confident identity decisions in real time.
                </p>
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap items-center gap-6 pt-10 md:gap-[72px] lg:pt-[146px]">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <BookADemoPageArrowIcon />
                    <p className="text-[28px] leading-[100%] font-medium tracking-[-0.09px] text-slate-900 md:text-[32px]">
                      10M+
                    </p>
                  </div>
                  <p className="font-inter text-[14px] text-slate-500 md:text-[16px]">
                    face matches
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <BookADemoPageArrowIcon />
                    <p className="text-[28px] leading-[100%] font-medium tracking-[-0.09px] text-slate-900 md:text-[32px]">
                      10M+
                    </p>
                  </div>
                  <p className="font-inter text-[14px] text-slate-500 md:text-[16px]">
                    face matches
                  </p>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <BookADemoPageArrowIcon />
                    <p className="text-[28px] leading-[100%] font-medium tracking-[-0.09px] text-slate-900 md:text-[32px]">
                      10M+
                    </p>
                  </div>
                  <p className="font-inter text-[14px] text-slate-500 md:text-[16px]">
                    face matches
                  </p>
                </div>
              </div>
            </div>

            {/* Right Form Card Container */}
            <div className="mt-6 w-full bg-white p-4 md:p-8 lg:mt-[64px] lg:w-[648px]">
              <BookADemoForm/>
            </div>
          </div>
        </LayoutWrapper>
      </div>
      <TrustedBy />
      <Infrastructure />
      <FAQ />
    </div>
  );
}
