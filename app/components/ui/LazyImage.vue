<script setup lang="ts">
withDefaults(
  defineProps<{
    src: string;
    alt?: string;
    eager?: boolean;
    placeholder?: string;
    imgClass?: string;
    wrapperClass?: string;
  }>(),
  {
    alt: "",
    eager: false,
    placeholder: "/images/placeholder.png",
    imgClass: "",
    wrapperClass: "",
  },
);

const imageLoaded = ref(false);
const imgRef = ref<HTMLImageElement | null>(null);

onMounted(() => {
  if (imgRef.value?.complete) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        imageLoaded.value = true;
      });
    });
  }
});

const handleLoad = () => {
  imageLoaded.value = true;
};
</script>

<template>
  <div class="relative overflow-hidden bg-surface" :class="wrapperClass">
    <img
      :src="placeholder"
      alt=""
      aria-hidden="true"
      :class="
        cn(
          'absolute inset-0 h-full w-full object-contain p-14 scale-110 blur-lg transition-opacity duration-200 opacity-50',
          imageLoaded && 'opacity-0',
        )
      "
    />

    <img
      ref="imgRef"
      :src="src"
      :alt="alt"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : 'auto'"
      :class="
        cn(
          'relative h-full w-full object-contain p-6 transition-opacity duration-200 opacity-0',
          imageLoaded && 'opacity-100',
          imgClass,
        )
      "
      @load="handleLoad"
    />
  </div>
</template>
