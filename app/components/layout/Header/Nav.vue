<template>
  <nav class="items-center gap-5 absolute left-1/2 -translate-x-1/2">
    <NuxtLink
      v-for="item in headerNavItems"
      :key="item.label"
      :to="item.to"
      class="flex text-sm text-nowrap font-medium gap-2 items-center hover:text-primary transition-colors"
      active-class="text-primary"
    >
      <UiIcon :name="item.icon" />
      {{ item.label }}
    </NuxtLink>
  </nav>
</template>
