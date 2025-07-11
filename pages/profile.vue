<template>
  <div class="profile">
    <div class="profile-card">
      <h1 class="profile-card__title">Профиль</h1>
      <div class="profile-card__content">
        <div class="profile-info">
          <h2>{{ authStore.user?.name }}</h2>
          <p>{{ authStore.user?.email }}</p>
          <p>{{ authStore.user?.phone }}</p>
        </div>
      </div>
    </div>

    <div v-if="isProvider" class="profile-card">
      <div class="profile-card__content">
        <h2 class="profile-card__title">Мои услуги</h2>

        <div v-if="loading" class="services-grid">
          <div v-for="i in 3" :key="i" class="service-item skeleton"></div>
        </div>

        <div v-else-if="userServices.length === 0" class="empty-state">
          <p>У вас пока нет услуг</p>
          <NuxtLink to="/services/new" class="btn btn-primary">
            Создать услугу
          </NuxtLink>
        </div>

        <div v-else class="services-grid">
          <div
            v-for="service in userServices"
            :key="service.id"
            class="service-item"
          >
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>
            <p>{{ service.price }} ₽</p>
            <div class="service-actions">
              <NuxtLink
                :to="`/services/${service.id}/edit`"
                class="btn btn-secondary"
              >
                Редактировать
              </NuxtLink>
              <button class="btn btn-danger" @click="handleDelete(service.id)">
                Удалить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useServicesStore } from "~/stores/services";
import type { Service } from "~/types/services";

definePageMeta({
  middleware: ["auth"],
});

const authStore = useAuthStore();
const servicesStore = useServicesStore();

const loading = ref(true);
const userServices = computed(() => servicesStore.userServices);

const isProvider = computed(() => authStore.isProvider);

onMounted(async () => {
  try {
    loading.value = true;
    if (isProvider.value && authStore.user?.id) {
      await servicesStore.fetchServices();
    }
  } catch (err) {
    console.error("Error fetching services:", err);
  } finally {
    loading.value = false;
  }
});

// Получаем услуги на модерации
const pendingServices = computed(() => servicesStore.pendingServices);

// Форматирование данных
const formatRole = (role?: string) => {
  const roles = {
    admin: "Администратор",
    client: "Заказчик",
    executor: "Исполнитель",
  };
  return role ? roles[role as keyof typeof roles] : "";
};

const formatStatus = (status: Service["status"]) => {
  if (status === "active") return "Активно";
  if (status === "inactive") return "На модерации";
  return status;
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
  }).format(price);
};

// Обработчики действий администратора
const handleApprove = async (serviceId: string) => {
  await servicesStore.updateServiceStatus(serviceId, "active");
  // Обновляем список услуг
  await servicesStore.fetchServices();
};

const handleReject = async (serviceId: string) => {
  await servicesStore.updateServiceStatus(serviceId, "inactive");
  // Обновляем список услуг
  await servicesStore.fetchServices();
};

const handleDelete = async (serviceId: string) => {
  try {
    await servicesStore.deleteService(serviceId);
    await servicesStore.fetchServices();
  } catch (err) {
    console.error("Error deleting service:", err);
  }
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.profile-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #1f2937;
}

.profile-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;

  &__title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #1f2937;
  }
}

.profile-info {
  display: grid;
  gap: 1rem;

  &__label {
    font-weight: 500;
    color: #4b5563;
    margin-right: 1rem;
  }
}

.services-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.service-item {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &__content {
    padding: 1.5rem;
  }

  &__title {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #1f2937;
  }

  &__description {
    color: #4b5563;
    margin-bottom: 1rem;
    line-height: 1.5;
  }

  &__price {
    font-size: 1.25rem;
    font-weight: 700;
    color: #3b82f6;
    margin-bottom: 1rem;
  }

  &__status {
    margin-top: 1rem;
  }

  &__actions {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
  }
}

.status-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;

  &--pending {
    background-color: rgba(245, 158, 11, 0.1);
    color: #f59e0b;
  }

  &--approved {
    background-color: rgba(34, 197, 94, 0.1);
    color: #22c55e;
  }

  &--rejected {
    background-color: rgba(239, 68, 68, 0.1);
    color: #ef4444;
  }
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: #4b5563;
}

.skeleton {
  height: 200px;
  background: linear-gradient(
    90deg,
    rgba(243, 244, 246, 0.6) 25%,
    rgba(243, 244, 246, 0.8) 37%,
    rgba(243, 244, 246, 0.6) 63%
  );
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s ease infinite;
}

@keyframes skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  text-decoration: none;
  border: none;

  &-primary {
    background: #3b82f6;
    color: white;

    &:hover {
      background: #2563eb;
    }
  }

  &-secondary {
    background: #6b7280;
    color: white;

    &:hover {
      background: #4b5563;
    }
  }

  &-danger {
    background: #ef4444;
    color: white;

    &:hover {
      background: #dc2626;
    }
  }
}
</style>
