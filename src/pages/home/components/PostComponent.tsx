import type { Post } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { MessageCircle, Pin, Zap } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PostComponent = (post: Post) => {
  const navigate = useNavigate();

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const [pinned, setPinned] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div key={post.id} className="card bg-base-200 shadow-sm shadow-amber-50">
      <div className="card-body py-2 px-4">
        <div className="flex items-center space-x-3 mb-3">
          <img
            src={post.user.avatarUrl ?? "/avatar.png"}
            alt="Avatar"
            className="avatar w-10 rounded-full cursor-pointer"
            onClick={() => navigate(`/profile/${post.user.id}`)}
          />
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
                <Zap
                  className={`w-6 h-6 cursor-pointer transition-colors duration-200 ${
                    liked ? "text-yellow-500" : "text-primary-content"
                  }`}
                  onClick={handleLike}
                />
                <span className="text-sm">{likeCount}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-6 h-6 cursor-pointer" />
                <span className="text-sm">100</span>
              </div>
            </div>
            <Pin
              className={`w-6 h-6 cursor-pointer transition-colors duration-200 ${
                pinned ? "text-yellow-500" : "text-primary-content"
              }`}
              onClick={() => setPinned(!pinned)}
            />
          </div>
        </div>

        <div className="space-y-1 text-sm">
          <div className="text-sm">
            <span className="font-semibold">{post.user.profileName}:</span>
            &nbsp;{post.description}
          </div>
          <div className="text-gray-400 text-xs">
            <div className="text-gray-400 text-xs">
              {new Date(post.createdAt + "Z").toLocaleString("en-En", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
