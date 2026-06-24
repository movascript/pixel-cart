<script setup>
const route = useRoute();
const productId = computed(() => Number(route.params.id));
</script>

<template>
  <h1>PRODUCTS/{{ productId }}</h1>
</template>
