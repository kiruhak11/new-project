<template>
  <div>
    <TheHeader />
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
main {
  min-height: calc(100vh - 64px);
  padding-top: 64px;
}
</style>
