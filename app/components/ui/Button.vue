<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

interface Props {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "md",
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const variants = computed(() => ({
  default: "bg-primary text-white hover:opacity-90",

  outline: "border border-border text-primary hover:border-primary",

  ghost: "text-primary hover:bg-primary/10",
}));

const sizes = computed(() => ({
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm md:text-base",
  lg: "h-12 px-6 text-base",
}));
</script>

<template>
  <button
    :class="
      cn(
        'inline-flex gap-2 items-center justify-center rounded-2xl font-medium transition-all cursor-pointer',
        variants[variant],
        sizes[size],
        $attrs.class,
      )
    "
    v-bind="$attrs"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>
