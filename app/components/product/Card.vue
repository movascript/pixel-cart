<script setup lang="ts">
const props = defineProps<{
  product: Product;
}>();

const loaded = ref(false);
</script>

<template>
  <NuxtLink
    :to="`/products/${product.id}`"
    class="group flex flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-shadow hover:shadow-lg font-heading p-2"
  >
    <div
      class="aspect-square w-full h-43 overflow-hidden bg-surface rounded-2xl"
    >
      <img
        :src="product.image"
        :alt="product.title"
        loading="lazy"
        @load="loaded = true"
        :class="
          cn(
            'h-full w-full bg-surface-muted object-contain p-6 transition-all duration-200 group-hover:scale-105',
            loaded ? 'blur-none opacity-100' : 'blur-xs opacity-50',
          )
        "
      />
    </div>

    <div class="flex flex-1 flex-col gap-4 pt-4 p-1">
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
