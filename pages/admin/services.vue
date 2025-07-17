<template>
  <div class="admin-services">
    <div class="container">
      <div class="admin-services__header">
        <h1 class="admin-services__title">Управление услугами</h1>
        <div class="admin-services__stats">
          <div class="stat-card">
            <div class="stat-card__number">{{ pendingServices.length }}</div>
            <div class="stat-card__label">На рассмотрении</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__number">{{ approvedServices.length }}</div>
            <div class="stat-card__label">Одобрено</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__number">{{ rejectedServices.length }}</div>
            <div class="stat-card__label">Отклонено</div>
          </div>
        </div>
      </div>

      <div class="admin-services__tabs">
        <button
          class="tab-button"
          :class="{ 'tab-button--active': activeTab === 'pending' }"
          @click="activeTab = 'pending'"
        >
          На рассмотрении ({{ pendingServices.length }})
        </button>
        <button
          class="tab-button"
          :class="{ 'tab-button--active': activeTab === 'approved' }"
          @click="activeTab = 'approved'"
        >
          Одобренные ({{ approvedServices.length }})
        </button>
        <button
          class="tab-button"
          :class="{ 'tab-button--active': activeTab === 'rejected' }"
          @click="activeTab = 'rejected'"
        >
          Отклоненные ({{ rejectedServices.length }})
        </button>
      </div>

      <div class="services-list">
        <div
          v-for="service in currentServices"
          :key="service.id"
          class="service-card"
        >
          <div
            class="service-card__status"
            :class="`service-card__status--${service.status}`"
          >
            {{ getStatusText(service.status) }}
          </div>

          <div class="service-card__content">
            <h3 class="service-card__title">{{ service.title }}</h3>
            <p class="service-card__description">{{ service.description }}</p>

            <div class="service-card__details">
              <div class="detail-item">
                <div class="detail-item__icon">💰</div>
                <div class="detail-item__content">
                  <span class="detail-item__label">Цена</span>
                  <span class="detail-item__value">{{
                    formatPrice(service.price)
                  }}</span>
                </div>
              </div>
              <div class="detail-item">
                <div class="detail-item__icon">👤</div>
                <div class="detail-item__content">
                  <span class="detail-item__label">Заказчик</span>
                  <span class="detail-item__value">{{
                    getCustomerName(service.userId)
                  }}</span>
                </div>
              </div>
              <div class="detail-item">
                <div class="detail-item__icon">📅</div>
                <div class="detail-item__content">
                  <span class="detail-item__label">Дата создания</span>
                  <span class="detail-item__value">{{
                    formatDate(service.createdAt)
                  }}</span>
                </div>
              </div>
            </div>

            <div
              v-if="service.status === 'pending'"
              class="service-card__actions"
            >
              <button
                class="btn btn-success"
                @click="handleApprove(service.id)"
                :disabled="loading"
              >
                <svg
                  class="btn__icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Одобрить
              </button>
              <button
                class="btn btn-danger"
                @click="handleReject(service.id)"
                :disabled="loading"
              >
                <svg
                  class="btn__icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Отклонить
              </button>
            </div>
          </div>
        </div>

        <div v-if="currentServices.length === 0" class="empty-state">
          <div class="empty-state__icon">📋</div>
          <h3 class="empty-state__title">Нет услуг</h3>
          <p class="empty-state__description">
            {{ getEmptyStateText() }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useLocalData } from "~/composables/useLocalData";

const authStore = useAuthStore();
const localData = useLocalData();
const loading = ref(false);
const activeTab = ref("pending");

// Computed properties for different service statuses
const pendingServices = computed(() => {
  return localData.getAllServices().filter((s) => s.status === "pending");
});

const approvedServices = computed(() => {
  return localData.getAllServices().filter((s) => s.status === "approved");
});

const rejectedServices = computed(() => {
  return localData.getAllServices().filter((s) => s.status === "rejected");
});

const currentServices = computed(() => {
  switch (activeTab.value) {
    case "pending":
      return pendingServices.value;
    case "approved":
      return approvedServices.value;
    case "rejected":
      return rejectedServices.value;
    default:
      return pendingServices.value;
  }
});

// Helper functions
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

const getStatusText = (status: string) => {
  switch (status) {
    case "approved":
      return "Одобрено";
    case "rejected":
      return "Отклонено";
    case "pending":
      return "На рассмотрении";
    default:
      return "Неизвестный статус";
  }
};

const getEmptyStateText = () => {
  switch (activeTab.value) {
    case "pending":
      return "В данный момент нет услуг, ожидающих рассмотрения";
    case "approved":
      return "Нет одобренных услуг";
    case "rejected":
      return "Нет отклоненных услуг";
    default:
      return "Нет услуг";
  }
};

// Actions
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

// Initialize
onMounted(async () => {
  // Инициализируем авторизацию если нужно
  if (!authStore.isInitialized) {
    await authStore.initAuth();
  }

  // Ждем полной инициализации
  let attempts = 0;
  while (!authStore.isAuthenticated && attempts < 10) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    attempts++;
  }

  // Проверяем авторизацию
  if (!authStore.isAuthenticated) {
    return navigateTo("/auth/login");
  }

  // Проверяем роль админа
  if (!authStore.user || authStore.user.role !== "admin") {
    return navigateTo("/");
  }

  // Загружаем данные
  await localData.fetchData();
});

