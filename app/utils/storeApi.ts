const PRODUCTS_ENDPOINT = "/api/products";

export function toProductQuery(filters: ProductFilters): ProductQuery {
  const query: ProductQuery = {};

  if (filters.search.trim()) {
    query.search = filters.search.trim();
  }

  if (filters.categories.length > 0) {
    query.categories = filters.categories.join(",");
  }

  if (filters.sortBy && filters.sortBy !== "default") {
    query.sortBy = filters.sortBy;
  }

  return query;
}

export const storeApi = {
  productsList: (filters: ProductFilters) => ({
    url: PRODUCTS_ENDPOINT,
    query: toProductQuery(filters),
  }),

  product: (id: number | string) => ({
    url: `${PRODUCTS_ENDPOINT}/${id}`,
  }),

  categories: () => ({
    url: `${PRODUCTS_ENDPOINT}/categories`,
  }),
};
