<template>
  <div class="bg-surface-muted rounded-t-2xl border-border">
    <div class="container py-7">
      <div class="relative">
        <div class="flex flex-col items-center text-center">
          <p class="text-sm text-subtle mb-4 leading-7 max-w-[320px]">
            تمامی حقوق مادی و معنوی این وبسایت متعلق به می‌باشد و هر گونه کپی
            برداری پیگرد قانونی دارد.
          </p>

          <div class="flex justify-center gap-4">
            <a
              v-for="(item, index) in footerSocialIcons"
              :key="index"
              :href="item.to"
              class="rounded-full text-primary/50 hover:text-primary transition-colors"
            >
              <UiIcon :name="item.icon" />
            </a>
          </div>
        </div>

        <div
          class="flex justify-center gap-4 mt-8 md:mt-0 md:absolute md:top-1/2 md:left-0 md:-translate-y-1/2"
        >
          <a
            v-for="badge in footerBadges"
            :key="badge.alt"
            :href="badge.link"
            target="_blank"
            rel="noopener noreferrer"
            class="size-18 bg-white rounded-md p-2 hover:shadow-sm transition-shadow"
          >
            <img
              :src="badge.image"
              :alt="badge.alt"
              class="w-full h-full object-contain"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
