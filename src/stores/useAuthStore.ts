import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import type { UserLogIn, UserSignUp } from "../types";

interface AuthStore {
  userId: string | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isCheckingAuth: boolean;
  error: string | null;

  checkAuth: () => Promise<void>;
  signup: (input: UserSignUp) => Promise<void>;
  login: (input: UserLogIn) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  userId: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  error: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ userId: res.data });
    } catch (error: any) {
      console.error("Error in checkAuth:", error);
      set({ userId: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (input) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", input);
      set({ userId: res.data.userId });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (input) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", input);
      set({ userId: res.data.userId });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ userId: null });
    } catch (error: any) {
      set({ error: error.message });
    }
  },
}));
