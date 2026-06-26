<script setup lang="ts">
const modelValue = defineModel<string>({
  default: "",
});
</script>

<template>
  <div
    class="flex items-center border border-primary rounded-xl bg-surface-muted px-3"
  >
    <UiIcon name="search" class="text-primary" />

    <div class="mx-3 h-5 w-px bg-gray-300" />

    <input
      v-model="modelValue"
      type="text"
      placeholder="جستجوی محصول"
      class="text-sm font-medium flex-1 bg-transparent py-2 outline-none w-full"
    />

    <button
      v-if="modelValue"
      type="button"
      @click="modelValue = ''"
      class="text-label hover:text-danger shrink-0 cursor-pointer"
    >
      <UiIcon name="close" />
    </button>
  </div>
</template>
