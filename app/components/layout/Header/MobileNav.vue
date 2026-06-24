<script setup lang="ts">
const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

const menuRef = ref<HTMLElement | null>(null);

const handleClickOutside = (event: Event) => {
  if (!props.open) return;

  const target = event.target as Node;

  if (menuRef.value && !menuRef.value.contains(target)) {
    emit("close");
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  document.addEventListener("scroll", handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("scroll", handleClickOutside);
});
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="-translate-y-60"
    enter-to-class="translate-y-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="translate-y-0"
    leave-to-class="-translate-y-60"
  >
    <div
      v-if="open"
      ref="menuRef"
      class="fixed top-16 left-0 right-0 z-40 md:hidden px-3 pt-2 origin-top"
    >
      <div
        class="bg-surface border border-border shadow-lg rounded-b-2xl overflow-hidden"
      >
        <nav class="container pt-4 py-3 flex flex-col gap-3">
          <NuxtLink
            v-for="item in headerNavItems"
            :key="item.label"
            :to="item.to"
            class="flex items-center gap-2 py-2 text-sm font-medium hover:text-primary transition-colors"
            active-class="text-primary"
            @click="emit('close')"
          >
            <UiIcon :name="item.icon" />
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>
    </div>
  </Transition>
</template>
