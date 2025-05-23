import { Sidebar } from "@/components/Sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/stores/useAuthStore";
import { usePostStore } from "@/stores/usePostStore";
import { useProfileStore } from "@/stores/useProfileStore";
import { useEffect } from "react";

export const Profile = () => {
  const { profile, getProfile } = useProfileStore();
  const { userId } = useAuthStore();
  const { posts, getPostsByProfile } = usePostStore();

  useEffect(() => {
    if (!userId) return;
    getProfile(userId);
    getPostsByProfile(userId);
  }, [getProfile, getPostsByProfile, userId]);

  if (!userId || !profile) return null;

  return (
    <>
      <Sidebar />
      <div className="ml-[35%] mx-auto p-6 bg-base-200 min-h-screen">
        <div className="flex items-center gap-8">
          <Avatar className="w-45 h-45">
            <AvatarImage
              src={profile.avatarUrl ?? "/avatar.png"}
              alt="Avatar"
            />
            <AvatarFallback>
              {profile.profileName?.[0]?.toUpperCase() ?? "?"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold text-primary-content">
              {profile.profileName}
            </h1>
            <div className="flex gap-6 text-sm mt-2 text-primary-content">
              <span>
                <strong>{posts.length}</strong> posts
              </span>
              <span>
                <strong>{profile.followersCount}</strong> followers
              </span>
              <span>
                <strong>{profile.followingCount}</strong> following
              </span>
            </div>
            <p className="mt-2 text-sm text-primary-content font-semibold">
              {profile.firstName} {profile.lastName}
            </p>
            <p className="text-sm text-primary-content">
              📢 {profile.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-8">
          {posts.map((post, index) => (
            <img
              key={index}
              src={post.contentUrl}
              alt={`Post ${index + 1}`}
              className="h-full aspect-square object-cover"
            />
          ))}
        </div>
      </div>
    </>
  );
};
