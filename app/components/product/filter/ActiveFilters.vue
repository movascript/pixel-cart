<script setup lang="ts">
const props = defineProps<{
  filters: ProductFilters;
}>();

const emit = defineEmits<{
  removeSearch: [];
  removeCategory: [string];
  removeSort: [];
}>();

const sortLabels: Record<ProductFilters["sortBy"], string> = {
  default: "",
  "price-asc": "ارزان ترین",
  "price-desc": "گران ترین",
  "title-asc": "عنوان (صعودی)",
  "title-desc": "عنوان (نزولی)",
};

const hasActiveFilters = computed(
  () =>
    !!props.filters.search ||
    props.filters.categories.length > 0 ||
    props.filters.sortBy !== "default",
);
</script>

<template>
  <div
    v-if="hasActiveFilters"
    class="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-border bg-surface p-4 mb-6"
  >
    <span class="font-medium text-sm text-heading pr-1"
      >فیلتر های اعمال شده</span
    >

    <div class="flex flex-wrap gap-3">
      <UiBadge
        v-if="filters.search"
        icon="search"
        :label="filters.search"
        @remove="emit('removeSearch')"
      />

      <UiBadge
        v-for="category in filters.categories"
        :key="category"
        icon="list"
        :label="category"
        @remove="emit('removeCategory', category)"
      />

      <UiBadge
        v-if="filters.sortBy !== 'default'"
        icon="sort"
        :label="sortLabels[filters.sortBy]"
        @remove="emit('removeSort')"
      />
    </div>
  </div>
</template>
