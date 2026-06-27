<script setup lang="ts">
const mobileNavOpen = ref(false);
</script>

<template>
  <header
    class="bg-surface border-b border-border sticky top-0 z-header shadow-sm rounded-b-2xl"
  >
    <div class="container">
      <div class="relative flex items-center h-18 md:h-30">
        <UiIconButton
          icon="menu"
          class="md:hidden"
          @click.stop="mobileNavOpen = !mobileNavOpen"
        />

        <LayoutHeaderNav class="hidden md:flex" />

        <a href="tel:118" class="ms-auto">
          <UiButton class="px-5 md:px-6 hidden md:flex">
            تماس
            <UiIcon name="call" />
          </UiButton>
          <UiIconButton icon="call" class="md:hidden" />
        </a>
      </div>
    </div>
  </header>

  <LayoutHeaderMobileNav
    class="md:hidden"
    :open="mobileNavOpen"
    @close="mobileNavOpen = false"
  />
</template>
