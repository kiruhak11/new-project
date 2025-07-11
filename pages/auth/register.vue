<template>
  <div class="register-page">
    <div class="register-container">
      <h1>Регистрация</h1>
      <form @submit.prevent="handleRegister" class="register-form">
        <div class="form-group">
          <label for="name">Имя</label>
          <input
            type="text"
            id="name"
            v-model="name"
            required
            placeholder="Введите ваше имя"
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            placeholder="Введите email"
          />
        </div>
        <div class="form-group">
          <label for="password">Пароль</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Введите пароль"
          />
        </div>
        <div class="form-group">
          <label for="role">Роль</label>
          <select id="role" v-model="role" required>
            <option value="customer">Заказчик</option>
            <option value="executor">Исполнитель</option>
          </select>
        </div>
        <button type="submit" class="register-button">
          Зарегистрироваться
        </button>
        <NuxtLink to="/auth/login" class="login-link">
          Уже есть аккаунт? Войти
        </NuxtLink>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "~/stores/auth";
import type { UserRole } from "~/types/auth";

definePageMeta({
  middleware: ["guest"],
});

const authStore = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const name = ref("");
const role = ref<UserRole>("customer");
const error = ref("");

const handleRegister = async () => {
  try {
    error.value = "";
    const result = await authStore.register({
      email: email.value,
      password: password.value,
      name: name.value,
      role: role.value,
    });

    if (result) {
      router.push("/profile");
    } else {
      error.value = "Ошибка при регистрации";
    }
  } catch (err) {
    console.error("Register error:", err);
    error.value = "Произошла ошибка при регистрации";
  }
};
</script>

<style lang="scss" scoped>
.register-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.register-container {
  width: 100%;
  max-width: 400px;
  padding: 30px;
  border-radius: 8px;
  background: var(--color-background-soft);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h1 {
    text-align: center;
    margin-bottom: 30px;
    color: var(--color-heading);
  }
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-weight: 500;
    color: var(--color-text);
  }

  input,
  select {
    padding: 10px;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    background: var(--color-background);
    color: var(--color-text);

    &:focus {
      outline: none;
      border-color: var(--color-primary);
    }
  }

  select {
    cursor: pointer;
  }
}

.register-button {
  padding: 12px;
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
}

.login-link {
  text-align: center;
  color: var(--color-primary);
  text-decoration: none;
  font-size: 0.9em;

  &:hover {
    text-decoration: underline;
  }
}
</style>
