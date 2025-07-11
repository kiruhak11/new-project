import { defineStore } from "pinia";
import type { Service, ServiceFormData } from "~/types/services";
import { useLocalData } from "~/composables/useLocalData";
import { useAuthStore } from "~/stores/auth";

export const useServicesStore = defineStore("services", {
  state: () => ({
    services: [] as Service[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    userServices(): Service[] {
      const authStore = useAuthStore();
      return this.services.filter((s) => s.userId === authStore.user?.id);
    },
    pendingServices(): Service[] {
      return this.services.filter((s) => s.status === "pending");
    },
  },

  actions: {
    async fetchServices() {
      this.loading = true;
      try {
        const localData = useLocalData();
        this.services = localData.getAllServices();
      } catch (error) {
        console.error("Fetch services error:", error);
        this.error = "Failed to fetch services";
      } finally {
        this.loading = false;
      }
    },

    async updateServiceStatus(serviceId: string, status: Service["status"]) {
      try {
        const localData = useLocalData();
        await localData.updateService(serviceId, { status });
        await this.fetchServices();
      } catch (error) {
        console.error("Update service status error:", error);
        throw error;
      }
    },

    async deleteService(serviceId: string) {
      try {
        const localData = useLocalData();
        await localData.deleteService(serviceId);
        await this.fetchServices();
      } catch (error) {
        console.error("Delete service error:", error);
        throw error;
      }
    },
  },
});
