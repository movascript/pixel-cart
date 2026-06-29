<script setup lang="ts">
defineProps<{
  label: string;
  value: string;
  count?: number;
}>();

const modelValue = defineModel<boolean>({
  default: false,
});
</script>

<template>
  <label
    class="group flex cursor-pointer items-center justify-between gap-3 text-xs text-muted-foreground"
  >
    <div class="flex items-center gap-3">
      <input v-model="modelValue" type="checkbox" class="peer sr-only" />

      <!-- checkbox box -->
      <span
        class="flex size-4 items-center justify-center rounded-sm border-[1.5px] border-gray-200 transition-colors duration-100 group-hover:border-gray-400 peer-checked:border-primary peer-checked:bg-primary"
      >
        <UiIcon
          name="check"
          class="text-white transition-opacity duration-100"
          :class="modelValue ? 'opacity-100' : 'opacity-0'"
        />
      </span>

      <span
        class="select-none font-medium text-gray-500 transition-colors duration-100 group-hover:text-gray-600 peer-checked:text-gray-800 ltr"
      >
        {{ label }}
      </span>
    </div>

    <span
      v-if="count !== undefined"
      :class="
        cn(
          'flex size-5 shrink-0 items-center justify-center rounded-md text-xs font-medium text-white transition-colors duration-100',
          modelValue ? 'bg-primary' : 'bg-secondary',
        )
      "
    >
      {{ toPersianDigits(count) }}
    </span>
  </label>
</template>
