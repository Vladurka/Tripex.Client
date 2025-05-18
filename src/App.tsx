import { Routes, Route } from "react-router-dom";
import { Sidebar } from "./components/Sidebar";
import { HomePage } from "./pages/home/HomePage";

export const App = () => {
  return (
    <div className="flex bg-base-200">
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
};
