<template>
  <div class="login-page">
    <div class="login-container">
      <h1>Вход в систему</h1>
      <form @submit.prevent="handleLogin" class="login-form">
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
        <button type="submit" class="login-button">Войти</button>
        <NuxtLink to="/auth/register" class="register-link">
          Нет аккаунта? Зарегистрироваться
        </NuxtLink>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

definePageMeta({
  middleware: ["guest"],
});

const authStore = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const error = ref("");

const handleLogin = async () => {
  try {
    error.value = "";
    const result = await authStore.login({
      email: email.value,
      password: password.value,
    });

    if (result) {
      router.push("/profile");
    } else {
      error.value = "Ошибка при входе";
    }
  } catch (err) {
    console.error("Login error:", err);
    error.value = "Неверный email или пароль";
  }
};
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.login-container {
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

.login-form {
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

  input {
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
}

.login-button {
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

.register-link {
  text-align: center;
  color: var(--color-primary);
  text-decoration: none;
  font-size: 0.9em;

  &:hover {
    text-decoration: underline;
  }
}
</style>
