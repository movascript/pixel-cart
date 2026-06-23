<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    icon: string;
    size?: "sm" | "md" | "lg";
  }>(),
  {
    size: "md",
  },
);

const sizeClass = computed(() => {
  switch (props.size) {
    case "sm":
      return "w-8";
    case "lg":
      return "w-12";
    default:
      return "w-10";
  }
});
</script>

<template>
  <button
    :class="
      cn(
        'aspect-square border border-primary rounded-md flex items-center justify-center text-primary cursor-pointer',
        sizeClass,
        $attrs.class,
      )
    "
  >
    <UiIcon :name="icon" />
  </button>
</template>
