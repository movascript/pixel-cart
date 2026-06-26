export const useProducts = () => {
  const products = ref<Product[]>([]);
  const categories = ref<string[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);
  const filters = ref<ProductFilters>({
    search: "",
    categories: [],
    sortBy: "default",
  });

  const fetchProducts = async () => {
    loading.value = true;
    error.value = null;
    try {
      products.value = await ApiService.getProducts();
    } catch (e) {
      error.value = "خطا در دریافت محصولات";
      console.error(e);
    } finally {
      loading.value = false;
    }
  };

  const fetchCategories = async () => {
    try {
      categories.value = await ApiService.getCategories();
    } catch (e) {
      console.error("Error fetching categories:", e);
    }
  };

  const filteredProducts = computed(() => {
    let result = [...products.value];

    if (filters.value.search) {
      const searchLower = filters.value.search.toLowerCase();
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower),
      );
    }

    if (filters.value.categories.length > 0) {
      result = result.filter((product) =>
        filters.value.categories.includes(product.category),
      );
    }

    switch (filters.value.sortBy) {
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
  });

  const setSearch = (search: string) => {
    filters.value.search = search;
  };

  const toggleCategory = (category: string) => {
    const idx = filters.value.categories.indexOf(category);
    if (idx === -1) {
      filters.value.categories.push(category);
    } else {
      filters.value.categories.splice(idx, 1);
    }
  };

  const removeCategory = (category: string) => {
    filters.value.categories = filters.value.categories.filter(
      (c) => c !== category,
    );
  };

  const setSortBy = (sortBy: SortOption) => {
    filters.value.sortBy = sortBy;
  };

  const clearFilters = () => {
    filters.value = {
      search: "",
      categories: [],
      sortBy: "default",
    };
  };

  return {
    products,
    categories,
    loading,
    error,

    filters,
    filteredProducts,
    fetchProducts,
    fetchCategories,
    setSearch,
    toggleCategory,
    removeCategory,
    setSortBy,
    clearFilters,
  };
};
