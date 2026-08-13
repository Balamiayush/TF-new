import { NavItem } from "@/shared/types";

export const navLinks: NavItem[] = [
  {
    id: "products",
    label: "Products",
    href: "/products",
    hasDropdown: true,
  },

  {
    id: "developer",
    label: "Developer",
    href: "https://docs.v3.thirdfactor.ai/docs",
    hasDropdown: true,
  },

  {
    id: "about",
    label: "About",
    href: "/about",
  },
];
