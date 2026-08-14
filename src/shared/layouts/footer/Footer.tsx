import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import Button from "@/shared/ui/buttons/Button";
import FooterLogo from "@/shared/icons/FooterLogo";
import Linkdin from "@/shared/icons/Linkdin";
import Facebook from "@/shared/icons/Facebook";
import Twitter from "@/shared/icons/Twitter";
import Insta from "@/shared/icons/Insta";
import LayoutWrapper from "../wrapper/LayoutWrapper";

const NAV_SECTIONS = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { 
        label: "Career", 
        href: "https://www.linkedin.com/company/thirdfactor-ai/posts/?feedView=all",
        target: "_blank"
      },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Changelog", href: "/changelog" },
      { 
        label: "Docs", 
        href: "https://docs.v3.thirdfactor.ai/docs",
        target: "_blank"
      },
    ],
  },
  {
    title: "Legal",
    links: [
      { 
        label: "Terms of Service", 
        href: "/terms-and-conditions",
        target: "_blank"
      },
      { 
        label: "Privacy Policy", 
        href: "/privacy-policy",
        target: "_blank"
      },
    ],
  },
];

const SOCIAL_LINKS = [
  { name: "Twitter", href: "https://x.com/thirdfactor_ai", Icon: Twitter },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/thirdfactor-ai/posts/?feedView=all", Icon: Linkdin },
  { name: "Facebook", href: "https://www.facebook.com/ThirdfactorAI/", Icon: Facebook },
  { name: "Instagram", href: "https://www.instagram.com/thirdfactorai/", Icon: Insta },
];

export default function Footer() {
  return (
    <footer className="relative mx-auto flex w-full flex-col justify-between overflow-hidden bg-[#2563EB] pt-12 pb-10 text-white lg:pt-[120px] lg:pb-[60px]">
      <LayoutWrapper>
        <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-0">
          {/* Left Column (Brand Statement & Socials) */}
          <div className="flex w-full flex-col justify-between gap-6 lg:h-[160px] lg:w-[421px] lg:gap-[24px]">
            <div>
              <h2 className="text-[24px] font-normal leading-[1.2] sm:text-[28px]">
                Instant <span className="font-geist-pixel-circle">Identity Verification</span>
                <br />
                for regulated markets.
              </h2>
            </div>

            <div className="flex items-center gap-3 text-sm text-white/80">
              <span className="text-[14px]">Follow us on:</span>
              {SOCIAL_LINKS.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="transition-colors hover:text-white"
                >
                  <Icon className="hover:text-white" />
                </a>
              ))}
            </div>

            <p className="text-[13px] text-white/70">
              © 2026 Thirdfactor Inc. All rights reserved.
            </p>
          </div>

          {/* Right Navigation Links: Grid 2-cols on mobile, 4-cols on desktop */}
          <div className="grid w-full grid-cols-2 gap-x-4 gap-y-8 text-[14px] lg:h-[126px] lg:w-[709px] lg:grid-cols-4 lg:gap-8">
            {/* Dynamic Columns */}
            {NAV_SECTIONS.map((section) => (
              <div key={section.title} className="flex flex-col gap-3">
                <h4 className="font-medium text-white/60">{section.title}</h4>
                <ul className="flex flex-col gap-2 font-normal text-white/90">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        target={link.target}
                        rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
                        className="hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

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

        <div className="flex w-full max-w-full flex-col justify-end gap-6 sm:gap-[32px] lg:mt-[104px] lg:w-[1025px]">
          <FooterLogo className="" />

          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between lg:flex-row">
            <div className="flex items-center gap-2 text-[22px] font-light tracking-wide text-white/90">
              <Image
                width={180}
                height={32}
                className="w-[180px]"
                src="https://prixa.digital/icons/a-prixa-company.svg"
                alt="A Prixa Company"
              />
            </div>
            <Button variant="secondary" hasRightIcon className="group">
              Get a demo
              <div className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-xs bg-slate-200 p-1.5">
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
      </LayoutWrapper>
    </footer>
  );
}