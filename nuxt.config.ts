// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ["@pinia/nuxt"],

  css: ["~/assets/styles/main.scss"],

  app: {
    head: {
      title: "ServiFlex - Платформа услуг",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "ServiFlex - современная платформа для поиска и предоставления услуг. Найдите лучших специалистов для ваших задач.",
        },
        {
          name: "keywords",
          content:
            "услуги, исполнители, заказчики, платформа, сервис, специалисты",
        },
        { name: "author", content: "ServiFlex Team" },
        { name: "robots", content: "index, follow" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "ServiFlex" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "theme-color", content: "#6366f1" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
        },
      ],
    },
  },

  experimental: {
    viewTransition: true,
    payloadExtraction: false,
  },

  nitro: {
    compressPublicAssets: true,
  },

  runtimeConfig: {
    public: {
      appName: "ServiFlex",
      appVersion: "1.0.0",
    },
  },

  // Performance optimizations
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/styles/variables.scss";
          `,
        },
      },
    },
  },

  // SEO and PWA ready
  ssr: true,
});
