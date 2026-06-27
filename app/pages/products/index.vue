<script setup lang="ts">
const {
  loading,
  error,
  filters,
  categories,
  products,
  setSearch,
  toggleCategory,
  removeCategory,
  setSortBy,
} = useProducts();
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
        <UiEmptyState
          v-else-if="error"
          title="مشکلی پیش آمد"
          :description="error.message"
        />
        <UiEmptyState
          v-else-if="products.length === 0"
          face=":("
          title="چیزی پیدا نشد"
          description="هیچ محصولی با فیلترهای انتخاب‌شده پیدا نشد."
        />
        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <ProductCard
            v-for="(product, index) in products"
            :key="product.id"
            :product="product"
            :eager="index <= 6"
          />
        </div>
      </div>
    </div>
  </div>
</template>
