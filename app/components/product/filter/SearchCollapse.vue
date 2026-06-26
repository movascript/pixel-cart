<script setup lang="ts">
const props = defineProps<{
  search: string;
}>();

const emit = defineEmits<{
  search: [string];
}>();

const localSearch = ref(props.search);

watch(
  () => props.search,
  (value) => {
    localSearch.value = value;
  },
);
</script>

<template>
  <UiCollapse title="فیلتر و جستجو" disabled default-open>
    <form class="space-y-4" @submit.prevent="emit('search', localSearch)">
      <div
        class="flex items-center rounded-xl border border-primary bg-surface-muted px-3"
      >
        <UiIcon name="search" class="text-primary" />

        <div class="mx-3 h-5 w-px bg-gray-300" />

        <input
          v-model="localSearch"
          type="text"
          placeholder="جستجوی محصول"
          class="w-full flex-1 bg-transparent py-2 text-sm font-medium outline-none"
        />

        <button
          v-if="localSearch"
          type="button"
          class="shrink-0 cursor-pointer text-label hover:text-danger"
          @click="localSearch = ''"
        >
          <UiIcon name="close" />
        </button>
      </div>

      <UiButton class="w-full" type="submit"> جستجو </UiButton>
    </form>
  </UiCollapse>
</template>
