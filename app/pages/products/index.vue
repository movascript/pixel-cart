<script setup lang="ts">
const {
  loading,
  error,
  filters,
  categories,
  filteredProducts,
  fetchProducts,
  fetchCategories,
  setSearch,
  toggleCategory,
  removeCategory,
  setSortBy,
} = useProducts();

onMounted(async () => {
  await Promise.all([fetchProducts(), fetchCategories()]);
});
</script>

<template>
  <div class="container py-8">
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <ProductFilter
        :categories="categories"
        :filters="filters"
        @search="setSearch"
        @category="toggleCategory"
        @sort="setSortBy"
      />

      <div class="lg:col-span-3">
        <ProductFilterActiveFilters
          :filters="filters"
          @remove-search="setSearch('')"
          @remove-category="removeCategory"
          @remove-sort="setSortBy('default')"
        />

        <div
          v-if="loading"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <ProductCardSkeleton v-for="i in 6" :key="i" />
        </div>

        <div v-else-if="error" class="text-center py-12">
          {{ error }}
        </div>

        <div
          v-else-if="filteredProducts.length === 0"
          class="text-center py-12"
        >
          هیچ محصولی یافت نشد
        </div>

        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </div>
  </div>
</template>
