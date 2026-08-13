import { DropdownArrow } from "@/shared/icons/DropdownArrow";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import Button from "@/shared/ui/buttons/Button";
import Image from "next/image";

export default function ProductionHero() {
  const labels = ["NRB Compliant", "VAPT Certified", "Sub-0.1ms 1:N Search"];

  const trustedLogos = [
    { name: "esewa", image: "/images/trused-by-imgs/esewa.webp" },
    { name: "everest", image: "/images/trused-by-imgs/everest.webp" },
    { name: "laxmi", image: "/images/trused-by-imgs/laxmi.webp" },
    { name: "sagilo", image: "/images/trused-by-imgs/sagilo.webp" },
    {
      name: "siddhartha-bank",
      image: "/images/trused-by-imgs/siddhartha-bank.webp",
    },
  ];

  return (
    <div className="bg-brand-50 h-[850px] w-full lg:h-screen">
      <LayoutWrapper>
        <div className="pt-[120px] lg:pt-[120px]">
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <span>Feature</span>
              <span>/</span>
              <span>Onboarding</span>
              <span>/</span>
              <button className="flex items-center gap-1 font-semibold text-slate-900">
                KYC Onboarding
                <DropdownArrow />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              <h1 className="text-[36px] leading-[1.1] font-semibold tracking-[-0.02em] text-black sm:text-[48px] lg:max-w-[479px]">
                Make confident onboarding decisions with adaptable KYC
              </h1>

              <p className="font-inter text-alpha-light-900 text-[16px] leading-[1.3] lg:max-w-[479px]">
                Verify customers globally using identity, device, and behavioral
                signals with progressive checks that adapt to risk.
              </p>
            </div>
          </div>
          <div className="email-address mt-12 flex h-[52px] w-full max-w-[442px] items-center justify-between bg-white p-1.5 pl-6 shadow-[inset_0px_4px_8px_0px_#FFFFFF33]">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full bg-transparent text-[14px] font-medium text-slate-400 placeholder:text-[#94A3B8] focus:outline-none"
            />
            <Button>Contact us</Button>
          </div>
          <div className="mt-30 flex flex-col gap-4">
            <p className="text-[15px] font-medium text-slate-600">Trusted by</p>
            <div className="flex flex-wrap items-center gap-3">
              {trustedLogos.map((logo, index) => (
                <div
                  key={index}
                  className="relative flex h-[38px] w-[100px] items-center"
                >
                  <Image
                    src={logo.image}
                    alt={logo.name}
                    fill
                    className="object-contain opacity-80 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </div>
  );
}
