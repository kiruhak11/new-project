declare module "#app" {
  interface PageMeta {
    middleware?: string | string[];
    layout?: string | false;
  }
}

// Для поддержки definePageMeta
declare module "nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: string | string[];
    layout?: string | false;
  }
}

export {};
