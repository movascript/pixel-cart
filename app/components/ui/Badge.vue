<script setup lang="ts">
defineProps<{
  label: string;
  icon?: string;
}>();

defineEmits<{
  remove: [];
}>();
</script>

<template>
  <button
    type="button"
    class="group flex cursor-pointer font-medium items-center gap-2 rounded-full bg-primary-light px-3 py-2 text-xs text-foreground"
    @click="$emit('remove')"
  >
    <UiIcon v-if="icon" :name="icon" />

    <span>{{ label }}</span>

    <UiIcon
      name="close"
      class="size-4 text-muted-foreground transition-colors group-hover:text-primary"
    />
  </button>
</template>
