export interface CardStory {
  id: string;
  slug?: string;
  title: string;
  category: string;
  date: string;
  imageSrc: string;
}

export interface Category {
  id: string;
  title?: string;
  name: string;
  count: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryId?: string;
  date: string;
  image: string;
  collectionId?: string;
}

export interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

export interface BlogOverviewProps {
  categories: Category[];
  initialPosts: BlogPost[];
}
// Added FeaturedCardProps interface
export interface FeaturedCardProps {
  post: BlogPost;
  reversed?: boolean;
  className?: string;
}