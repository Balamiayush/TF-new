

import FAQ from "./_components/FAQSection";
import ConnectEveryIdentitySection from "./_components/ConnectEveryIdentitySection";
import HeroSection from "./_components/herosection/HeroSection";
import Infrastructure from "./_components/InfrastructureSection";
import ReadAllStories from "./_components/ReadAllStoriesSection";
import ScaleSection from "./_components/ScaleSectionSection";
import Streamline from "./_components/StreamlineSection";
import TrustedBy from "./_components/TrustedBy";
import StartVerifyingSection from "./_components/StartVerifyingSection";
import IntegrateMain from "./_components/integrate-section/IntegrateMain";

export default function HomePage() {
  return (
    <main className="relative h-full w-full">
      <HeroSection />
      <TrustedBy/>
      <Streamline />
      <IntegrateMain/>
      <ConnectEveryIdentitySection/>
      <Infrastructure />
      <ScaleSection/>
      <StartVerifyingSection/>
      <ReadAllStories />
      <FAQ />
    </main>
  );
}
