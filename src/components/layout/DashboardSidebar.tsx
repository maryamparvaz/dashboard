
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  LayoutDashboard, 
  BarChart, 
  LineChart, 
  Settings, 
  Menu, 
  LogOut, 
  Sun, 
  Moon 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const DashboardSidebar = ({ isDarkMode, toggleDarkMode }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { label: "Home", icon: <LayoutDashboard size={22} />, path: "/dashboard" },
    { label: "Reports", icon: <BarChart size={22} />, path: "/dashboard/reports" },
    { label: "Charts", icon: <LineChart size={22} />, path: "/dashboard/charts" },
    { label: "Settings", icon: <Settings size={22} />, path: "/dashboard/settings" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // On mobile, show a top bar; on desktop, show a side nav
  if (isMobile) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
        {/* Mobile Top Bar */}
        <div className="h-16 px-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} />
          </Button>
          <h1 className="text-lg font-bold">Dashboard</h1>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
            >
              <LogOut size={20} />
            </Button>
          </div>
        </div>
        
        {/* Mobile slide-out menu */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div 
              className="h-full w-64 bg-background border-r shadow-lg animate-slide-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 space-y-6">
                {menuItems.map((item) => (
                  <Button
                    key={item.label}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      navigate(item.path);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop sidebar
  return (
    <div
      className={cn(
        "h-screen bg-sidebar fixed left-0 top-0 border-r transition-all duration-300 z-40",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 h-6 w-6 rounded-full border bg-background shadow-md"
      >
        <Menu size={12} />
      </Button>

      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center justify-center h-16">
          {!isCollapsed && (
            <h1 className="font-bold text-xl text-sidebar-foreground">
              Dashboard
            </h1>
          )}
        </div>

        <div className="flex-grow p-3 space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              onClick={() => navigate(item.path)}
              className={cn(
                "w-full justify-start",
                isCollapsed ? "px-0 justify-center" : ""
              )}
            >
              <span className={isCollapsed ? "" : "mr-3"}>{item.icon}</span>
              {!isCollapsed && <span>{item.label}</span>}
            </Button>
          ))}
        </div>

        <div className="p-3 space-y-2">
          <Button
            variant="ghost"
            size={isCollapsed ? "icon" : "default"}
            onClick={toggleDarkMode}
            className={isCollapsed ? "w-10 h-10 mx-auto" : "w-full justify-start"}
          >
            {isDarkMode ? (
              <>
                <Sun size={20} className={isCollapsed ? "" : "mr-3"} />
                {!isCollapsed && <span>Light Mode</span>}
              </>
            ) : (
              <>
                <Moon size={20} className={isCollapsed ? "" : "mr-3"} />
                {!isCollapsed && <span>Dark Mode</span>}
              </>
            )}
          </Button>
          <Button
            variant="ghost"
            size={isCollapsed ? "icon" : "default"}
            onClick={handleLogout}
            className={isCollapsed ? "w-10 h-10 mx-auto" : "w-full justify-start"}
          >
            <LogOut size={20} className={isCollapsed ? "" : "mr-3"} />
            {!isCollapsed && <span>Logout</span>}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
