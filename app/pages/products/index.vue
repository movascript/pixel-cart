<script setup lang="ts">
const products = ref<Product[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

const fetchProducts = async () => {
  loading.value = true;
  error.value = null;

  try {
    products.value = await ApiService.getProducts();
  } catch (e) {
    error.value = "خطا در دریافت محصولات";
    console.error(e);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchProducts);
</script>

<template>
  <div class="container py-8">
    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <ProductFilter />

      <div class="lg:col-span-3">
        <!-- loading -->
        <div
          v-if="loading"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <ProductCardSkeleton v-for="i in 6" :key="i" />
        </div>

        <!-- error -->
        <div v-else-if="error" class="text-center py-12">
          <p class="text-red-400 font-semibold text-lg">{{ error }}</p>
        </div>

        <!-- empty -->
        <div v-else-if="products.length === 0" class="text-center py-12">
          <p class="text-text-secondary text-lg">هیچ محصولی یافت نشد</p>
        </div>

        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </div>
  </div>
</template>
