<script setup lang="ts">
const route = useRoute();

const productId = computed(() => Number(route.params.id));

const {
  data: product,
  pending: loading,
  error,
} = await useAsyncData(
  () => `product-${productId.value}`,
  () => productService.getProduct(productId.value),
  {
    watch: [productId],
  },
);

useHead(
  computed(() => ({
    title: product.value?.title ?? "محصول",
    meta: [
      {
        name: "description",
        content: product.value?.description?.slice(0, 150) ?? "",
      },
    ],
  })),
);

const specs = computed(() =>
  product.value
    ? [
        {
          label: "قیمت",
          value: formatPrice(product.value.price),
        },
        {
          label: "توضیحات",
          value: product.value.description,
        },
        {
          label: "دسته بندی",
          value: product.value.category,
        },
      ]
    : [],
);
</script>

<template>
  <div class="container py-8">
    <ProductBreadcrumb :title="product?.title" class="mb-6" />

    <ProductDetailSkeleton v-if="loading" />

    <div v-else-if="product" class="flex flex-col gap-6">
      <!-- img -->
      <div class="w-full rounded-2xl bg-surface p-6">
        <h1 class="ltr mb-6 text-xl font-bold text-heading">
          {{ product.title }}
        </h1>

        <div
          class="relative flex h-58 w-full items-center justify-center rounded-2xl bg-surface-muted p-4 md:h-78"
        >
          <div class="absolute top-2 right-2 z-10">
            <UiImageLightbox :src="product.image" :alt="product.title" />
          </div>

          <UiLazyImage
            :src="product.image"
            :alt="product.title"
            eager
            class="h-full w-full object-contain p-0"
          />
        </div>
      </div>

      <!-- specs -->
      <div class="w-full rounded-2xl bg-surface p-6">
        <h2 class="mb-6 text-xl font-bold text-heading">مشخصات فنی</h2>

        <div class="grid gap-3">
          <div
            v-for="item in specs"
            :key="item.label"
            class="grid gap-3 md:grid-cols-4"
          >
            <div
              class="rounded-2xl bg-surface-muted px-4 py-3 text-label md:rounded-r-2xl md:rounded-l-sm"
            >
              {{ item.label }}
            </div>

            <div
              class="ltr rounded-2xl bg-surface-muted px-4 py-3 font-heading text-value md:col-span-3 md:rounded-l-2xl md:rounded-r-sm"
            >
              {{ item.value }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <UiEmptyState
      v-else-if="error"
      title="خطا در دریافت اطلاعات محصول"
      :description="error.message"
    />
  </div>
</template>
