<template>
  <div>
    <div class="container py-12 md:pt-12 pt-35">
      <div class="flex justify-between gap-8 flex-wrap items-stretch px-4">
        <div class="hidden items-end md:flex">
          <p class="text-subtle text-xs font-medium leading-12">
            هفت روز هفته از ۸ صبح تا ۱۲ شب پاسخگو هستیم
          </p>
        </div>

        <div>
          <h3 class="font-bold text-xl mb-6">دسترسی سریع</h3>

          <ul class="space-y-4">
            <li v-for="item in footerQuickLinks" :key="item.label">
              <NuxtLink
                :to="item.to"
                class="flex items-center gap-3 font-medium text-sm text-subtle hover:text-primary transition-colors"
              >
                <span>{{ item.label }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-bold text-xl mb-6">راهنمای سایت</h3>

          <ul class="space-y-4">
            <li v-for="item in footerGuideLinks" :key="item.label">
              <NuxtLink
                :to="item.to"
                class="flex items-center gap-3 font-medium text-sm text-subtle hover:text-primary transition-colors"
              >
                <span>{{ item.label }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div>
          <h3 class="font-bold text-xl mb-6">شبکه‌های اجتماعی</h3>

          <ul class="space-y-4">
            <li v-for="item in footerSocialLinks" :key="item.label">
              <a
                :href="item.to"
                class="group flex items-center font-medium text-sm gap-3 text-secondary transition-colors"
              >
                <UiIcon
                  :name="item.icon"
                  class="text-muted group-hover:text-primary transition-colors"
                />

                <span class="group-hover:text-primary transition-colors">
                  {{ item.label }}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
