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

const dropdownVariants: Variants = {
  closed: {
    opacity: 0,
    y: 6,
    scale: 0.98,
    transition: { duration: 0.15, ease: "easeOut" },
  },
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};

interface CountryOption {
  code: string;
  label: string;
  flagSrc: string;
  comingSoon?: boolean;
}

const countries: CountryOption[] = [
  { code: "NP", label: "Nepal", flagSrc: "/navbar-flag-svg/nepal-flag1.svg" },
  { code: "MM", label: "Sinhala", flagSrc: "/navbar-flag-svg/myanmar-flag.svg" },
  { code: "LK", label: "Burmese", flagSrc: "/navbar-flag-svg/srilanka-flag.svg", comingSoon: true },
  { code: "IN", label: "India", flagSrc: "/navbar-flag-svg/india-flag.svg", comingSoon: true },
];

export default function MainNavigation({ children }: MainNavigationProps) {
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Country Selector Dropdown State
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<CountryOption>(countries[0]);

  // Explicitly listen to window scroll
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;

    if (latest > 20) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    if (latest > previous && latest > 150 && !mobileMenuOpen) {
      setHidden(true);
      setCountryDropdownOpen(false);
    } else {
      setHidden(false);
    }
  });

  return (
    <>
      <div className="sticky top-0 left-0 right-0 z-50 w-full pointer-events-none">
        <motion.header
          variants={headerVariants}
          animate={hidden ? "hidden" : "visible"}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto w-full py-4.5 transition-colors duration-300 ${
            isScrolled
              ? "bg-white backdrop-blur-md shadow-xs"
              : "bg-transparent"
          }`}
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

              <div className="flex items-center gap-2">
                {/* Country Dropdown Container */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setCountryDropdownOpen((prev) => !prev)}
                    className="flex h-10 items-center gap-1 cursor-pointer select-none focus:outline-none"
                  >
                    <p className="text-[14px] leading-[110%] text-gray-900">{selectedCountry.code}</p>
                    <div className="relative h-4 w-4">
                      <Image
                        fill
                        alt={`${selectedCountry.label} flag`}
                        src={selectedCountry.flagSrc}
                      />
                    </div>
                    <div className={`flex h-4 w-4 items-center justify-center transition-transform duration-200 ${countryDropdownOpen ? "rotate-180" : ""}`}>
                      <DropdownArrow />
                    </div>
                  </button>

                  <AnimatePresence>
                    {countryDropdownOpen && (
                      <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={dropdownVariants}
                        className="absolute right-0 top-[calc(100%+8px)] z-50 w-[240px] rounded-[2px] bg-white p-1 border border-slate-100/80 flex flex-col gap-0.5"
                      >
                        {countries.map((country) => {
                          const isSelected = selectedCountry.code === country.code;
                          const isDisabled = country.comingSoon;

                          return (
                            <button
                              key={country.code}
                              disabled={isDisabled}
                              onClick={() => {
                                if (!isDisabled) {
                                  setSelectedCountry(country);
                                  setCountryDropdownOpen(false);
                                }
                              }}
                              className={`group relative flex w-full h-10 items-center justify-between px-3 rounded-[2px] text-left transition-all ${
                                isDisabled
                                  ? "opacity-45 cursor-not-allowed"
                                  : isSelected
                                  ? "bg-[#f0f4f9] text-gray-900 font-medium"
                                  : "text-gray-800 hover:bg-slate-50 cursor-pointer"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="relative   overflow-hidden rounded-[1px]">
                                  <Image
                                    width={25}
                                    height={16}
                                    className="object-cover"
                                    alt={`${country.label} flag`}
                                    src={country.flagSrc}
                                  />
                                </div>
                                <span className="text-[14px] leading-tight font-normal">
                                  {country.label}
                                </span>
                              </div>

                              {isDisabled && (
                                <span className="text-[11px] leading-none text-slate-400 bg-slate-100/80 px-2 py-1 rounded">
                                  Coming soon
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="hidden md:flex items-center gap-2">
                  <Button variant="secondary">Log in</Button>
                  <Button link="book-a-demo">Book a demo</Button>
                </div>

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
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 h-fit bg-alpha-dark-1000 pt-[80px] pb-8 px-6 flex flex-col justify-between lg:hidden overflow-y-auto"
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

            <div className="flex flex-col gap-3 mt-8">
              <Button variant="secondary" className="w-full justify-center">
                Log in
              </Button>
              <Button link="book-a-demo" className="w-full justify-center">
                Book a demo
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </>
  );
}