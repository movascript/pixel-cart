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
  <Transition
    enter-active-class="transition-[max-height,opacity,scale] duration-300 ease-out overflow-hidden"
    enter-from-class="opacity-0 max-h-0 scale-[0.96] transform-gpu"
    enter-to-class="opacity-100 max-h-[90px] scale-100 transform-gpu"
    leave-active-class="transition-[max-height,opacity,scale] duration-200 ease-in overflow-hidden"
    leave-from-class="opacity-100 max-h-[90px] scale-100"
    leave-to-class="opacity-0 max-h-0 scale-[0.96]"
  >
    <div v-if="hasActiveFilters" class="will-change-[scale,opacity]">
      <div
        class="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-border bg-surface p-4"
      >
        <span class="pr-1 text-sm font-medium text-heading">
          فیلتر های اعمال شده
        </span>

        <TransitionGroup
          tag="div"
          class="flex flex-wrap gap-3"
          enter-active-class="transition-[opacity,scale] duration-200 ease-out will-change-transform"
          enter-from-class="opacity-0 scale-90"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-[opacity,scale] duration-150 ease-in will-change-transform"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-90"
          move-class="transition-transform duration-200 ease will-change-transform"
        >
          <UiBadge
            v-if="filters.search"
            key="search"
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
            key="sort"
            icon="sort"
            :label="sortLabels[filters.sortBy]"
            @remove="emit('removeSort')"
          />
        </TransitionGroup>
      </div>

      <!-- spacer -->
      <div class="h-6"></div>
    </div>
  </Transition>
</template>
