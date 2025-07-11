<template>
  <div class="admin-services">
    <h1>Управление услугами</h1>

    <div class="services-list">
      <div
        v-for="service in pendingServices"
        :key="service.id"
        class="service-card"
      >
        <div class="service-card__header">
          <h3>{{ service.title }}</h3>
          <span class="service-card__status">На рассмотрении</span>
        </div>

        <p class="service-card__description">{{ service.description }}</p>

        <div class="service-card__details">
          <p>
            <strong>Цена:</strong>
            {{ service.price }} ₽
          </p>
        </div>

        <div class="service-card__actions">
          <button
            class="btn btn-primary"
            @click="handleApprove(service.id)"
            :disabled="loading"
          >
            Одобрить
          </button>
          <button
            class="btn btn-secondary"
            @click="handleReject(service.id)"
            :disabled="loading"
          >
            Отклонить
          </button>
        </div>
      </div>

      <div v-if="pendingServices.length === 0" class="empty-state">
        Нет услуг на рассмотрении
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useServicesStore } from "~/stores/services";
const servicesStore = useServicesStore();
const authStore = useAuthStore();

// В реальном приложении категории будут загружаться с сервера
const categories = [
  { id: 1, name: "Ремонт и строительство" },
  { id: 2, name: "Красота и здоровье" },
  { id: 3, name: "IT и программирование" },
  { id: 4, name: "Обучение и репетиторство" },
  { id: 5, name: "Уборка и помощь по дому" },
  { id: 6, name: "Ремонт техники" },
];

const loading = ref(false);
const pendingServices = computed(() => servicesStore.pendingServices);

onMounted(async () => {
  await servicesStore.fetchServices();
});

async function handleApprove(id: string) {
  try {
    await servicesStore.updateServiceStatus(id, "active");
  } catch (error) {
    console.error("Error approving service:", error);
  }
}

async function handleReject(id: string) {
  try {
    await servicesStore.deleteService(id);
  } catch (error) {
    console.error("Error rejecting service:", error);
  }
}

definePageMeta({
  middleware: ["auth"],
  validate: async () => {
    const authStore = useAuthStore();
    return authStore.isAdmin;
  },
});
</script>

<style lang="scss">
.admin-services {
  padding: 2rem;

  h1 {
    margin-bottom: 2rem;
    font-size: 2rem;
    font-weight: 600;
  }
}

.services-list {
  display: grid;
  gap: 1.5rem;
}

.service-card {
  background-color: var(--gray-100);
  padding: 1.5rem;
  border-radius: 0.5rem;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    h3 {
      font-size: 1.25rem;
      font-weight: 600;
    }
  }

  &__status {
    background-color: var(--accent-color);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.875rem;
  }

  &__description {
    color: var(--text-color);
    margin-bottom: 1rem;
    line-height: 1.5;
  }

  &__details {
    margin-bottom: 1.5rem;

    p {
      margin-bottom: 0.5rem;
    }
  }

  &__price-type {
    color: var(--gray-300);
    font-size: 0.875rem;
  }

  &__actions {
    display: flex;
    gap: 1rem;
  }
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--gray-300);
  font-size: 1.125rem;
}
</style>
