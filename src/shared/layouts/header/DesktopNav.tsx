"use client";

import React from "react";
import Link from "next/link";
import { DropdownArrow } from "@/shared/icons/DropdownArrow";

interface NavLinkItem {
  id: string | number;
  label: string;
  href?: string;
  hasDropdown?: boolean;
}

interface DesktopNavProps {
  links: NavLinkItem[];
  onProductsHover: () => void;
  onOtherHover: () => void;
  isProductsOpen?: boolean;
}

export const DesktopNav: React.FC<DesktopNavProps> = ({ 
  links, 
  onProductsHover,
  onOtherHover,
  isProductsOpen
}) => {
  return (
    <ul className="hidden items-center gap-8 lg:flex">
      {links.map((link) => {
        if (link.id === "products") {
          return (
            <li
              key={link.id}
              onMouseEnter={onProductsHover}
              className="py-2 cursor-pointer"
            >
              <span className="flex items-center gap-1.5 text-sm font-medium text-slate-800 hover:text-blue-600 transition-colors group/products">
                {link.label}
                <DropdownArrow  className={`transition-transform duration-300 ${isProductsOpen ? "rotate-180" : "group-hover/products:rotate-180"}`}/>
              </span>
            </li>
          );
        }

        return (
          <li key={link.id} onMouseEnter={onOtherHover}>
            <Link
              href={link.href ?? "/"}
              className="text-sm font-medium text-slate-800 hover:text-blue-600 transition-colors"
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};