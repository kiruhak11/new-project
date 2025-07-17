<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled }">
    <div class="container">
      <div class="header__content">
        <!-- Logo -->
        <NuxtLink to="/" class="header__logo">
          <div class="header__logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <span class="header__logo-text">ServiFlex</span>
        </NuxtLink>

        <!-- Mobile Menu Button -->
        <button
          class="header__mobile-toggle"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          :class="{ 'header__mobile-toggle--active': isMobileMenuOpen }"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <!-- Navigation -->
        <nav
          class="header__nav"
          :class="{ 'header__nav--open': isMobileMenuOpen }"
        >
          <div class="header__nav-links">
            <NuxtLink to="/services" class="nav-link" @click="closeMobileMenu">
              <svg
                class="nav-link__icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Услуги
            </NuxtLink>
            <NuxtLink to="/about" class="nav-link" @click="closeMobileMenu">
              <svg
                class="nav-link__icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              О нас
            </NuxtLink>
          </div>

          <!-- Auth Section -->
          <div class="header__auth">
            <ClientOnly>
              <template v-if="!authStore.isAuthenticated">
                <NuxtLink
                  to="/auth/login"
                  class="btn btn-ghost"
                  @click="closeMobileMenu"
                >
                  Войти
                </NuxtLink>
                <NuxtLink
                  to="/auth/register"
                  class="btn btn-primary"
                  @click="closeMobileMenu"
                >
                  Регистрация
                </NuxtLink>
              </template>
              <template v-else>
                <div class="user-menu">
                  <button class="user-menu__trigger" @click="toggleUserMenu">
                    <div class="user-menu__avatar">
                      {{ getInitials(authStore.user?.name) }}
                    </div>
                    <span class="user-menu__name">
                      {{ authStore.user?.name || "Профиль" }}
                    </span>
                    <svg
                      class="user-menu__chevron"
                      :class="{ 'user-menu__chevron--open': isUserMenuOpen }"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  <Transition name="dropdown">
                    <div v-if="isUserMenuOpen" class="user-menu__dropdown">
                      <div class="user-menu__header">
                        <div class="user-menu__avatar user-menu__avatar--large">
                          {{ getInitials(authStore.user?.name) }}
                        </div>
                        <div class="user-menu__info">
                          <div class="user-menu__name">
                            {{ authStore.user?.name }}
                          </div>
                          <div class="user-menu__email">
                            {{ authStore.user?.email }}
                          </div>
                        </div>
                      </div>

                      <div class="user-menu__divider"></div>

                      <NuxtLink
                        to="/profile"
                        class="dropdown-item"
                        @click="closeUserMenu"
                      >
                        <svg
                          class="dropdown-item__icon"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        Мой профиль
                      </NuxtLink>

                      <NuxtLink
                        v-if="authStore.user?.role === 'customer'"
                        to="/services/my"
                        class="dropdown-item"
                        @click="closeUserMenu"
                      >
                        <svg
                          class="dropdown-item__icon"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                          />
                        </svg>
                        Мои заказы
                      </NuxtLink>

                      <NuxtLink
                        v-if="authStore.user?.role === 'customer'"
                        to="/services/create"
                        class="dropdown-item"
                        @click="closeUserMenu"
                      >
                        <svg
                          class="dropdown-item__icon"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        Создать заказ
                      </NuxtLink>

                      <NuxtLink
                        v-if="authStore.user?.role === 'admin'"
                        to="/admin/services"
                        class="dropdown-item"
                        @click="closeUserMenu"
                      >
                        <svg
                          class="dropdown-item__icon"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        Управление услугами
                      </NuxtLink>

                      <div class="user-menu__divider"></div>

                      <button
                        @click="handleLogout"
                        class="dropdown-item dropdown-item--danger"
                      >
                        <svg
                          class="dropdown-item__icon"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Выйти
                      </button>
                    </div>
                  </Transition>
                </div>
              </template>
            </ClientOnly>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const isUserMenuOpen = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value;
};

const closeUserMenu = () => {
  isUserMenuOpen.value = false;
};

const handleLogout = () => {
  authStore.logout();
  closeUserMenu();
  closeMobileMenu();
};

const getInitials = (name?: string) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// Close menus when clicking outside
const handleClickOutside = (e: Event) => {
  const target = e.target as HTMLElement;
  if (!target.closest(".user-menu")) {
    isUserMenuOpen.value = false;
  }
  if (
    !target.closest(".header__nav") &&
    !target.closest(".header__mobile-toggle")
  ) {
    isMobileMenuOpen.value = false;
  }
};

