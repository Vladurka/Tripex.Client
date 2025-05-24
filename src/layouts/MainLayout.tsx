import { Sidebar } from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="bg-base-200">
      <Sidebar />
      <Outlet />
    </div>
  );
};
