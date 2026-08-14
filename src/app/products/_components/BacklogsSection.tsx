import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import Button from "@/shared/ui/buttons/Button";
import GitterImage from "@/shared/ui/GitterImg";
import React from "react";

interface CardProps {
  title: string;
  description: string;
  className?: string;
  titleMaxWidth?: string;
  descriptionMaxWidth?: string;
}

const BacklogCard = ({
  title,
  description,
  className = "",
  titleMaxWidth = "",
  descriptionMaxWidth = "",
}: CardProps) => (
  <div
    className={`flex flex-col gap-5 rounded-[8px] border-[0.94px] border-slate-200 bg-white relative z-100 p-8 ${className} `}
  >
    <h4
      className={`font-geist text-[24px] leading-[110%] font-medium text-black ${titleMaxWidth}`}
    >
      {title}
    </h4>
    <p
      className={` ${descriptionMaxWidth} font-inter text-alpha-light-800 max-w-[258px] text-[14px] leading-[130%] tracking-[-0.15px]`}
    >
      {description}
    </p>
  </div>
);

export default function BacklogsSection() {
  const cards = [
    {
      id: "resolve",
      title: "Resolve identity errors",
      description:
        "Correct name mismatches, OCR errors, transliterations, and format inconsistencies across sources.",
    },
    {
      id: "enrich",
      title: "Enrich decisions with OSINT",
      description:
        "Automatically surface relevant public web signals to confirm identities and highlight elevated risk.",
    },
    {
      id: "auto-clear",
      title: "Auto-clear low-risk cases",
      description:
        "Identify low-risk matches and inconsistencies to reduce manual review and queue backlogs.",
    },
    {
      id: "audit",
      title: "Audit-ready decision trails",
      description:
        "Document every check, decision, and signal with clear reasoning for regulators and auditors.",
    },
  ];

  return (
    <div className="relative min-h-screen w-full py-12 md:py-16 ">
      <GitterImage />
      <LayoutWrapper>
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between relative z-100">
          <h3 className="w-full text-[28px] leading-[1.2] font-medium tracking-[-0.3px] text-black lg:max-w-[498px] lg:text-[42px]">
            Clear KYC backlogs with AI-assisted review
          </h3>
          <Button>Agentic AML Ops</Button>
        </div>

        <div className="mt-12 flex w-full flex-col gap-5 lg:flex-row lg:gap-2">
          <BacklogCard
            title={cards[0].title}
            description={cards[0].description}
            titleMaxWidth="max-w-[203px]"
            className="lg:h-[420px]"
          />

          <div className="flex flex-1 flex-col gap-2">
            <BacklogCard
              title={cards[1].title}
              description={cards[1].description}
              titleMaxWidth="max-w-[203px]"
              className="lg:h-[206px]"
              descriptionMaxWidth="lg:max-w-[365px]"
            />
            <BacklogCard
              title={cards[2].title}
              description={cards[2].description}
              className="lg:h-[206px]"              titleMaxWidth="max-w-[203px]"

              descriptionMaxWidth="lg:max-w-[315px]"
            />
          </div>

          <BacklogCard
            title={cards[3].title}
            description={cards[3].description}
            titleMaxWidth="lg:max-w-[179px]"
            className=""
          />
        </div>
      </LayoutWrapper>
    </div>
  );
}
