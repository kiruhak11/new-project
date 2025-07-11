<template>
  <div class="app">
    <TheHeader />
    <main class="main">
      <slot></slot>
    </main>
  </div>
</template>

<script setup lang="ts">
// Компоненты импортируются автоматически
</script>

<style lang="scss">
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
  padding: $spacing-large 0;
}
</style>
