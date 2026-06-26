<script setup lang="ts">
withDefaults(
  defineProps<{
    product: Product;
    eager?: boolean;
  }>(),
  {
    eager: false,
  },
);
</script>

<template>
  <NuxtLink
    :to="`/products/${product.id}`"
    class="group animate-fade-up flex flex-col overflow-hidden rounded-3xl border border-border bg-surface p-2 font-heading transition-shadow hover:shadow-lg"
  >
    <div
      class="aspect-square h-43 w-full overflow-hidden rounded-2xl bg-surface"
    >
      <img
        :src="product.image"
        :alt="product.title"
        :loading="eager ? 'eager' : 'lazy'"
        :fetchpriority="eager ? 'high' : 'auto'"
        class="h-full w-full bg-surface-muted object-contain p-6 transition-all duration-200 group-hover:scale-105"
      />
    </div>

    <div class="flex flex-1 flex-col gap-4 p-1 pt-4">
      <h3
        class="line-clamp-1 ltr px-1 text-sm font-medium text-heading md:text-base"
        :title="product.title"
      >
        {{ product.title }}
      </h3>

      <UiButton
        variant="outline"
        size="md"
        class="w-full font-semibold hover:gap-3"
      >
        مشاهده جزیات
        <UiIcon name="arrowLeft" />
      </UiButton>
    </div>
  </NuxtLink>
</template>
