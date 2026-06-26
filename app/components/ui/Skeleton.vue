<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: "default" | "text" | "image" | "button" | "circle";
    class?: string;
  }>(),
  {
    variant: "default",
  },
);

const variantClasses = computed(() => {
  switch (props.variant) {
    case "text":
      return "rounded-md";

    case "button":
      return "rounded-2xl";

    case "image":
      return "rounded-2xl";

    case "circle":
      return "rounded-full";

    default:
      return "rounded-xl";
  }
});
</script>

<template>
  <div
    :class="
      cn(
        'skeleton relative overflow-hidden bg-surface-muted',
        variantClasses,
        props.class,
      )
    "
  />
</template>

<style scoped>
.skeleton::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgb(255 255 255 / 0.3),
    transparent
  );
  transform: translateX(-100%);
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  to {
    transform: translateX(100%);
  }
}
</style>
