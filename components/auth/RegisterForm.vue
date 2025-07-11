<template>
  <form @submit.prevent="handleSubmit" class="auth-form">
    <h2 class="auth-form__title">Регистрация</h2>

    <div class="form-group">
      <label for="email">Email</label>
      <input
        id="email"
        type="email"
        v-model="form.email"
        required
        class="form-control"
        placeholder="Введите email"
      />
    </div>

    <div class="form-group">
      <label for="name">Имя</label>
      <input
        id="name"
        type="text"
        v-model="form.name"
        required
        class="form-control"
        placeholder="Введите имя"
      />
    </div>

    <div class="form-group">
      <label for="password">Пароль</label>
      <input
        id="password"
        type="password"
        v-model="form.password"
        required
        class="form-control"
        placeholder="Введите пароль"
      />
    </div>

    <div class="form-group">
      <label for="role">Тип аккаунта</label>
      <select id="role" v-model="form.role" required class="form-control">
        <option value="customer">Заказчик</option>
        <option value="provider">Исполнитель</option>
      </select>
    </div>

    <div class="form-group">
      <label for="phone">Телефон</label>
      <input
        id="phone"
        type="tel"
        v-model="form.phone"
        class="form-control"
        placeholder="Введите номер телефона"
      />
    </div>

    <div v-if="form.role === 'provider'" class="form-group">
      <label for="description">О себе</label>
      <textarea
        id="description"
        v-model="form.description"
        class="form-control"
        rows="4"
        placeholder="Расскажите о своем опыте и навыках"
      ></textarea>
    </div>

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <button type="submit" class="btn btn-primary" :disabled="loading">
      {{ loading ? "Регистрация..." : "Зарегистрироваться" }}
    </button>

    <div class="auth-form__links">
      <NuxtLink to="/auth/login">Уже есть аккаунт? Войти</NuxtLink>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import type { UserRole } from "~/types/auth";

const authStore = useAuthStore();
const router = useRouter();

const form = ref({
  email: "",
  password: "",
  name: "",
  role: "customer" as UserRole,
  phone: "",
  description: "",
});

const loading = ref(false);
const error = ref("");

const handleSubmit = async () => {
  try {
    error.value = "";
    const result = await authStore.register({
      email: form.value.email,
      password: form.value.password,
      name: form.value.name,
      role: form.value.role,
      phone: form.value.phone || undefined,
      description: form.value.description || undefined,
    });

    if (result) {
      navigateTo("/profile");
    } else {
      error.value = "Ошибка при регистрации";
    }
  } catch (err) {
    console.error("Register error:", err);
    error.value = "Произошла ошибка при регистрации";
  }
};
</script>

<style lang="scss">
.auth-form {
  max-width: 400px;
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

  &__links {
    margin-top: 1rem;
    text-align: center;

    a {
      color: var(--primary-color);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}

select.form-control {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1em;
  padding-right: 2.5rem;
}

textarea.form-control {
  resize: vertical;
  min-height: 100px;
}
</style>
