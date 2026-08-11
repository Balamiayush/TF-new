import React from "react";
import Image from "next/image";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";

export default function BuiltInNepalSection() {
  return (
    <section className="h-full w-full py-[84px]">
      <LayoutWrapper>
        <div className="flex flex-col gap-12">
          <div className="w relative hidden aspect-square w-full overflow-hidden rounded-2xl bg-slate-900 lg:block lg:h-[752px]">
            <Image
              alt="Third Factor AI Team - Built in Nepal"
              fill
              priority
              className="h-full w-full object-cover"
              src="https://tf-landing-puce.vercel.app/_next/image?url=%2Fabout-us%2Fabout-group-photo.webp&w=1920&q=75"
            />
          </div>

          <div className="mt-4 flex flex-col gap-5 lg:gap-6 md:flex-row md:items-end md:justify-between">
            <h2 className="font-geist max-w-[580px] text-[26px] leading-[110%] font-medium tracking-[-0.3px] lg:text-[48px]">
              Built in Nepal. <br />
              Trusted at national scale.
            </h2>
            <div className="lg:hidden relative block aspect-square w-full overflow-hidden rounded-2xl bg-slate-900 lg:h-[752px]">
              <Image
                alt="Third Factor AI Team - Built in Nepal"
                fill
                priority
                className="h-full w-full object-cover"
                src="https://tf-landing-puce.vercel.app/_next/image?url=%2Fabout-us%2Fabout-group-photo.webp&w=1920&q=75"
              />
            </div>

            <p className="font-geist max-w-[519px]  text-[16px] leading-[150%] text-alpha-light-800">
              Third Factor AI is a privacy-first trust and identity platform
              under Prixa, building secure and seamless digital identity
              infrastructure for emerging markets.
            </p>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
