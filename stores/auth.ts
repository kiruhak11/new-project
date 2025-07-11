import { defineStore } from "pinia";
import { navigateTo } from "#app";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false,
    isInitialized: false,
  }),

  getters: {
    isProvider: (state) => state.user?.role === "provider",
    isAdmin: (state) => state.user?.role === "admin",
    isCustomer: (state) => state.user?.role === "customer",
  },

  actions: {
    setUser(user: User) {
      this.user = user;
      this.isAuthenticated = true;
      if (process.client) {
        localStorage.setItem("user", JSON.stringify(user));
      }
    },

    logout() {
      this.user = null;
      this.isAuthenticated = false;
      if (process.client) {
        localStorage.removeItem("user");
      }
      navigateTo("/auth/login");
    },

    async initAuth() {
      if (process.client && !this.isInitialized) {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          try {
            const user = JSON.parse(savedUser);
            this.setUser(user);
          } catch (e) {
            localStorage.removeItem("user");
          }
        }
        this.isInitialized = true;
      }
      return this.isAuthenticated;
    },
  },
});
