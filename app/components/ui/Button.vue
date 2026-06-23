<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <button
    :class="
      cn(
        'flex items-center gap-2 bg-primary text-surface py-2 rounded-2xl font-medium cursor-pointer text-sm md:text-base hover:bg-primary/80 transition-colors',
        $attrs.class,
      )
    "
  >
    <slot />
  </button>
</template>
