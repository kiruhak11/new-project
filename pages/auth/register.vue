<template>
  <div class="auth-page">
    <div class="container">
      <div class="auth-form">
        <h1>Регистрация</h1>
        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label for="name">Имя</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              class="input-field"
              required
            />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="input-field"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">Пароль</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              class="input-field"
              required
            />
          </div>

          <div class="form-group">
            <label for="role">Роль</label>
            <select id="role" v-model="form.role" class="input-field" required>
              <option value="customer">Заказчик</option>
              <option value="provider">Исполнитель</option>
            </select>
          </div>

          <div v-if="error" class="error-message">
            {{ error }}
          </div>

          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? "Регистрация..." : "Зарегистрироваться" }}
          </button>
        </form>

        <div class="auth-links">
          <p>
            Уже есть аккаунт?
            <NuxtLink to="/auth/login">Войти</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "nuxt/app";
import { useAuthStore } from "~/stores/auth";
import { useLocalData } from "~/composables/useLocalData";

const localData = useLocalData();
const authStore = useAuthStore();
const router = useRouter();

const loading = ref(false);
const error = ref("");

const form = ref({
  name: "",
  email: "",
  password: "",
  role: "customer",
});

const handleRegister = async () => {
  try {
    loading.value = true;
    error.value = "";

    // Check if email already exists
    if (localData.findUserByEmail(form.value.email)) {
      error.value = "Пользователь с таким email уже существует";
      return;
    }

    // Create new user
    const newUser = {
      id: (localData.getAllUsers().length + 1).toString(),
      email: form.value.email,
      password: form.value.password,
      name: form.value.name,
      role: form.value.role,
      createdAt: new Date().toISOString(),
    };

    // Add user to data
    await localData.addUser(newUser);

    // Log in the new user
    const userData = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    };
    authStore.setUser(userData);
    router.push("/profile");
  } catch (e) {
    error.value = "Ошибка при регистрации";
    console.error(e);
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.auth-page {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  padding: 2rem 0;
  background-color: var(--color-background-alt);
}

.auth-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  h1 {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-text-light);
  }
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.auth-links {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;

  a {
    color: var(--color-primary);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
