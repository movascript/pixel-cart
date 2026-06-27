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
    imageLoaded.value = true;
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
      class="absolute inset-0 h-full w-full object-contain p-6 scale-110 blur-lg transition-opacity duration-300"
      :class="imageLoaded ? 'opacity-0' : 'opacity-50'"
    />

    <img
      ref="imgRef"
      :src="src"
      :alt="alt"
      :loading="eager ? 'eager' : 'lazy'"
      :fetchpriority="eager ? 'high' : 'auto'"
      class="relative h-full w-full object-contain p-6 transition-all duration-300"
      :class="[
        imageLoaded ? 'opacity-100 blur-none' : 'opacity-0 blur-xs',
        imgClass,
      ]"
      @load="handleLoad"
    />
  </div>
</template>
