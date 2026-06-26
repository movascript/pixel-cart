<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string;
    defaultOpen?: boolean;
    disabled?: boolean;
  }>(),
  {
    defaultOpen: true,
    disabled: false,
  },
);

const open = ref(props.defaultOpen);
</script>

<template>
  <div class="rounded-3xl border border-border bg-surface overflow-hidden">
    <button
      class="flex w-full items-center justify-between p-4"
      :class="props.disabled ? 'cursor-default' : 'cursor-pointer'"
      @click="!props.disabled && (open = !open)"
    >
      <span class="text-sm font-medium text-subtle">
        {{ title }}
      </span>

      <UiIcon
        v-if="!props.disabled"
        name="arrowDown"
        :class="cn('transition-transform duration-200', open && 'rotate-180')"
      />
    </button>

    <div
      :class="
        cn(
          'grid transition-all duration-200',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )
      "
    >
      <div class="overflow-hidden">
        <div class="p-4 pt-0">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
