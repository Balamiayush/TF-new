

import FAQ from "./_components/FAQSection";
import ConnectEveryIdentitySection from "./_components/ConnectEveryIdentitySection";
import HeroSection from "./_components/herosection/HeroSection";
import Infrastructure from "./_components/InfrastructureSection";
import Integrate from "./_components/IntegrateSection";
import ReadAllStories from "./_components/ReadAllStoriesSection";
import ScaleSection from "./_components/ScaleSectionSection";
import Streamline from "./_components/StreamlineSection";
import TrustedBy from "./TrustedBy";
import StartVerifyingSection from "./_components/StartVerifyingSection";

export default function HomePage() {
  return (
    <main className="relative h-full w-full">
      <HeroSection />
      <TrustedBy/>
      <Streamline />
      <Integrate />
      <ConnectEveryIdentitySection/>
      <StartVerifyingSection/>
      <Infrastructure />
      <ReadAllStories />
      <ScaleSection/>
      <FAQ />
    </main>
  );
}
