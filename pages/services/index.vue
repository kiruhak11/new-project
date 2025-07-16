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
              
              <div class="service-card__content">
                <h3 class="service-card__title">{{ service.title }}</h3>
                <p class="service-card__description">{{ service.description }}</p>
                
                <div class="service-card__provider">
                  <div class="service-card__provider-avatar">
                    {{ getProviderInitials(service.userId) }}
                  </div>
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
                    class="btn btn-primary btn--sm"
                  >
                    Заказать
                  </button>
                </div>
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

const getProviderInitials = (userId: string) => {
  const user = users.value.find((u) => u.id === userId);
  if (!user || !user.name) return "?";
  return user.name
    .split(" ")
    .map(word => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
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
  padding: var(--spacing-3xl) 0;
  background: var(--color-background-alt);
  min-height: calc(100vh - 80px);

  &__header {
    margin-bottom: var(--spacing-3xl);
    text-align: center;

    @media (min-width: 768px) {
      text-align: left;
    }
  }

  &__title {
    font-size: clamp(var(--text-3xl), 5vw, var(--text-5xl));
    font-weight: var(--font-bold);
    margin-bottom: var(--spacing-lg);
    color: var(--color-text);
    background: linear-gradient(135deg, var(--color-text), var(--color-primary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &__filters {
    display: flex;
    gap: var(--spacing-md);
    flex-wrap: wrap;
    justify-content: center;

    @media (min-width: 768px) {
      justify-content: flex-start;
    }
  }
}

.input-field {
  background: white;
  padding: var(--spacing-md) var(--spacing-lg);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  min-width: 200px;
  font-size: var(--text-base);
  font-weight: var(--font-medium);
  transition: all var(--transition-fast);
  box-shadow: var(--shadow-sm);

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
    transform: translateY(-1px);
  }

  &::placeholder {
    color: var(--color-text-muted);
  }

  @media (max-width: 767px) {
    width: 100%;
    min-width: auto;
  }
}

.services-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-xl);
}

.service-card {
  background: white;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
  border: 1px solid var(--color-border-light);
  min-height: 400px;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-xl);
    border-color: var(--color-primary-light);
  }

  &__status {
    position: absolute;
    top: var(--spacing-md);
    right: var(--spacing-md);
    padding: var(--spacing-xs) var(--spacing-md);
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    color: white;
    border-radius: var(--radius-xl);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    z-index: 10;

    &--approved {
      background: linear-gradient(135deg, var(--color-success), #059669);
    }

    &--rejected {
      background: linear-gradient(135deg, var(--color-error), #dc2626);
    }

    &--pending {
      background: linear-gradient(135deg, var(--color-warning), #d97706);
    }
  }

  &__content {
    padding: var(--spacing-xl);
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-size: var(--text-xl);
    font-weight: var(--font-semibold);
    color: var(--color-text);
    margin-bottom: var(--spacing-md);
    margin-top: var(--spacing-lg);
    line-height: var(--leading-tight);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__description {
    color: var(--color-text-light);
    font-size: var(--text-sm);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--spacing-lg);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__provider {
    display: flex;
    align-items: center;
    margin-bottom: var(--spacing-lg);
    padding-bottom: var(--spacing-lg);
    border-bottom: 1px solid var(--color-border-light);
  }

  &__provider-avatar {
    width: 2.5rem;
    height: 2.5rem;
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: var(--font-semibold);
    font-size: var(--text-sm);
    margin-right: var(--spacing-md);
  }

  &__provider-info {
    flex: 1;
    min-width: 0;
  }

  &__provider-name {
    display: block;
    font-weight: var(--font-medium);
    color: var(--color-text);
    margin-bottom: var(--spacing-xs);
    font-size: var(--text-sm);
  }

  &__date {
    font-size: var(--text-xs);
    color: var(--color-text-muted);
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-md);
    margin-top: auto;
  }

  &__price {
    .amount {
      font-size: var(--text-2xl);
      font-weight: var(--font-bold);
      color: var(--color-primary);
      background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }
}

.empty-state {
  text-align: center;
  padding: var(--spacing-3xl) 0;
  background: white;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-md);

  &__icon {
    width: 4rem;
    height: 4rem;
    margin: 0 auto var(--spacing-lg);
    background: var(--color-background-alt);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-muted);

    svg {
      width: 2rem;
      height: 2rem;
    }
  }

  p {
    font-size: var(--text-lg);
    color: var(--color-text-light);
    margin-bottom: var(--spacing-lg);
    font-weight: var(--font-medium);
  }
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-lg);
  font-weight: var(--font-semibold);
  font-size: var(--text-sm);
  transition: all var(--transition-fast);
  cursor: pointer;
  border: none;
  text-decoration: none;
  white-space: nowrap;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  &-primary {
    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
    color: white;
    box-shadow: var(--shadow-sm);

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }

  &--sm {
    padding: var(--spacing-xs) var(--spacing-md);
    font-size: var(--text-xs);
  }
}

.skeleton {
  background: white;
  border-radius: var(--radius-2xl);
  padding: var(--spacing-xl);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.4),
      transparent
    );
    animation: shimmer 1.5s infinite;
  }

  &__header {
    height: 1.5rem;
    background: var(--color-border-light);
    border-radius: var(--radius-md);
    margin-bottom: var(--spacing-md);
  }

  &__content {
    height: 1rem;
    background: var(--color-border-light);
    border-radius: var(--radius-md);
    margin-bottom: var(--spacing-sm);

    &:last-child {
      width: 60%;
    }
  }
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

/* Mobile Responsive */
@media (max-width: 767px) {
  .services-page {
    padding: var(--spacing-2xl) 0;

    &__header {
      margin-bottom: var(--spacing-2xl);
    }

    &__filters {
      flex-direction: column;
      gap: var(--spacing-md);
    }
  }

  .service-card {
    &__content {
      padding: var(--spacing-lg);
    }

    &__title {
      font-size: var(--text-lg);
      margin-top: var(--spacing-md);
    }

    &__footer {
      flex-direction: column;
      align-items: stretch;
      gap: var(--spacing-md);

      .btn {
        width: 100%;
      }
    }
  }
}
</style>
