"use client";
import Image from "next/image";

import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import Label from "@/shared/typography/Label";

export default function TrustedBy() {
  const organizations = [
    {
      name: "esewa",
      image: "/images/trused-by-imgs/esewa.webp",
    },
    {
      name: "everest",
      image: "/images/trused-by-imgs/everest.webp",
    },
    {
      name: "laxmi",
      image: "/images/trused-by-imgs/laxmi.webp",
    },
    {
      name: "sagilo",
      image: "/images/trused-by-imgs/sagilo.webp",
    },
    {
      name: "siddhartha-bank",
      image: "/images/trused-by-imgs/siddhartha-bank.webp",
    },
    {
      name: "surya",
      image: "/images/trused-by-imgs/surya.webp",
    },
    {
      name: "vianet",
      image: "/images/trused-by-imgs/vianet.webp",
    },
    {
      name: "world-link",
      image: "/images/trused-by-imgs/world-link.webp",
    },
    {
      name: "yango",
      image: "/images/trused-by-imgs/yango.webp",
    },
  ];
  return (
    <div className="flex w-full items-center justify-center border-t border-slate-200 pt-8 pb-21">
      <LayoutWrapper>
        <div className="flex w-full flex-col items-center justify-center gap-6">
          <Label as="Label L">Trusted by</Label>
          <div className="grid grid-cols-9 items-center justify-center gap-5">
            {organizations.map((item, index) => {
              return (
                <Image
                  src={item.image}
                  width={128}
                  height={40}
                  alt={item.name}
                  key={index}
                  className="grayscale transition-all duration-300 hover:grayscale-0"
                />
              );
            })}
          </div>
        </div>
      </LayoutWrapper>
    </div>
  );
}
