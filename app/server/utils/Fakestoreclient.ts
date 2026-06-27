export async function fetchAllProducts(): Promise<Product[]> {
  return await $fetch<Product[]>(`${FAKE_STORE_BASE_URL}/products`);
}

export async function fetchProductById(id: number): Promise<Product> {
  return await $fetch<Product>(`${FAKE_STORE_BASE_URL}/products/${id}`);
}

export async function fetchAllCategories(): Promise<string[]> {
  return await $fetch<string[]>(`${FAKE_STORE_BASE_URL}/products/categories`);
}
