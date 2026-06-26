<template>
  <div
    class="flex flex-col overflow-hidden rounded-3xl border border-border bg-surface p-2 animate-fade-up"
  >
    <UiSkeleton variant="image" class="aspect-square h-43 w-full" />

    <div class="flex flex-1 flex-col gap-4 p-1 pt-4">
      <UiSkeleton variant="text" class="h-6 w-4/5 self-end" />

      <UiSkeleton variant="button" class="mt-auto h-10 w-full" />
    </div>
  </div>
</template>
