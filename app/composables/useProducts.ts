export const useProducts = () => {
  const filters = ref<ProductFilters>({
    search: "",
    categories: [],
    sortBy: "default",
  });

  const {
    data: products,
    pending: loading,
    error,
    refresh: refreshProducts,
  } = useFetch<Product[]>(storeApi.productsList(filters.value).url, {
    query: computed(() => toProductQuery(filters.value)),
    default: () => [],
  });

  const { data: categories, error: categoriesError } = useFetch<string[]>(
    storeApi.categories().url,
    {
      default: () => [],
    },
  );

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
    categoriesError,

    filters,
    refreshProducts,
    setSearch,
    toggleCategory,
    removeCategory,
    setSortBy,
    clearFilters,
  };
};
