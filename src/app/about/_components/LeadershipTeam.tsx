"use client";

import React, { useState } from "react";
import Image from "next/image";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import { motion, AnimatePresence } from "framer-motion";

export default function LeadershipTeam() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

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
      bio: "Sojan Prajapati serves as the Chief Business Officer at Thirdfactor. He started his professional journey",
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
          <h3 className="font-geist text-[28px] leading-[114%] font-medium tracking-[-0.3px] text-slate-900 md:text-[48px]">
            Leadership Team
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 md:gap-[16px] lg:grid-cols-4">
            {data.map((member) => {
              const isExpanded = expandedId === member.name;

              return (
                <div
                  key={member.name}
                  className="group relative flex h-[340px] w-full flex-col overflow-hidden rounded-xl bg-slate-900 text-white"
                >
                  {/* Background Image Container */}
                  <motion.div
                    className="absolute inset-0 h-full w-full"
                    animate={{
                      scale: isExpanded ? 1.05 : 1,
                      filter: isExpanded
                        ? "blur(6px) grayscale(80%) brightness(0.6)"
                        : "blur(0px) grayscale(100%)",
                    }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Image
                      alt={member.name}
                      fill
                      className="object-cover"
                      src={member.imgSrc}
                    />
                  </motion.div>

                  {/* Dark Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black/40"
                    animate={{
                      opacity: isExpanded ? 0.75 : 0.4,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Top Right Toggle Button */}
                  <button
                    type="button"
                    onClick={() => toggleExpand(member.name)}
                    className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-transform active:scale-90"
                    aria-label="Toggle bio details"
                  >
                    <motion.div
                      animate={{ rotate: isExpanded ? 45 : 0 }}
                      transition={{
                        duration: 0.3,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="flex items-center justify-center"
                    >
                      <Image
                        alt="toggle"
                        width={20}
                        height={20}
                        src="https://res.cloudinary.com/dfajjqglx/image/upload/v1786471089/plus-large_add_large_kchgm2.svg"
                      />
                    </motion.div>
                  </button>

                  <div className="relative z-10 flex h-full w-full flex-col justify-between p-6">
                    <div className="flex flex-col items-start gap-2 pr-10">
                      <h4 className="font-geist text-[22px] leading-tight font-medium text-white">
                        {member.name}
                      </h4>
                      <span className="inline-flex items-center rounded-[4px] bg-white/20 px-2.5 py-1 text-[12px] font-medium tracking-wider text-white uppercase backdrop-blur-md">
                        {member.title}
                      </span>
                    </div>

                    {/* Expandable Bio Section */}
                    <AnimatePresence>
                      {isExpanded ? (
                        <motion.div
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="flex flex-1 flex-col justify-between pt-4"
                        >
                          <p className="font-geist text-[16px] leading-[150%] text-white/90">
                            {member.bio}
                          </p>

                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[15px] font-medium text-white transition-opacity hover:opacity-80"
                          >
                            <svg
                              className="h-5 w-5 fill-current"
                              viewBox="0 0 24 24"
                            >
                              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                            </svg>
                            Linkedin
                          </a>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
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
