<script setup lang="ts">
defineProps<{
  face?: string;
  title: string;
  description?: string;
}>();
</script>

<template>
  <div
    class="flex flex-col items-center justify-center py-16 text-center animate-slide-up"
  >
    <p class="font-mono text-6xl text-primary ltr">{{ face ?? "!?!" }}</p>

    <h2 class="mt-4 text-xl font-semibold">
      {{ title }}
    </h2>

    <p v-if="description" class="mt-2 text-muted-foreground">
      {{ description }}
    </p>

    <slot />
  </div>
</template>
