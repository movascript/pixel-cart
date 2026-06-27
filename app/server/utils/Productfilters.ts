/**
 * Applies search + category filtering and sorting to a product list.
 * This is the logic that used to live client-side in useProducts —
 * it moved here because the backend is now the source of truth for
 * filtering, since Fake Store API itself can't do it.
 */
export function applyProductFilters(
  products: Product[],
  query: ProductQuery,
): Product[] {
  let result = [...products];

  if (query.search) {
    const searchLower = query.search.toLowerCase();
    result = result.filter(
      (product) =>
        product.title.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower),
    );
  }

  if (query.categories) {
    const categories = parseCategories(query.categories);
    if (categories.length > 0) {
      result = result.filter((product) =>
        categories.includes(product.category),
      );
    }
  }

  if (query.sortBy) {
    result = sortProducts(result, query.sortBy);
  }

  return result;
}

export function parseCategories(raw: string): string[] {
  return raw
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);
}

function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  const result = [...products];

  switch (sortBy) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "title-asc":
      result.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "title-desc":
      result.sort((a, b) => b.title.localeCompare(a.title));
      break;
  }

  return result;
}
