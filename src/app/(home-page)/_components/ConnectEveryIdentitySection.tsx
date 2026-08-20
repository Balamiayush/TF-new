"use client";

type AccordionItem = {
  id: number;
  title: string;
  description: string;
  src?: string;
};

type FeatureItem = {
  id: number;
  tag: string;
  title: string;
  description: string;
  icon: ReactNode;
  src: string;
  ACCORDION_DATA: AccordionItem[];
};

const FEATURES_DATA: FeatureItem[] = [
  {
    id: 1,
    tag: "Device and behavior",
    title: "Spot suspicious behavior from onboarding to payments",
    description:
      "Proprietary device and behavioral signals uncover early signs of fraud, without adding friction.",
    icon: <Smartphone className="h-5 w-5 text-white" />,
    src: "/images/connect-every-identity-section/suspicious-behaviour-spotting.webm",
    ACCORDION_DATA: [
      {
        id: 1,
        title: "Face Detection",
        description:
          "Confirms a real, clearly visible face is present before verification begins.",
      },
      {
        id: 2,
        title: "Liveness Detection",
        description:
          "Active and passive checks prove the face belongs to a live, present person.",
      },
      {
        id: 3,
        title: "Face Matching",
        description: "Matches the detected face against the document.",
      },
    ],
  },
  {
    id: 2,
    tag: "Identity Verification",
    title: "Verify real identities in milliseconds",
    description: "Automated document scanning and face matching",
    icon: <ScanFace className="h-5 w-5 text-white" />,
    src: "/images/connect-every-identity-section/verify-Identities-in.webm",
    ACCORDION_DATA: [
      {
        id: 1,
        title: "Document Verification & OCR",
        description:
          "Reads official documents — including handwritten Nepali document.",
      },
      {
        id: 2,
        title: "1:1 Face Match",
        description:
          "Confirms the live person is the same person on the submitted document.",
      },
      {
        id: 3,
        title: "1:N Face Match",
        description:
          "Compares one face against many to detect duplicates, fraud rings, and repeat applicants.",
      },
    ],
  },
  {
    id: 3,
    tag: "Compliance & Security",
    title: "Stay compliant with ever-changing regulations",
    description:
      "Bank-grade infrastructure built to scale effortlessly across jurisdictions.",
    icon: <Fingerprint className="h-5 w-5 text-white" />,
    src: "/images/connect-every-identity-section/stay-compliant-with.webm",
    ACCORDION_DATA: [
      {
        id: 1,
        title: "KYC / AML / PEP Screening",
        description: "Automated checks against sanction, PEP data.",
      },
      {
        id: 2,
        title: "On-Prem & Zero Data Retention",
        description: "Fully self-hosted and stateless.",
      },
      {
        id: 3,
        title: "Audit-Ready by Design",
        description:
          "Every verification and decision is logged with a human-in-the-loop trail.",
      },
    ],
  },
];

import Image from "next/image";
import { useEffect, useRef, useState, ReactNode } from "react";
import { Fingerprint, ScanFace, Smartphone } from "lucide-react";

import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import FeatureAccordion from "./FeatureAccordion";
import Button from "@/shared/ui/buttons/Button";
import PhoneIcon from "@/shared/icons/PhoneIcon";
import ContactUsButton from "@/shared/ui/buttons/ContactUsButton";

export default function ConnectEveryIdentitySection() {
  const [activeImage, setActiveImage] = useState(FEATURES_DATA[0].src);
  const [activeFeatureId, setActiveFeatureId] = useState(FEATURES_DATA[0].id);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -40% 0px",
      threshold: 0.2,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute("data-id");
          if (sectionId) {
            const numericId = Number(sectionId);
            setActiveFeatureId(numericId);

            const featureObj = FEATURES_DATA.find((f) => f.id === numericId);
            if (featureObj && featureObj.src) {
              setActiveImage(featureObj.src);
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );
    const cards = containerRef.current?.querySelectorAll(".feature-card");
    cards?.forEach((card) => observer.observe(card));

    return () => {
      cards?.forEach((card) => observer.unobserve(card));
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#E9F1FF]">
      <div className="py-8 lg:py-30">
        <LayoutWrapper>
          <div className="flex w-full flex-col items-start gap-4 lg:flex-row lg:items-end lg:justify-between lg:gap-6">
            <h2 className="font-geist text-[26px] leading-[115%] font-medium tracking-[-0.6px] text-black  lg:text-[42px]">
              Connect every
              <span className="font-geist-pixel-square text-blue-500">
                {" "}
                identity signal
              </span>{" "}
              <br className="lg:block hidden" />
              to one governed trust layer.
            </h2>
            <ContactUsButton>
              <PhoneIcon />
              Contact us
            </ContactUsButton>
          </div>

          <div
            ref={containerRef}
            className="relative mt-6 flex h-full w-full flex-col items-start gap-6 lg:mt-12 lg:flex-row lg:gap-3"
          >
            <div className="relative sticky top-[5%] hidden h-[700px] flex-1 overflow-hidden rounded-[10px] bg-[linear-gradient(180deg,_#FBEAF9_0%,_#E8B9E5_100%)] lg:block">
              {/* <Image
                src={activeImage}
                alt="Active Feature Visual"
                fill
                className="object-cover transition-opacity duration-500 ease-in-out"
                priority
              /> */}
              <video
                src={activeImage}
                loop
                muted
                autoPlay

                className="object-cover w-full h-full transition-all duration-300"
              />
            </div>

            <div className="flex h-full w-full flex-1 flex-col gap-8 lg:gap-3">
              {FEATURES_DATA.map((feature) => {
                const isSectionVisible = activeFeatureId === feature.id;

                return (
                  <div
                    key={feature.id}
                    data-id={feature.id}
                    className="feature-card flex w-full flex-col"
                  >
                    <div className="relative mb-3 block aspect-[4/3] w-full overflow-hidden rounded-[10px] bg-[linear-gradient(180deg,_#FBEAF9_0%,_#E8B9E5_100%)] lg:hidden">
                      <video
                        src={isSectionVisible ? activeImage : feature.src}
                        loop
                        muted
                        autoPlay
                        className="object-cover transition-all duration-300"
                      />
                    </div>

                    <div className="w-full rounded-[16px] border border-[#F4F2F1] bg-[#F8FAFC] p-4 lg:flex lg:h-[700px] lg:flex-col lg:justify-between lg:rounded-[10px]">
                      {/* Text Header */}
                      <div className="flex flex-col gap-2.5 lg:gap-4 lg:py-4">
                        <p className="font-geist-pixel-circle text-alpha-light-1000 text-[14px] leading-[100%] tracking-[1.5px] uppercase sm:text-[16px]">
                          {feature.tag}
                        </p>

                        <h3 className="text-[20px] leading-[115%] font-medium text-black sm:text-2xl lg:max-w-[400px] lg:leading-[110%]">
                          {feature.title}
                        </h3>
                        <p className="text-[13px] leading-relaxed text-neutral-500 sm:text-base lg:max-w-[80%]">
                          {feature.description}
                        </p>
                      </div>

                      <div className="mt-5 lg:mt-4">
                        <FeatureAccordion
                          data={feature.ACCORDION_DATA}
                          isParentActive={isSectionVisible}
                          onAccordionChange={(index) => {
                            const targetImage =
                              feature.ACCORDION_DATA[index]?.src || feature.src;
                            if (targetImage) {
                              setActiveImage(targetImage);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </LayoutWrapper>
      </div>
    </div>
  );
}
