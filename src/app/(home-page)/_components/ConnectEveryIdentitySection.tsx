'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, ReactNode } from 'react';
import { Fingerprint, Phone, ScanFace, Smartphone } from 'lucide-react';

import LayoutWrapper from '@/shared/layouts/wrapper/LayoutWrapper';
import FeatureAccordion from './FeatureAccordion';

type AccordionItem = {
  id: number;
  title: string;
  description: string;
  imgSrc?: string;
};

type FeatureItem = {
  id: number;
  tag: string;
  title: string;
  description: string;
  icon: ReactNode;
  imgSrc: string;
  ACCORDION_DATA: AccordionItem[];
};

const FEATURES_DATA: FeatureItem[] = [
  {
    id: 1,
    tag: 'Device and behavior',
    title: 'Spot suspicious behavior from onboarding to payments',
    description:
      'Behavioral signals uncover early signs of fraud, without adding friction.',
    icon: <Smartphone className="h-5 w-5 text-white" />,
    imgSrc: 'https://images.pexels.com/photos/7241592/pexels-photo-7241592.jpeg',
    ACCORDION_DATA: [
      {
        id: 1,
        title: 'Face Detection',
        description:
          'Confirms a real, clearly visible face is present before verification begins.',
      },
      {
        id: 2,
        title: 'Liveness Detection',
        description:
          'Active and passive checks prove the face belongs to a live, present person.',
      },
      {
        id: 3,
        title: 'Face Matching',
        description: 'Matches the detected face against the document.',
      },
    ],
  },
  {
    id: 2,
    tag: 'Identity Verification',
    title: 'Verify real identities in milliseconds',
    description: 'Automated document scanning and face matching',
    icon: <ScanFace className="h-5 w-5 text-white" />,
    imgSrc: 'https://images.pexels.com/photos/9799395/pexels-photo-9799395.jpeg',
    ACCORDION_DATA: [
      {
        id: 1,
        title: 'Document Verification & OCR',
        description:
          'Reads official documents — including handwritten Nepali document.',
        imgSrc: 'https://images.pexels.com/photos/38779238/pexels-photo-38779238.jpeg',
      },
      {
        id: 2,
        title: '1:1 Face Match',
        description:
          'Confirms the live person is the same person on the submitted document.',
        imgSrc: 'https://images.pexels.com/photos/38779238/pexels-photo-38779238.jpeg',
      },
      {
        id: 3,
        title: '1:N Face Match',
        description:
          'Compares one face against many to detect duplicates, fraud rings, and repeat applicants.',
        imgSrc: 'https://images.pexels.com/photos/38779238/pexels-photo-38779238.jpeg',
      },
    ],
  },
  {
    id: 3,
    tag: 'Compliance & Security',
    title: 'Stay compliant with ever-changing regulations',
    description:
      'Bank-grade infrastructure built to scale effortlessly across jurisdictions.',
    icon: <Fingerprint className="h-5 w-5 text-white" />,
    imgSrc: 'https://images.pexels.com/photos/35182045/pexels-photo-35182045.jpeg',
    ACCORDION_DATA: [
      {
        id: 1,
        title: 'KYC / AML / PEP Screening',
        description: 'Automated checks against sanction, PEP data.',
      },
      {
        id: 2,
        title: 'On-Prem & Zero Data Retention',
        description: 'Fully self-hosted and stateless.',
      },
      {
        id: 3,
        title: 'Audit-Ready by Design',
        description:
          'Every verification and decision is logged with a human-in-the-loop trail.',
      },
    ],
  },
];

export default function ConnectEveryIdentitySection() {
  const [activeImage, setActiveImage] = useState(FEATURES_DATA[0].imgSrc);
  const [activeFeatureId, setActiveFeatureId] = useState(FEATURES_DATA[0].id);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0.2,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-id');
          if (sectionId) {
            const numericId = Number(sectionId);
            setActiveFeatureId(numericId);

            const featureObj = FEATURES_DATA.find((f) => f.id === numericId);
            if (featureObj && featureObj.imgSrc) {
              setActiveImage(featureObj.imgSrc);
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    const cards = containerRef.current?.querySelectorAll('.feature-card');
    cards?.forEach((card) => observer.observe(card));

    return () => {
      cards?.forEach((card) => observer.unobserve(card));
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#E9F1FF]">
      <div className="py-30">
        <LayoutWrapper>
          <div className="flex w-full items-end justify-between">
            <h2 className="font-geist max-w-[660px] text-[48px] leading-[115%] font-medium tracking-tight text-black">
              Connect every identity signal to one governed trust layer.
            </h2>
            <button
              type="button"
              className="font-geist inline-flex h-10 items-center justify-center gap-2.5 rounded-md bg-white/40 px-5 py-3 text-[14px] font-medium text-[#1a1a1a]/80 backdrop-blur-sm transition-colors hover:bg-white/60 active:scale-[0.98]"
            >
              <Phone className="h-4 w-4" strokeWidth={2} />
              Contact us
            </button>
          </div>

          <div
            ref={containerRef}
            className="mt-12 flex h-full w-full gap-3 relative items-start"
          >
            <div className="flex-1 rounded-[10px] sticky top-[5%] bg-[linear-gradient(180deg,_#FBEAF9_0%,_#E8B9E5_100%)] h-[700px] overflow-hidden relative">
              <Image
                src={activeImage}
                alt="Active Feature Visual"
                fill
                className="object-cover transition-opacity duration-500 ease-in-out"
                priority
              />
            </div>

            <div className="flex h-full w-full flex-1 flex-col gap-3">
              {FEATURES_DATA.map((feature) => {
                const isSectionVisible = activeFeatureId === feature.id;

                return (
                  <div
                    key={feature.id}
                    data-id={feature.id}
                    className="feature-card w-full rounded-[10px] border border-[#F4F2F1] bg-[#F8FAFC] h-[700px] p-6 flex flex-col justify-between"
                  >
                    <div className="flex flex-col gap-4 py-4">
                      <p className="text-[14px] font-geist-pixel-circle text-alpha-light-1000 tracking-[1.2px] uppercase leading-[100%]">
                        {feature.tag}
                      </p>

                      <h4 className="text-2xl leading-[110%] max-w-[400px] text-alpha-light-1000">
                        {feature.title}
                      </h4>
                      <p className="max-w-[60%] text-base leading-relaxed text-neutral-600">
                        {feature.description}
                      </p>
                    </div>

                    <div className="relative my-4 block h-[300px] w-full overflow-hidden rounded-lg lg:hidden">
                      <Image
                        src={isSectionVisible ? activeImage : feature.imgSrc}
                        alt={feature.title}
                        fill
                        className="h-full w-full object-cover transition-all duration-300"
                      />
                    </div>

                    <div className="mt-4">
                      <FeatureAccordion
                        data={feature.ACCORDION_DATA}
                        isParentActive={isSectionVisible}
                        onAccordionChange={(index) => {
                          const targetImage =
                            feature.ACCORDION_DATA[index]?.imgSrc ||
                            feature.imgSrc;
                          if (targetImage) {
                            setActiveImage(targetImage);
                          }
                        }}
                      />
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