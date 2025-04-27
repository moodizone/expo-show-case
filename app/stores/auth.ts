import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  login,
  register,
  checkEmailAvailability,
  verify2FA,
  checkAuthStatus,
} from "@/app/services/auth";

interface AuthState {
  readonly token: string | null;
  readonly isAuthenticated: boolean;
  user: unknown | null;
  isLoading: boolean;
  error: string | null;
  hasSeenOnboarding: boolean;
  actions: {
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, phone: string) => Promise<void>;
    checkEmailAvailability: (email: string) => Promise<boolean>;
    verify2FA: (code: string) => Promise<void>;
    logout: () => void;
    checkAuthStatus: () => Promise<void>;
    setHasSeenOnboarding: (value: boolean) => void;
  };
}

export const useAuthStore = create<AuthState>((set) => ({
  // initial values
  token: null,
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
  hasSeenOnboarding: false,

  actions: {
    login: async (email: string, password: string) => {
      set({ isLoading: true, error: null });
      try {
        const response = await login(email, password);
        await AsyncStorage.setItem("token", response.token);
        set({
          token: response.token,
          isAuthenticated: true,
          user: response.user,
          isLoading: false,
        });
      } catch (error: unknown) {
        set({ error: (error as Error).message, isLoading: false });
        throw error;
      }
    },

    register: async (email: string, password: string, phone: string) => {
      set({ isLoading: true, error: null });
      try {
        const response = await register(email, password, phone);
        await AsyncStorage.setItem("token", response.token);
        set({
          token: response.token,
          isAuthenticated: true,
          user: response.user,
          isLoading: false,
        });
      } catch (error: any) {
        set({ error: error.message, isLoading: false });
        throw error;
      }
    },

    checkEmailAvailability: async (email: string) => {
      set({ isLoading: true, error: null });
      try {
        const available = await checkEmailAvailability(email);
        set({ isLoading: false });
        return available;
      } catch (error: unknown) {
        set({ error: (error as Error).message, isLoading: false });
        throw error;
      }
    },

    verify2FA: async (code: string) => {
      set({ isLoading: true, error: null });
      try {
        const response = await verify2FA(code);
        await AsyncStorage.setItem("token", response.token);
        set({
          token: response.token,
          isAuthenticated: true,
          user: response.user,
          isLoading: false,
        });
      } catch (error: unknown) {
        set({ error: (error as Error).message, isLoading: false });
        throw error;
      }
    },

    logout: async () => {
      await AsyncStorage.removeItem("token");
      set({ token: null, isAuthenticated: false, user: null });
    },

    checkAuthStatus: async () => {
      set({ isLoading: true, error: null });
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          set({ isAuthenticated: false, user: null, isLoading: false });
          return;
        }
        const response = await checkAuthStatus(token);
        set({
          isAuthenticated: response.isAuthenticated,
          user: response.user,
          isLoading: false,
        });
      } catch (error: unknown) {
        set({ error: (error as Error).message, isLoading: false });
        throw error;
      }
    },

    setHasSeenOnboarding: async (value: boolean) => {
      await AsyncStorage.setItem("hasSeenOnboarding", value.toString());
      set({ hasSeenOnboarding: value });
    },
  },
}));
