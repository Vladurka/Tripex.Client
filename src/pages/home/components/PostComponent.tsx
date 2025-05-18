import type { Post } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { MessageCircle, Pin, Zap } from "lucide-react";

export const PostComponent = (post: Post) => {
  return (
    <div key={post.id} className="card bg-base-200 shadow-sm shadow-amber-50">
      <div className="card-body py-2 px-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="avatar">
            <div className="w-10 rounded-full cursor-pointer">
              <img
                src={
                  post.user.avatarUrl === ""
                    ? "/avatar.png"
                    : post.user.avatarUrl
                }
                alt="Avatar"
              />
            </div>
          </div>
          <span className="font-semibold">{post.user.profileName}</span>
        </div>

        <div className="mb-3 border-y">
          <img
            src={post.contentUrl}
            alt="Post"
            className="rounded-lg object-cover w-full max-h-[500px]"
          />
          <div className="flex my-3 justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Zap className="w-6 h-6 cursor-pointer" />
                <span className="text-sm">32</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-6 h-6 cursor-pointer" />
                <span className="text-sm">100</span>
              </div>
            </div>
            <Pin className="w-6 h-6 cursor-pointer" />
          </div>
        </div>

        <div className="space-y-1 text-sm">
          <div className="text-sm">
            <span className="font-semibold">{post.user.profileName}:</span>
            &nbsp;{post.description}
          </div>
          <div className="text-gray-400 text-xs">
            <div className="text-gray-400 text-xs">
              {formatDistanceToNow(new Date(post.createdAt))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
