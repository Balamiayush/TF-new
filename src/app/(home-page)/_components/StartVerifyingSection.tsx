"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/shared/ui/buttons/Button";

gsap.registerPlugin(ScrollTrigger);

const floatingImages = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/38809716/pexels-photo-38809716.jpeg",
    alt: "KYC Mobile Screen",
    className: "top-[10%] left-[8%] w-[150px] h-[100px] lg:w-[] lg:h-[ ",
    speed: 25,
   
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/38809716/pexels-photo-38809716.jpeg",
    alt: "Document Verification",
    className: "top-[15%] right-[6%] w-[150px] h-[100px] lg:w-[] lg:h-[ ",
    speed: 30,
   
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/38809716/pexels-photo-38809716.jpeg",
    alt: "Liveness Capture",
    className: "bottom-[12%] left-[6%] w-[150px] h-[100px] lg:w-[] lg:h-[",
    speed: 35,
  
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/38809716/pexels-photo-38809716.jpeg",
    alt: "Face Verification",
    className: "bottom-[0%] left-[45%] hidden lg:block -translate-x-1/2 w-[157px] h-[100px] lg:w-[] lg:h-[",
    speed: 30,
    
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/38809716/pexels-photo-38809716.jpeg",
    alt: "Dashboard Verification Stream",
        className: "bottom-[0%] right-3  w-[157px] h-[100px] lg:w-[] lg:h-[",

    speed: 25,
  
  },
];

export default function StartVerifyingSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".parallax-card");

      cards.forEach((card) => {
        const speed = parseFloat(card.dataset.speed || "0");

        gsap.to(card, {
          yPercent: -speed * 2,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#2262EC] px-4 py-32"
    >
      {floatingImages.map((img) => (
        <div
          key={img.id}
          data-speed={img.speed}
          className={`parallax-card absolute z-0 overflow-hidden  transition-shadow duration-300 ${img.className}`}
        >
          <div className={`${img.className} relative`}>

          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover w-full h-full"
            priority
            />
            </div>
        </div>
      ))}

      <div className="z-10 flex max-w-[800px] flex-col items-center text-center">
        <h1 className="font-geist text-[26px] lg:text-[50px] leading-[100%] font-normal tracking-[-0.4px] text-white">
          Start Verifying with <br /> Confidence
        </h1>

        <div className="mt-8 flex items-center gap-3">
          <Button variant="secondary">Log in</Button>
          <Button variant="primary">Book a demo</Button>
        </div>
      </div>
    </section>
  );
}
