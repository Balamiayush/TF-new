import React from "react";
import ProductionHero from "./_components/ProductHero";
import ResolveSection from "./_components/ResolveSection";
import StickyProductSection from "./_components/StickyProductSection";
import BacklogsSection from "./_components/BacklogsSection";
import BackendByIndustrySection from "./_components/BackendByIndustrySection";
import FAQ from "../(home-page)/_components/FAQSection";
import StartVerifyingSection from "../(home-page)/_components/StartVerifyingSection";

export default function page() {
  return (
    <div className="relative h-full w-full">
      <ProductionHero />
      <ResolveSection />
      <StickyProductSection/>
      <BacklogsSection/>
      <BackendByIndustrySection/>
      <StartVerifyingSection/>
      <FAQ/>
    </div>
  );
}
