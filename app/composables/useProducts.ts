export const useProducts = () => {
  const filters = useUrlParams<ProductFilters>({
    search: "",
    categories: [],
    sortBy: "",
  });
  const { data: categories, error: categoriesError } = useAsyncData(
    "categories",
    () => productService.getCategories(),
  );
  const {
    data: filteredProducts,
    pending: loading,
    error: productsError,
  } = useAsyncData("products", () => productService.getProducts(filters), {
    watch: [filters],
  });
  const error = computed<string | null>(() =>
    productsError.value || categoriesError.value
      ? "خطا در دریافت محصولات"
      : null,
  );
  const setSearch = (value: string) => {
    filters.search = value;
  };
  const setSortBy = (value: SortOption) => {
    filters.sortBy = value;
  };
  const toggleCategory = (category: string) => {
    const idx = filters.categories.indexOf(category);
    filters.categories =
      idx === -1
        ? [...filters.categories, category]
        : filters.categories.filter((c) => c !== category);
  };
  const removeCategory = (category: string) => {
    filters.categories = filters.categories.filter((c) => c !== category);
  };
  const clearFilters = () => {
    filters.search = "";
    filters.categories = [];
    filters.sortBy = "";
  };
  return {
    categories,
    filteredProducts,
    loading,
    error,
    filters,
    setSearch,
    setSortBy,
    toggleCategory,
    removeCategory,
    clearFilters,
  };
};
