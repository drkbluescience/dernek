
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher = ({ className = "" }: LanguageSwitcherProps) => {
  const { language, setLanguage, t } = useLanguage();
  
  const toggleLanguage = () => {
    // Toggle language between tr and de
    const newLanguage = language === "tr" ? "de" : "tr";
    setLanguage(newLanguage);
  };

  // Display the opposite language of the current one
  const displayLanguage = language === "tr" ? "Deutsch" : "Türkçe";

  return (
    <Button 
      variant="ghost" 
      onClick={toggleLanguage}
      className={`text-society-neutral-gray flex items-center gap-1 hover:bg-society-soft-purple hover:text-society-purple ${className}`}
    >
      <Globe className="h-4 w-4" />
      <span>{displayLanguage}</span>
    </Button>
  );
};

export default LanguageSwitcher;
