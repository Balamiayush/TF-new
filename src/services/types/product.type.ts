

export interface Product {
  slug: string;
  title: string;
  description: string;
  icon: string;
}

export interface ProductsResponse {
  success: boolean;
  message: string;
  data: Product[];
}


// types/product.type.ts
export interface CapabilityDetail {
  title: string;
  description: string;
  illustration?: string;
}

export interface WhyDetail {
  title: string;
  description: string;
}

export interface Content1Detail {
  title: string;
  illustration?: string;
}

export interface Content2Detail {
  caption: string;
  title: string;
  description: string;
}

export interface ProductDetail {
  product: string;
  slug: string;
  hero_section_title: string;
  hero_section_description: string;
  hero_section_cta_label: string;
  hero_section_cta_href: string;
  hero_section_caption: string;
  hero_section_illustration: string;
  capabilities_section_title: string;
  capabilities_section_cta_label: string;
  capabilities_section_cta_href: string;
  capabilities_details: CapabilityDetail[];
  why_section_title: string;
  why_section_description: string;
  why_details: WhyDetail[];
  content_1_section_title: string;
  content_1_section_description: string;
  content_1_section_details: Content1Detail[];
  content_2_section_title: string;
  content_2_section_description: string;
  content_2_section_details: Content2Detail[];
  closing_cta_section_title: string;
  closing_cta_section_description: string;
}