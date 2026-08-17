"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  Variants,
} from "framer-motion";

import LayoutWrapper from "../wrapper/LayoutWrapper";
import { navLinks } from "@/shared/data";
import Button from "@/shared/ui/buttons/Button";
import { CountrySelector } from "./CountrySelector";
import { DesktopNav } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";
import { ProductsDropdown } from "./ProductsDropdown";

interface MainNavigationProps {
  children?: React.ReactNode;
}

const headerVariants: Variants = {
  visible: { y: "0%" },
  hidden: { y: "-100%" },
};

export default function MainNavigation({ children }: MainNavigationProps) {
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    const shouldBeScrolled = latest > 20;
    if (shouldBeScrolled !== isScrolled) {
      setIsScrolled(shouldBeScrolled);
    }

    if (latest > previous && latest > 150 && !mobileMenuOpen) {
      if (!hidden) setHidden(true);
      if (countryDropdownOpen) setCountryDropdownOpen(false);
      if (productsMenuOpen) setProductsMenuOpen(false);
    } else {
      if (hidden) setHidden(false);
    }
  });

  const toggleCountryDropdown = useCallback(() => {
    setCountryDropdownOpen((prev) => !prev);
    setProductsMenuOpen(false);
  }, []);

  const closeCountryDropdown = useCallback(() => {
    setCountryDropdownOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // Products menu now opens/closes on click (was hover-based).
  const toggleProductsMenu = useCallback(() => {
    setProductsMenuOpen((prev) => !prev);
    setCountryDropdownOpen(false);
  }, []);

  const closeProductsMenu = useCallback(() => {
    setProductsMenuOpen(false);
  }, []);

  return (
    <>
      <div className="fixed top-0 right-0 left-0 z-1000 w-full">
        <motion.header
          variants={headerVariants}
          animate={hidden ? "hidden" : "visible"}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto w-full py-4.5 transition-colors duration-300 ${
            isScrolled || productsMenuOpen || mobileMenuOpen
              ? "bg-white shadow-xs"
              : "bg-transparent"
          }`}
        >
          <LayoutWrapper>
            <nav className="flex w-full items-center justify-between">
              <div className="flex items-center gap-12">
                <Link href="/" className="relative flex shrink-0 items-center">
                  <Image
                    alt="logo"
                    width={100}
                    height={20}
                    priority
                    className="h-full w-full"
                    src="/logos/thirdfactor-logo.svg"
                  />
                </Link>

                <DesktopNav
                  links={navLinks}
                  onProductsClick={toggleProductsMenu}
                  onOtherClick={closeProductsMenu}
                  isProductsOpen={productsMenuOpen}
                />
              </div>

              <div className="flex items-center gap-2">
                <CountrySelector
                  isOpen={countryDropdownOpen}
                  onToggle={toggleCountryDropdown}
                  onClose={closeCountryDropdown}
                />

                <div className="hidden items-center gap-2 md:flex">
                  <Button
                    variant="secondary"
                    className={!isScrolled ? "" : "bg-slate-50"}
                  >
                    Log in
                  </Button>
                  <Button link="book-a-demo">Book a demo</Button>
                </div>

                <button
                  onClick={toggleMobileMenu}
                  className="p-2 text-gray-900 focus:outline-none lg:hidden"
                  aria-label="Toggle Navigation Menu"
                >
                  <svg
                    className="h-6 w-6"
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

          <ProductsDropdown
            isOpen={productsMenuOpen}
            onClose={closeProductsMenu}
          />
        </motion.header>
      </div>

      <MobileMenu
        isOpen={mobileMenuOpen}
        links={navLinks}
        onClose={closeMobileMenu}
      />

      {children}
    </>
  );
}