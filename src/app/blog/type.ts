export interface BlogPost {
  id: number;
  category: string;
  title: string;
  date: string;
  image: string;
}

export interface Category {
  id: number;
  name: string;
  count: number;
}

export interface FeaturedCardProps {
  post: BlogPost;
  reversed?: boolean;
  className?: string;
}

export interface CategoryFilterProps {
  categories: Category[];
  activeCategory: number;
  onSelectCategory: (id: number) => void;
}