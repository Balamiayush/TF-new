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
        "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg",
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
        "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
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
        "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
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