definePageMeta({
  // Убираем middleware
});
</script>

<style lang="scss" scoped>
.admin-services {
  padding: var(--spacing-3xl) 0;
  background: var(--color-background-alt);
  min-height: calc(100vh - 80px);

  &__header {
    margin-bottom: var(--spacing-3xl);
  }

  &__title {
    font-size: clamp(var(--text-3xl), 5vw, var(--text-4xl));
    font-weight: var(--font-bold);
    margin-bottom: var(--spacing-xl);
    color: var(--color-text);
    background: linear-gradient(
      135deg,
      var(--color-text),
      var(--color-primary)
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &__stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-2xl);
  }

  &__tabs {
    display: flex;
    gap: var(--spacing-xs);
    margin-bottom: var(--spacing-2xl);
    background: white;
    padding: var(--spacing-xs);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-sm);
    overflow-x: auto;

    @media (max-width: 767px) {
      flex-direction: column;
      gap: var(--spacing-sm);
    }
  }
}

.stat-card {
  background: white;
  padding: var(--spacing-xl);
  border-radius: var(--radius-xl);
  text-align: center;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border-light);
  transition: all var(--transition-normal);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }

  &__number {
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    color: var(--color-primary);
    margin-bottom: var(--spacing-sm);
  }

  &__label {
    font-size: var(--text-sm);
    color: var(--color-text-light);
    font-weight: var(--font-medium);
  }
}

.tab-button {
  flex: 1;
  padding: var(--spacing-md) var(--spacing-lg);
  border: none;
  background: transparent;
  color: var(--color-text-light);
  font-weight: var(--font-medium);
  font-size: var(--text-sm);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;

  &:hover {
    color: var(--color-primary);
    background: rgba(99, 102, 241, 0.1);
  }

  &--active {
    background: var(--color-primary);
    color: white;
    box-shadow: var(--shadow-sm);

    &:hover {
      background: var(--color-primary-dark);
      color: white;
    }
  }

  @media (max-width: 767px) {
    flex: none;
    width: 100%;
  }
}

.services-list {
  display: grid;
  gap: var(--spacing-xl);
}

.service-card {
  background: white;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border-light);
  position: relative;
  overflow: hidden;
  transition: all var(--transition-normal);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
  }

  &__status {
    position: absolute;
    top: var(--spacing-lg);
    right: var(--spacing-lg);
    padding: var(--spacing-xs) var(--spacing-md);
    border-radius: var(--radius-xl);
    font-size: var(--text-xs);
    font-weight: var(--font-semibold);
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.05em;

    &--pending {
      background: linear-gradient(135deg, var(--color-warning), #d97706);
    }

    &--approved {
      background: linear-gradient(135deg, var(--color-success), #059669);
    }

    &--rejected {
      background: linear-gradient(135deg, var(--color-error), #dc2626);
    }
  }

  &__content {
    padding: var(--spacing-2xl);
    padding-top: var(--spacing-3xl);
  }

  &__title {
    font-size: var(--text-xl);
    font-weight: var(--font-semibold);
    color: var(--color-text);
    margin-bottom: var(--spacing-md);
    line-height: var(--leading-tight);
  }

  &__description {
    color: var(--color-text-light);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--spacing-xl);
  }

  &__details {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-xl);
  }

  &__actions {
    display: flex;
    gap: var(--spacing-md);
    flex-wrap: wrap;

    @media (max-width: 767px) {
      flex-direction: column;
    }
  }
}

.detail-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--color-background-alt);
  border-radius: var(--radius-lg);

  &__icon {
    font-size: var(--text-lg);
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
  }

  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  &__label {
    font-size: var(--text-xs);
    color: var(--color-text-muted);
    font-weight: var(--font-medium);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &__value {
    font-size: var(--text-sm);
    color: var(--color-text);
    font-weight: var(--font-medium);
  }
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
  border: none;
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
  white-space: nowrap;
  flex: 1;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  &__icon {
    width: 1rem;
    height: 1rem;
  }

  &-success {
    background: linear-gradient(135deg, var(--color-success), #059669);
    color: white;
    box-shadow: var(--shadow-sm);

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
  }

  &-danger {
    background: linear-gradient(135deg, var(--color-error), #dc2626);
    color: white;
    box-shadow: var(--shadow-sm);

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
  }

  @media (max-width: 767px) {
    flex: none;
    width: 100%;
  }
}

.empty-state {
  text-align: center;
  padding: var(--spacing-3xl);
  background: white;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--color-border-light);

  &__icon {
    font-size: 4rem;
    margin-bottom: var(--spacing-lg);
    opacity: 0.5;
  }

  &__title {
    font-size: var(--text-xl);
    font-weight: var(--font-semibold);
    color: var(--color-text);
    margin-bottom: var(--spacing-md);
  }

  &__description {
    color: var(--color-text-light);
    line-height: var(--leading-relaxed);
  }
}

/* Mobile Responsive */
@media (max-width: 767px) {
  .admin-services {
    padding: var(--spacing-2xl) 0;

    &__stats {
      grid-template-columns: 1fr;
      gap: var(--spacing-md);
    }
  }

  .service-card {
    &__content {
      padding: var(--spacing-lg);
      padding-top: var(--spacing-2xl);
    }

    &__status {
      top: var(--spacing-md);
      right: var(--spacing-md);
    }
  }
}
</style>
