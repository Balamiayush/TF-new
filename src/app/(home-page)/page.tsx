import HeroSection from "./_components/HeroSection";
import Integrate from "./_components/Integrate";
import Streamline from "./_components/Streamline";

export default function HomePage() {
  return (
    <main className="relative h-full w-full">
      <HeroSection />
      <Streamline/>
      <Integrate/>
    </main>
  );
}
