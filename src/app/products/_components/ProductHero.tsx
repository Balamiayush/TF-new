"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { DropdownArrow } from "@/shared/icons/DropdownArrow";
import LayoutWrapper from "@/shared/layouts/wrapper/LayoutWrapper";
import Button from "@/shared/ui/buttons/Button";
import { productsMenuData } from "@/shared/data/products-menu";

export default function ProductionHero() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-brand-50 h-full w-full overflow-clip pt-[120px] xl:h-[850px] lg:pt-[168px]">
      <LayoutWrapper>
        <div className="flex justify-between xl:flex-row flex-col">
          <div className="lg:pb-[69px]">
            <div className="flex flex-col items-start gap-4">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                <span>Feature</span>
                <span>/</span>
                <span>Onboarding</span>
                <span>/</span>

                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="flex items-center gap-1 rounded-sm bg-[#FFFFFF7A] px-2 py-1 text-slate-900 transition-colors hover:bg-white focus:outline-none"
                  >
                    KYC Onboarding
                    <motion.div
                      animate={{ rotate: dropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-center"
                    >
                      <DropdownArrow />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.96 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute top-full -right-2 md:left-0 z-50 mt-2 w-[320px] rounded-xs border border-slate-200 bg-white p-1 shadow-xl "
                      >
                        <div className="no-scrollbar flex max-h-[380px] flex-col gap-4 overflow-y-auto">
                          <ul className="flex flex-col gap-1">
                            {productsMenuData.categories[0]?.items.map(
                              (item, itemIdx) => (
                                <li key={itemIdx}>
                                  <Link
                                    href={item.href}
                                    onClick={() => setDropdownOpen(false)}
                                    className="block rounded-xs px-2 py-1.5 text-[14px] text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
                                  >
                                    {item.label}
                                  </Link>
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <h1 className="text-[36px] leading-[1.1] font-semibold tracking-[-0.02em] text-black sm:text-[48px] lg:max-w-[479px]">
                  Make confident onboarding decisions with adaptable KYC
                </h1>

                <p className="font-inter text-alpha-light-900 text-[16px] leading-[1.3] lg:max-w-[479px]">
                  Verify customers globally using identity, device, and
                  behavioral signals with progressive checks that adapt to risk.
                </p>
              </div>
            </div>

            <div className="email-address mt-12 flex h-[52px] w-full max-w-[442px] items-center justify-between bg-white p-1.5 pl-6 shadow-[inset_0px_4px_8px_0px_#FFFFFF33]">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-transparent text-[14px] font-medium text-slate-950 placeholder:text-[#94A3B8] focus:outline-none"
              />
              <Button>Contact us</Button>
            </div>

            <div className="mt-10 flex flex-col gap-4 xl:mt-40">
              <p className="text-[15px] font-medium text-slate-600">
                Trusted by
              </p>
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

          <div className="relative top-2 -mr-20 h-[400px] w-[600px] shrink-0 max-lg:mt-10 lg:h-[765px] lg:w-[850px]">
            <Image
              alt="Dashboard Preview"
              fill
              src="https://tf-new.vercel.app/_next/image?url=%2Fimages%2Fhero%2Fdashboard-preview.png&w=1200&q=75"
              className="rounded-tl-2xl object-cover object-left-top shadow-2xl"
              priority
            />
          </div>
        </div>
      </LayoutWrapper>
    </div>
  );
}
