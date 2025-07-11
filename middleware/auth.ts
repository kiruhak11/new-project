import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();

  // Initialize auth state if needed
  if (process.client && !authStore.isAuthenticated) {
    authStore.initAuth();
  }

  // Public routes that don't require authentication
  const publicRoutes = ["/auth/login", "/auth/register"];

  if (!authStore.isAuthenticated && !publicRoutes.includes(to.path)) {
    return navigateTo("/auth/login");
  }

  if (authStore.isAuthenticated && publicRoutes.includes(to.path)) {
    return navigateTo("/profile");
  }
});
