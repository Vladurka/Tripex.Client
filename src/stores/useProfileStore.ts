import { axiosInstance } from "@/lib/axios";
import type { BasicProfile, Profile } from "@/types";
import { create } from "zustand";

interface ProfileStore {
  profile: Profile | null;
  basicProfile: BasicProfile | null;
  getProfile: (id: string) => void;
  getBasicProfile: (id: string) => void;
  isLoading: boolean;
  error: string | null;
}

export const useProfileStore = create<ProfileStore>()((set) => ({
  profile: null,
  basicProfile: null,
  isLoading: false,
  error: null,
  getProfile: async (id) => {
    set({ isLoading: true, error: null });

    try {
      const { data } = await axiosInstance.get(`/profiles/${id}`);

      set({ profile: data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  getBasicProfile: async (id) => {
    set({ isLoading: true, error: null });

    try {
      const { data } = await axiosInstance.get(`/profiles/basic/${id}`);

      set({ basicProfile: data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
