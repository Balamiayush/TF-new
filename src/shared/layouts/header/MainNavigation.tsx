"use client";

import React, { useState, useCallback } from "react";
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
import CloseIcon from "@/shared/icons/CloseIcon";
import ResourcesDropdown from "./ResourcesDropdown";
import useScrollLock from "@/hook/useScrollLock";

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
  const [resourcesMenuOpen, setResourcesMenuOpen] = useState(false);

  const { scrollY } = useScroll();

  const isAnyMenuOpen = productsMenuOpen || resourcesMenuOpen || mobileMenuOpen;

  // Locks standard overflow and Lenis scrolling whenever any menu/dropdown is open
  useScrollLock(isAnyMenuOpen);

  const closeAllMenus = useCallback(() => {
    setProductsMenuOpen(false);
    setResourcesMenuOpen(false);
    setCountryDropdownOpen(false);
    setMobileMenuOpen(false);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    const shouldBeScrolled = latest > 20;
    if (shouldBeScrolled !== isScrolled) {
      setIsScrolled(shouldBeScrolled);
    }

    if (latest > previous && latest > 150 && !mobileMenuOpen) {
      if (!hidden) setHidden(true);
      closeAllMenus();
    } else {
      if (hidden) setHidden(false);
    }
  });

  const toggleCountryDropdown = useCallback(() => {
    setCountryDropdownOpen((prev) => !prev);
    setProductsMenuOpen(false);
    setResourcesMenuOpen(false);
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

  const toggleProductsMenu = useCallback(() => {
    setProductsMenuOpen((prev) => !prev);
    setResourcesMenuOpen(false);
    setCountryDropdownOpen(false);
  }, []);

  const closeProductsMenu = useCallback(() => {
    setProductsMenuOpen(false);
  }, []);

  const toggleResourcesMenu = useCallback(() => {
    setResourcesMenuOpen((prev) => !prev);
    setProductsMenuOpen(false);
    setCountryDropdownOpen(false);
  }, []);

  const closeResourcesMenu = useCallback(() => {
    setResourcesMenuOpen(false);
  }, []);

  return (
    <>
      {/* Background Overlay */}
      <div
        onClick={closeAllMenus}
        className={`fixed inset-0 z-[998] transition-opacity duration-300 ${
          isAnyMenuOpen
            ? "pointer-events-auto bg-[#1010101F] backdrop-blur-2xl opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <div className="fixed left-0 right-0 top-0 z-[999] w-full">
        <motion.header
          variants={headerVariants}
          animate={hidden ? "hidden" : "visible"}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`${
            productsMenuOpen || resourcesMenuOpen
              ? "mx-auto mt-[1vw] max-w-[1500px] rounded-t-[8px] backdrop-blur-2xl"
              : ""
          } pointer-events-auto py-4.5 transition-colors duration-300 ${
            isScrolled || isAnyMenuOpen ? "bg-white" : "bg-transparent"
          }`}
        >
          <LayoutWrapper>
            <nav className="flex w-full items-center justify-between">
              <div className="flex items-center gap-12">
                <Link
                  href="/"
                  onClick={closeAllMenus}
                  className="relative flex shrink-0 items-center"
                >
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
                  onResourcesClick={toggleResourcesMenu}
                  onOtherClick={closeAllMenus}
                  isProductsOpen={productsMenuOpen}
                  isResourcesOpen={resourcesMenuOpen}
                />
              </div>

              <div
                className={`items-center gap-2 ${
                  isAnyMenuOpen ? "hidden" : "flex"
                }`}
              >
                <CountrySelector
                  isOpen={countryDropdownOpen}
                  onToggle={toggleCountryDropdown}
                  onClose={closeCountryDropdown}
                />

                <div className="hidden items-center gap-2 md:flex">
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

              {/* Close Button when Menu is Open */}
              <Button
                variant="secondary"
                onClick={closeAllMenus}
                className={`${
                  isAnyMenuOpen ? "flex" : "hidden"
                } items-center gap-1.5 bg-[#F8FAFC]`}
              >
                Close
                <CloseIcon />
              </Button>
            </nav>
          </LayoutWrapper>

          <ProductsDropdown
            isOpen={productsMenuOpen}
            onClose={closeProductsMenu}
          />
          <ResourcesDropdown
            isOpen={resourcesMenuOpen}
            onClose={closeResourcesMenu}
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