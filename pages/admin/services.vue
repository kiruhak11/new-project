<template>
  <div class="admin-services">
    <div class="container">
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
              {{ formatPrice(service.price) }}
            </p>
            <p>
              <strong>Заказчик:</strong>
              {{ getCustomerName(service.userId) }}
            </p>
            <p>
              <strong>Дата создания:</strong>
              {{ formatDate(service.createdAt) }}
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useServicesStore } from "~/stores/services";
import { useAuthStore } from "~/stores/auth";
import { useLocalData } from "~/composables/useLocalData";

const servicesStore = useServicesStore();
const authStore = useAuthStore();
const localData = useLocalData();
const loading = ref(false);

const pendingServices = computed(() => {
  return localData.getAllServices().filter((s) => s.status === "pending");
});

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(price);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const getCustomerName = (userId: string) => {
  const user = localData.findUserById(userId);
  return user?.name || "Неизвестный пользователь";
};

async function handleApprove(id: string) {
  try {
    loading.value = true;
    await localData.updateService(id, { status: "approved" });
  } catch (error) {
    console.error("Error approving service:", error);
  } finally {
    loading.value = false;
  }
}

async function handleReject(id: string) {
  try {
    loading.value = true;
    await localData.updateService(id, { status: "rejected" });
  } catch (error) {
    console.error("Error rejecting service:", error);
  } finally {
    loading.value = false;
  }
}

// Check auth state and fetch data
onMounted(async () => {
  if (!authStore.isAuthenticated) {
    authStore.initAuth();
  }

  if (!authStore.isAdmin) {
    return navigateTo("/");
  }

  await localData.fetchData();
});

definePageMeta({
  middleware: ["admin"],
});
</script>

<style lang="scss" scoped>
.admin-services {
  padding: 2rem 0;

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
  background-color: var(--color-background-alt);
  padding: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);

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
    background-color: var(--color-accent);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.875rem;
  }

  &__description {
    color: var(--color-text);
    margin-bottom: 1rem;
    line-height: 1.5;
  }

  &__details {
    margin-bottom: 1.5rem;

    p {
      margin-bottom: 0.5rem;
      color: var(--color-text-light);

      strong {
        color: var(--color-text);
        margin-right: 0.5rem;
      }
    }
  }

  &__actions {
    display: flex;
    gap: 1rem;
  }
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--color-text-light);
  font-size: 1.125rem;
  background-color: var(--color-background-alt);
  border-radius: 0.5rem;
  border: 1px solid var(--color-border);
}
</style>
