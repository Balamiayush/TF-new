"use client";

import React from "react";
import Image from "next/image";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import Button from "@/shared/ui/buttons/Button";
import CardCom from "@/shared/ui/card/CardCom";

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
    title: "Fraudology: Closing the chargeback representment gap between issuers and",

    imageSrc:
      "https://images.pexels.com/photos/4427925/pexels-photo-4427925.jpeg",
  },
  {
    id: 3,
    category: "Marketing",
    date: "JUL 7, 2026",
    title: "Fraudology: Closing the chargeback representment gap between issuers and",

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
            <CardCom
              key={story.id}
              story={story}
            />
          ))}
        </div>
      </LayoutWrapper>
    </section>
  );
}