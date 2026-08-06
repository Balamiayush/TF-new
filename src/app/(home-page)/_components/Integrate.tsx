"use client";

import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import React, { useState } from "react";

const stepsData = [
  {
    id: "selfie",
    title: "Selfie capture",
    description:
      "Passive liveness detection confirms a real person is present. Without asking them to do anything. Works in seconds. Blocks bots, deepfakes, and replay attacks.",
    imgSrc: "/images/selfie-capture.png", // Add your image path here
  },
  {
    id: "upload",
    title: "Upload document",
    description:
      "Automated OCR and document authenticity verification for passports, driver's licenses, and national IDs across global formats.",
    imgSrc: "/images/upload-document.png", // Add your image path here
  },
  {
    id: "gesture",
    title: "Active gesture",
    description:
      "Prompt users with randomized motion challenges to add an un-spoofable layer of biometric security when required.",
    imgSrc: "/images/active-gesture.png", // Add your image path here
  },
  {
    id: "videokyc",
    title: "Video KYC",
    description:
      "High-trust video verification sessions with live agent integration and recorded audit logs for strict regulatory compliance.",
    imgSrc: "/images/video-kyc.png", // Add your image path here
  },
];

export default function Integrate() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="min-h-screen w-full py-21 pb-30">
      <LayoutWrapper>
        <div className="flex min-h-[753px] w-full flex-col justify-between rounded-xl bg-gradient-to-br from-[#FBEAF9] to-[#E8B9E5] p-12 lg:flex-row lg:items-center">
          
          {/* Left Content Side */}
          <div className="flex max-w-[430px] flex-col justify-between self-stretch">
            {/* Heading */}
            <h2 className="font-geist text-[48px] font-medium leading-[115%] tracking-tight text-[#1A1A1A]">
              Integrate in<br />Days, Not Weeks
            </h2>

            {/* Accordion List */}
            <div className="mt-12 flex flex-col">
              {stepsData.map((step, index) => {
                const isActive = activeTab === index;
                return (
                  <div
                    key={step.id}
                    onClick={() => setActiveTab(index)}
                    className="cursor-pointer border-t border-[#1A1A1A]/10 py-4 transition-colors"
                  >
                    <h3
                      className={`font-geist text-[20px] font-medium leading-[110%] tracking-tight ${
                        isActive ? "text-[#1A1A1A]" : "text-[#1A1A1A]/50 hover:text-[#1A1A1A]/80"
                      }`}
                    >
                      {step.title}
                    </h3>

                    {isActive && (
                      <p className="font-geist mt-3 text-[16px] font-medium leading-[135%] tracking-tight text-[#1A1A1A]/80">
                        {step.description}
                      </p>
                    )}
                  </div>
                );
              })}
              {/* Bottom border for last item */}
              <div className="border-t border-[#1A1A1A]/10" />
            </div>
          </div>

          {/* Right Showcase Image Container */}
          <div className="relative mt-8 flex h-[580px] w-full items-center justify-center overflow-hidden rounded-2xl bg-[#E08EF8] lg:mt-0 lg:w-[580px]">
            {stepsData[activeTab].imgSrc ? (
              <img
                src={stepsData[activeTab].imgSrc}
                alt={stepsData[activeTab].title}
                className="h-full w-full object-cover object-center"
              />
            ) : (
              /* Fallback UI when image source is not yet provided */
              <div className="flex flex-col items-center justify-center text-[#1A1A1A]/40">
                <div className="h-96 w-56 rounded-[36px] border-4 border-current p-2">
                  <div className="h-full w-full rounded-[28px] bg-current/10" />
                </div>
                <span className="mt-4 font-geist text-sm">
                  {stepsData[activeTab].title} Showcase Container
                </span>
              </div>
            )}
          </div>

        </div>
      </LayoutWrapper>
    </section>
  );
}