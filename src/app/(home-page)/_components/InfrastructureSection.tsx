"use client";

import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import React, { useState } from "react";

const testimonials = [
  {
    id: 1,
    logo: "vianet",
    quote:
      "“ThirdFactor supports our digital onboarding, helping teams spot forged documents while verifying customers.”",
    bgGradient: "bg-[#C262F6]",
    imageSrc:
      "https://images.pexels.com/photos/9784237/pexels-photo-9784237.jpeg",
    stats: [
      { value: "70%", label: "Fewer manual review escalations" },
      { value: "3x", label: "Faster document verification cycles" },
      { value: "99%+", label: "Local document accuracy target" },
    ],
  },
  {
    id: 2,
    logo: "vianet",
    quote:
      "“ThirdFactor supports our digital onboarding, helping teams spot forged documents while verifying customers.”",
    bgGradient: "bg-[#0088D4]", // Blue card background
    imageSrc:
      "https://images.pexels.com/photos/9784237/pexels-photo-9784237.jpeg", // Add your background image path here
    stats: [
      { value: "70%", label: "Fewer manual review escalations" },
      { value: "3x", label: "Faster document verification cycles" },
      { value: "99%+", label: "Local document accuracy target" },
    ],
  },
];

export default function Infrastructure() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <section className="relative w-full bg-white py-30">
      <LayoutWrapper>
  
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h2 className="font-geist max-w-[732px] text-[48px] leading-[115%] font-medium tracking-tight text-black">
            Infrastructure trusted in high volume, regulated environments.
          </h2>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                aria-label="Previous slide"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E2E8F0] text-gray-700 transition-colors hover:bg-gray-300"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={handleNext}
                aria-label="Next slide"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E2E8F0] text-gray-700 transition-colors hover:bg-gray-300"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
            <a
              href="#contact"
              className="font-inter rounded-lg border border-gray-100 bg-[#F8FAFC] px-4 py-2.5 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              Contact for enterprise ready
            </a>
          </div>
        </div>

        <div className="mt-14 overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 40}%)` }}
          >
            {testimonials.map((item) => (
              <div
                key={item.id}
                className={`relative flex min-h-[472px] w-[880px] shrink-0 overflow-hidden rounded-2xl text-white ${item.bgGradient}`}
              >
      
                <div className="z-10 flex w-[480px] h-[472px] flex-col justify-between p-10">
           
                  <div className="text-[28px] font-bold tracking-tight lowercase">
                    {item.logo}
                  </div>

              
                  <p className="font-geist my-6 text-[24px] leading-[125%] font-medium tracking-tight text-white/95">
                    {item.quote}
                  </p>

                 
                  <div className="grid grid-cols-3 gap-4 border-t border-white/20 pt-6">
                    {item.stats.map((stat, idx) => (
                      <div key={idx} className="flex flex-col">
                        <span className="font-geist text-[28px] leading-none font-medium">
                          {stat.value}
                        </span>
                        <span className="font-inter mt-1.5 text-[11px] leading-[120%] text-white/80">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

               
                <div className="relative flex-1 overflow-hidden h-[472px]">
                  {item.imageSrc ? (
                    <img
                      src={item.imageSrc}
                      alt="Venue showcase"
                      className="h-full w-full object-cover "
                    />
                  ) : (
                    <div className="h-full w-full bg-black/10" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
