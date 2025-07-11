<template>
  <div class="home">
    <section class="hero">
      <div class="container">
        <h1>Найдите лучших специалистов для ваших задач</h1>
        <p>ServiFlex - платформа для поиска и предоставления услуг</p>
        <div class="hero-actions">
          <NuxtLink to="/services" class="button">Найти услугу</NuxtLink>
          <NuxtLink
            v-if="!authStore.isAuthenticated"
            to="/auth/register"
            class="button button-outline"
          >
            Стать исполнителем
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <h2>Почему выбирают нас</h2>
        <div class="features-grid">
          <div class="feature-card">
            <h3>Проверенные исполнители</h3>
            <p>Все исполнители проходят верификацию</p>
          </div>
          <div class="feature-card">
            <h3>Безопасная оплата</h3>
            <p>Оплата после выполнения работы</p>
          </div>
          <div class="feature-card">
            <h3>Гарантия качества</h3>
            <p>Контроль качества выполнения услуг</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
</script>

<style lang="scss" scoped>
.hero {
  padding: 64px 0;
  background-color: #f3f4f6;
  text-align: center;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 16px;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 32px;
  }
}

.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;

  .button {
    min-width: 200px;
  }
}

.features {
  padding: 64px 0;

  h2 {
    text-align: center;
    margin-bottom: 32px;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
}

.feature-card {
  padding: 32px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;

  h3 {
    margin-bottom: 16px;
    color: #3b82f6;
  }
}

.button {
  &-outline {
    background-color: transparent;
    border: 2px solid #3b82f6;
    color: #3b82f6;

    &:hover {
      background-color: rgba(59, 130, 246, 0.1);
    }
  }
}
</style>
