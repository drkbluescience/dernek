
import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
  const { t } = useLanguage();
  
  return (
    <Button 
      variant="outline" 
      className="w-full border-society-purple text-society-purple hover:bg-society-soft-purple hover:text-society-purple mt-6 dark:border-purple-500 dark:text-purple-400 dark:hover:bg-purple-900"
      onClick={onLogout}
    >
      {t("society.logout")}
    </Button>
  );
};

export default LogoutButton;
