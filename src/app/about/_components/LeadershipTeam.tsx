"use client";

import React, { useState } from "react";
import Image from "next/image";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import { motion, AnimatePresence } from "framer-motion";

export default function LeadershipTeam() {
  const [expandedId, setExpandedId] = useState<string | null>("");

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
            {data.map((member: any) => {
              const isExpanded = expandedId === member.name;

              return (
                <div
                  key={member.name}
                  className="group relative flex w-full flex-col overflow-hidden rounded-xl bg-slate-900 text-white"
                >
                  <div className="relative h-[335px] w-full overflow-hidden md:h-[340px]">
                    <motion.div
                      className="absolute inset-0 h-full w-full"
                      animate={{
                        scale: isExpanded ? 1.08 : 1,
                        filter: isExpanded
                          ? "blur(4px) grayscale(100%)"
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

                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30"
                      animate={{
                        opacity: isExpanded ? 1 : 0.6,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="absolute inset-0 z-10 flex flex-col justify-between p-5">
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col items-start gap-2">
                          <p className="font-geist text-[18px] leading-tight text-white">
                            {member.name}
                          </p>
                          <span className="font-geist inline-flex items-center rounded-[3px] bg-white/20 px-2 py-0.5 text-[11px] font-medium tracking-wider text-white uppercase backdrop-blur-md">
                            {member.title}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleExpand(member.name)}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-transform active:scale-90"
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
                              width={24}
                              height={24}
                              src="https://res.cloudinary.com/dfajjqglx/image/upload/v1786471089/plus-large_add_large_kchgm2.svg"
                            />
                          </motion.div>
                        </button>
                      </div>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, y: 15, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: "auto" }}
                            exit={{ opacity: 0, y: 10, height: 0 }}
                            transition={{
                              duration: 0.35,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="flex h-full w-full flex-col jusetify-btween gap-3 overflow-hidden pt-4"
                          >
                            <p className="font-geist text-alpha-dark-900 text-[14px] leading-[130%]">
                              {member.bio}
                            </p>
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-geist text-alpha-dark-900 inline-flex items-center gap-1.5 text-[16px] transition-opacity hover:opacity-80"
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
                        )}
                      </AnimatePresence>
                    </div>
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
