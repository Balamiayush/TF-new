"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { DropdownArrow } from "@/shared/icons/DropdownArrow";
import Button from "@/shared/ui/buttons/Button";
import { productsMenuData } from "@/shared/data/products-menu";

interface NavLinkItem {
  id: string | number;
  label: string;
  href?: string;
  hasDropdown?: boolean;
}

interface MobileMenuProps {
  isOpen: boolean;
  links: NavLinkItem[];
  onClose: () => void;
}

const menuVariants: Variants = {
  closed: {
    opacity: 0,
    y: "-20px",
    scale: 0.98,
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
  },
  open: {
    opacity: 1,
    y: "0%",
    scale: 1,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

const backdropVariants: Variants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

export const MobileMenu = React.memo(function MobileMenu({
  isOpen,
  links,
  onClose,
}: MobileMenuProps) {
  // Default to null so it opens collapsed initially
  const [expandedDropdown, setExpandedDropdown] = useState<string | number | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setExpandedDropdown(null);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleDropdown = (id: string | number) => {
    setExpandedDropdown((prev) => (prev === id ? null : id));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
 
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={backdropVariants}
            onClick={onClose}
            className="fixed inset-0 z-[9998] bg-black/20 backdrop-blur-md lg:hidden"
          />

          
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            data-lenis-prevent
            className="fixed top-[70px] w-full right-0 left-0 z-[9999] flex h-fit max-h-[calc(100dvh-100px)] w-[calc(100%-32px)] flex-col justify-between overflow-y-auto  bg-white/90 p-6 shadow-2xl backdrop-blur-xl border border-white/20 lg:hidden overscroll-contain transition-[height] duration-300"
            style={{ touchAction: "pan-y", WebkitOverflowScrolling: "touch" }}
          >
            <div className="flex flex-col gap-2">
              {links.map((link) => {
                const isExpanded = expandedDropdown === link.id;

                if (link.hasDropdown || link.id === "products") {
                  return (
                    <div key={link.id} className="border-b border-gray-100/80 py-1">
                      <button
                        type="button"
                        onClick={() => toggleDropdown(link.id)}
                        className="flex w-full items-center justify-between py-3 text-lg font-medium text-gray-900 focus:outline-none"
                      >
                        <span>{link.label}</span>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <DropdownArrow />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden pl-2 pb-4"
                          >
                            <div className="flex flex-col gap-6 pt-2">
                              {productsMenuData.categories.map((category, idx) => (
                                <div key={idx} className="flex flex-col gap-2.5">
                                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    {category.title}
                                  </span>
                                  <div className="flex flex-col gap-2.5 pl-1">
                                    {category.items.map((item, itemIdx) => (
                                      <Link
                                        key={itemIdx}
                                        href={item.href}
                                        onClick={onClose}
                                        className="text-base font-normal text-slate-700 hover:text-blue-600 transition-colors"
                                      >
                                        {item.label}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.id}
                    href={link.href ?? "/"}
                    onClick={onClose}
                    className="flex items-center justify-between border-b border-gray-100/80 py-3 text-lg font-medium text-gray-900"
                  >
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-6 flex flex-col gap-3 pt-2">
              <Button variant="secondary" className="w-full justify-center">
                Log in
              </Button>
              <Button link="book-a-demo" className="w-full justify-center">
                Book a demo
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});