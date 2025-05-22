import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/home/HomePage";
import { useAuthStore } from "./stores/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { LogInPage } from "./pages/login/LogInPage";
import { SignUpPage } from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";

export const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!authUser && isCheckingAuth) {
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
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </div>
    </>
  );
};
