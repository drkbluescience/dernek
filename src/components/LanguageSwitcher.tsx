
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useState } from "react";

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher = ({ className = "" }: LanguageSwitcherProps) => {
  const { language, setLanguage, t } = useLanguage();
  // Add state to force re-render when language changes
  const [currentLanguage, setCurrentLanguage] = useState(language);
  
  useEffect(() => {
    setCurrentLanguage(language);
  }, [language]);

  const toggleLanguage = () => {
    const newLanguage = language === "tr" ? "de" : "tr";
    setLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
  };

  return (
    <Button 
      variant="ghost" 
      onClick={toggleLanguage}
      className={`text-society-neutral-gray flex items-center gap-1 hover:bg-society-soft-purple hover:text-society-purple ${className}`}
    >
      <Globe className="h-4 w-4" />
      <span>{t("language.switch.tr")}</span>
    </Button>
  );
};

export default LanguageSwitcher;
