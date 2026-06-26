<script setup lang="ts">
defineProps<{
  categories: string[];
  filters: ProductFilters;
}>();

const emit = defineEmits<{
  search: [string];
  category: [string];
  sort: [SortOption];
}>();
</script>

<template>
  <aside class="space-y-4 lg:col-span-1">
    <ProductFilterSearchCollapse
      :search="filters.search"
      @search="emit('search', $event)"
    />

    <ProductFilterSortCollapse
      :model-value="filters.sortBy"
      @update:model-value="emit('sort', $event)"
    />

    <ProductFilterCategoriesCollapse
      :categories="categories"
      :selected="filters.categories"
      @toggle="emit('category', $event)"
    />
  </aside>
</template>
