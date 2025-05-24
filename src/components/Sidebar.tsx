import {
  BadgePlus,
  HomeIcon,
  LogIn,
  LogOut,
  MessageCircle,
  Search,
  Settings,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";
import { useProfileStore } from "@/stores/useProfileStore";
import { useNavigate } from "react-router-dom";

export const Sidebar = () => {
  const { userId, logout } = useAuthStore();
  const { basicProfile, getBasicProfile } = useProfileStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      getBasicProfile(userId);
    }
  }, [userId, getBasicProfile]);

  return (
    <aside className="fixed w-70 h-screen flex-col justify-between hidden md:flex bg-base-100">
      <div className="p-4 space-y-4">
        <img src="/logo.png" alt="logo" />
        <button
          className="btn btn-primary w-full justify-start gap-2"
          onClick={() => navigate("/")}
        >
          <HomeIcon className="w-6 h-6" aria-hidden="true" />
          Main
        </button>
        <button className="btn btn-primary w-full justify-start gap-2">
          <Search className="w-6 h-6" aria-hidden="true" />
          Search
        </button>
        <button className="btn btn-primary w-full justify-start gap-2">
          <MessageCircle className="w-6 h-6" aria-hidden="true" />
          Messages
        </button>
        <button className="btn btn-primary w-full justify-start gap-2">
          <BadgePlus className="w-6 h-6" aria-hidden="true" />
          Create
        </button>
        <button
          className="btn btn-primary w-full justify-start gap-2"
          onClick={() => navigate("/profile/" + userId)}
        >
          <Avatar className="w-6 h-6">
            <AvatarImage
              src={(userId && basicProfile?.avatarUrl) ?? "/avatar.png"}
              alt="Avatar"
            />
            <AvatarFallback>{"/avatar.png"}</AvatarFallback>
          </Avatar>
          My Profile
        </button>
      </div>
      <div className="space-y-4 p-4">
        <button className="btn btn-primary w-full justify-start gap-2">
          <Settings className="w-5 h-5" aria-hidden="true" />
          Settings
        </button>
        <button
          className="btn btn-primary w-full justify-start gap-2"
          onClick={userId ? logout : () => navigate("/login")}
        >
          {userId ? (
            <>
              <LogOut className="w-5 h-5" aria-hidden="true" />
              Log Out
            </>
          ) : (
            <>
              <LogIn className="w-5 h-5" aria-hidden="true" />
              Log In
            </>
          )}
        </button>
      </div>
    </aside>
  );
};
