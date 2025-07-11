import { defineStore } from "pinia";
import type { User, LoginCredentials, RegisterData } from "~/types/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
  }),

  getters: {
    isProvider: (state) => state.user?.role === "provider",
    isAdmin: (state) => state.user?.role === "admin",
    isCustomer: (state) => state.user?.role === "customer",
  },

  actions: {
    async initAuth() {
      try {
        // В реальном приложении здесь будет проверка токена и получение данных пользователя
        const token = useCookie("auth_token").value;
        if (token) {
          // Имитируем получение данных пользователя
          this.user = {
            id: "user123",
            email: "user@example.com",
            name: "John Doe",
            role: "customer",
            phone: "+1234567890",
            avatar: "/images/avatar.jpg",
          };
          this.isAuthenticated = true;
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
        this.user = null;
        this.isAuthenticated = false;
      }
    },

    async login(credentials: LoginCredentials) {
      try {
        // В реальном приложении здесь будет запрос к API
        this.user = {
          id: "user123",
          email: credentials.email,
          name: "John Doe",
          role: "customer",
          phone: "+1234567890",
          avatar: "/images/avatar.jpg",
        };
        this.isAuthenticated = true;
        useCookie("auth_token").value = "mock_token";
        return true;
      } catch (err) {
        console.error("Login error:", err);
        return false;
      }
    },

    async register(data: RegisterData) {
      try {
        // В реальном приложении здесь будет запрос к API
        this.user = {
          id: "user123",
          email: data.email,
          name: data.name,
          role: data.role,
          phone: data.phone,
          avatar: "/images/avatar.jpg",
        };
        this.isAuthenticated = true;
        useCookie("auth_token").value = "mock_token";
        return true;
      } catch (err) {
        console.error("Register error:", err);
        return false;
      }
    },

    async logout() {
      try {
        // В реальном приложении здесь будет запрос к API
        this.user = null;
        this.isAuthenticated = false;
        useCookie("auth_token").value = null;
        return true;
      } catch (err) {
        console.error("Logout error:", err);
        return false;
      }
    },
  },
});
