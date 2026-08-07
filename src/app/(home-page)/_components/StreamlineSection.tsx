"use client";

import dynamic from "next/dynamic";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";

import builtForOperations from "@public/second-section-lottie/built-for-operations.json";
import developer from "@public/second-section-lottie/developer.json";
import multilevelOrchestration from "@public/second-section-lottie/multilevel-orchestration.json";
import transparentPricing from "@public/second-section-lottie/transparent-pricing.json";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const streamlineData = [
  {
    title: "White-Label Mobile SDK ",
    desc: "Native iOS and Android SDKs. Embed liveness detection and document capture directly in your app.  no WebView, fully branded to your product.",
    imgAlt: "White-Label Mobile SDK ",
    lottie: builtForOperations,
    maxwidth: "max-w-[294px]",
  },
  {
    title: "Build any identity workflow",
    desc: "Drop in iFrame or headless React components. Full styling control for identity verification, compliance, and fraud prevention flows.",
    imgAlt: "Build any identity workflow",
    lottie: developer,
    maxwidth: "max-w-[272px]",
  },
  {
    title: "Full data ownership",
    desc: "Your biometric scores, document data, and audit logs never leave your infrastructure. Not once.",
    imgAlt: "Full data ownership",
    lottie: multilevelOrchestration,
    maxwidth: "max-w-[222px]",
  },
  {
    title: "REST API and Webhooks",
    desc: "Every capability exposed as a clean REST endpoint. Real-time webhooks and streaming callbacks for every verification event.",
    imgAlt: "REST API and Webhooks",
    lottie: transparentPricing,
    maxwidth: "max-w-[294px]",
  },
];

export default function Streamline() {
  return (
    <div className="relative w-full bg-white py-21">
      <LayoutWrapper>
        <div className="flex flex-col gap-6">
          <h1 className="max-w-[620px] text-[48px] leading-[110%] font-medium tracking-[-0.6px] text-black">
            Streamline user verification from one dashboard.
          </h1>
          <p className="max-w-[554px] text-[16px] leading-[1.4] tracking-[-0.3px] text-gray-500">
            Identity events like onboarding and screening rely on separate
            tools. Third Factor unifies them into one platform with a single
            integration and audit trail.
          </p>
        </div>

        <div className="mt-21 flex flex-col gap-3">
          {/* Row 1 */}
          <div className="flex flex-col gap-3 lg:flex-row">
            {streamlineData.slice(0, 2).map((card, index) => (
              <div
                key={index}
                className="relative flex h-[266px] flex-1 justify-between overflow-hidden rounded-lg bg-[#F1F5F9] p-8"
              >
                <div className="z-10 flex flex-col justify-start">
                  <h3 className="font-geist text-[24px] leading-[100%] font-medium tracking-[0.6px] text-[#1A1A1A]">
                    {card.title}
                  </h3>
                  <p
                    className={`font-inter mt-[22px] ${card.maxwidth} text-[14px] leading-[130%] tracking-[-0.15px] text-[#1A1A1ABF]`}
                  >
                    {card.desc}
                  </p>
                </div>

                <div className="absolute top-4 right-6 bottom-4 flex w-[208px] items-center justify-center">
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
          <div className="flex flex-col gap-3 lg:flex-row">
            {streamlineData.slice(2, 5).map((card, index) => (
              <div
                key={index}
                className={`${index === 0 ? "w-[504px]" : "flex-1"} relative flex h-[266px] justify-between overflow-hidden rounded-lg bg-[#F1F5F9] p-8`}
              >
                <div className="z-10 flex flex-col justify-start">
                  <h3 className="font-geist text-[24px] leading-[100%] font-medium tracking-[0.6px] text-[#1A1A1A]">
                    {card.title}
                  </h3>
                  <p
                    className={`font-inter mt-[22px] ${card.maxwidth} text-[14px] leading-[130%] tracking-[-0.15px] text-[#1A1A1ABF]`}
                  >
                    {card.desc}
                  </p>
                </div>

                <div className="absolute top-4 right-6 bottom-4 flex w-[208px] items-center justify-center">
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
