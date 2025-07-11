import { useAuthStore } from "~/stores/auth";
import { useLocalData } from "~/composables/useLocalData";

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const localData = useLocalData();

  // Initialize auth state if needed
  if (process.client) {
    await authStore.initAuth();
  }

  // Fetch fresh data
  await localData.fetchData();

  // Check if user is authenticated and is an admin
  if (!authStore.isAuthenticated || !authStore.isAdmin) {
    return navigateTo("/");
  }
});
