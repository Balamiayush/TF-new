import Link from "next/link";

import LayoutWrapper from "../wrapper/LayoutWrapper";
import { MainLogo } from "@/shared/icons/MainLogo";
import NavLink from "@/shared/ui/navlinks/NavLinks";

import { navLinks } from "@/shared/data";
import { DropdownArrow } from "@/shared/icons/DropdownArrow";
import Button from "@/shared/ui/buttons/Button";

export default function MainNavigation() {
  return (
    <header className=" fixed top-0 z-50  w-full py-4.5">
      <LayoutWrapper>
        <nav className="flex w-full items-center justify-between">
          <div className="flex gap-12">
            <MainLogo />
            <div className="flex w-full items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.id} href={link.href ?? "/"}>
                  <NavLink hasDropdown={link.hasDropdown} label={link.label} />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex h-10 items-center gap-1">
              <p className="text-[14px] leading-[110%] text-gray-900">NP</p>
              <div className="h-4 w-4 bg-blue-500"></div>
              <div className="flex h-4 w-4 items-center justify-center">
                <DropdownArrow />
              </div>
            </div>
            <Button variant="secondary">Log in</Button>
            <Button>Book a demo</Button>
          </div>

        </nav>
      </LayoutWrapper>
    </header>
  );
}
