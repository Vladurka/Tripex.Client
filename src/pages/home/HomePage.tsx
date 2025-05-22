import { usePostStore } from "@/stores/usePostStore";
import { Image, MessageCircle, User } from "lucide-react";
import { useEffect } from "react";
import type { Post } from "@/types";
import { PostComponent } from "./components/PostComponent";
import { MessageSkeleton } from "./components/MessageSkeleton";
import { PostSkeleton } from "./components/PostSkeleton";
import { UserSkeleton } from "./components/UserSkeleton";
import { Sidebar } from "@/components/Sidebar";

export const HomePage = () => {
  const { posts, isLoading, getPosts } = usePostStore();

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  if (isLoading || !Array.isArray(posts)) {
    return (
      <div className="min-h-screen bg-base-200 text-white pt-6 px-4 ml-0 md:ml-80">
        <div className="w-full max-w-xl space-y-6 px-4">
          {posts.map((post: Post) => (
            <PostSkeleton key={post.id} {...post} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <Sidebar />
      <div className="flex ml-0 md:ml-80 w-[600px] h-[90vh] bg-base-100 rounded-xl shadow-lg text-white flex-col overflow-hidden mt-9">
        <div className="flex gap-3 border-b border-white pl-12 py-3">
          <Image className="w-6 h-6 text-white" />
          <h2 className="text-xl font-bold tracking-wide">Posts</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="w-full max-w-xl space-y-6 px-4">
            {posts.map((post: Post) => (
              <PostComponent key={post.id} {...post} />
            ))}
          </div>
        </div>
      </div>

      <div className="hidden xl:flex fixed left-242 top-4 w-[300px] h-[90vh] bg-base-100 rounded-xl shadow-lg text-white flex-col overflow-hidden mt-5">
        <div className="flex gap-3 border-b  border-white pl-9 py-3">
          <User className="w-6 h-6 text-white" />
          <h2 className="text-xl font-bold tracking-wide">Recommendations</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <UserSkeleton key={index} />
          ))}
        </div>
      </div>

      <div className="hidden 2xl:flex fixed right-4 top-4 w-[350px] h-[90vh] bg-base-100 rounded-xl shadow-lg text-white flex-col overflow-hidden mt-5">
        <div className="flex gap-3 border-b  border-white pl-9 py-3">
          <MessageCircle className="w-6 h-6 text-white" />
          <h2 className="text-xl font-bold tracking-wide">Chats</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <MessageSkeleton key={index} />
          ))}
        </div>
      </div>
    </>
  );
};
