<template>
  <form @submit.prevent="handleSubmit" class="service-form">
    <h2 class="service-form__title">Создание услуги</h2>

    <div class="form-group">
      <label for="category">Категория</label>
      <select
        id="category"
        v-model="form.category"
        required
        class="form-control"
      >
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
    </div>

    <div class="form-group">
      <label for="title">Название услуги</label>
      <input
        id="title"
        type="text"
        v-model="form.title"
        required
        class="form-control"
        placeholder="Введите название услуги"
      />
    </div>

    <div class="form-group">
      <label for="description">Описание</label>
      <textarea
        id="description"
        v-model="form.description"
        required
        class="form-control"
        rows="4"
        placeholder="Опишите вашу услугу подробно"
      ></textarea>
    </div>

    <div class="form-group">
      <label for="price">Цена</label>
      <input
        id="price"
        type="number"
        v-model="form.price"
        required
        min="0"
        class="form-control"
        placeholder="Введите стоимость"
      />
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <button type="submit" class="btn btn-primary" :disabled="loading">
      {{ loading ? "Создание..." : "Создать услугу" }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { useServicesStore } from "~/stores/services";
import type { ServiceFormData } from "~/types/services";

const emit = defineEmits<{
  (e: "submit", service: ServiceFormData): void;
}>();

const authStore = useAuthStore();
const servicesStore = useServicesStore();
const router = useRouter();

// В реальном приложении категории будут загружаться с сервера
const categories = [
  { id: 1, name: "Ремонт и строительство" },
  { id: 2, name: "Красота и здоровье" },
  { id: 3, name: "IT и программирование" },
  { id: 4, name: "Обучение и репетиторство" },
  { id: 5, name: "Уборка и помощь по дому" },
  { id: 6, name: "Ремонт техники" },
];

const form = ref<ServiceFormData>({
  title: "",
  description: "",
  price: 0,
  image: "",
  category: "",
  tags: [],
});

const loading = ref(false);
const error = ref("");

const handleSubmit = async () => {
  try {
    error.value = "";
    const result = await servicesStore.createService(form.value);
    if (result) {
      emit("submit", result);
      form.value = {
        title: "",
        description: "",
        price: 0,
        image: "",
        category: "",
        tags: [],
      };
    } else {
      error.value = "Ошибка при создании услуги";
    }
  } catch (err) {
    console.error("Create service error:", err);
    error.value = "Произошла ошибка при создании услуги";
  }
};
</script>

<style lang="scss">
.service-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: var(--gray-100);
  border-radius: 0.5rem;

  &__title {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 1.5rem;
    font-weight: 600;
  }
}
</style>
