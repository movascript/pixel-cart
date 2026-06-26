<script setup lang="ts">
defineProps<{
  title?: string;
}>();
</script>

<template>
  <nav class="flex items-center gap-2 text-xs text-muted font-semibold">
    <NuxtLink
      to="/"
      class="flex items-center gap-1 hover:text-primary transition-colors"
    >
      <UiIcon name="home" />
    </NuxtLink>

    <UiIcon name="arrowLeft" />

    <NuxtLink
      to="/products"
      class="hover:text-primary transition-colors text-nowrap"
    >
      لیست محصولات‌ها
    </NuxtLink>

    <UiIcon name="arrowLeft" />

    <div class="min-w-0 ltr truncate">
      <NuxtLink
        v-if="title"
        to="#"
        class="hover:text-primary transition-colors"
      >
        {{ title }}
      </NuxtLink>

      <UiSkeleton v-else variant="text" class="h-4 w-40" />
    </div>
  </nav>
</template>
