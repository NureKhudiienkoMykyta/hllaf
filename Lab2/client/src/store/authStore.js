import { create } from "zustand";
import apiAxios from "../api/httpClient";

export const useAuthStore = create((set) => ({
  token: localStorage.getItem("token"),
  isAuthenticated: Boolean(localStorage.getItem("token")),
  isLoading: false,
  error: null,

  register: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiAxios.post("/auth/registration", {
        name,
        email,
        password,
      });

      const data = response.data;

      localStorage.setItem("token", data.token);
      set({
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      const message = error.response?.data?.message || "Server Error";
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiAxios.post("/auth/login", {
        email: email,
        password: password,
      });

      const data = response.data;

      localStorage.setItem("token", data.token);
      set({
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      const message = error.response?.data?.message || "Server Error";
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },

  clearError: () => set({ error: null }),
}));
