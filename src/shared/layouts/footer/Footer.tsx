import React from "react";
import {
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import FooterLogo from "@/shared/icons/FooterLogo";
import Linkdin from "@/shared/icons/Linkdin";
import Facebook from "@/shared/icons/Facebook";
import Twitter from "@/shared/icons/Twitter";
import Insta from "@/shared/icons/Insta";


export default function Footer() {
  return (
    <footer className="relative mx-auto flex w-full  flex-col justify-between bg-[#2563EB] px-[83px] pt-[120px] pb-[60px] text-white overflow-hidden select-none">
      <div className=" absolute pointer-events-none  w-full h-screen top-0 left-0 ">
      <div className=" w-full h-full relative">
        <Image
        alt=""
        src={'/gitter.png'}
       fill
       className="w-full h-full object-cover"
        />
        </div>      
      </div>

      <div className="flex w-full   justify-between items-start">
        
        {/* Left Column (Brand Statement & Socials): w:421px, h:160px, gap:24px */}
        <div className="flex w-[421px] h-[160px] flex-col justify-between gap-[24px]">
          <div>
            <h2 className="text-[28px] font-normal leading-[1.2] tracking-tight">
              <span className="font-semibold">Instant</span> Identity Verification
              <br />
              for regulated markets.
            </h2>
          </div>

          {/* Social Links & Copyright */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-sm text-white/80">
              <span className="text-[14px]">Follow us on:</span>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="  text-white " />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Linkdin className="  hover:text-white" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Facebook className="hover:text-white " />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Insta className="hover:text-white " />
              </a>
            </div>
            <p className="text-[13px] text-white/70">
              © 2026 Thirdfactor Inc. All rights reserved.
            </p>
          </div>
        </div>

        <div className="grid w-[709px] h-[126px] grid-cols-4 gap-8 text-[14px]">
          <div className="flex flex-col gap-3">
            <h4 className="font-medium text-white/60">Company</h4>
            <ul className="flex flex-col gap-2 font-normal text-white/90">
              <li><a href="#" className="hover:underline">About</a></li>
              <li><a href="#" className="hover:underline">Career</a></li>
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div className="flex flex-col gap-3">
            <h4 className="font-medium text-white/60">Resources</h4>
            <ul className="flex flex-col gap-2 font-normal text-white/90">
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">Case Studies</a></li>
              <li><a href="#" className="hover:underline">Changelog</a></li>
              <li><a href="#" className="hover:underline">Docs</a></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="flex flex-col gap-3">
            <h4 className="font-medium text-white/60">Legal</h4>
            <ul className="flex flex-col gap-2 font-normal text-white/90">
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="flex flex-col gap-3">
            <h4 className="font-medium text-white/60">Contact</h4>
            <ul className="flex flex-col gap-2 font-normal text-white/90">
              <li><a href="mailto:Info@thirdfactor.ai" className="hover:underline">Info@thirdfactor.ai</a></li>
              <li><a href="tel:+9779700122624" className="hover:underline">+977-9700122624</a></li>
              <li><span>Kupondole,lalitpur</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex   mt-[104px] w-[1025px] flex-col justify-end gap-[32px]">
       <FooterLogo/>
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2 text-[22px] font-light tracking-wide text-white/90">
          <img className="w-[231px]" src="https://prixa.digital/icons/a-prixa-company.svg" alt="" />
          </div>
          <button className="flex items-center justify-between gap-4 rounded-none bg-white py-3.5 px-6 text-[15px] font-medium text-[#0F172A] transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]">
            <span>Get a demo</span>
            <div className="flex h-6 w-6 items-center justify-center bg-slate-100 rounded-sm">
              <ArrowRight className="h-4 w-4 text-[#0F172A]" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}