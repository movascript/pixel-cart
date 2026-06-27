<script setup lang="ts">
useHead({ title: "صفحه یافت نشد" });
</script>

<template>
  <div class="ltr flex py-40 flex-col gap-1 justify-center items-center grow">
    <h1 class="text-xl font-bold">Not Found</h1>
    <p>What you are looking for doesnt exist!</p>
    <q
      >checkout
      <NuxtLink to="/products" class="text-primary">/products</NuxtLink></q
    >
  </div>
</template>
