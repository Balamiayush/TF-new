export type NavItem = {
  id: string;
  label: string;
  href?: string;
  children?: NavItem[];
  hasDropdown?: boolean;
};



export interface ProductLink {
  label: string;
  href: string;
  badge?: string;
}

export interface ProductCategory {
  title: string;
  items: ProductLink[];
}

export interface FeaturedPlatform {
  title: string;
  description: string;
  links: ProductLink[];
  previewImage: string;
}

export interface MegaMenuData {
  heading: string;
  categories: ProductCategory[];
  featured: FeaturedPlatform;
}