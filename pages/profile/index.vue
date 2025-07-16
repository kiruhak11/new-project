<template>
  <div class="profile-page">
    <div class="container">
      <div class="profile-header">
        <h1 class="profile-title">Мой профиль</h1>
      </div>

      <div class="profile-content">
        <div class="profile-info">
          <h2>Личная информация</h2>
          <div class="info-group">
            <label>Имя</label>
            <div class="info-value">{{ user?.name }}</div>
          </div>
          <div class="info-group">
            <label>Email</label>
            <div class="info-value">{{ user?.email }}</div>
          </div>
          <div class="info-group">
            <label>Роль</label>
            <div class="info-value">{{ getRoleText(user?.role) }}</div>
          </div>
          <div class="info-group">
            <label>Дата регистрации</label>
            <div class="info-value">{{ formatDate(user?.createdAt) }}</div>
          </div>
        </div>

        <!-- Services section for providers -->
        <div v-if="isProvider" class="profile-services">
          <div class="section-header">
            <h2>Мои услуги</h2>
            <button class="btn btn-primary" @click="showAddServiceForm = true">
              Добавить услугу
            </button>
          </div>

          <div v-if="userServices.length === 0" class="empty-state">
            <p>У вас пока нет созданных услуг</p>
          </div>

          <div v-else class="services-grid">
            <div
              v-for="service in userServices"
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
                
                <div class="service-card__footer">
                  <div class="service-card__price">
                    <span class="amount">{{ formatPrice(service.price) }}</span>
                  </div>
                  <button
                    class="btn btn-danger"
                    @click="deleteService(service.id)"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Add Service Modal -->
        <div v-if="showAddServiceForm" class="modal">
          <div class="modal-content">
            <h3>Добавить услугу</h3>
            <form @submit.prevent="handleAddService" class="add-service-form">
              <div class="form-group">
                <label for="service-title">Название</label>
                <input
                  id="service-title"
                  v-model="newService.title"
                  type="text"
                  class="input-field"
                  required
                />
              </div>
              <div class="form-group">
                <label for="service-description">Описание</label>
                <textarea
                  id="service-description"
                  v-model="newService.description"
                  class="input-field"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div class="form-group">
                <label for="service-price">Цена (₽)</label>
                <input
                  id="service-price"
                  v-model.number="newService.price"
                  type="number"
                  class="input-field"
                  min="0"
                  required
                />
              </div>
              <div class="modal-actions">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="showAddServiceForm = false"
                >
                  Отмена
                </button>
                <button type="submit" class="btn btn-primary">Добавить</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useLocalData } from "~/composables/useLocalData";

const localData = useLocalData();
const authStore = useAuthStore();
const showAddServiceForm = ref(false);

const user = computed(() => {
  return localData.findUserById(authStore.user?.id || "");
});

const isProvider = computed(() => authStore.isProvider);

const userServices = computed(() => {
  if (!user.value) return [];
  return localData
    .getUserServices(user.value.id)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
});

const newService = ref({
  title: "",
  description: "",
  price: 0,
});

const getRoleText = (role?: string) => {
  switch (role) {
    case "provider":
      return "Исполнитель";
    case "customer":
      return "Заказчик";
    case "admin":
      return "Администратор";
    default:
      return "Неизвестная роль";
  }
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

const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(price);
};

