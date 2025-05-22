import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import type { Profile, UserLogIn, UserSignUp } from "../types";

interface AuthStore {
  authUser: Profile | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isCheckingAuth: boolean;
  error: string | null;

  checkAuth: () => Promise<void>;
  signup: (data: UserSignUp) => Promise<void>;
  login: (data: UserLogIn) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  error: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      const { data } = await axiosInstance.get(`/profiles/${res.data.id}`);
      set({ authUser: data });
    } catch (error: any) {
      console.error("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      console.log(res.data);
      set({ authUser: res.data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
    } catch (error: any) {
      set({ error: error.message });
    }
  },
}));
