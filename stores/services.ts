import { defineStore } from "pinia";
import type { Service, ServiceFormData } from "~/types/services";

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
      return this.services.filter((s) => s.status === "inactive");
    },
  },

  actions: {
    async fetchServices() {
      this.loading = true;
      try {
        const { data } = await useFetch<Service[]>("/api/services");
        if (data.value) {
          this.services = data.value.map((service) => ({
            ...service,
            createdAt: new Date(service.createdAt),
            updatedAt: new Date(service.updatedAt),
            reviews: service.reviews?.map((review) => ({
              ...review,
              createdAt: new Date(review.createdAt),
            })),
          }));
        }
      } catch (error) {
        console.error("Fetch services error:", error);
        this.error = "Failed to fetch services";
      } finally {
        this.loading = false;
      }
    },

    async fetchServiceById(id: string) {
      try {
        const { data } = await useFetch<Service>(`/api/services/${id}`);
        if (data.value) {
          return {
            ...data.value,
            createdAt: new Date(data.value.createdAt),
            updatedAt: new Date(data.value.updatedAt),
            reviews: data.value.reviews?.map((review) => ({
              ...review,
              createdAt: new Date(review.createdAt),
            })),
          };
        }
        return null;
      } catch (error) {
        console.error("Fetch service by id error:", error);
        throw error;
      }
    },

    async createService(serviceData: ServiceFormData) {
      try {
        const { data } = await useFetch<Service>("/api/services", {
          method: "POST",
          body: serviceData,
        });
        if (data.value) {
          const service = {
            ...data.value,
            createdAt: new Date(data.value.createdAt),
            updatedAt: new Date(data.value.updatedAt),
          };
          this.services.push(service);
          return service;
        }
        return null;
      } catch (error) {
        console.error("Create service error:", error);
        throw error;
      }
    },

    async updateService(id: string, serviceData: Partial<ServiceFormData>) {
      try {
        const { data } = await useFetch<Service>(`/api/services/${id}`, {
          method: "PATCH",
          body: serviceData,
        });
        if (data.value) {
          const service = {
            ...data.value,
            createdAt: new Date(data.value.createdAt),
            updatedAt: new Date(data.value.updatedAt),
          };
          const index = this.services.findIndex((s) => s.id === id);
          if (index !== -1) {
            this.services[index] = service;
          }
          return service;
        }
        return null;
      } catch (error) {
        console.error("Update service error:", error);
        throw error;
      }
    },

    async updateServiceStatus(id: string, status: Service["status"]) {
      return this.updateService(id, { status } as Partial<ServiceFormData>);
    },

    async deleteService(id: string) {
      try {
        await useFetch(`/api/services/${id}`, {
          method: "DELETE",
        });
        const index = this.services.findIndex((s) => s.id === id);
        if (index !== -1) {
          this.services.splice(index, 1);
        }
      } catch (error) {
        console.error("Delete service error:", error);
        throw error;
      }
    },
  },
});
