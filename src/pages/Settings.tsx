
import React from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import BottomNavigation from "@/components/BottomNavigation";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/utils/authUtils";
import { useEffect } from "react";

const Settings = () => {
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="page-container pb-20">
      <Header title={t("society.navigation.settings")} />
      
      <div className="space-y-6 w-full animate-fade-in">
        <Card>
          <CardContent className="p-6 space-y-6">
            {/* Theme Switch */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {theme === "light" ? (
                  <Sun className="h-5 w-5 text-orange-500" />
                ) : (
                  <Moon className="h-5 w-5 text-blue-400" />
                )}
                <Label htmlFor="theme-mode">{t("society.settings.darkmode")}</Label>
              </div>
              <Switch 
                id="theme-mode" 
                checked={theme === "dark"} 
                onCheckedChange={toggleTheme}
              />
            </div>
            
            {/* Language */}
            <div className="flex items-center justify-between">
              <Label>Dil / Sprache</Label>
              <LanguageSwitcher />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Settings;
