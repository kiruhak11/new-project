<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-6">Создание заказа</h1>
    <CreateServiceModal
      v-if="showModal"
      @close="closeModal"
      @submit="handleSubmit"
    />
    <button @click="showModal = true" class="btn btn-primary">
      Создать новый заказ
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { v4 as uuidv4 } from "uuid";
import { useAuthStore } from "~/stores/auth";
import { useLocalData } from "~/composables/useLocalData";

interface ServiceFormData {
  title: string;
  description: string;
  price: number;
}

const { addService } = useLocalData();
const authStore = useAuthStore();
const router = useRouter();

const showModal = ref(false);

const closeModal = () => {
  showModal.value = false;
};

const handleSubmit = async (formData: ServiceFormData) => {
  try {
    if (!authStore.user?.id) {
      throw new Error("User not authenticated");
    }

    const newService = {
      id: uuidv4(),
      ...formData,
      userId: authStore.user.id,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    await addService(newService);
    showModal.value = false;
    await router.push("/profile");
  } catch (error) {
    console.error("Error creating service:", error);
  }
};

// Redirect if not logged in as customer
onMounted(() => {
  if (!authStore.user || authStore.user.role !== "customer") {
    router.push("/");
  }
});
</script>
