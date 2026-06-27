<script setup lang="ts">
import { cva } from "class-variance-authority";

defineOptions({
  inheritAttrs: false,
});

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/80",
        outline: "border border-border text-primary hover:border-primary/50",
        ghost: "text-primary hover:bg-primary/10",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

type ButtonVariant = "default" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface Props {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "md",
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const attrs = useAttrs();
const { class: className, ...restAttrs } = attrs;
</script>

<template>
  <button
    :class="
      cn(
        buttonVariants({
          variant: props.variant,
          size: props.size,
        }),
        className,
      )
    "
    v-bind="restAttrs"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>
