// src/stores/authStore.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  registerUser,
  loginUser,
  logoutUser,
  onAuthStateChangedListener
} from "@/services/authService";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const loading = ref(false);
  const error = ref(null);

  // Computed properties
  const isAuthenticated = computed(() => user.value !== null);

  // Actions
  const register = async (email, password) => {
    loading.value = true;
    error.value = null;
    try {
      const userData = await registerUser(email, password);
      user.value = userData;
      return userData;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const login = async (email, password) => {
    loading.value = true;
    error.value = null;
    try {
      const userData = await loginUser(email, password);
      user.value = userData;
      return userData;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const logout = async () => {
    loading.value = true;
    error.value = null;
    try {
      await logoutUser();
      user.value = null;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const initAuthListener = () => {
    return onAuthStateChangedListener((userData) => {
      user.value = userData;
      loading.value = false;
    });
  };

  return {
    user,
    loading,
    error,
    isAuthenticated,
    register,
    login,
    logout,
    initAuthListener
  };
});