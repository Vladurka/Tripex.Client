import {
  BadgePlus,
  HomeIcon,
  LogOut,
  MessageCircle,
  Search,
  Settings,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useProfileStore } from "@/stores/useProfileStore";
import { useEffect } from "react";

export const Sidebar = () => {
  const { basicProfile, getBasicProfile } = useProfileStore();
  useEffect(() => {
    getBasicProfile("fcf05fc7-44cc-4455-8883-2d47e1221146");
  }, [getBasicProfile]);

  return (
    <aside className="fixed w-70 h-screen bg-base-200 flex-col justify-between hidden md:flex ">
      <div className="p-4 space-y-4">
        <img src="/logo.png" alt="logo" />
        <button className="btn btn-primary w-full justify-start gap-2">
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
        <button className="btn btn-primary w-full justify-start gap-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src={basicProfile?.avatarUrl} alt="Avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          Profile
        </button>
      </div>
      <div className="space-y-4 p-4">
        <button className="btn btn-primary w-full justify-start gap-2">
          <Settings className="w-5 h-5" aria-hidden="true" />
          Settings
        </button>
        <button className="btn btn-primary w-full justify-start gap-2">
          <LogOut className="w-5 h-5" aria-hidden="true" />
          Log out
        </button>
      </div>
    </aside>
  );
};
