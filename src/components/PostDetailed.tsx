import { useState } from "react";
import type { PostType } from "@/types";
import { MessageCircle, Pin, Zap } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  post: PostType;
  onClose: () => void;
};

export const PostDetailed = ({ post, onClose }: Props) => {
  const [comment, setComment] = useState("");

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const [pinned, setPinned] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  if (!post) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center ml-10 mb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-base-300 text-white w-full max-w-5xl h-[90vh] rounded-xl overflow-hidden flex shadow-xl"
        initial={{ scale: 0.95, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-1/2 bg-black flex items-center justify-center">
          <img
            src={post.contentUrl}
            alt="post"
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <div className="w-1/2 flex flex-col">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center">
            <div className="inline-flex gap-3 mt-2">
              <img
                src={post.user.avatarUrl ?? "/avatar.png"}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="font-semibold mt-2">{post.user.profileName}</div>
            </div>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-xl cursor-pointer"
            >
              ✕
            </button>
          </div>

          {post.description && (
            <div className="p-4 text-sm border-b border-gray-700">
              <p>
                <span className="font-bold mr-1">{post.user.profileName}:</span>
                {post.description}
              </p>
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            <i>No comments yet</i>
          </div>

          <div className="flex my-3 justify-between items-center mx-6">
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

          <div className="p-4 border-t border-gray-700 flex">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 bg-base-300 text-white placeholder-gray-500 text-sm outline-none"
            />
            <button
              className="text-blue-500 text-sm font-semibold ml-2 disabled:opacity-50 cursor-pointer"
              disabled={!comment}
            >
              Post
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
