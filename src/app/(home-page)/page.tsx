

import FAQ from "./_components/FAQ";
import ConnectEveryIdentitySection from "./_components/ConnectEveryIdentitySection";
import HeroSection from "./_components/HeroSection";
import Infrastructure from "./_components/Infrastructure";
import Integrate from "./_components/Integrate";
import ReadAllStories from "./_components/ReadAllStories";
import ScaleSection from "./_components/ScaleSection";
import Streamline from "./_components/Streamline";

export default function HomePage() {
  return (
    <main className="relative h-full w-full">
      <HeroSection />
      <Streamline />
      <Integrate />
      <ConnectEveryIdentitySection/>
      <Infrastructure />
      <ReadAllStories />
      <ScaleSection/>
      <FAQ />
    </main>
  );
}
