export type BaseRecord = {
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
};

export type AnnouncementRecord = BaseRecord & {
  title: string;
  href: string;
  is_active: boolean;
};

export type ProductCategoryRecord = BaseRecord & {
  title: string;
};

export type ProductRecord = BaseRecord & {
  title: string;
  slug: string;
  icon: string;
  expand: {
    category: ProductCategoryRecord;
  };
};

export type BlogCategoryRecord = BaseRecord & {
  title: string;
};

export type BlogPostRecord = BaseRecord & {
  title: string;
  slug: string;
  description: string;
  meta_title: string;
  meta_description: string;
  image: string;
  author: string;
  author_role: string;
  expand: {
    category: BlogCategoryRecord;
  };
  is_featured: boolean;
};

export type ContactMessageRecord = BaseRecord & {
  full_name: string;
  email: string;
  company_name: string;
  industry: string;
  phone_number: string;
  message: string;
};

export type DemoRequestRecord = BaseRecord & {
  full_name: string;
  email: string;
  company_name: string;
  industry: string;
  phone_number: string;
  message: string;
};
