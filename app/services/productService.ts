/**
 * Wraps FakeStore API limitations so the app can behave as if it's using
 * a real backend with search, filtering, and sorting support.
 *
 * Since FakeStore lacks these features, i fetched products once and apply
 * filtering and sorting client-side for consistent behavior.
 *
 * still is not my ideal but need to accept a part of it is cause of our api limitations
 * so would let it sit like this and call it a day
 */
function applyFilters(
  products: Product[],
  filters: OptionalProductFilters,
): Product[] {
  let result = [...products];
  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }
  if (filters.categories?.length) {
    result = result.filter((p) => filters.categories!.includes(p.category));
  }
  switch (filters.sortBy) {
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

export const productService = {
  async getProducts(filters: OptionalProductFilters = {}): Promise<Product[]> {
    // simulating network latency
    await simulateApiDelay();
    const all = await $fetch<Product[]>(`${API_BASE_URL}/products`);
    return applyFilters(all, filters);
  },
  async getProduct(id: number): Promise<Product> {
    // simulating network latency
    await simulateApiDelay();
    return $fetch<Product>(`${API_BASE_URL}/products/${id}`);
  },
  async getCategories(): Promise<Category[]> {
    // simulating network latency
    await simulateApiDelay();
    const all = await $fetch<Product[]>(`${API_BASE_URL}/products`);
    const counts = new Map<string, number>();
    for (const p of all) {
      counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    }
    return Array.from(counts, ([name, count]) => ({ name, count }));
  },
};
