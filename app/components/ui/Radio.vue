<script setup lang="ts">
defineProps<{
  label: string;
  value: string;
}>();

const modelValue = defineModel<string>();
</script>

<template>
  <label
    class="group text-xs flex cursor-pointer items-center gap-3 text-muted-foreground"
  >
    <input
      v-model="modelValue"
      type="radio"
      :value="value"
      class="peer sr-only"
    />

    <span
      class="group/radio flex size-5 items-center justify-center rounded-full border-2 border-gray-200 transition-colors duration-100 peer-checked:border-primary group-hover:border-gray-400"
    >
      <span
        class="size-2.5 scale-0 rounded-full bg-primary transition-transform duration-100 group-[.peer:checked+&]/radio:scale-100"
      />
    </span>

    <span
      class="font-medium select-none text-gray-500 transition-colors duration-100 group-hover:text-gray-600 peer-checked:text-gray-800"
    >
      {{ label }}
    </span>
  </label>
</template>
