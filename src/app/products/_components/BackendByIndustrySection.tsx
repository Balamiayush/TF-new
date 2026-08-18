"use client";

const PLATFORM_STEPS = [
  {
    id: "data-consortium",
    label: "Data Consortium",
    subLabel: "Data Consortium",
    title: "Understand all aspects of an identity",
    features: [
      {
        title: "Simplify your stack.",
        desc: "Use one SDK for device, behavior, and identity risk.",
      },
      {
        title: "Resolve risk early.",
        desc: "Use signals to assess identity risk before fraud.",
      },
      {
        title: "Detect impersonation.",
        desc: "Bind identities to devices to prevent bots and impersonation.",
      },
    ],
    // Visual container placeholder / image styling
    bgGradient: "from-pink-100 to-purple-200",
  },
  {
    id: "risk-engine",
    label: "Risk Engine",
    subLabel: "Risk Engine",
    title: "Dynamic decisioning powered by real-time AI",
    features: [
      {
        title: "Automated Workflows.",
        desc: "Build custom logic without writing complex backend rules.",
      },
      {
        title: "Real-time Scoring.",
        desc: "Calculate risk parameters dynamically in milliseconds.",
      },
      {
        title: "Adaptive AML.",
        desc: "Evolve detection models automatically as attack vectors change.",
      },
    ],
    bgGradient: "from-blue-100 to-indigo-200",
  },
  {
    id: "identity-network",
    label: "Identity Network",
    subLabel: "Identity Network",
    title: "Global coverage across interconnected risk signals",
    features: [
      {
        title: "Global Reach.",
        desc: "Verify entities seamlessly across international databases.",
      },
      {
        title: "Cross-platform Signals.",
        desc: "Uncover hidden links across accounts and devices.",
      },
      {
        title: "Fraud Ring Defense.",
        desc: "Spot linked synthetic profiles before scaled exploitation.",
      },
    ],
    bgGradient: "from-emerald-100 to-teal-200",
  },
 
];


import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import GitterImage from "@/shared/ui/GitterImg";

function styleForDistance(distance: number, yStep = 60) {
  const abs = Math.abs(distance);
  const clampedT = Math.min(abs, 2);

  const scale = gsap.utils.interpolate(
    1,
    0.6,
    gsap.parseEase("power2.out")(clampedT / 2),
  );
  const opacity = gsap.utils.interpolate(
    1,
    0.28,
    gsap.parseEase("power2.out")(Math.min(clampedT, 1.3) / 1.3),
  );
  const y = distance * yStep;
  const x = gsap.utils.interpolate(6, 0, Math.min(abs, 1));

  return { scale, opacity, y, x };
}

