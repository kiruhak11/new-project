import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();

  // Initialize auth state if needed
  if (process.client && !authStore.isInitialized) {
    await authStore.initAuth();
  }

  // Public routes that don't require authentication
  const publicRoutes = ["/auth/login", "/auth/register", "/", "/about", "/services"];

  if (!authStore.isAuthenticated && !publicRoutes.includes(to.path)) {
    return navigateTo("/auth/login");
  }

  if (authStore.isAuthenticated && ["/auth/login", "/auth/register"].includes(to.path)) {
    return navigateTo("/profile");
  }
});
