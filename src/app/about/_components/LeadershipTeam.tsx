import React from "react";
import Image from "next/image";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";

export default function LeadershipTeam() {
  const data = [
    {
      name: "Manish Sharma",
      imgSrc:
        "https://tf-landing-puce.vercel.app/_next/image?url=%2Fillustrations%2Fmanish.png&w=1920&q=75",
      title: "CEO",
    },
    {
      name: "Sojan Prajapati",
      imgSrc:
        "https://tf-landing-puce.vercel.app/_next/image?url=%2Fillustrations%2Fsojan.png&w=1920&q=75",
      title: "CBO",
    },
    {
      name: "Sudip Dawadi",
      imgSrc:
        "https://tf-landing-puce.vercel.app/_next/image?url=%2Fillustrations%2Fsudip.png&w=1920&q=75",
      title: "CPO",
    },
    {
      name: "Niranjan Udas",
      imgSrc:
        "https://tf-landing-puce.vercel.app/_next/image?url=%2Fillustrations%2Fniranjan.png&w=1920&q=75",
      title: "COO",
    },
  ];

  return (
    <section className="w-full py-[84px] bg-white">
      <LayoutWrapper>
        <div className="flex flex-col gap-10">
          {/* Section Heading */}
          <h3 className="font-geist text-[48px] font-normal leading-[114%] tracking-[-0.3px] text-slate-900">
            Leadership Team
          </h3>

          {/* Cards Grid with 16px gap */}
          <div className="flex w-full gap-[16px]">
            {data.map((member) => (
              <div
                key={member.name}
                className="flex flex-col w-full max-w-[306px] gap-3"
              >
                {/* Image Container */}
                <div className="relative h-[272px] w-full overflow-hidden rounded-xl bg-slate-50">
                  <Image
                    alt={member.name}
                    fill
                    className="object-cover"
                    src={member.imgSrc}
                  />
                </div>

                {/* Info Container */}
                <div className="flex items-center justify-between gap-2">
                  <p className="font-geist text-[20px] font-normal leading-tight text-slate-900">
                    {member.name}
                  </p>

                  {/* Title Pill Badge */}
                  <span className="inline-flex items-center rounded-[2px] bg-slate-100 px-2 py-1 font-geist text-[14px] font-medium leading-[100%] tracking-[-0.18px] text-slate-700 shrink-0">
                    {member.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}