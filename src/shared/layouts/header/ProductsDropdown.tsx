"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { productsMenuData } from "@/shared/data/products-menu";
import LayoutWrapper from "../wrapper/LayoutWrapper";
import UserAddedIcon from "@/shared/icons/UserAddedIcon";
import { DropdownArrow } from "@/shared/icons/DropdownArrow";

interface ProductsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

function ProductsDropdownComponent({ isOpen, onClose }: ProductsDropdownProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.setAttribute("data-lenis-prevent", "true");
    } else {
      document.body.style.overflow = "";
      document.documentElement.removeAttribute("data-lenis-prevent");
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.removeAttribute("data-lenis-prevent");
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[72px] z-[9998] bg-white"
            onClick={onClose}
            data-lenis-prevent
          />

          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full right-0 left-0 z-[9999] pt-3 pb-8"
            data-lenis-prevent
          >
            <LayoutWrapper>
              <div className="rounded-lg border border-slate-200/80 bg-[#F4F7FC] p-6 lg:p-8">
                <div className="flex w-full items-stretch justify-between gap-8">
                  {/* Left Section */}
                  <div className="flex flex-1 flex-col gap-8">
                    {/* Heading */}
                    <h3 className="max-w-[340px] text-[32px] leading-[1.15] font-medium tracking-[-0.3px] text-slate-900 lg:text-[36px]">
                      {productsMenuData.heading}
                    </h3>

                    {/* 2x2 Grid Layout for Categories */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-3">
                      {productsMenuData.categories.map((category, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col rounded-md border border-slate-200/60 bg-white p-3"
                        >
                          {/* Category Header */}
                          <div className="mb-1.5 border-b border-slate-100 pb-2">
                            <span className="text-[14px] leading-[100%] tracking-wide text-slate-400">
                              {category.title}
                            </span>
                          </div>

                          <ul className="flex flex-col gap-1">
                            {category.items.map((item, itemIdx) => {
                              const IconComponent = (item as any).icon;
                              return (
                                <li key={itemIdx}>
                                  <Link
                                    href={item.href}
                                    onClick={onClose}
                                    className="group flex items-center justify-between rounded-sm p-2 text-[14px] leading-[130%] duration-300 ease-in-out hover:bg-slate-100"
                                  >
                                    <div className="flex items-center gap-2.5">
                                      <UserAddedIcon />
                                      <span>{item.label}</span>
                                    </div>
                                    <div className="flex -rotate-90 flex-col opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                      <DropdownArrow />
                                      <DropdownArrow />
                                    </div>
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Preview Card */}
                  <div className="relative min-h-[480px] w-[38%] shrink-0 overflow-hidden rounded-sm bg-blue-600">
                    <Image
                      src="https://res.cloudinary.com/dfajjqglx/image/upload/v1786620030/Container_xcsols.png"
                      alt="Platform Preview"
                      fill
                      priority
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </div>
            </LayoutWrapper>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export const ProductsDropdown = React.memo(ProductsDropdownComponent);
