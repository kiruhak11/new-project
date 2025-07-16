import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();

  // Initialize auth state if needed
  if (process.client && !authStore.isInitialized) {
    await authStore.initAuth();
  }

  // Wait a bit for auth to be properly initialized
  if (process.client) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Check if user is authenticated and is an admin
  if (!authStore.isAuthenticated || !authStore.isAdmin) {
    return navigateTo("/");
  }
});
