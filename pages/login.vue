<template>
  <div class="container">
    <div class="login-form">
      <h1>Вход в систему</h1>

      <form @submit.prevent="handleSubmit" class="form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            placeholder="Введите email"
          />
        </div>

        <div class="form-group">
          <label for="password">Пароль</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            placeholder="Введите пароль"
          />
        </div>

        <button type="submit" class="btn btn-primary" :disabled="isLoading">
          {{ isLoading ? "Вход..." : "Войти" }}
        </button>

        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
const email = useState("email", () => "");
const password = useState("password", () => "");
const error = useState("error", () => "");
const isLoading = useState("isLoading", () => false);

const authStore = useAuthStore();

const handleSubmit = async () => {
  try {
    isLoading.value = true;
    error.value = "";

    const success = await authStore.login(email.value, password.value);

    if (success) {
      await navigateTo("/profile");
    } else {
      error.value = "Неверный email или пароль";
    }
  } catch (e) {
    error.value = "Произошла ошибка при входе";
  } finally {
    isLoading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.login-form {
  max-width: 400px;
  margin: $spacing-2xl auto;
  padding: $spacing-xl;
  background: $white;
  border-radius: $radius-lg;
  box-shadow: $shadow-md;

  h1 {
    margin-bottom: $spacing-xl;
    text-align: center;
    color: $dark;
  }
}

.form {
  display: flex;
  flex-direction: column;
  gap: $spacing-lg;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: $spacing-xs;

  label {
    font-weight: 500;
    color: $dark;
  }

  input {
    padding: $spacing-sm;
    border: 1px solid lighten($dark, 50%);
    border-radius: $radius-md;
    font-size: 1rem;

    &:focus {
      outline: none;
      border-color: $primary;
    }
  }
}

.error {
  color: $error;
  text-align: center;
  margin-top: $spacing-sm;
}
</style>
