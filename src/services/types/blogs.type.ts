export interface Category {
  id: string | number;
  name: string;
  count: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug?: string;
  category: string;
  date: string;
  image: string;
}

export interface FeaturedCardProps {
  post: BlogPost;
  reversed?: boolean;
  className?: string;
}

export interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string | number;
  onSelectCategory: (id: string | number) => void;
}