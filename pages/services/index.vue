<template>
  <div class="services-page">
    <div class="container">
      <div class="services-page__header">
        <h1 class="services-page__title">All Services</h1>
        <div class="services-page__filters">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search services..."
            class="input-field"
            style="
              max-width: 300px;
              padding: 0.75rem 1rem;
              border: 1px solid #e2e8f0;
              border-radius: 0.5rem;
            "
          />
          <select
            v-model="selectedCategory"
            class="input-field"
            style="
              max-width: 200px;
              padding: 0.75rem 1rem;
              border: 1px solid #e2e8f0;
              border-radius: 0.5rem;
              margin-left: 1rem;
            "
          >
            <option value="">All Categories</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
          <select
            v-model="sortBy"
            class="input-field"
            style="
              max-width: 200px;
              padding: 0.75rem 1rem;
              border: 1px solid #e2e8f0;
              border-radius: 0.5rem;
              margin-left: 1rem;
            "
          >
            <option value="newest">Newest First</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      <div class="services__grid grid">
        <div v-if="loading" class="text-center py-8">Загрузка...</div>

        <div v-else-if="services.length === 0" class="text-center py-8">
          Нет доступных услуг
        </div>

        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <div
            v-for="service in services"
            :key="service.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            <h3 class="text-xl font-semibold mb-2">{{ service.title }}</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              {{ service.description }}
            </p>
            <div class="flex justify-between items-center">
              <span class="text-primary-600 font-medium">
                {{ formatPrice(service.price) }}
              </span>
              <button v-if="isCustomer" class="btn btn-primary btn-sm">
                Заказать
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="services.length === 0"
        style="text-align: center; padding: 4rem 0"
      >
        <p style="font-size: 1.25rem; color: #64748b; margin-bottom: 1rem">
          No services found matching your criteria
        </p>
        <button @click="resetFilters" class="btn btn-primary">
          Reset Filters
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useServicesStore } from "~/stores/services";
import type { Service } from "~/types/services";
import { useAuthStore } from "~/stores/auth";

const servicesStore = useServicesStore();
const authStore = useAuthStore();

const searchQuery = ref("");
const selectedCategory = ref("");
const sortBy = ref("date");

const loading = ref(true);
const services = ref<Service[]>([]);

const categories = [
  { id: "1", name: "Разработка" },
  { id: "2", name: "Дизайн" },
  { id: "3", name: "Маркетинг" },
  { id: "4", name: "Консультации" },
];

const filteredServices = computed(() => {
  let result = [...services.value];

  if (selectedCategory.value) {
    result = result.filter((s) => s.category === selectedCategory.value);
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query)
    );
  }

  if (sortBy.value === "price") {
    result.sort((a, b) => a.price - b.price);
  } else if (sortBy.value === "date") {
    result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  return result;
});

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
  }).format(price);
};

const resetFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "";
  sortBy.value = "date";
};

const isCustomer = computed(() => authStore.isCustomer);

onMounted(async () => {
  try {
    loading.value = true;
    const result = await servicesStore.fetchServices();
    services.value = Array.isArray(result) ? result : [];
  } catch (err) {
    console.error("Error fetching services:", err);
  } finally {
    loading.value = false;
  }
});
</script>

<style lang="scss" scoped>
.services-page {
  padding: 2rem 0;

  &__header {
    margin-bottom: 2rem;
  }

  &__title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
  }

  &__filters {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
}

.input-field {
  background: white;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
}
</style>
