// DesktopNav.tsx
"use client";

import React, { useCallback } from "react";
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
  onProductsClick: () => void;
  onOtherClick: () => void;
  isProductsOpen?: boolean;
}

function DesktopNavComponent({
  links,
  onProductsClick,
  onOtherClick,
  isProductsOpen,
}: DesktopNavProps) {
  const handleProductsClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onProductsClick();
    },
    [onProductsClick],
  );

  return (
    <ul className="hidden items-center gap-8 lg:flex">
      {links.map((link) => {
        if (link.id === "products") {
          return (
            <li
              key={link.id}
              onClick={handleProductsClick}
              className={`cursor-pointer py-2 px-3 rounded-sm ${isProductsOpen ? "bg-[#F1F5F9]" : ""}`}
            >
              <span className="group/products flex items-center gap-1.5 text-sm font-medium text-slate-800 transition-colors hover:text-blue-600">
                {link.label}
                <DropdownArrow
                  className={`transition-transform duration-300 ${
                    isProductsOpen ? "rotate-180" : ""
                  }`}
                />
              </span>
            </li>
          );
        }

        return (
          <li key={link.id} onClick={onOtherClick}>
            <Link
              href={link.href ?? "/"}
              className="text-sm font-medium text-slate-800 transition-colors hover:text-blue-600"
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export const DesktopNav = React.memo(DesktopNavComponent);
