"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

import LayoutWrapper from "../wrapper/LayoutWrapper";
import { navLinks } from "@/shared/data";
import { DropdownArrow } from "@/shared/icons/DropdownArrow";
import Button from "@/shared/ui/buttons/Button";
import Image from "next/image";
import NavLink from "@/shared/ui/navlinks/NavLinks";

export default function MainNavigation() {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: "0%" },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className=" fixed top-0 z-50 w-full min-h-[68px] py-4.5 bg-transparent"
    >
      <LayoutWrapper>
        <nav className="flex w-full items-center justify-between">
          <div className="flex gap-12">
            <Image
              alt="logo"
              width={100}
              height={20}
              className="w-full h-full"
              src={"/logos/thirdfactor-logo.svg"}
            />
            <div className="flex w-full items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.id} href={link.href ?? "/"}>
                  <NavLink hasDropdown={link.hasDropdown} label={link.label} />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex h-10 items-center gap-1">
              <p className="text-[14px] leading-[110%] text-gray-900">NP</p>
              <div className="relative h-4 w-4">
                <Image
                  fill
                  alt="nepal flag"
                  src={"/navbar-flag-svg/nepal-flag1.svg"}
                />
              </div>
              <div className="flex h-4 w-4 items-center justify-center">
                <DropdownArrow />
              </div>
            </div>
            <Button variant="secondary">Log in</Button>
            <Button>Book a demo</Button>
          </div>
        </nav>
      </LayoutWrapper>
    </motion.header>
  );
}