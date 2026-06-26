<script setup lang="ts">
defineProps<{
  label: string;
  value: string;
}>();

const modelValue = defineModel<boolean>({
  default: false,
});
</script>

<template>
  <label
    class="group flex cursor-pointer items-center gap-3 text-xs text-muted-foreground"
  >
    <input v-model="modelValue" type="checkbox" class="peer sr-only" />

    <span
      class="group flex size-5 items-center justify-center rounded-md border-[1.5px] border-gray-200 transition-colors peer-checked:border-primary peer-checked:bg-primary group-hover:border-gray-400 duration-100"
    >
      <UiIcon
        name="check"
        class="text-white opacity-0 duration-100 transition-opacity group-[.peer:checked+&]:opacity-100"
      />
    </span>

    <span
      class="font-medium select-none peer-checked:text-gray-800 text-gray-500 ltr transition-colors group-hover:text-gray-600 duration-100"
    >
      {{ label }}
    </span>
  </label>
</template>
