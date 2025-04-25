
import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import DashboardSidebar from "@/components/layout/DashboardSidebar";

const DashboardLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" ||
    window.matchMedia("(prefers-color-scheme: light)").matches
  );
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode.toString());
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <DashboardSidebar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className={`transition-all duration-300 ${isMobile ? 'pt-16' : 'ml-16 md:ml-64'}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
