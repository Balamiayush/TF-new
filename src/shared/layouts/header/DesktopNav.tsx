"use client";

import React from "react";
import Link from "next/link";
import NavLink from "@/shared/ui/navlinks/NavLinks";

interface NavLinkItem {
  id: string | number;
  label: string;
  href?: string;
  hasDropdown?: boolean;
}

interface DesktopNavProps {
  links: NavLinkItem[];
}

export const DesktopNav = React.memo(function DesktopNav({ links }: DesktopNavProps) {
  return (
    <div className="hidden w-full items-center gap-1 lg:flex">
      {links.map((link) => (
        <Link key={link.id} href={link.href ?? "/"}>
          <NavLink hasDropdown={link.hasDropdown} label={link.label} />
        </Link>
      ))}
    </div>
  );
});