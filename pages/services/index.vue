<template>
  <div class="services-page">
    <div class="container">
      <div class="services-page__header">
        <h1 class="services-page__title">Все услуги</h1>
        <div class="services-page__filters">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Поиск услуг..."
            class="input-field"
          />
          <select v-model="sortBy" class="input-field">
            <option value="price_low">Сначала дешевле</option>
            <option value="price_high">Сначала дороже</option>
            <option value="newest">Сначала новые</option>
          </select>
        </div>
      </div>

      <div class="services-grid">
        <div v-if="loading" class="services-grid">
          <div v-for="i in 6" :key="i" class="service-card skeleton"></div>
        </div>

        <template v-else>
          <div v-if="filteredServices.length === 0" class="empty-state">
            <p>Не найдено услуг по вашему запросу</p>
            <button @click="resetFilters" class="btn btn-primary">
              Сбросить фильтры
            </button>
          </div>

          <div v-else class="services-grid">
            <div
              v-for="service in filteredServices"
              :key="service.id"
              class="service-card"
            >
              <div
                class="service-card__status"
                :class="'service-card__status--' + service.status"
              >
                {{ getStatusText(service.status) }}
              </div>
              <h3 class="service-card__title">{{ service.title }}</h3>
              <p class="service-card__description">{{ service.description }}</p>
              <div class="service-card__provider">
                <div class="service-card__provider-info">
                  <span class="service-card__provider-name">
                    {{ getProviderName(service.userId) }}
                  </span>
                  <span class="service-card__date">
                    {{ formatDate(service.createdAt) }}
                  </span>
                </div>
              </div>
              <div class="service-card__footer">
                <div class="service-card__price">
                  <span class="amount">{{ formatPrice(service.price) }}</span>
                </div>
                <button
                  v-if="isCustomer && service.status === 'approved'"
                  class="btn btn-primary"
                >
                  Заказать
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useLocalData } from "~/composables/useLocalData";

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  userId: string;
  status: string;
  createdAt: string;
}

interface User {
  id: string;
  email: string;
  password: string;
  role: string;
  name: string;
  createdAt: string;
}

const localData = useLocalData();
const authStore = useAuthStore();
const loading = ref(true);

const searchQuery = ref("");
const sortBy = ref("newest");

const services = computed(() => localData.getAllServices());
const users = computed(() => localData.getAllUsers());

const getProviderName = (userId: string) => {
  const user = users.value.find((u) => u.id === userId);
  return user ? user.name : "Неизвестный пользователь";
};

const getStatusText = (status: string) => {
  switch (status) {
    case "approved":
      return "Одобрено";
    case "rejected":
      return "Отклонено";
    case "pending":
      return "На модерации";
    default:
      return "Неизвестный статус";
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const filteredServices = computed(() => {
  // Start with services that are not rejected
  let result = services.value.filter((s) => s.status !== "rejected");

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query)
    );
  }

  switch (sortBy.value) {
    case "price_low":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price_high":
      result.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
  }

  return result;
});

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(price);
};

const resetFilters = () => {
  searchQuery.value = "";
  sortBy.value = "newest";
};

const isCustomer = computed(() => !authStore.isProvider);

onMounted(() => {
  loading.value = false;
});
</script>

<style lang="scss" scoped>
.services-page {
  padding: 2rem 0;

  &__header {
    margin-bottom: 2rem;
  }

  &__title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #1f2937;
  }

  &__filters {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
}

.input-field {
  background: white;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  min-width: 200px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.service-card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &__status {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.25rem 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: white;

    &--approved {
      background-color: #22c55e;
    }

    &--rejected {
      background-color: #ef4444;
    }

    &--pending {
      background-color: #f59e0b;
    }
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 0.5rem;
    margin-top: 1.5rem;
  }

  &__description {
    color: #4b5563;
    font-size: 0.875rem;
    line-height: 1.5;
    margin-bottom: 1rem;
  }

  &__provider {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e5e7eb;
  }

  &__provider-info {
    flex: 1;
  }

  &__provider-name {
    display: block;
    font-weight: 500;
    color: #1f2937;
    margin-bottom: 0.25rem;
  }

  &__date {
    font-size: 0.875rem;
    color: #6b7280;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__price {
    .amount {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
    }
  }
}

.empty-state {
  text-align: center;
  padding: 4rem 0;

  p {
    font-size: 1.25rem;
    color: #6b7280;
    margin-bottom: 1rem;
  }
}

.btn {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  border: none;

  &-primary {
    background: #3b82f6;
    color: white;

    &:hover {
      background: #2563eb;
    }
  }
}

.skeleton {
  height: 300px;
}
</style>
