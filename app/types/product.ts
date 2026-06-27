export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "title-asc"
  | "title-desc";

export interface ProductFilters {
  search: string;
  categories: string[];
  sortBy: SortOption;
}

export interface ProductQuery {
  search?: string;
  categories?: string;
  sortBy?: SortOption;
}
