import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import Button from "@/shared/ui/buttons/Button";
import GitterImage from "@/shared/ui/GitterImg";
import Image from "next/image";

export default function AboutHeroSection() {
  return (
    <div className="relative min-h-screen w-full bg-[#EDF4FF] lg:min-h-[800px]">
    <GitterImage/>
      <LayoutWrapper>
        <div className="flex h-full w-full flex-col-reverse justify-between py-21 lg:flex-row lg:items-end lg:py-12">
          <div className="flex flex-col gap-4 lg:gap-8">
            <h2 className="text-[32px] leading-[1.2] font-medium md:max-w-[500px] lg:max-w-[699px] lg:text-[48px]">
              Humans at the Center. Compliance at the Foundation
            </h2>
            <div className="flex flex-col gap-6">
              <p className="max-w-[500px] text-[#1A1A1ACC]">
                Transforming users into verified identities boosts security and
                trust. This process should be seamless, ensuring swift
                onboarding while safeguarding our community.
              </p>
              <div className="flex gap-2">
                <Button variant="secondary">Read Manifesto</Button>
                <Button variant="ghost">Talk to Us</Button>
              </div>
            </div>
          </div>
          <div className="h-[400px] w-[356px] mix-blend-multiply max-lg:mb-[45px] lg:h-full lg:w-[443px]">
            <video
              className="h-full w-full"
              src="https://tf-landing-puce.vercel.app/about-us/about-hero-video.webm"
              autoPlay
              loop
              muted
            ></video>
          </div>
        </div>
      </LayoutWrapper>
    </div>
  );
}
