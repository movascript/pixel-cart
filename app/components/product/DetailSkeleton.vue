<template>
  <div class="flex flex-col gap-6">
    <div class="w-full rounded-2xl bg-surface p-6">
      <UiSkeleton variant="text" class="mb-6 h-7 w-64" />

      <UiSkeleton variant="image" class="h-58 md:h-78 w-full" />
    </div>

    <div class="w-full rounded-2xl bg-surface p-6">
      <UiSkeleton variant="text" class="mb-6 h-8 w-40" />

      <div class="grid gap-3">
        <div v-for="i in 3" :key="i" class="grid gap-3 md:grid-cols-4">
          <UiSkeleton class="h-12 md:rounded-r-2xl md:rounded-l-sm" />

          <UiSkeleton
            class="h-12 md:col-span-3 md:rounded-l-2xl md:rounded-r-sm"
          />
        </div>
      </div>
    </div>
  </div>
</template>
