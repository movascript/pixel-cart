export class ApiService {
  private static async fetch<T>(endpoint: string): Promise<T> {
    return await $fetch(`${API_BASE_URL}${endpoint}`, {});
  }

  static async getProducts(): Promise<Product[]> {
    return this.fetch<Product[]>("/products");
  }
}
