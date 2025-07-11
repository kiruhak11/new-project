<template>
  <header class="header">
    <div class="container">
      <div class="header__content">
        <NuxtLink to="/" class="header__logo"> ServiFlex </NuxtLink>

        <nav class="header__nav">
          <NuxtLink to="/services" class="nav-link">Услуги</NuxtLink>
          <NuxtLink to="/about" class="nav-link">О нас</NuxtLink>
          <NuxtLink to="/contact" class="nav-link">Контакты</NuxtLink>
        </nav>

        <div class="header__auth">
          <template v-if="!authStore.isAuthenticated">
            <NuxtLink to="/auth/login" class="btn btn-text">Войти</NuxtLink>
            <NuxtLink to="/auth/register" class="btn btn-primary"
              >Регистрация</NuxtLink
            >
          </template>
          <template v-else>
            <div class="user-menu">
              <button
                class="user-menu__trigger"
                @click="isMenuOpen = !isMenuOpen"
              >
                {{ authStore.user?.name || "Профиль" }}
              </button>
              <div v-if="isMenuOpen" class="user-menu__dropdown">
                <NuxtLink to="/profile" class="dropdown-item"
                  >Мой профиль</NuxtLink
                >
                <NuxtLink to="/orders" class="dropdown-item"
                  >Мои заказы</NuxtLink
                >
                <button @click="handleLogout" class="dropdown-item">
                  Выйти
                </button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
const isMenuOpen = ref(false);

const handleLogout = async () => {
  await authStore.logout();
  navigateTo("/");
};
</script>

<style lang="scss" scoped>
.header {
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 70px;
  }

  &__logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: #3b82f6;
    text-decoration: none;
  }

  &__nav {
    display: flex;
    gap: 2rem;
  }

  &__auth {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
}

.nav-link {
  color: #1f2937;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    color: #3b82f6;
  }
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;
  text-decoration: none;

  &-text {
    color: #1f2937;

    &:hover {
      color: #3b82f6;
    }
  }

  &-primary {
    background: #3b82f6;
    color: white;

    &:hover {
      background: #2563eb;
    }
  }
}

.user-menu {
  position: relative;

  &__trigger {
    padding: 0.5rem 1rem;
    border: none;
    background: none;
    color: #1f2937;
    font-weight: 500;
    cursor: pointer;
  }

  &__dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 0.5rem;
    background: white;
    border-radius: 0.375rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    min-width: 200px;
  }
}

.dropdown-item {
  display: block;
  padding: 0.75rem 1rem;
  color: #1f2937;
  text-decoration: none;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>
