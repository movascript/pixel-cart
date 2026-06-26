<script setup lang="ts">
const props = defineProps<{
  categories: string[];
  filters: ProductFilters;
}>();

const emit = defineEmits<{
  search: [string];
  category: [string];
  sort: [SortOption];
}>();

const search = ref(props.filters.search);

// syncing local search and props search
watch(
  () => props.filters.search,
  (val) => (search.value = val),
);
</script>

<template>
  <aside class="space-y-4 lg:col-span-1">
    <!-- Search -->
    <div class="rounded-3xl border border-border bg-surface p-4">
      <div class="space-y-4">
        <h3 class="text-sm font-medium text-subtle">فیلتر و جستجو</h3>

        <ProductFilterSearchInput v-model="search" />

        <UiButton @click="emit('search', search)" class="w-full">
          جستجو
        </UiButton>
      </div>
    </div>

    <!-- Sort -->
    <UiCollapse title="مرتب سازی">
      <div class="space-y-3">
        <UiRadio
          :model-value="filters.sortBy"
          value="default"
          label="پیش فرض"
          @update:model-value="emit('sort', $event as SortOption)"
        />

        <UiRadio
          :model-value="filters.sortBy"
          value="price-asc"
          label="ارزان ترین"
          @update:model-value="emit('sort', $event as SortOption)"
        />

        <UiRadio
          :model-value="filters.sortBy"
          value="price-desc"
          label="گران ترین"
          @update:model-value="emit('sort', $event as SortOption)"
        />

        <UiRadio
          :model-value="filters.sortBy"
          value="title-asc"
          label="عنوان (صعودی)"
          @update:model-value="emit('sort', $event as SortOption)"
        />

        <UiRadio
          :model-value="filters.sortBy"
          value="title-desc"
          label="عنوان (نزولی)"
          @update:model-value="emit('sort', $event as SortOption)"
        />
      </div>
    </UiCollapse>

    <!-- Category -->
    <UiCollapse title="دسته بندی">
      <div class="space-y-3 capitalize">
        <UiCheckbox
          v-for="category in categories"
          :key="category"
          :label="category"
          :value="category"
          :model-value="filters.categories.includes(category)"
          @update:model-value="emit('category', category)"
        />
      </div>
    </UiCollapse>
  </aside>
</template>
