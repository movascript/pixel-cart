<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <nav class="items-center gap-5 absolute left-1/2 -translate-x-1/2">
    <NuxtLink
      v-for="item in headerNavItems"
      :key="item.label"
      :to="item.to"
      class="relative flex text-sm text-nowrap font-medium gap-2 items-center hover:text-primary transition-colors"
      active-class="text-primary"
    >
      <UiIcon :name="item.icon" />
      {{ item.label }}

      <span
        v-if="route.path === item.to"
        style="view-transition-name: header-nav-indicator"
        class="absolute left-1/2 top-full mt-2 size-1.25 -translate-x-1/2 rounded-full bg-primary"
      />
    </NuxtLink>
  </nav>
</template>

<style scoped>
::view-transition-group(header-nav-indicator) {
  animation-duration: 0.2s;
  animation-timing-function: ease-out;
}
</style>
