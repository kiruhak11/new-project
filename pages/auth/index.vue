<template>
  <div class="auth-page">
    <div class="container">
      <div class="auth-card">
        <div class="auth-tabs">
          <button
            :class="['auth-tab', { active: activeTab === 'login' }]"
            @click="activeTab = 'login'"
          >
            Вход
          </button>
          <button
            :class="['auth-tab', { active: activeTab === 'register' }]"
            @click="activeTab = 'register'"
          >
            Регистрация
          </button>
        </div>

        <!-- Login Form -->
        <form
          v-if="activeTab === 'login'"
          @submit.prevent="handleLogin"
          class="auth-form"
        >
          <div class="form-group">
            <label for="login-email">Email</label>
            <input
              id="login-email"
              v-model="loginForm.email"
              type="email"
              class="input-field"
              required
            />
          </div>
          <div class="form-group">
            <label for="login-password">Пароль</label>
            <input
              id="login-password"
              v-model="loginForm.password"
              type="password"
              class="input-field"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">Войти</button>
          <p v-if="error" class="error-message">{{ error }}</p>
        </form>

        <!-- Register Form -->
        <form v-else @submit.prevent="handleRegister" class="auth-form">
          <div class="form-group">
            <label for="register-name">Имя</label>
            <input
              id="register-name"
              v-model="registerForm.name"
              type="text"
              class="input-field"
              required
            />
          </div>
          <div class="form-group">
            <label for="register-email">Email</label>
            <input
              id="register-email"
              v-model="registerForm.email"
              type="email"
              class="input-field"
              required
            />
          </div>
          <div class="form-group">
            <label for="register-password">Пароль</label>
            <input
              id="register-password"
              v-model="registerForm.password"
              type="password"
              class="input-field"
              required
            />
          </div>
          <div class="form-group">
            <label>Роль</label>
            <div class="role-selector">
              <label class="role-option">
                <input
                  type="radio"
                  v-model="registerForm.role"
                  value="customer"
                  name="role"
                />
                Заказчик
              </label>
              <label class="role-option">
                <input
                  type="radio"
                  v-model="registerForm.role"
                  value="provider"
                  name="role"
                />
                Исполнитель
              </label>
            </div>
          </div>
          <button type="submit" class="btn btn-primary">
            Зарегистрироваться
          </button>
          <p v-if="error" class="error-message">{{ error }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "~/stores/auth";
import { navigateTo } from "#app";
import { useLocalData } from "~/composables/useLocalData";

const localData = useLocalData();
const authStore = useAuthStore();
const activeTab = ref("login");
const error = ref("");

const loginForm = ref({
  email: "",
  password: "",
});

const registerForm = ref({
  name: "",
  email: "",
  password: "",
  role: "customer",
});

const handleLogin = () => {
  const user = localData.findUserByEmail(loginForm.value.email);

  if (user && user.password === loginForm.value.password) {
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    authStore.setUser(userData);
    navigateTo("/profile");
  } else {
    error.value = "Неверный email или пароль";
  }
};

const handleRegister = async () => {
  // Check if email already exists
  if (localData.findUserByEmail(registerForm.value.email)) {
    error.value = "Пользователь с таким email уже существует";
    return;
  }

  // Create new user
  const newUser = {
    id: (localData.getAllUsers().length + 1).toString(),
    email: registerForm.value.email,
    password: registerForm.value.password,
    name: registerForm.value.name,
    role: registerForm.value.role,
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
  navigateTo("/profile");
};
</script>

<style lang="scss" scoped>
.auth-page {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  padding: 2rem 0;
  background-color: #f3f4f6;
}

.auth-card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
}

.auth-tabs {
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e5e7eb;
}

.auth-tab {
  flex: 1;
  padding: 1rem;
  text-align: center;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: 500;
  color: #6b7280;
  transition: all 0.2s;

  &.active {
    color: #3b82f6;
    border-bottom: 2px solid #3b82f6;
    margin-bottom: -2px;
  }

  &:hover {
    color: #3b82f6;
  }
}

.auth-form {
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

.role-selector {
  display: flex;
  gap: 1rem;
}

.role-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  input {
    cursor: pointer;
  }
}

.btn {
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &-primary {
    background: #3b82f6;
    color: white;

    &:hover {
      background: #2563eb;
    }
  }
}

.error-message {
  margin-top: 1rem;
  color: #ef4444;
  text-align: center;
}
</style>
