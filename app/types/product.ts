export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface Category {
  name: string;
  count: number;
}

export type SortOption =
  | ""
  | "price-asc"
  | "price-desc"
  | "title-asc"
  | "title-desc";

export type ProductFilters = {
  search: string;
  categories: string[];
  sortBy: SortOption;
};

export type OptionalProductFilters = Partial<ProductFilters>;
