<script setup lang="ts">
import { cva } from "class-variance-authority";

defineOptions({
  inheritAttrs: false,
});

const iconButtonVariants = cva(
  "aspect-square border border-primary rounded-md flex items-center justify-center text-primary cursor-pointer transition-colors hover:bg-primary/10",
  {
    variants: {
      size: {
        sm: "w-8",
        md: "w-10",
        lg: "w-12",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

type Size = "sm" | "md" | "lg";

interface Props {
  icon: string;
  size?: Size;
}

const props = withDefaults(defineProps<Props>(), {
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
    :class="cn(iconButtonVariants({ size: props.size }), className)"
    v-bind="restAttrs"
    @click="emit('click', $event)"
  >
    <UiIcon :name="icon" />
  </button>
</template>
