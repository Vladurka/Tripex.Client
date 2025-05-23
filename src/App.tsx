import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/home/HomePage";
import { useAuthStore } from "./stores/useAuthStore";
import { use, useEffect } from "react";
import { Loader } from "lucide-react";
import { LogInPage } from "./pages/login/LogInPage";
import { SignUpPage } from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { Profile } from "./pages/profile/Profile";

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
      <div className="flex bg-base-200">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/profile/me"
            element={userId ? <Profile /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={userId ? <Navigate to="/" /> : <LogInPage />}
          />
          <Route
            path="/signup"
            element={userId ? <Navigate to="/" /> : <SignUpPage />}
          />
        </Routes>
      </div>
    </>
  );
};
