<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h2 class="modal-title">Создание услуги</h2>

      <form @submit.prevent="handleSubmit" class="modal-form">
        <div class="form-group">
          <label class="form-label">Название</label>
          <input
            v-model="form.title"
            type="text"
            class="input-field"
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label">Описание</label>
          <textarea
            v-model="form.description"
            class="input-field input-textarea"
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Цена</label>
          <input
            v-model.number="form.price"
            type="number"
            min="0"
            class="input-field"
            required
          />
        </div>

        <div class="modal-actions">
          <button
            type="button"
            @click="$emit('close')"
            class="btn btn-secondary"
          >
            Отмена
          </button>
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? "Создание..." : "Создать" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "close"): void;
  (e: "submit", data: any): void;
}>();

const form = reactive({
  title: "",
  description: "",
  price: 0,
});

const isSubmitting = ref(false);

const handleSubmit = async () => {
  isSubmitting.value = true;
  try {
    emit("submit", { ...form });
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style lang="scss" scoped>
.modal-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.modal-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-text-light);
}

.input-textarea {
  min-height: 8rem;
  resize: vertical;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
}
</style>
