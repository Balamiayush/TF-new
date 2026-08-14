"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { productsMenuData } from "@/shared/data/products-menu";
import LayoutWrapper from "../wrapper/LayoutWrapper";

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
            className="fixed inset-0 top-[72px] z-[9998] bg-slate-900/20 backdrop-blur-md"
            onClick={onClose}
            data-lenis-prevent
          />

          {/* Mega Menu Floating Card */}
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full right-0 left-0 z-[9999] pt-3 pb-8"
            data-lenis-prevent
          >
            <LayoutWrapper>
              <div className="w-full rounded-lg border border-slate-100 bg-white p-8 shadow-2xl lg:p-8">
                <div className="flex w-full justify-between">
                  <div className="flex flex-col items-stretch gap-16">
                    <div className="w-[242px] shrink-0">
                      <h3 className="text-[32px] leading-[1.15] tracking-[-0.3px] text-black">
                        {productsMenuData.heading}
                      </h3>
                    </div>

                    <div className="flex gap-10">
                      {productsMenuData.categories.map((category, idx) => (
                        <div key={idx} className="flex flex-col gap-8">
                          <div className="border-b border-slate-200 pb-3">
                            <span className="text-alpha-light-600 text-[14px]">
                              {category.title}
                            </span>
                          </div>

                          <ul className="flex flex-col gap-3">
                            {category.items.map((item, itemIdx) => (
                              <li key={itemIdx}>
                                <Link
                                  href={item.href}
                                  onClick={onClose}
                                  className="text-alpha-light-1000 hover:text-alpha-light-800 block text-[16px] leading-snug font-normal"
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-[40%] h-[500px] overflow-hidden rounded-lg shrink-0 relative bg-blue-600">
                    <Image
                      src="https://res.cloudinary.com/dfajjqglx/image/upload/v1786620030/Container_xcsols.png"
                      alt=""
                      fill
                      className="object-cover"
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