"use client";

import React, { useState } from "react";
import Image from "next/image";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";

export default function LeadershipTeam() {
  const [expandedId, setExpandedId] = useState<string | null>("Sojan Prajapati");

  const data = [
    {
      name: "Manish K. Sharma",
      imgSrc:
        "https://tf-landing-puce.vercel.app/_next/image?url=%2Fillustrations%2Fmanish.png&w=1920&q=75",
      title: "CEO",
      bio: "Manish Sharma serves as the Chief Executive Officer at Thirdfactor leading AI & product strategy.",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Sojan Prajapati",
      imgSrc:
        "https://tf-landing-puce.vercel.app/_next/image?url=%2Fillustrations%2Fsojan.png&w=1920&q=75",
      title: "CBO",
      bio: "Sojan Prajapati serves as the Chief Business Officer at Thirdfactor. He started his professional journey driving growth across regional financial tech.",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Sudip Dawadi",
      imgSrc:
        "https://tf-landing-puce.vercel.app/_next/image?url=%2Fillustrations%2Fsudip.png&w=1920&q=75",
      title: "CPO",
      bio: "Sudip Dawadi serves as the Chief Product Officer at Thirdfactor overseeing identity infrastructure.",
      linkedin: "https://linkedin.com",
    },
    {
      name: "Niranjan Udas",
      imgSrc:
        "https://tf-landing-puce.vercel.app/_next/image?url=%2Fillustrations%2Fniranjan.png&w=1920&q=75",
      title: "COO",
      bio: "Niranjan Udas serves as the Chief Operating Officer at Thirdfactor leading operational readiness.",
      linkedin: "https://linkedin.com",
    },
  ];

  const toggleExpand = (name: string) => {
    setExpandedId((prev) => (prev === name ? null : name));
  };

  return (
    <section className="w-full bg-white py-12 md:py-[84px]">
      <LayoutWrapper>
        <div className="flex flex-col gap-6 md:gap-10">
          {/* Section Heading */}
          <h3 className="font-geist text-[28px] font-medium leading-[114%] tracking-[-0.3px] text-slate-900 md:text-[48px]">
            Leadership Team
          </h3>

          {/* Cards Layout Grid */}
          <div className=" flex flex-col lg:flex-row gap-4 md:gap-[16px] lg:grid-cols-4">
            {data.map((member) => {
              const isExpanded = expandedId === member.name;

              return (
                <div
                  key={member.name}
                  className="group relative flex w-full flex-col gap-3"
                >
                  {/* Card Container */}
                  <div className="relative h-[335px] w-full overflow-hidden rounded-xl bg-slate-900 text-white md:h-[300px]">
                    {/* Member Image */}
                    <Image
                      alt={member.name}
                      fill
                      className={`object-cover transition-all duration-300 grayscale group-hover:scale-105 group-hover:blur-[2px] group-hover:opacity-30 ${
                        isExpanded ? "scale-105 blur-[2px] opacity-30 md:scale-100 md:blur-none md:opacity-85" : "opacity-85"
                      }`}
                      src={member.imgSrc}
                    />

                    {/* Dark Gradient Layer */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40 transition-opacity duration-300 group-hover:opacity-100 md:opacity-0" />

                    {/* Mobile Overlay Container */}
                    <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 md:hidden">
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col items-start gap-1">
                          <p className="font-geist text-[18px] font-medium leading-tight text-white">
                            {member.name}
                          </p>
                          <span className="inline-flex items-center rounded-[2px] bg-white/20 px-2 py-0.5 font-geist text-[11px] font-medium uppercase text-white backdrop-blur-sm">
                            {member.title}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpand(member.name)}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-all active:scale-95"
                          aria-label="Toggle details"
                        >
                          {isExpanded ? (
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          ) : (
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                          )}
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="mt-auto flex flex-col gap-3 pt-4">
                          <p className="font-geist text-[13px] leading-[140%] text-slate-200">
                            {member.bio}
                          </p>
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-white hover:underline"
                          >
                            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                            </svg>
                            LinkedIn
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Desktop Hover Overlay */}
                    <div className="absolute inset-0 z-10 hidden flex-col justify-end p-5 opacity-0 transition-all duration-300 group-hover:opacity-100 md:flex">
                      <p className="font-geist text-[13px] leading-[140%] text-slate-200">
                        {member.bio}
                      </p>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-medium text-white hover:underline"
                      >
                        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                        </svg>
                        LinkedIn
                      </a>
                    </div>
                  </div>

                  {/* Desktop Base Label */}
                  <div className="hidden items-center justify-between gap-2 md:flex">
                    <p className="font-geist text-[18px] font-medium text-slate-900">
                      {member.name}
                    </p>
                    <span className="shrink-0 rounded-[2px] bg-slate-100 px-2 py-1 font-geist text-[13px] font-medium text-slate-700">
                      {member.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}