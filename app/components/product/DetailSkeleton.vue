<template>
  <div class="flex flex-col gap-6 animate-pulse">
    <!-- img -->
    <div class="w-full rounded-2xl bg-surface p-6">
      <div class="mb-6 h-7 float-left w-64 rounded-lg bg-surface-muted" />

      <div
        class="h-58 md:h-78 flex w-full items-center justify-center rounded-2xl bg-surface-muted p-4"
      />
    </div>

    <!-- specs -->
    <div class="w-full rounded-2xl bg-surface p-6">
      <div class="mb-6 h-8 w-40 rounded-lg bg-surface-muted" />

      <div class="grid gap-3">
        <div v-for="i in 3" :key="i" class="grid gap-3 md:grid-cols-4">
          <div
            class="h-12 rounded-2xl bg-surface-muted md:rounded-r-2xl md:rounded-l-sm"
          />

          <div
            class="h-12 rounded-2xl bg-surface-muted md:col-span-3 md:rounded-l-2xl md:rounded-r-sm"
          />
        </div>
      </div>
    </div>
  </div>
</template>