export default function BackendByIndustrySection() {
  const totalSteps = PLATFORM_STEPS.length;
  const scrollHostRef = useRef<HTMLDivElement>(null);

  // Element Refs
  const navItemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const contentLayerRefs = useRef<Array<HTMLDivElement | null>>([]);
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const childRefs = useRef<Array<Array<HTMLElement | null>>>(
    PLATFORM_STEPS.map(() => []),
  );
  const progressBarRef = useRef<HTMLDivElement>(null);
  const stepNumberRef = useRef<HTMLParagraphElement>(null);

  const CHILD_OFFSETS = [0, 0.14, 0.24, 0.34, 0.42, 0.5];

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1440);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    let raf = 0;
    let lastTime = performance.now();
    let currentRail = -1;
    let currentStep = -1;

    const applyRail = (progress: number) => {
      navItemRefs.current.forEach((el, i) => {
        if (!el) return;
        const { scale, opacity, y, x } = styleForDistance(i - progress, 56);
        gsap.set(el, {
          y,
          x,
          scale,
          opacity,
          transformOrigin: "top top",
          force3D: true,
          willChange: "transform, opacity",
        });
      });
    };

    const applyContent = (progress: number) => {
      const base = Math.floor(progress);
      const frac = progress - base;
      const easeInOut = gsap.parseEase("power2.inOut");
      const easeOut = gsap.parseEase("power3.out");

      const outT = Math.min(frac / 0.48, 1);
      const outOpacity = 1 - easeInOut(outT);
      const inT = Math.max(0, (frac - 0.42) / 0.58);

      contentLayerRefs.current.forEach((el, i) => {
        if (!el) return;
        const isVisible = i === base || i === base + 1;
        gsap.set(el, {
          opacity: isVisible ? 1 : 0,
          pointerEvents: i === base && outOpacity > 0.5 ? "auto" : "none",
        });
      });

      childRefs.current.forEach((children, i) => {
        children.forEach((child, ci) => {
          if (!child) return;
          const offset = CHILD_OFFSETS[ci] ?? 0;
          const span = 1 - offset;

          if (i === base + 1) {
            const t = Math.max(0, Math.min(1, (inT - offset) / span));
            const eased = easeOut(t);
            gsap.set(child, {
              y: (1 - eased) * 25,
              opacity: eased,
              force3D: true,
            });
          } else if (i === base) {
            const outOffset = CHILD_OFFSETS[CHILD_OFFSETS.length - 1 - ci] ?? 0;
            const outSpan = 1 - outOffset;
            const t = Math.max(0, Math.min(1, (outT - outOffset) / outSpan));
            const eased = easeInOut(t);
            gsap.set(child, {
              y: -eased * 12,
              opacity: 1 - eased,
              force3D: true,
            });
          } else {
            gsap.set(child, { y: 20, opacity: 0 });
          }
        });
      });

      imageRefs.current.forEach((el, i) => {
        if (!el) return;
        if (i === base + 1) {
          const offset = 0.06;
          const t = Math.max(0, Math.min(1, (inT - offset) / (1 - offset)));
          const eased = easeOut(t);
          gsap.set(el, {
            y: (1 - eased) * 36,
            scale: 0.96 + eased * 0.04,
            opacity: eased,
            force3D: true,
          });
        } else if (i === base) {
          const eased = easeInOut(outT);
          gsap.set(el, {
            y: -eased * 20,
            scale: 1 - eased * 0.03,
            opacity: 1 - eased,
            force3D: true,
          });
        } else {
          gsap.set(el, { y: 36, scale: 0.96, opacity: 0 });
        }
      });

      const pct = ((progress + 1) / totalSteps) * 100;
      if (progressBarRef.current) {
        gsap.set(progressBarRef.current, { width: `${Math.min(pct, 100)}%` });
      }

      const activeI = Math.min(Math.round(progress), totalSteps - 1);
      if (stepNumberRef.current) {
        stepNumberRef.current.textContent = String(activeI + 1).padStart(
          2,
          "0",
        );
      }
    };

    const readProgress = () => {
      const host = scrollHostRef.current;
      if (!host) return { rail: 0, step: 0 };

      const rect = host.getBoundingClientRect();
      const scrolled = -rect.top;
      const totalScroll = rect.height - window.innerHeight;
      const raw = scrolled / Math.max(totalScroll, 1);
      const clamped = Math.min(Math.max(raw, 0), 0.9999);
      const continuous = clamped * (totalSteps - 1);

      const base = Math.floor(continuous);
      const frac = continuous - base;
      const READ_WINDOW = 0.68;
      let stepFrac: number;

      if (frac < READ_WINDOW) {
        stepFrac = 0;
      } else {
        const t = (frac - READ_WINDOW) / (1 - READ_WINDOW);
        stepFrac = gsap.parseEase("power2.inOut")(t);
      }

      return { rail: continuous, step: base + stepFrac };
    };

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const { rail, step } = readProgress();

      if (currentRail < 0) currentRail = rail;
      const railDecay = 1 - Math.exp(-6.5 * dt);
      currentRail += (rail - currentRail) * railDecay;
      if (Math.abs(rail - currentRail) < 0.0001) currentRail = rail;
      applyRail(currentRail);

      if (currentStep < 0) currentStep = step;
      const stepDecay = 1 - Math.exp(-12 * dt);
      currentStep += (step - currentStep) * stepDecay;
      if (Math.abs(step - currentStep) < 0.0001) currentStep = step;
      applyContent(currentStep);

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [totalSteps, isMobile]);

  const handleStepClick = (index: number) => {
    const host = scrollHostRef.current;
    if (!host) return;
    const totalScroll = host.offsetHeight - window.innerHeight;
    const targetScroll = (index / (totalSteps - 1)) * totalScroll;

    const scrollTarget = host.offsetTop + targetScroll;
    window.scrollTo({
      top: scrollTarget,
    });
  };

  return (
    <div
      ref={scrollHostRef}
      className="relative w-full bg-white"
      style={{ height: isMobile ? "auto" : `${PLATFORM_STEPS.length * 135}vh` }}
    >
      <div className="sticky top-10 min-h-screen w-full overflow-hidden pb-12 xl:pb-[120px] xl:sticky xl:top-[-50px] 2xl:top-0 xl:min-h-screen ">
        <GitterImage />
        <div className="relative z-10 py-10">
          <LayoutWrapper>
            <h3 className="w-full text-[28px] leading-[1.2] font-medium tracking-[-0.3px] text-black xl:w-[400px]">
              Backed by the industry’s leading{" "}
              <span className="text-[#00000066]">agentic risk platform</span>
            </h3>

            <div className="mt-24.5 hidden flex-wrap gap-23 xl:flex">
              {/* Left Nav Column */}
              <div className="flex h-auto min-w-[280px] flex-1 flex-col justify-between gap-12">
                <div className="flex items-center gap-2.5">
                  <div className="font-geist-pixel-circle flex gap-1 text-[16px]">
                    <p ref={stepNumberRef} className="text-[#E18CFF]">
                      01
                    </p>
                    <p>/</p>
                    <p>{String(totalSteps).padStart(2, "0")}</p>
                  </div>
                  <div className="relative h-[6px] w-[96px] overflow-clip rounded-xs bg-[#0B0F0C1A]">
                    <div
                      ref={progressBarRef}
                      className="absolute h-full bg-[#E18CFF]"
                      style={{ width: `${(1 / totalSteps) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="relative flex h-[340px] flex-col items-start">
                  {PLATFORM_STEPS.map((step, idx) => (
                    <button
                      key={step.id}
                      ref={(el) => {
                        navItemRefs.current[idx] = el;
                      }}
                      onClick={() => handleStepClick(idx)}
                      className="group absolute top-1/2 left-0 -translate-y-1/2 cursor-pointer text-left focus:outline-none"
                    >
                      <p className="text-[32px] font-medium tracking-[-0.3px] text-[#0B0F0C]">
                        {step.label}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Visual Stack Column */}
              <div className="relative min-h-[580px] w-full min-w-[320px] flex-[2]">
                {PLATFORM_STEPS.map((step, i) => (
                  <div
                    key={step.id}
                    ref={(el) => {
                      contentLayerRefs.current[i] = el;
                    }}
                    className="absolute inset-0 flex flex-col"
                    style={{ willChange: "opacity" }}
                  >
                    <p
                      ref={(el) => {
                        childRefs.current[i][0] = el;
                      }}
                      className="font-inter pb-8 text-[12px] text-[#0B0F0C94]"
                      style={{ willChange: "transform, opacity" }}
                    >
                      {step.subLabel}
                    </p>

                    <div className="flex flex-col gap-[32px]">
                      {/* Interactive Visual Frame */}
                      <div
                        ref={(el) => {
                          imageRefs.current[i] = el;
                        }}
                        className="relative h-[302px] w-full overflow-hidden rounded-xl bg-slate-100 shadow-sm"
                        style={{ willChange: "transform, opacity" }}
                      >
                        <div
                          className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${step.bgGradient} p-6`}
                        >
                          <div className="rounded-xl bg-white/80 p-4 shadow-sm backdrop-blur-xs">
                            <p className="font-mono text-sm font-semibold text-slate-700">
                              Interactive Preview: {step.label}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Dynamic Title */}
                      <p
                        ref={(el) => {
                          childRefs.current[i][1] = el;
                        }}
                        className="max-w-[480px] text-[32px] leading-[120%] font-medium tracking-[-0.32px] text-[#0B0F0C]"
                        style={{ willChange: "transform, opacity" }}
                      >
                        {step.title}
                      </p>

                      {/* Feature Badges */}
                      <div className="flex flex-wrap gap-4">
                        {step.features.map((feature, fi) => (
                          <div
                            key={feature.title}
                            ref={(el) => {
                              childRefs.current[i][2 + fi] = el;
                            }}
                            className="flex min-w-[220px] flex-1 flex-col gap-2 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-xs"
                            style={{ willChange: "transform, opacity" }}
                          >
                            <p className="text-[16px] font-medium text-slate-900">
                              {feature.title}
                            </p>
                            <p className="font-inter text-[14px] leading-[1.3] text-slate-500">
                              {feature.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile View (Standard clean stacked layout without sticky scroll bounds) */}
            <div className="mt-12 flex flex-col gap-16 xl:hidden">
              {PLATFORM_STEPS.map((step, idx) => (
                <div key={step.id} className="flex flex-col gap-6">
                  <div className="flex items-center gap-2">
                    <span className="font-geist-pixel-circle text-[14px] text-[#E18CFF]">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h4 className="text-[24px] font-medium tracking-[-0.3px] text-[#0B0F0C]">
                      {step.label}
                    </h4>
                  </div>

                  <p className="font-inter text-[12px] text-[#0B0F0C94]">
                    {step.subLabel}
                  </p>

                  <div className="relative h-[240px] w-full overflow-hidden rounded-xl bg-slate-100 shadow-sm">
                    <div
                      className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${step.bgGradient} p-6`}
                    >
                      <div className="rounded-xl bg-white/80 p-4 shadow-sm backdrop-blur-xs">
                        <p className="font-mono text-sm font-semibold text-slate-700">
                          Interactive Preview: {step.label}
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-[24px] leading-[120%] font-medium tracking-[-0.32px] text-[#0B0F0C]">
                    {step.title}
                  </p>

                  <div className="flex flex-col gap-3">
                    {step.features.map((feature) => (
                      <div
                        key={feature.title}
                        className="flex flex-col gap-1 rounded-xl border border-slate-100 bg-white px-4 py-3 shadow-xs"
                      >
                        <p className="text-[15px] font-medium text-slate-900">
                          {feature.title}
                        </p>
                        <p className="font-inter text-[13px] leading-[1.3] text-slate-500">
                          {feature.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </LayoutWrapper>
        </div>
      </div>
    </div>
  );
}
