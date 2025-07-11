<template>
  <form @submit.prevent="handleSubmit" class="auth-form">
    <h2 class="auth-form__title">Вход в аккаунт</h2>

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

    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <button type="submit" class="btn btn-primary" :disabled="loading">
      {{ loading ? "Вход..." : "Войти" }}
    </button>

    <div class="auth-form__links">
      <NuxtLink to="/auth/register">Зарегистрироваться</NuxtLink>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { LoginCredentials } from "~/types/auth";

const authStore = useAuthStore();
const router = useRouter();

const form = ref<LoginCredentials>({
  email: "",
  password: "",
});

const loading = ref(false);
const error = ref("");

async function handleSubmit() {
  try {
    loading.value = true;
    error.value = "";

    await authStore.login(form.value);
    router.push("/profile");
  } catch (e) {
    error.value = "Произошла ошибка при входе";
  } finally {
    loading.value = false;
  }
}
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

.form-group {
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--gray-200);
  border-radius: 0.375rem;
  font-size: 1rem;
  background-color: var(--background-color);
  color: var(--text-color);

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
}

.error-message {
  color: var(--error-color);
  margin-bottom: 1rem;
  font-size: 0.875rem;
}
</style>
