<template>
  <header
    class="bg-surface border-b border-border sticky top-0 z-header shadow-sm rounded-b-2xl"
  >
    <div class="container">
      <div class="relative flex items-center h-18 md:h-30">
        <UiIconButton icon="menu" class="md:hidden" />

        <nav
          class="hidden md:flex items-center gap-5 absolute left-1/2 -translate-x-1/2"
        >
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

        <div class="ms-auto">
          <UiButton class="px-5 md:px-6 hidden md:flex">
            تماس
            <UiIcon name="call" />
          </UiButton>
          <UiIconButton icon="call" class="md:hidden" />
        </div>
      </div>
    </div>
  </header>
</template>
