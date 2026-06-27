<script setup lang="ts">
import { ref, onMounted } from "vue";

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
    <UiLazyImage
      :src="product.image"
      :alt="product.title"
      :eager="eager"
      wrapper-class="aspect-square h-43 w-full rounded-2xl"
      img-class="group-hover:scale-105"
    />

    <div class="flex flex-1 flex-col gap-4 p-1 pt-4">
      <h3
        class="line-clamp-1 ltr px-1 text-sm font-medium text-heading md:text-base"
        :title="product.title"
      >
        {{ product.title }}
      </h3>

      <UiButton variant="outline" size="md" class="w-full font-semibold">
        <span class="flex items-center gap-2 group-hover:gap-3 transition-all">
          مشاهده جزیات
          <UiIcon name="arrowLeft" />
        </span>
      </UiButton>
    </div>
  </NuxtLink>
</template>
