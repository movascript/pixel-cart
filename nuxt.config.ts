// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/global.css"],
  imports: { dirs: ["types", "services"] },
  experimental: { viewTransition: true },
  app: { viewTransition: true },
  vite: {
    plugins: [tailwindcss()],
  },
});
