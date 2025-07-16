<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Set page metadata
useHead({
  titleTemplate: '%s - ServiFlex',
  meta: [
    { name: 'description', content: 'ServiFlex - современная платформа для поиска и предоставления услуг' },
    { name: 'keywords', content: 'услуги, исполнители, заказчики, платформа, сервис' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: 'ServiFlex - Платформа услуг' },
    { property: 'og:description', content: 'Найдите лучших специалистов для ваших задач' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap' },
  ]
})
</script>
