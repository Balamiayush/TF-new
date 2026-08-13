"use client";

import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import GitterImage from "@/shared/ui/GitterImg";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

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
  {
    id: "agentic-ops",
    label: "Agentic Ops",
    subLabel: "Agentic Ops",
    title: "Autonomous investigation assistant for review teams",
    features: [
      {
        title: "Auto Summaries.",
        desc: "Get instant AI generated case histories for rapid review.",
      },
      {
        title: "OSINT Integration.",
        desc: "Surface public web risk signals automatically.",
      },
      {
        title: "Audit Trail.",
        desc: "Document reasoning for every single automated action.",
      },
    ],
    bgGradient: "from-amber-100 to-orange-200",
  },
];

export default function BackendByIndustrySection() {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const currentData = PLATFORM_STEPS[activeStep];
  const totalSteps = PLATFORM_STEPS.length;

  useEffect(() => {
    const intervalTime = 50;
    const duration = 5000;
    const increment = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveStep((nextStep) => (nextStep + 1) % totalSteps);
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [activeStep, totalSteps]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setProgress(0);
  };

  return (
    <div className="relative min-h-screen w-full bg-white">
      <GitterImage />
      <div className="relative z-100 py-30">
        <LayoutWrapper>
          <h3 className="w-full text-[28px] leading-[1.2] font-medium tracking-[-0.3px] text-black lg:w-[574px]">
            Backed by the industry’s leading{" "}
            <span className="text-[#00000066]">agentic risk platform</span>
          </h3>

          <div className="mt-24.5 flex flex-wrap gap-23">
            <div className="flex h-auto min-w-[280px] flex-1 flex-col justify-between gap-12">
              <div className="flex items-center gap-2.5">
                <div className="font-geist-pixel-circle flex gap-1 text-[16px]">
                  <p className="text-[#E18CFF]">
                    {String(activeStep + 1).padStart(2, "0")}
                  </p>
                  <p>/</p>
                  <p>{String(totalSteps).padStart(2, "0")}</p>
                </div>
                <div className="relative h-[6px] w-[96px] overflow-clip rounded-xs bg-[#0B0F0C1A]">
                  <motion.div
                    className="absolute h-full bg-[#E18CFF]"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: "linear", duration: 0.05 }}
                  />
                </div>
              </div>

              <div className="flex flex-col items-start gap-[48px]">
                {PLATFORM_STEPS.map((step, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <button
                      key={step.id}
                      onClick={() => handleStepClick(idx)}
                      className="cursor-pointer text-left transition-all duration-300"
                    >
                      <p
                        className={`font-medium transition-all duration-300 ${
                          isActive
                            ? "text-[24px] text-[#0B0F0C]"
                            : "text-[16px] text-[#0B0F0C]/50 hover:text-[#0B0F0C]/80"
                        }`}
                      >
                        {step.label}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex w-full min-w-[320px] flex-[2] flex-col">
              <p className="font-inter pb-8 text-[12px] text-[#0B0F0C94]">
                {currentData.subLabel}
              </p>

              <div className="flex flex-col gap-[48px]">
                <div className="relative h-[302px] w-full overflow-hidden rounded-xl bg-slate-100">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentData.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className={`h-full w-full bg-gradient-to-br ${currentData.bgGradient} flex items-center justify-center p-6`}
                    >
                      <div className="rounded-lg bg-white/80 p-4 shadow-sm backdrop-blur-xs">
                        <p className="font-mono text-sm font-semibold text-slate-700">
                          Interactive Preview: {currentData.label}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentData.id + "-title"}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-[480px] text-[32px] leading-[120%] font-medium tracking-[-0.32px] text-[#0B0F0C]"
                  >
                    {currentData.title}
                  </motion.p>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentData.id + "-features"}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="flex flex-wrap gap-4"
                  >
                    {currentData.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex min-w-[220px] flex-1 flex-col gap-2 rounded-lg border border-slate-100 bg-white px-4 py-3 shadow-xs"
                      >
                        <p className="text-[16px] font-medium text-slate-900">
                          {feature.title}
                        </p>
                        <p className="font-inter text-[14px] leading-[1.3] text-slate-500">
                          {feature.desc}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </LayoutWrapper>
      </div>
    </div>
  );
}
