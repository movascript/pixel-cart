<script setup lang="ts">
const props = defineProps<{
  src: string;
  alt?: string;
}>();

const isOpen = ref(false);

const scale = ref(1);
const translateX = ref(0);
const translateY = ref(0);

let isDragging = false;
let lastX = 0;
let lastY = 0;
let lastTouchDist = 0;

const transform = computed(
  () =>
    `translate(${translateX.value}px, ${translateY.value}px) scale(${scale.value})`,
);

function open() {
  isOpen.value = true;
  reset();
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
}

function close() {
  isOpen.value = false;
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("mouseup", onMouseUp);
}

function reset() {
  scale.value = 1;
  translateX.value = 0;
  translateY.value = 0;
}

const MIN_SCALE = 1;
const MAX_SCALE = 6;

function clampPan() {
  const maxX = (window.innerWidth * (scale.value - 1)) / 2;
  const maxY = (window.innerHeight * (scale.value - 1)) / 2;
  translateX.value = Math.min(maxX, Math.max(-maxX, translateX.value));
  translateY.value = Math.min(maxY, Math.max(-maxY, translateY.value));
}

function onWheel(e: WheelEvent) {
  e.preventDefault();
  const delta = e.deltaY > 0 ? 0.9 : 1.1;
  scale.value = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale.value * delta));
  if (scale.value === MIN_SCALE) {
    translateX.value = 0;
    translateY.value = 0;
  } else {
    clampPan();
  }
}

function onDblClick() {
  if (scale.value !== 1) {
    reset();
  } else {
    scale.value = 2.5;
  }
}

function onMouseDown(e: MouseEvent) {
  isDragging = true;
  lastX = e.clientX;
  lastY = e.clientY;
}

function onMouseMove(e: MouseEvent) {
  if (!isDragging) return;
  translateX.value += e.clientX - lastX;
  translateY.value += e.clientY - lastY;
  lastX = e.clientX;
  lastY = e.clientY;
  clampPan();
}

function onMouseUp() {
  isDragging = false;
}

function onTouchStart(e: TouchEvent) {
  if (e.touches.length === 2) {
    lastTouchDist = Math.hypot(
      e.touches[0]!.clientX - e.touches[1]!.clientX,
      e.touches[0]!.clientY - e.touches[1]!.clientY,
    );
  } else if (e.touches.length === 1) {
    isDragging = true;
    lastX = e.touches[0]!.clientX;
    lastY = e.touches[0]!.clientY;
  }
}

function onTouchMove(e: TouchEvent) {
  e.preventDefault();
  if (e.touches.length === 2) {
    const dist = Math.hypot(
      e.touches[0]!.clientX - e.touches[1]!.clientX,
      e.touches[0]!.clientY - e.touches[1]!.clientY,
    );

    // Midpoint of the two fingers
    const midX = (e.touches[0]!.clientX + e.touches[1]!.clientX) / 2;
    const midY = (e.touches[0]!.clientY + e.touches[1]!.clientY) / 2;

    const ratio = dist / lastTouchDist;
    const newScale = Math.min(
      Math.max(scale.value * ratio, MIN_SCALE),
      MAX_SCALE,
    );

    // Only adjust translation when scale actually changes — prevents drift at clamped boundaries
    if (newScale !== scale.value) {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      translateX.value =
        midX - (midX - translateX.value - centerX) * ratio - centerX;
      translateY.value =
        midY - (midY - translateY.value - centerY) * ratio - centerY;

      scale.value = newScale;
    }

    lastTouchDist = dist;
    clampPan();
  } else if (isDragging && e.touches.length === 1) {
    translateX.value += e.touches[0]!.clientX - lastX;
    translateY.value += e.touches[0]!.clientY - lastY;
    lastX = e.touches[0]!.clientX;
    lastY = e.touches[0]!.clientY;
    clampPan();
  }
}

function onTouchEnd() {
  isDragging = false;
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === "Escape") close();
}

onMounted(() => window.addEventListener("keydown", onKeyDown));
onUnmounted(() => {
  window.removeEventListener("keydown", onKeyDown);
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("mouseup", onMouseUp);
});
</script>

<template>
  <!-- Trigger button -->
  <button
    class="inline-flex items-center justify-center w-9 h-9 rounded-xl border-none text-white bg-black/40 cursor-pointer transition-colors duration-150 hover:bg-black/50"
    aria-label="View full screen"
    @click="open"
  >
    <UiIcon name="zoom" />
  </button>

  <!-- Lightbox overlay -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200 ease-in-out"
      leave-active-class="transition-opacity duration-200 ease-in-out"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-lightbox bg-black/88 flex items-center justify-center"
        @click="close"
      >
        <!-- Close button -->
        <button
          class="fixed top-4 right-4 w-10 h-10 rounded-full border-none bg-white/12 text-white cursor-pointer flex items-center justify-center z-lightbox-controls transition-colors duration-150 hover:bg-white/22"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <!-- Image canvas -->
        <div
          class="w-full h-full flex items-center justify-center overflow-hidden"
          :class="isDragging ? 'cursor-grabbing' : 'cursor-grab'"
          @wheel.prevent="onWheel"
          @dblclick="onDblClick"
          @mousedown="onMouseDown"
          @touchstart="onTouchStart"
          @touchmove.prevent="onTouchMove"
          @touchend="onTouchEnd"
          @click="close"
        >
          <img
            :src="src"
            :alt="alt"
            class="max-w-[90vw] max-h-[90vh] object-contain origin-center transition-transform duration-50 ease-out select-none rounded-sm bg-surface-muted p-2"
            :style="{ transform }"
            draggable="false"
            @click.stop
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
