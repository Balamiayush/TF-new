'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Fingerprint, Phone, ScanFace, Smartphone } from 'lucide-react';

import LayoutWrapper from '@/shared/layouts/wrapper/LayoutWrapper';
import FeatureAccordion from './FeatureAccordion';

const FEATURES_DATA = [
  {
    id: 1,
    tag: 'Device and behavior',
    title: 'Spot suspicious behavior from onboarding',
    description:
      'Behavioral signals uncover early signs of fraud, without adding friction.',
    icon: <Smartphone className="h-5 w-5 text-white" />,
    ACCORDION_DATA: [
      {
        id: 1,
        title: 'Face Detection',
        description:
          'Confirms a real, clearly visible face is present before verification begins.',
        src: '/user-experience/Face Detection.png',
      },
      {
        id: 2,
        title: 'Liveness Detection',
        description:
          'Active and passive checks prove the face belongs to a live, present person.',
        src: '/user-experience/LIveness.png',
      },
      {
        id: 3,
        title: 'Face Matching',
        description: 'Matches the detected face against the document.',
        src: '/user-experience/face match.png',
      },
    ],
  },
  {
    id: 2,
    tag: 'Identity Verification',
    title: 'Verify real identities in milliseconds',
    description: 'Automated document scanning and face matching',
    icon: <ScanFace className="h-5 w-5 text-white" />,
    ACCORDION_DATA: [
      {
        id: 1,
        title: 'Document Verification & OCR',
        description:
          'Reads official documents — including handwritten Nepali document.',
        src: '/user-experience/Document OCR-1.png',
      },
      {
        id: 2,
        title: '1:1 Face Match',
        description:
          'Confirms the live person is the same person on the submitted document.',
        src: '/user-experience/1_1 face match.png',
      },
      {
        id: 3,
        title: '1:N Face Match',
        description:
          'Compares one face against many to detect duplicates, fraud rings, and repeat applicants.',
        src: '/user-experience/1_N Face Match.png',
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
    ACCORDION_DATA: [
      {
        id: 1,
        title: 'KYC / AML / PEP Screening',
        description: 'Automated checks against sanction, PEP data.',
        src: '/user-experience/PEP Screening.png',
      },
      {
        id: 2,
        title: 'On-Prem & Zero Data Retention',
        description: 'Fully self-hosted and stateless.',
        src: '/user-experience/On-Prem & Zero Data Retention.png',
      },
      {
        id: 3,
        title: 'Audit-Ready by Design',
        description:
          'Every verification and decision is logged with a human-in-the-loop trail.',
        src: '/user-experience/Audit-Ready by Design.png',
      },
    ],
  },
];

export default function ConnectEveryIdentitySection() {
  const [activeImage, setActiveImage] = useState(
    FEATURES_DATA[0].ACCORDION_DATA[0].src
  );
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
            if (featureObj && featureObj.ACCORDION_DATA[0]?.src) {
              setActiveImage(featureObj.ACCORDION_DATA[0].src);
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
            {/* Sticky Left Container preserving exact height and gradient */}
            <div className="flex-1 rounded-[10px] sticky top-0 bg-[linear-gradient(180deg,_#FBEAF9_0%,_#E8B9E5_100%)] xl:h-[48.61vw] 2xl:h-[700px] overflow-hidden relative">
              <Image
                src={activeImage}
                alt="Active Feature Visual"
                fill
                className="object-cover transition-opacity duration-500 ease-in-out"
                priority
              />
            </div>

            {/* Right Stack with original 700px cards */}
            <div className="flex h-full w-full flex-1 flex-col gap-3">
              {FEATURES_DATA.map((feature) => {
                const isSectionVisible = activeFeatureId === feature.id;

                return (
                  <div
                    key={feature.id}
                    data-id={feature.id}
                    className="feature-card w-full rounded-[10px] border border-[#F4F2F1] bg-[#F8FAFC] h-[700px] p-6 flex flex-col justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium tracking-wide text-neutral-500">
                        {feature.tag}
                      </p>
                      <div className="mt-6">
                        <h4 className="text-2xl font-medium text-black">
                          {feature.title}
                        </h4>
                        <p className="mt-4 max-w-[95%] text-base leading-relaxed text-neutral-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>

                    {/* Mobile Image Fallback */}
                    <div className="relative my-4 block h-[300px] w-full overflow-hidden rounded-lg lg:hidden">
                      <Image
                        src={
                          isSectionVisible
                            ? activeImage
                            : feature.ACCORDION_DATA[0].src
                        }
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
                          if (feature.ACCORDION_DATA[index]?.src) {
                            setActiveImage(feature.ACCORDION_DATA[index].src);
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