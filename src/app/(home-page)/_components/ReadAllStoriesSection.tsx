"use client";

import React from "react";
import Image from "next/image";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import Button from "@/shared/ui/buttons/Button";

const storiesData = [
  {
    id: 1,
    category: "Marketing",
    date: "JUL 7, 2026",
    title:
      "Fraudology: Closing the chargeback representment gap between issuers and",
 
    imageSrc:
      "https://images.pexels.com/photos/4427925/pexels-photo-4427925.jpeg",
  },
  {
    id: 2,
    category: "Marketing",
    date: "JUL 7, 2026",
    title: "From Endpoint to API",

    imageSrc:
      "https://images.pexels.com/photos/4427925/pexels-photo-4427925.jpeg",
  },
  {
    id: 3,
    category: "Marketing",
    date: "JUL 7, 2026",
    title: "From Endpoint to API",

    imageSrc:
      "https://images.pexels.com/photos/4427925/pexels-photo-4427925.jpeg",
  },
];

export default function ReadAllStories() {
  return (
    <section className="relative w-full bg-[#EDF4FF47] lg:py-30 py-12 ">
      <Image
        alt="gitter"
        fill
        className="pointer-events-none absolute h-full w-full object-cover"
        src={"/gitter.png"}
      />
      <LayoutWrapper>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <h2 className="font-geist max-w-[300px] text-[26px] font-medium leading-[120%] tracking-[0px] text-[#1A1A1A] lg:max-w-[500px] lg:text-[40px]">
            Get insights, tips, and updates from our team.
          </h2>

          <Button variant="secondary">Read all stories</Button>
        </div>

        <div className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
          {storiesData.map((story) => (
            <div
              key={story.id}
              className="group flex w-[320px] shrink-0 cursor-pointer snap-start flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 md:w-full"
            >
              <div>
                <div
                  className={`relative h-[256.5px] w-full overflow-hidden rounded-xl border border-black/5 `}
                >
                  {story.imageSrc ? (
                    <Image
                      src={story.imageSrc}
                      alt={story.title}
                      fill
                      className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : null}
                </div>

                <div className="font-inter mt-5 text-[14px] font-medium leading-none text-slate-700">
                  {story.category}
                </div>

                <h3 className="font-geist mt-3.5 text-[18px] font-medium leading-[125%] tracking-[-0.3px] text-slate-900 transition-colors group-hover:text-blue-600">
                  {story.title}
                </h3>
              </div>

              <div className="font-inter mt-6 flex items-center gap-2 text-[13px] font-medium text-slate-500">
                <span className="text-[10px] text-slate-700">•</span>
                <span>{story.date}</span>
              </div>
            </div>
          ))}
        </div>
      </LayoutWrapper>
    </section>
  );
}