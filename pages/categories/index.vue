<template>
  <div class="categories-page">
    <h1>Категории услуг</h1>
    <div class="categories-grid">
      <div v-if="loading" class="loading">Загрузка...</div>
      <div v-else-if="categories.length === 0" class="no-categories">
        Категории пока не добавлены
      </div>
      <div v-else class="categories-list">
        <!-- Здесь будет список категорий -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

definePageMeta({
  middleware: ["auth"],
});

const loading = ref(false);
const categories = ref([]);

// Здесь будет логика загрузки категорий
</script>

<style lang="scss" scoped>
.categories-page {
  padding: 20px;

  h1 {
    margin-bottom: 30px;
    color: var(--color-heading);
  }
}

.categories-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}

.loading,
.no-categories {
  text-align: center;
  padding: 40px;
  color: var(--color-text-light);
}
</style>
