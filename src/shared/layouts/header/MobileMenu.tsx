"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { DropdownArrow } from "@/shared/icons/DropdownArrow";
import Button from "@/shared/ui/buttons/Button";

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
    y: "-100%",
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
  open: {
    opacity: 1,
    y: "0%",
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  },
};

export const MobileMenu = React.memo(function MobileMenu({
  isOpen,
  links,
  onClose,
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className="bg-alpha-dark-1000 fixed inset-0 z-40 flex h-fit flex-col justify-between overflow-y-auto px-6 pt-[80px] pb-8 lg:hidden"
        >
          <div className="mt-4 flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.id}
                href={link.href ?? "/"}
                onClick={onClose}
                className="flex items-center justify-between border-b border-gray-100 py-2.5 text-lg font-medium text-gray-900"
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

          <div className="mt-8 flex flex-col gap-3">
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
  );
});