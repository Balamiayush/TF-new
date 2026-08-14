import React from "react";
import AboutHeroSection from "./_components/AboutHeroSection";
import OurMission from "./_components/OurMissionSection";
import TimelineSection from "./_components/timeline-section/TimelineSection";
import LeadershipTeam from "./_components/LeadershipTeam";
import BuiltInNepalSection from "./_components/BuiltInNepalSection";
import FAQ from "../(home-page)/_components/FAQSection";
import TimelineMain from "./_components/timeline-section/TimelineMain";
import StartVerifyingSection from "../(home-page)/_components/StartVerifyingSection";

export default function page() {
  return (
    <div className="relative h-full w-full">
      <AboutHeroSection />
      <OurMission />
      <TimelineMain />
      <LeadershipTeam />
      <BuiltInNepalSection />
      <StartVerifyingSection/>
      <FAQ />
    </div>
  );
}
