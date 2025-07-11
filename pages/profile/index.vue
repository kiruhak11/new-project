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
                  class="btn"
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
</script>

<style lang="scss" scoped>
.profile-page {
  padding: 2rem 0;
}

.profile-header {
  margin-bottom: 2rem;
}

.profile-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
}

.profile-content {
  display: grid;
  gap: 2rem;
}

.profile-info {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 1.5rem;
  }
}

.info-group {
  margin-bottom: 1rem;

  label {
    display: block;
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 0.25rem;
  }

  .info-value {
    font-size: 1rem;
    color: #1f2937;
  }
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
  }
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.service-card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  position: relative;
  overflow: hidden;

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
    margin: 1.5rem 0 0.5rem;
  }

  &__description {
    color: #4b5563;
    font-size: 0.875rem;
    line-height: 1.5;
    margin-bottom: 1rem;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
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
  padding: 3rem 0;
  color: #6b7280;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  margin: 1rem;

  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 1.5rem;
  }
}

.add-service-form {
  .form-group {
    margin-bottom: 1.5rem;

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #374151;
    }
  }
}

.input-field {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
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

  &-danger {
    background: #ef4444;
    color: white;

    &:hover {
      background: #dc2626;
    }
  }
}
</style>
