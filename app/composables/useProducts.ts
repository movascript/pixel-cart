export const useProducts = () => {
  const filters = useUrlParams<ProductFilters>({
    search: "",
    categories: [],
    sortBy: "",
  });
  const { data: categories, error: categoriesError } = useAsyncData(
    "categories",
    () => productService.getCategories(),
    { server: false },
  );
  const {
    data: filteredProducts,
    error: productsError,
    status,
  } = useAsyncData("products", () => productService.getProducts(filters), {
    watch: [filters],
    server: false,
  });

  // shouldnt have done this but due to turning of server in use async data
  // i had to stop the content flashing on page load
  const loading = computed(
    () => status.value === "idle" || status.value === "pending",
  );

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
