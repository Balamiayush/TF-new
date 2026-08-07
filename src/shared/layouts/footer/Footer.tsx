import React from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

import Button from "@/shared/ui/buttons/Button";

import FooterLogo from "@/shared/icons/FooterLogo";
import Linkdin from "@/shared/icons/Linkdin";
import Facebook from "@/shared/icons/Facebook";
import Twitter from "@/shared/icons/Twitter";
import Insta from "@/shared/icons/Insta";

export default function Footer() {
  return (
    <footer className="relative mx-auto flex w-full flex-col justify-between overflow-hidden bg-[#2563EB] px-[83px] pt-[120px] pb-[60px] text-white select-none">
      <div className="pointer-events-none absolute top-0 left-0 h-screen w-full">
        <div className="relative h-full w-full">
          <Image
            alt=""
            src={"/gitter.png"}
            fill
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <div className="flex w-full items-start justify-between">
        {/* Left Column (Brand Statement & Socials): w:421px, h:160px, gap:24px */}
        <div className="flex h-[160px] w-[421px] flex-col justify-between gap-[24px]">
          <div>
            <h2 className="text-[28px] leading-[1.2] font-normal tracking-tight">
              <span className="font-semibold">Instant</span> Identity
              Verification
              <br />
              for regulated markets.
            </h2>
          </div>

          {/* Social Links & Copyright */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-sm text-white/80">
              <span className="text-[14px]">Follow us on:</span>
              <a href="#" className="transition-colors hover:text-white">
                <Twitter className="text-white" />
              </a>
              <a href="#" className="transition-colors hover:text-white">
                <Linkdin className="hover:text-white" />
              </a>
              <a href="#" className="transition-colors hover:text-white">
                <Facebook className="hover:text-white" />
              </a>
              <a href="#" className="transition-colors hover:text-white">
                <Insta className="hover:text-white" />
              </a>
            </div>
            <p className="text-[13px] text-white/70">
              © 2026 Thirdfactor Inc. All rights reserved.
            </p>
          </div>
        </div>

        <div className="grid h-[126px] w-[709px] grid-cols-4 gap-8 text-[14px]">
          <div className="flex flex-col gap-3">
            <h4 className="font-medium text-white/60">Company</h4>
            <ul className="flex flex-col gap-2 font-normal text-white/90">
              <li>
                <a href="#" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Career
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div className="flex flex-col gap-3">
            <h4 className="font-medium text-white/60">Resources</h4>
            <ul className="flex flex-col gap-2 font-normal text-white/90">
              <li>
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Changelog
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Docs
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="flex flex-col gap-3">
            <h4 className="font-medium text-white/60">Legal</h4>
            <ul className="flex flex-col gap-2 font-normal text-white/90">
              <li>
                <a href="#" className="hover:underline">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="flex flex-col gap-3">
            <h4 className="font-medium text-white/60">Contact</h4>
            <ul className="flex flex-col gap-2 font-normal text-white/90">
              <li>
                <a
                  href="mailto:Info@thirdfactor.ai"
                  className="hover:underline"
                >
                  Info@thirdfactor.ai
                </a>
              </li>
              <li>
                <a href="tel:+9779700122624" className="hover:underline">
                  +977-9700122624
                </a>
              </li>
              <li>
                <span>Kupondole,lalitpur</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-[104px] flex w-[1025px] flex-col justify-end gap-[32px]">
        <FooterLogo />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[22px] font-light tracking-wide text-white/90">
            <img
              className="w-[231px]"
              src="https://prixa.digital/icons/a-prixa-company.svg"
              alt=""
            />
          </div>
          <Button
  variant="secondary"
  showArrow={false}
  className="group inline-flex w-[208px] items-center justify-between!"
>
  <span>Get a demo</span>

  <div className="bg-alpha-light-100 relative flex h-7 w-7 items-center justify-center overflow-hidden p-1.5">
    <ArrowRight
      className="absolute h-4 w-4 -translate-x-6 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-0 group-hover:opacity-100"
      strokeWidth={2}
    />

    <ArrowRight
      className="h-4 w-4 transition-all duration-300 ease-out group-hover:translate-x-6 group-hover:opacity-0"
      strokeWidth={2}
    />
  </div>
</Button>

        </div>
      </div>
    </footer>
  );
}
