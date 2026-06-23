<script setup lang="ts">
// this aint my ideal cause of missing type safetely
// but i feel its better than manual import for each svg file
const icons = import.meta.glob("~/assets/icons/*.svg", {
  eager: true,
  query: "?raw",
  import: "default",
  base: "/assets/icons/",
});

const props = defineProps<{
  name: keyof typeof icons;
  class?: string;
}>();

const icon = computed(() => icons[`./${props.name}.svg`]);
</script>

<template>
  <span v-if="!icon" class="bg-red-500 text-white"
    >Icon({{ props.name }}) not found</span
  >
  <span v-else :class="props.class" v-html="icon" />
</template>
