<template>
  <div class="layout">
    <TheHeader />
    <main class="main">
      <slot />
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();

// Initialize auth on app start
onMounted(async () => {
  await authStore.initAuth();
});
</script>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
  padding-top: 80px;

  @media (max-width: 767px) {
    padding-top: 70px;
  }
}
</style>
