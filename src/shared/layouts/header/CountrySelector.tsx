"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { DropdownArrow } from "@/shared/icons/DropdownArrow";

export interface CountryOption {
  code: string;
  label: string;
  flagSrc: string;
  comingSoon?: boolean;
}

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

const countries: CountryOption[] = [
  { code: "NP", label: "Nepal", flagSrc: "/navbar-flag-svg/nepal-flag1.svg" },
  {
    code: "MM",
    label: "Sinhala",
    flagSrc: "/navbar-flag-svg/myanmar-flag.svg",
    comingSoon: true,
  },
  {
    code: "LK",
    label: "Burmese",
    flagSrc: "/navbar-flag-svg/srilanka-flag.svg",
    comingSoon: true,
  },
  {
    code: "IN",
    label: "India",
    flagSrc: "/navbar-flag-svg/india-flag.svg",
    comingSoon: true,
  },
];

interface CountrySelectorProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export const CountrySelector = React.memo(function CountrySelector({
  isOpen,
  onToggle,
  onClose,
}: CountrySelectorProps) {
  const [selected, setSelected] = useState<CountryOption>(countries[0]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={onToggle}
        className="hover:bg-alpha-dark-500 flex h-10 cursor-pointer items-center gap-1 border-white p-3 shadow-[0px_4px_8px_0px_#FFFFFF33_inset] select-none hover:border focus:outline-none"
      >
        <p className="text-[14px] leading-[110%] text-gray-900">
          {selected.code}
        </p>
        <div className="relative h-4 w-4">
          <Image fill alt={`${selected.label} flag`} src={selected.flagSrc} />
        </div>
        <div
          className={`flex h-4 w-4 items-center justify-center transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <DropdownArrow />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={dropdownVariants}
            className="absolute top-[calc(100%+8px)] right-0 z-50 flex w-[240px] flex-col gap-0.5 rounded-[2px] border border-slate-100/80 bg-white p-1 shadow-lg"
          >
            {countries.map((country) => {
              const isSelected = selected.code === country.code;
              const isDisabled = country.comingSoon;

              return (
                <button
                  key={country.code}
                  disabled={isDisabled}
                  onClick={() => {
                    if (!isDisabled) {
                      setSelected(country);
                      onClose();
                    }
                  }}
                  className={`group relative flex h-10 w-full items-center justify-between rounded-[2px] px-3 text-left transition-all ${
                    isDisabled
                      ? "cursor-not-allowed opacity-45"
                      : isSelected
                        ? "bg-[#f0f4f9] font-medium text-gray-900"
                        : "cursor-pointer text-gray-800 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative overflow-hidden rounded-[1px]">
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
                    <span className="rounded bg-slate-100/80 px-2 py-1 text-[11px] leading-none text-slate-400">
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
  );
});
