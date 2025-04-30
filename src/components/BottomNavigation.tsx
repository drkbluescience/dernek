
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, User, Settings } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 z-10">
      <div className="max-w-md mx-auto flex justify-around items-center h-16">
        <button 
          onClick={() => navigate("/")}
          className={`flex flex-col items-center justify-center px-4 py-2 rounded-md transition-colors ${
            isActive("/") 
              ? "text-society-purple dark:text-purple-400" 
              : "text-gray-500 dark:text-gray-400 hover:text-society-purple dark:hover:text-purple-400"
          }`}
        >
          <Home size={20} />
          <span className="text-xs mt-1">{t("society.navigation.home")}</span>
        </button>
        
        <button 
          onClick={() => navigate("/society-details")}
          className={`flex flex-col items-center justify-center px-4 py-2 rounded-md transition-colors ${
            isActive("/society-details") 
              ? "text-society-purple dark:text-purple-400" 
              : "text-gray-500 dark:text-gray-400 hover:text-society-purple dark:hover:text-purple-400"
          }`}
        >
          <User size={20} />
          <span className="text-xs mt-1">{t("society.navigation.profile")}</span>
        </button>
        
        <button 
          onClick={() => navigate("/settings")}
          className={`flex flex-col items-center justify-center px-4 py-2 rounded-md transition-colors ${
            isActive("/settings") 
              ? "text-society-purple dark:text-purple-400" 
              : "text-gray-500 dark:text-gray-400 hover:text-society-purple dark:hover:text-purple-400"
          }`}
        >
          <Settings size={20} />
          <span className="text-xs mt-1">{t("society.navigation.settings")}</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNavigation;
