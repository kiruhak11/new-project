<template>
  <header class="header">
    <div class="container">
      <div class="header__content">
        <NuxtLink to="/" class="header__logo">ServiFlex</NuxtLink>

        <nav class="header__nav">
          <NuxtLink to="/services" class="nav-link">Услуги</NuxtLink>
        </nav>

        <div class="header__auth">
          <ClientOnly>
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
                  <NuxtLink
                    v-if="authStore.user?.role === 'customer'"
                    to="/services/my"
                    class="dropdown-item"
                    >Мои заказы</NuxtLink
                  >
                  <NuxtLink
                    v-if="authStore.user?.role === 'customer'"
                    to="/services/create"
                    class="dropdown-item"
                    >Создать заказ</NuxtLink
                  >
                  <NuxtLink
                    v-if="authStore.user?.role === 'admin'"
                    to="/admin/services"
                    class="dropdown-item"
                    >Управление услугами</NuxtLink
                  >
                  <button @click="handleLogout" class="dropdown-item">
                    Выйти
                  </button>
                </div>
              </div>
            </template>
          </ClientOnly>
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

const handleLogout = () => {
  authStore.logout();
  isMenuOpen.value = false;
};

// Close menu when clicking outside
if (process.client) {
  window.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".user-menu")) {
      isMenuOpen.value = false;
    }
  });
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background-color: white;
  border-bottom: 1px solid var(--color-border);
  z-index: 100;

  &__content {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__logo {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-primary);
    text-decoration: none;
  }

  &__nav {
    display: flex;
    gap: 1rem;
  }

  &__auth {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
}

.nav-link {
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    color: var(--color-primary);
  }
}

.user-menu {
  position: relative;

  &__trigger {
    background: none;
    border: none;
    padding: 0.5rem;
    font-weight: 500;
    color: var(--color-text);
    cursor: pointer;

    &:hover {
      color: var(--color-primary);
    }
  }

  &__dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 0.5rem;
    background-color: white;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    min-width: 200px;
    z-index: 100;
  }
}

.dropdown-item {
  display: block;
  padding: 0.75rem 1rem;
  color: var(--color-text);
  text-decoration: none;
  font-size: 0.875rem;
  width: 100%;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;

  &:hover {
    background-color: var(--color-background-alt);
    color: var(--color-primary);
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-border);
  }
}
</style>
