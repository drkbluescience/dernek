
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher = ({ className = "" }: LanguageSwitcherProps) => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "tr" ? "de" : "tr");
  };

  return (
    <Button 
      variant="ghost" 
      onClick={toggleLanguage}
      className={`text-society-neutral-gray flex items-center gap-1 ${className}`}
    >
      <Globe className="h-4 w-4" />
      <span>{t("language.switch.tr")}</span>
    </Button>
  );
};

export default LanguageSwitcher;
