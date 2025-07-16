<template>
  <div class="auth-page">
    <div class="container">
      <div class="auth-form">
        <h1>Вход</h1>
        <form @submit.prevent="handleLogin">
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

          <div v-if="error" class="error-message">
            {{ error }}
          </div>

          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? "Вход..." : "Войти" }}
          </button>
        </form>

        <div class="auth-links">
          <p>
            Нет аккаунта?
            <NuxtLink to="/auth/register">Зарегистрироваться</NuxtLink>
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
  email: "",
  password: "",
});

const handleLogin = async () => {
  try {
    loading.value = true;
    error.value = "";

    const user = localData.findUserByEmail(form.value.email);

    if (user && user.password === form.value.password) {
      const userData = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };
      authStore.setUser(userData);
      router.push("/profile");
    } else {
      error.value = "Неверный email или пароль";
    }
  } catch (e) {
    error.value = "Ошибка при входе";
    console.error(e);
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.auth-page {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  padding: var(--spacing-xl) 0;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%);
    animation: float 20s ease-in-out infinite;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -50%;
    right: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%);
    animation: float 25s ease-in-out infinite reverse;
  }
}

@keyframes float {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(30px, -30px) rotate(120deg); }
  66% { transform: translate(-20px, 20px) rotate(240deg); }
}

.auth-form {
  position: relative;
  z-index: 10;
  max-width: 450px;
  margin: 0 auto;
  padding: var(--spacing-3xl);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-xl);

  h1 {
    margin-bottom: var(--spacing-2xl);
    font-size: var(--text-3xl);
    font-weight: var(--font-bold);
    text-align: center;
    color: var(--color-text);
    background: linear-gradient(135deg, var(--color-text), var(--color-primary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
  }
}

.form-group {
  position: relative;

  label {
    display: block;
    margin-bottom: var(--spacing-sm);
    font-size: var(--text-sm);
    font-weight: var(--font-medium);
    color: var(--color-text);
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
}

.error-message {
  background: rgba(239, 68, 68, 0.1);
  color: var(--color-error);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  border: 1px solid rgba(239, 68, 68, 0.2);
  margin-bottom: var(--spacing-md);
}

.btn {
  padding: var(--spacing-md) var(--spacing-xl);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  border-radius: var(--radius-lg);
  transition: all var(--transition-fast);

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }

  &:not(:disabled):hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  &:not(:disabled):active {
    transform: translateY(0);
  }
}

.auth-links {
  margin-top: var(--spacing-xl);
  text-align: center;
  font-size: var(--text-sm);
  color: var(--color-text-light);

  a {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: var(--font-medium);
    transition: all var(--transition-fast);

    &:hover {
      color: var(--color-primary-dark);
      text-decoration: underline;
    }
  }
}

/* Mobile Responsive */
@media (max-width: 767px) {
  .auth-page {
    padding: var(--spacing-lg) var(--spacing-md);
    min-height: calc(100vh - 70px);
  }

  .auth-form {
    padding: var(--spacing-2xl);
    margin: 0 var(--spacing-md);

    h1 {
      font-size: var(--text-2xl);
    }
  }
}
</style>
