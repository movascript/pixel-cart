<script setup lang="ts">
const props = defineProps<{
  modelValue: SortOption;
}>();

const emit = defineEmits<{
  "update:modelValue": [SortOption];
}>();

const options: { label: string; value: SortOption }[] = [
  { label: "پیش فرض", value: "" },
  { label: "ارزان ترین", value: "price-asc" },
  { label: "گران ترین", value: "price-desc" },
  { label: "عنوان (صعودی)", value: "title-asc" },
  { label: "عنوان (نزولی)", value: "title-desc" },
];
</script>

<template>
  <UiCollapse title="مرتب سازی">
    <div class="space-y-3">
      <UiRadio
        v-for="option in options"
        :key="option.value"
        :model-value="modelValue"
        :value="option.value"
        :label="option.label"
        @update:model-value="emit('update:modelValue', $event as SortOption)"
      />
    </div>
  </UiCollapse>
</template>
