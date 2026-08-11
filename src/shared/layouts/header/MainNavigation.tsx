"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent, AnimatePresence, Variants } from "framer-motion";

import LayoutWrapper from "../wrapper/LayoutWrapper";
import { navLinks } from "@/shared/data";
import { DropdownArrow } from "@/shared/icons/DropdownArrow";
import Button from "@/shared/ui/buttons/Button";
import NavLink from "@/shared/ui/navlinks/NavLinks";

interface MainNavigationProps {
  children?: React.ReactNode;
}

const headerVariants: Variants = {
  visible: { y: "0%" },
  hidden: { y: "-100%" },
};

const menuVariants: Variants = {
  closed: {
    opacity: 0,
    y: "-100%",
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  open: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function MainNavigation({ children }: MainNavigationProps) {
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (latest > previous && latest > 150 && !mobileMenuOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <>
      <motion.header
        variants={headerVariants}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className=" sticky top-0 z-50 w-full min-h-[68px] py-4.5 bg-white"
      >
        <LayoutWrapper>
          <nav className="flex w-full items-center justify-between">
            <div className="flex items-center gap-12">
              <Link href="/" className="relative flex items-center shrink-0">
                <Image
                  alt="logo"
                  width={100}
                  height={20}
                  priority
                  className="w-full h-full"
                  src="/logos/thirdfactor-logo.svg"
                />
              </Link>

              <div className="hidden lg:flex w-full items-center gap-1">
                {navLinks.map((link) => (
                  <Link key={link.id} href={link.href ?? "/"}>
                    <NavLink hasDropdown={link.hasDropdown} label={link.label} />
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Action Menu */}
            <div className="flex items-center gap-2">
              {/* Language Selector */}
              <div className="flex h-10 items-center gap-1">
                <p className="text-[14px] leading-[110%] text-gray-900">NP</p>
                <div className="relative h-4 w-4">
                  <Image
                    fill
                    alt="nepal flag"
                    src="/navbar-flag-svg/nepal-flag1.svg"
                  />
                </div>
                <div className="flex h-4 w-4 items-center justify-center">
                  <DropdownArrow />
                </div>
              </div>

              {/* Desktop CTA Buttons */}
              <div className="hidden md:flex items-center gap-2">
                <Button variant="secondary">Log in</Button>
                <Button>Book a demo</Button>
              </div>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen((prev) => !prev)}
                className="lg:hidden p-2 text-gray-900 focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </nav>
        </LayoutWrapper>
      </motion.header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 pt-[80px] pb-8 px-6 flex flex-col justify-between lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-4 mt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href ?? "/"}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 text-lg font-medium text-gray-900 border-b border-gray-100 flex justify-between items-center"
                >
                  <span>{link.label}</span>
                  {link.hasDropdown && (
                    <div className="rotate-[-90deg]">
                      <DropdownArrow />
                    </div>
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile CTAs */}
            <div className="flex flex-col gap-3 mt-8">
              <Button variant="secondary" className="w-full justify-center">
                Log in
              </Button>
              <Button className="w-full justify-center">Book a demo</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </>
  );
}