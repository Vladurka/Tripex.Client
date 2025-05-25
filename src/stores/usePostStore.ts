import { axiosInstance } from "@/lib/axios";
import type { PostType } from "@/types";
import { create } from "zustand";

interface PostStore {
  posts: PostType[];
  getPosts: () => void;
  getPostsByProfile: (id: string) => void;
  isLoading: boolean;
  error: string | null;
}

export const usePostStore = create<PostStore>()((set) => ({
  posts: [],
  isLoading: false,
  error: null,
  getPosts: async () => {
    set({ isLoading: true, error: null });

    try {
      const { data } = await axiosInstance.get("/posts");

      const postsWithUsers = await Promise.all(
        data.posts.map(async (post: PostType) => {
          try {
            const { data: user } = await axiosInstance.get(
              `/profiles/basic/${post.profileId}`
            );
            user.id = post.profileId;
            return { ...post, user };
          } catch (error: any) {
            set({ error: error.message });
          }
        })
      );

      set({ posts: postsWithUsers });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
  getPostsByProfile: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await axiosInstance.get(`/posts/user/${id}`);

      const postsWithUsers = await Promise.all(
        data.posts.map(async (post: PostType) => {
          try {
            const { data: user } = await axiosInstance.get(
              `/profiles/basic/${post.profileId}`
            );
            return { ...post, user };
          } catch (error: any) {
            set({ error: error.message });
          }
        })
      );

      set({ posts: postsWithUsers });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));
