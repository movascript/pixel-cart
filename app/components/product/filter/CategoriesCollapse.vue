<script setup lang="ts">
defineProps<{
  categories: string[];
  selected: string[];
}>();

const emit = defineEmits<{
  toggle: [string];
}>();
</script>

<template>
  <UiCollapse title="دسته بندی">
    <div class="space-y-3 capitalize">
      <template v-if="categories.length">
        <UiCheckbox
          v-for="category in categories"
          :key="category"
          :label="category"
          :value="category"
          :model-value="selected.includes(category)"
          @update:model-value="emit('toggle', category)"
          class="animate-fade-up"
        />
      </template>

      <!-- Skeleton -->
      <template v-else>
        <div v-for="i in 4" :key="i" class="flex items-center gap-3">
          <UiSkeleton variant="default" class="size-5 shrink-0 rounded-md" />
          <UiSkeleton variant="text" class="h-4 max-w-32 flex-1" />
        </div>
      </template>
    </div>
  </UiCollapse>
</template>
