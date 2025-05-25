import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/home/HomePage";
import { LogInPage } from "./pages/login/LogInPage";
import { SignUpPage } from "./pages/signup/SignUpPage";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { useAuthStore } from "./stores/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { MainLayout } from "./layouts/MainLayout"; // путь к layout

export const App = () => {
  const { userId, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!userId && isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route
            path="profile/:id"
            element={userId ? <ProfilePage /> : <Navigate to="/login" />}
          />
        </Route>

        <Route
          path="/login"
          element={userId ? <Navigate to="/" /> : <LogInPage />}
        />
        <Route
          path="/signup"
          element={userId ? <Navigate to="/" /> : <SignUpPage />}
        />
      </Routes>
    </>
  );
};
