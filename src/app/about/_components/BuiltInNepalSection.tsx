import React from "react";
import Image from "next/image";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";

export default function BuiltInNepalSection() {
  return (
    <section className="w-full  py-[84px] ">
      <LayoutWrapper>
        <div className="flex flex-col gap-12">
      
          <div className="relative h-[480px] sm:h-[600px] md:h-[718px] w-full overflow-hidden rounded-2xl bg-slate-900">
            <Image
              alt="Third Factor AI Team - Built in Nepal"
              fill
              priority
              className="object-cover object-center"
              src="https://tf-landing-puce.vercel.app/_next/image?url=%2Fabout-us%2Fabout-group-photo.webp&w=1920&q=75"
            />
          </div>

       
          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between ">
            
            <h2 className="max-w-[580px] font-geist  font-medium leading-[110%] tracking-[-0.3px]  text-[48px]">
              Built in Nepal. <br />
          Trusted at national scale.
            </h2>

          
            <p className="max-w-[519px] font-geist text-[14px] leading-[150%] text-slate-400 pt-2">
             Third Factor AI is a privacy-first trust and identity platform under Prixa, building secure and seamless digital identity infrastructure for emerging markets.
            </p>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}