import React from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun, Monitor } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import BottomNavigation from "@/components/BottomNavigation";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "@/utils/authUtils";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Settings = () => {
  const { t } = useLanguage();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const navigate = useNavigate();

  // Removed the authentication check to allow access to settings page when not logged in
  // We still keep the navigate import for potential future use

  // Get icon based on theme
  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-5 w-5 text-orange-500" />;
      case "dark":
        return <Moon className="h-5 w-5 text-blue-400" />;
      case "system":
        return <Monitor className="h-5 w-5 text-slate-500" />;
    }
  };

  return (
    <div className="page-container pb-20">
      <Header title={t("society.navigation.settings")} />
      
      <div className="space-y-6 w-full animate-fade-in">
        <Card>
          <CardContent className="p-6 space-y-6">
            {/* Theme Options */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getThemeIcon()}
                <Label htmlFor="theme-mode">{t("society.settings.darkmode")}</Label>
              </div>
              <Select
                value={theme}
                onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4 text-orange-500" />
                      <span>Light</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="dark">
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4 text-blue-400" />
                      <span>Dark</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="system">
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-slate-500" />
                      <span>System</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Dark Mode Toggle (simple on/off) */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {resolvedTheme === "light" ? (
                  <Sun className="h-5 w-5 text-orange-500" />
                ) : (
                  <Moon className="h-5 w-5 text-blue-400" />
                )}
                <Label htmlFor="dark-mode-toggle">{t("society.settings.darkmode")}</Label>
              </div>
              <Switch 
                id="dark-mode-toggle" 
                checked={resolvedTheme === "dark"} 
                onCheckedChange={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
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
