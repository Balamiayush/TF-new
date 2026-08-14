"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { DropdownArrow } from "@/shared/icons/DropdownArrow";

export interface DropdownItem {
  label: string;
  href: string;
}

interface BreadcrumbDropdownProps {
  label: string;
  items: DropdownItem[];
  buttonClassName?: string;
  menuClassName?: string;
  onSelect?: (label: string) => void;
}

export function DropDown({
  label,
  items = [],
  buttonClassName = "flex items-center gap-1 rounded-sm bg-[#FFFFFF7A] px-2 py-1 text-slate-900 transition-colors hover:bg-white focus:outline-none",
  menuClassName = "absolute top-full -right-2 md:left-0 z-50 mt-2 w-[320px] rounded-xs border border-slate-200 bg-white p-1 shadow-xl",
  onSelect, // Destructured here
}: BreadcrumbDropdownProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleItemClick = (selectedLabel: string) => {
    setDropdownOpen(false);
    if (onSelect) {
      onSelect(selectedLabel);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setDropdownOpen((prev) => !prev)}
        className={buttonClassName}
      >
        {label}
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
            className={menuClassName}
          >
            <div className="no-scrollbar flex max-h-[380px] flex-col gap-4 overflow-y-auto">
              <ul className="flex flex-col gap-1">
                {items.map((item, itemIdx) => (
                  <li key={itemIdx}>
                    <Link
                      href={item.href || "#"}
                      onClick={() => handleItemClick(item.label)}
                      className="block rounded-xs px-2 py-1.5 text-[14px] text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}