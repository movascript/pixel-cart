import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/global.css"],
  imports: { dirs: ["types", "services"] },
  experimental: { viewTransition: true },

  ssr: true,
  nitro: {
    preset: "node-server",
  },

  app: {
    viewTransition: true,
    head: {
      title: "پیکسل کارت",
      titleTemplate: "%s | پیکسل کارت",
      htmlAttrs: { lang: "fa", dir: "rtl" },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        { name: "theme-color", content: "#ffffff" },
        {
          name: "description",
          content: "این یه فروشگاه عادی نیست، تست اش کن!",
        },
        { property: "og:title", content: "پیکسل کارت" },
        {
          property: "og:description",
          content: "این یه فروشگاه عادی نیست، تست اش کن!",
        },
        { property: "og:image", content: "https://pixelcart.ir/og.png" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:url", content: "https://pixelcart.ir" },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "fa_IR" },
        { property: "og:site_name", content: "Pixel Cart" }, // ← fixed typo: og:site:name → og:site_name
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "canonical", href: "https://pixelcart.ir" },
      ],
    },
  },
  vite: { plugins: [tailwindcss()] },
});
