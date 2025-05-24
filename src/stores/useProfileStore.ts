import { axiosInstance } from "@/lib/axios";
import type { BasicProfile, Profile } from "@/types";
import toast from "react-hot-toast";
import { create } from "zustand";

interface UpdateProfile {
  profileName: string;
  firstName: string | null;
  lastName: string | null;
  description: string | null;
}

interface ProfileStore {
  profile: Profile | null;
  basicProfile: BasicProfile | null;
  getProfile: (id: string) => void;
  getBasicProfile: (id: string) => void;
  updateProfile: (input: UpdateProfile) => void;
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
  updateProfile: async (input) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.put("/profiles", input);
      toast.success("Profile updated successfully");
    } catch (error: any) {
      const detail =
        error.response?.data?.detail ||
        error.response?.data?.title ||
        "Something went wrong. Please try again later.";

      set({ error: detail });
      toast.error(detail);
    } finally {
      set({ isLoading: false });
    }
  },
}));