const handleAddService = async () => {
  if (!user.value) return;

  const newServiceData = {
    id: (localData.getAllServices().length + 1).toString(),
    title: newService.value.title,
    description: newService.value.description,
    price: newService.value.price,
    userId: user.value.id,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  await localData.addService(newServiceData);
  showAddServiceForm.value = false;
  newService.value = {
    title: "",
    description: "",
    price: 0,
  };
};

const deleteService = async (serviceId: string) => {
  await localData.deleteService(serviceId);
};

// Add page meta for auth middleware
definePageMeta({
  middleware: ["auth"],
});
</script>

<style lang="scss" scoped>
.profile-page {
  padding: var(--spacing-3xl) 0;
  background: var(--color-background-alt);
  min-height: calc(100vh - 80px);
}

.profile-header {
  margin-bottom: var(--spacing-3xl);
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
}

.profile-title {
  font-size: clamp(var(--text-3xl), 5vw, var(--text-4xl));
  font-weight: var(--font-bold);
  color: var(--color-text);
  background: linear-gradient(135deg, var(--color-text), var(--color-primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.profile-content {
  display: grid;
  gap: var(--spacing-2xl);
}

.profile-info {
  background: white;
  border-radius: var(--radius-2xl);
  padding: var(--spacing-2xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-border-light);

  h2 {
    font-size: var(--text-2xl);
    font-weight: var(--font-semibold);
    color: var(--color-text);
    margin-bottom: var(--spacing-xl);
    display: flex;
    align-items: center;
    gap: var(--spacing-md);

    &::before {
      content: '👤';
      font-size: var(--text-xl);
    }
  }
}

.info-group {
  display: flex;
  align-items: center;
  padding: var(--spacing-lg);
  background: var(--color-background-alt);
  border-radius: var(--radius-lg);
  margin-bottom: var(--spacing-md);
  transition: all var(--transition-fast);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-sm);
  }

  label {
    font-size: var(--text-sm);
    color: var(--color-text-muted);
    font-weight: var(--font-medium);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    min-width: 120px;
    margin-right: var(--spacing-lg);
  }

  .info-value {
    font-size: var(--text-base);
    color: var(--color-text);
    font-weight: var(--font-medium);
    flex: 1;
  }
}

.profile-services {
  background: white;
  border-radius: var(--radius-2xl);
  padding: var(--spacing-2xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-border-light);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
  gap: var(--spacing-md);

  h2 {
    font-size: var(--text-2xl);
    font-weight: var(--font-semibold);
    color: var(--color-text);
    display: flex;
    align-items: center;
    gap: var(--spacing-md);

    &::before {
      content: '🛠️';
      font-size: var(--text-xl);
    }
  }
}

.services-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-xl);

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.service-card {
  background: var(--color-background-alt);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  padding: 0;
  position: relative;
  overflow: hidden;
  border: 1px solid var(--color-border-light);
  transition: all var(--transition-normal);
  min-height: 280px;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
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
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    color: var(--color-text);
    margin: var(--spacing-lg) 0 var(--spacing-md);
    line-height: var(--leading-tight);
  }

  &__description {
    color: var(--color-text-light);
    font-size: var(--text-sm);
    line-height: var(--leading-relaxed);
    margin-bottom: var(--spacing-lg);
    flex: 1;
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
      font-size: var(--text-xl);
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
  padding: var(--spacing-3xl);
  background: var(--color-background-alt);
  border-radius: var(--radius-xl);
  border: 2px dashed var(--color-border);

  &__icon {
    font-size: 4rem;
    margin-bottom: var(--spacing-lg);
    opacity: 0.5;
  }

  p {
    color: var(--color-text-light);
    font-size: var(--text-lg);
    font-weight: var(--font-medium);
  }
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal);
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: white;
  border-radius: var(--radius-2xl);
  padding: var(--spacing-3xl);
  width: 100%;
  max-width: 500px;
  margin: var(--spacing-lg);
  box-shadow: var(--shadow-xl);
  animation: slideUp 0.3s ease;

  h3 {
    font-size: var(--text-2xl);
    font-weight: var(--font-semibold);
    color: var(--color-text);
    margin-bottom: var(--spacing-xl);
    text-align: center;
  }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}

.add-service-form {
  .form-group {
    margin-bottom: var(--spacing-lg);

    label {
      display: block;
      margin-bottom: var(--spacing-sm);
      font-weight: var(--font-medium);
      color: var(--color-text);
      font-size: var(--text-sm);
    }
  }
}

.input-field {
  width: 100%;
  padding: var(--spacing-md) var(--spacing-lg);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  background: white;
  transition: all var(--transition-fast);

  &:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
    transform: translateY(-1px);
  }

  &::placeholder {
    color: var(--color-text-muted);
  }
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-md);
  margin-top: var(--spacing-2xl);

  @media (max-width: 767px) {
    flex-direction: column;
  }
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) var(--spacing-lg);
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

  &-secondary {
    background: var(--color-background);
    color: var(--color-text);
    border: 2px solid var(--color-border);

    &:hover:not(:disabled) {
      background: var(--color-background-alt);
      border-color: var(--color-primary);
    }
  }

  @media (max-width: 767px) {
    width: 100%;
  }
}

/* Mobile Responsive */
@media (max-width: 767px) {
  .profile-page {
    padding: var(--spacing-2xl) 0;
  }

  .info-group {
    flex-direction: column;
    align-items: flex-start;
    text-align: center;

    label {
      min-width: auto;
      margin-right: 0;
      margin-bottom: var(--spacing-sm);
    }
  }

  .section-header {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  }

  .service-card {
    &__footer {
      flex-direction: column;
      gap: var(--spacing-md);
      align-items: stretch;

      .btn {
        width: 100%;
      }
    }
  }
}
</style>
