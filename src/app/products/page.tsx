import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import React from "react";

export default function page() {
  const labels = ["NRB Compliant", "VAPT Certified", "Sub-0.1ms 1:N Search"];

  return (
    <div className="min-h-screen w-full">
      <div className="bg-brand-50 min-h-[800px] w-full pb-16 lg:pb-24">
        <LayoutWrapper>
          <div className="flex w-full flex-col items-center justify-between gap-12 lg:flex-row lg:items-start lg:gap-8">
            <div className="flex flex-col gap-[16px] pt-[74px] lg:max-w-[578px]">
              <div className="hidden gap-1 lg:flex">
                {labels.map((label, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <div className="bg-brand-200 h-2 w-2"></div>
                    <p className="font-inter p-1.5 text-xs font-medium tracking-wider text-slate-700 uppercase">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <h1 className="text-[32px] leading-[114%] font-medium text-black sm:text-[40px] lg:text-[48px]">
                Make confident onboarding decisions with adaptable KYC
              </h1>
              <p className="font-inter text-[14px] leading-[130%] tracking-[-0.4px] text-slate-600 sm:text-[16px] lg:leading-[120%]">
                Verify customers globally using identity, device, and behavioral
                signals with progressive checks that adapt to risk.
              </p>
            </div>
          </div>
        </LayoutWrapper>
      </div>
    </div>
  );
}
