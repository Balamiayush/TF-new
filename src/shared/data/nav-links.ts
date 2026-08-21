import { NavItem } from "@/shared/types";

export const navLinks: NavItem[] = [
  {
    id: "products",
    label: "Products",
    // href: "/products",
    hasDropdown: true,
    newTab:false,
  },

  {
    id: "developer",
    label: "Developer",
    href: "https://docs.v3.thirdfactor.ai/docs",
    hasDropdown: false,
    newTab:true,
  },

  {
    id: "about",
    label: "About",
    href: "/about",
    newTab:false,
  },
  {
    id: "resources",
    label: "Resources",
    hasDropdown: true,
    newTab:false,
    
  },
];