onMounted(() => {
  if (process.client) {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);
  }
});

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener("scroll", handleScroll);
    document.removeEventListener("click", handleClickOutside);
  }
});
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid transparent;
  z-index: var(--z-fixed);
  transition: all var(--transition-normal);

  &--scrolled {
    background: rgba(255, 255, 255, 0.98);
    border-bottom-color: var(--color-border-light);
    box-shadow: var(--shadow-sm);
  }

  &__content {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    gap: var(--spacing-md);
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    color: var(--color-primary);
    text-decoration: none;
    transition: all var(--transition-fast);

    &:hover {
      transform: scale(1.05);
    }

    &-icon {
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(
        135deg,
        var(--color-primary),
        var(--color-primary-dark)
      );
      border-radius: var(--radius-md);
      color: white;

      svg {
        width: 1.25rem;
        height: 1.25rem;
      }
    }

    &-text {
      background: linear-gradient(
        135deg,
        var(--color-primary),
        var(--color-primary-dark)
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  &__mobile-toggle {
    display: none;
    flex-direction: column;
    justify-content: space-around;
    width: 2rem;
    height: 2rem;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    z-index: 10;

    span {
      width: 2rem;
      height: 0.25rem;
      background: var(--color-text);
      border-radius: 10px;
      transition: all var(--transition-fast);
      transform-origin: 1px;

      &:first-child {
        transform: rotate(0);
      }

      &:nth-child(2) {
        opacity: 1;
        transform: translateX(0);
      }

      &:nth-child(3) {
        transform: rotate(0);
      }
    }

    &--active {
      span {
        &:first-child {
          transform: rotate(45deg);
        }

        &:nth-child(2) {
          opacity: 0;
          transform: translateX(20px);
        }

        &:nth-child(3) {
          transform: rotate(-45deg);
        }
      }
    }

    @media (max-width: 1023px) {
      display: flex;
    }
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: var(--spacing-xl);

    @media (max-width: 1023px) {
      position: fixed;
      top: 80px;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.98);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--color-border-light);
      flex-direction: column;
      padding: var(--spacing-xl);
      gap: var(--spacing-lg);
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: all var(--transition-normal);
      box-shadow: var(--shadow-lg);

      &--open {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }
    }

    &-links {
      display: flex;
      align-items: center;
      gap: var(--spacing-lg);

      @media (max-width: 1023px) {
        flex-direction: column;
        width: 100%;
        gap: var(--spacing-md);
        align-items: stretch;
      }
    }
  }

  &__auth {
    display: flex;
    gap: var(--spacing-md);
    align-items: center;

    @media (max-width: 1023px) {
      width: 100%;
      justify-content: center;
      flex-wrap: wrap;
      gap: var(--spacing-sm);
    }
  }
}

.nav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-text);
  text-decoration: none;
  font-weight: var(--font-medium);
  font-size: var(--text-base);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
  position: relative;

  &:hover {
    color: var(--color-primary);
    background-color: rgba(99, 102, 241, 0.1);
  }

  &__icon {
    width: 1.125rem;
    height: 1.125rem;

    @media (min-width: 1024px) {
      display: none;
    }
  }

  @media (max-width: 1023px) {
    width: 100%;
    justify-content: flex-start;
    padding: var(--spacing-md);
    border-radius: var(--radius-lg);
  }
}

.user-menu {
  position: relative;

  &__trigger {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    background: none;
    border: none;
    padding: var(--spacing-sm);
    font-weight: var(--font-medium);
    color: var(--color-text);
    cursor: pointer;
    border-radius: var(--radius-md);
    transition: all var(--transition-fast);

    &:hover {
      background-color: var(--color-background-alt);
    }
  }

  &__avatar {
    width: 2rem;
    height: 2rem;
    background: linear-gradient(
      135deg,
      var(--color-primary),
      var(--color-primary-dark)
    );
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--text-sm);
    font-weight: var(--font-semibold);

    &--large {
      width: 3rem;
      height: 3rem;
      font-size: var(--text-base);
    }
  }

  &__name {
    font-size: var(--text-sm);

    @media (max-width: 767px) {
      display: none;
    }
  }

  &__chevron {
    width: 1rem;
    height: 1rem;
    transition: transform var(--transition-fast);

    &--open {
      transform: rotate(180deg);
    }
  }

  &__dropdown {
    position: absolute;
    top: calc(100% + var(--spacing-sm));
    right: 0;
    background: white;
    border: 1px solid var(--color-border-light);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-xl);
    min-width: 280px;
    z-index: var(--z-dropdown);
    overflow: hidden;

    @media (max-width: 767px) {
      right: auto;
      left: 50%;
      transform: translateX(-50%);
      min-width: 260px;
    }
  }

  &__header {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    padding: var(--spacing-lg);
    background: var(--color-background-alt);
  }

  &__info {
    flex: 1;
  }

  &__email {
    font-size: var(--text-sm);
    color: var(--color-text-light);
  }

  &__divider {
    height: 1px;
    background: var(--color-border-light);
  }
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  color: var(--color-text);
  text-decoration: none;
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  width: 100%;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
  transition: all var(--transition-fast);

  &:hover {
    background-color: var(--color-background-alt);
    color: var(--color-primary);
  }

  &--danger {
    color: var(--color-error);

    &:hover {
      background-color: rgba(239, 68, 68, 0.1);
      color: var(--color-error);
    }
  }

  &__icon {
    width: 1.125rem;
    height: 1.125rem;
    flex-shrink: 0;
  }
}

/* Dropdown Animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all var(--transition-normal);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

.dropdown-enter-to,
.dropdown-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Mobile Responsive */
@media (max-width: 767px) {
  .header {
    height: 70px;

    &__nav {
      top: 70px;
    }
  }

  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
