import React from "react";
import TimelineSection from "./TimelineSection";
import TImelineMobile from "./TImelineMobile";
import { TimelineProps } from "./type";

export default function TimelineMain() {
  const timelineData: TimelineProps["timelineData"] = [
    {
      id: 1,
      date: "January 2026",
      title: "Launch",
      description:
        "Third Factor AI launches on stage at the Nepal Fintech Alliance 2026 event. A KYC platform built for accuracy, speed, and simple integration. Identity verification at onboarding, done well.",
      image:
        "https://tf-landing-puce.vercel.app/_next/image?url=%2Fabout-us%2Ffintech.jpeg&w=1920&q=75",
      barGradient: "bg-[#60A5FA]",
      mobileGradient: "bg-[#60A5FA]",
      position: "bottom",
    },
    {
      id: 2,
      date: "April 2026",
      title: "Pension Management Office goes live",
      description:
        "More than 300,000 pensioners. The challenge was not verifying identity once. It was confirming presence every month. Traditional KYC had no answer. We built one.",
      image:
        "https://tf-landing-puce.vercel.app/_next/image?url=%2Fabout-us%2FPMO.png&w=1920&q=75",
      barGradient: "bg-[#2563EB]",
      mobileGradient: "bg-[#2563EB]",
      position: "top",
    },
    {
      id: 3,
      date: "May 2026",
      title: "Vianet signs",
      description:
        "An ISP with no regulatory requirement for KYC. Their challenge was continuously trusting who they were serving. The pattern became clear. This was not a KYC problem. It was a trust infrastructure problem.",
      image:
        "https://tf-landing-puce.vercel.app/_next/image?url=%2Fabout-us%2Fvianet.jpeg&w=1920&q=75",
      barGradient: "bg-[#D96EFF]",
      mobileGradient: "bg-[#D96EFF]",
      position: "bottom",
    },
  ];

  return (
    <>
      <TimelineSection timelineData={timelineData} />
      <TImelineMobile timelineData={timelineData} />
    </>
  );
}
