<template>
  <div class="profile">
    <div class="profile__header">
      <div class="profile__avatar">
        {{ user?.name?.[0]?.toUpperCase() }}
      </div>
      <div class="profile__info">
        <h1 class="profile__name">{{ user?.name }}</h1>
        <p class="profile__role">
          {{ roleText }}
        </p>
        <p v-if="user?.email" class="profile__email">
          {{ user.email }}
        </p>
        <p v-if="user?.phone" class="profile__phone">
          {{ user.phone }}
        </p>
      </div>
    </div>

    <div class="profile__actions">
      <template v-if="isProvider">
        <NuxtLink to="/profile/services/new" class="btn btn-primary">
          Создать услугу
        </NuxtLink>
        <NuxtLink to="/profile/services" class="btn btn-secondary">
          Мои услуги
        </NuxtLink>
      </template>
      <template v-if="isAdmin">
        <NuxtLink to="/admin/services" class="btn btn-primary">
          Управление услугами
        </NuxtLink>
      </template>
      <button @click="handleLogout" class="btn btn-secondary">Выйти</button>
    </div>

    <div v-if="user?.description" class="profile__description">
      <h2>О себе</h2>
      <p>{{ user.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const router = useRouter();

const user = computed(() => authStore.user);
const isProvider = computed(() => authStore.isProvider);
const isAdmin = computed(() => authStore.isAdmin);

const roleText = computed(() => {
  switch (user.value?.role) {
    case "provider":
      return "Исполнитель";
    case "customer":
      return "Заказчик";
    case "admin":
      return "Администратор";
    default:
      return "";
  }
});

function handleLogout() {
  authStore.logout();
  router.push("/");
}

definePageMeta({
  middleware: ["auth"],
});
</script>

<style lang="scss">
.profile {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;

  &__header {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  &__avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: var(--primary-color);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    font-weight: 600;
  }

  &__info {
    flex: 1;
  }

  &__name {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  &__role {
    color: var(--primary-color);
    font-weight: 500;
    margin-bottom: 0.5rem;
  }

  &__email,
  &__phone {
    color: var(--gray-300);
    margin-bottom: 0.25rem;
  }

  &__actions {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  &__description {
    background-color: var(--gray-100);
    padding: 1.5rem;
    border-radius: 0.5rem;

    h2 {
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    p {
      color: var(--text-color);
      line-height: 1.6;
    }
  }
}
</style>
