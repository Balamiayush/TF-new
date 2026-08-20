"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { DropdownArrow } from "@/shared/icons/DropdownArrow";
import UserAddedIcon from "@/shared/icons/UserAddedIcon";
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
    y: "-15px",
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
  // FIXED: Set initial state to null instead of "products"
  const [expandedDropdown, setExpandedDropdown] = useState<
    string | number | null
  >(null);
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setExpandedDropdown(null);
      setExpandedCategory(null);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const toggleDropdown = useCallback((id: string | number) => {
    setExpandedDropdown((prev) => {
      const next = prev === id ? null : id;
      if (next !== null) setExpandedCategory(0);
      return next;
    });
  }, []);

  const toggleCategory = useCallback((idx: number) => {
    setExpandedCategory((prev) => (prev === idx ? null : idx));
  }, []);

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
            className="fixed inset-0 z-[1000] lg:hidden"
          />

        
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            data-lenis-prevent
            className="fixed inset-x-0 top-[72px] bottom-0 z-[9999] flex h-[calc(100dvh-72px)] w-full flex-col justify-between bg-white px-5 py-4"
            style={{ touchAction: "pan-y", WebkitOverflowScrolling: "touch" }}
          >
            <div className="flex flex-1 flex-col gap-1 overflow-y-auto pb-4">
              {links.map((link) => {
                const isExpanded = expandedDropdown === link.id;

                if (link.hasDropdown || link.id === "products") {
                  return (
                    <div
                      key={link.id}
                      className="border-b border-slate-200/60 pb-2"
                    >
                      <button
                        type="button"
                        onClick={() => toggleDropdown(link.id)}
                        className="flex w-full items-center justify-between py-3 text-[17px] font-medium text-slate-900 focus:outline-none"
                      >
                        <span>{link.label}</span>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-slate-600"
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
                            transition={{
                              duration: 0.3,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-3 pt-1 pb-3">
                              {/* Product Categories */}
                              {productsMenuData.categories.map(
                                (category, idx) => {
                                  const isCategoryOpen =
                                    expandedCategory === idx;

                                  return (
                                    <div
                                      key={category.title || idx}
                                      className="flex flex-col rounded-md border border-slate-200 bg-white p-3"
                                    >
                                      {/* Category Header */}
                                      <button
                                        type="button"
                                        onClick={() => toggleCategory(idx)}
                                        className="flex w-full items-center justify-between text-left"
                                      >
                                        <span className="text-alpha-light-800 text-[14px] font-medium">
                                          {category.title}
                                        </span>
                                      </button>

                                      {/* Sub-items List */}
                                      <AnimatePresence initial={false}>
                                        {isCategoryOpen && (
                                          <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                              opacity: 1,
                                              height: "auto",
                                            }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{
                                              duration: 0.25,
                                              ease: [0.16, 1, 0.3, 1],
                                            }}
                                            className="overflow-hidden"
                                          >
                                            <div className="mt-2 flex flex-col gap-1 border-t border-[#1A1A1A17] pt-2">
                                              {category.items.map(
                                                (item, itemIdx) => (
                                                  <Link
                                                    key={`${idx}-${item.href || itemIdx}`}
                                                    href={item.href}
                                                    onClick={onClose}
                                                    className="group flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-slate-50"
                                                  >
                                                    <div className="flex items-center gap-2.5">
                                                      <UserAddedIcon />
                                                      <span className="text-[14px] font-medium text-[#1A1A1ABF]">
                                                        {item.label}
                                                      </span>
                                                    </div>
                                                    <div className="flex -rotate-90 flex-col text-slate-400 opacity-0 transition-opacity group-hover:opacity-100">
                                                      <DropdownArrow />
                                                    </div>
                                                  </Link>
                                                ),
                                              )}
                                            </div>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  );
                                },
                              )}

                              {/* Featured Blue Promo Banner */}
                              <div
                                className="relative mt-2 flex flex-col justify-between overflow-hidden rounded-xl p-6 text-white"
                                style={{
                                  background:
                                    "linear-gradient(179.91deg, #3B82F6 0.08%, #60A5FA 54.75%, #2563EB 97.46%)",
                                }}
                              >
                                <span className="text-[14px] font-medium text-blue-100/80">
                                  Platform
                                </span>
                                <h4 className="font-geist-pixel-circle mt-3 text-[22px] leading-[1.2] font-semibold tracking-tight">
                                  Agentic risk platform to <br /> fight
                                  financial crime
                                </h4>

                                <div className="mt-5 grid grid-cols-1 gap-2 text-[14px] text-blue-50/90">
                                  <Link href="#" className="hover:underline">
                                    Agentic AML Ops
                                  </Link>
                                  <Link href="#" className="hover:underline">
                                    Transaction Monitoring
                                  </Link>
                                  <Link href="#" className="hover:underline">
                                    Customer Risk Rating
                                  </Link>
                                  <Link href="#" className="hover:underline">
                                    Sanctions Screening
                                  </Link>
                                  <Link href="#" className="hover:underline">
                                    Case Management
                                  </Link>
                                  <Link href="#" className="hover:underline">
                                    Sponsor Monitor
                                  </Link>
                                </div>
                              </div>
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
                    className="flex items-center justify-between border-b border-slate-200/60 py-3.5 text-[17px] font-medium text-slate-900"
                  >
                    <span>{link.label}</span>
                  </Link>
                );
              })}
                  <div className=" flex flex-col gap-2.5 bg-white pt-3 pb-2">
              {/* <Button variant="secondary">Log in</Button> */}
              <Button link="/book-a-demo">Book a demo</Button>
            </div>
            </div>

            {/* <div className=" flex flex-col gap-2.5 bg-white pt-3 pb-2">
              <Button variant="secondary">Log in</Button>
              <Button link="book-a-demo">Book a demo</Button>
            </div> */}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});