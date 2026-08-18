import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import PlatFormHeroSection from "./_components/PlatFormHeroSection";
import ScrollAnimationSection from "./_components/ScrollAnimationSection";
import ModularBlocksSection from "./_components/ModularBlocksSection";
import BehindObsidian from "./_components/BehindObsidian";
import Infrastructure from "../(home-page)/_components/InfrastructureSection";
import ReadAllStories from "../(home-page)/_components/ReadAllStoriesSection";
import StartVerifyingSection from "../(home-page)/_components/StartVerifyingSection";
import FAQ from "../(home-page)/_components/FAQSection";
export default function page() {
  return (
    <div className="relative h-full w-full">
      <PlatFormHeroSection />
    <div className="py-16 md:py-24 lg:py-30">
  <LayoutWrapper className="flex flex-col items-center gap-6 text-center md:gap-8 lg:gap-12">
    <p className="text-base leading-tight tracking-[-0.3px] text-slate-800 md:text-lg lg:text-[20px]">
      Why obsidian platform
    </p>
    <p className="max-w-[803px] text-2xl font-medium leading-[120%] tracking-[-0.3px] text-black md:text-3xl lg:text-[40px]">
      A trust operating platform that unifies identity, risk, workflows,
      and decision intelligence in one platform.
    </p>
  </LayoutWrapper>
</div>
      <ScrollAnimationSection />
      <ModularBlocksSection />
      <Infrastructure />
      <BehindObsidian />
      <ReadAllStories />
      <StartVerifyingSection />
      <FAQ />
    </div>
  );
}
