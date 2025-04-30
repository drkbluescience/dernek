
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

type Language = "tr" | "de";

interface Translations {
  welcome: string;
  description: string;
  login: string;
  register: string;
  copyright: string;
}

const translations: Record<Language, Translations> = {
  tr: {
    welcome: "Zsu",
    description: "Hoşgeldiniz",
    login: "Giriş Yap",
    register: "Kayıt Ol",
    copyright: "© 2025 Society Connect. Tüm hakları saklıdır."
  },
  de: {
    welcome: "Zsu",
    description: "Willkommen",
    login: "Anmelden",
    register: "Registrieren",
    copyright: "© 2025 Society Connect. Alle Rechte vorbehalten."
  }
};

const Welcome = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<Language>("tr");
  const t = translations[language];

  const toggleLanguage = () => {
    setLanguage(prev => prev === "tr" ? "de" : "tr");
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-gradient-to-b from-white to-society-soft-purple p-6">
      <div className="flex justify-end">
        <Button 
          variant="ghost" 
          onClick={toggleLanguage}
          className="text-society-neutral-gray"
        >
          {language === "tr" ? "Deutsch" : "Türkçe"}
        </Button>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-society-dark-text">
            {t.welcome}
          </h1>
          <p className="text-lg text-society-neutral-gray max-w-xs mx-auto">
            {t.description}
          </p>
        </div>
        
        <div className="h-48 w-48 rounded-full bg-society-purple bg-opacity-20 flex items-center justify-center">
          <div className="h-36 w-36 rounded-full bg-society-purple bg-opacity-30 flex items-center justify-center">
            <div className="h-24 w-24 rounded-full bg-society-purple flex items-center justify-center text-white text-4xl font-bold">
              SC
            </div>
          </div>
        </div>
        
        <div className="space-y-4 w-full max-w-xs">
          <Button
            onClick={() => navigate("/login")}
            className="w-full bg-society-purple hover:bg-opacity-90 text-white py-3 rounded-lg font-medium"
          >
            {t.login}
          </Button>
          <Button
            onClick={() => navigate("/register")}
            variant="outline"
            className="w-full bg-white hover:bg-gray-50 text-society-purple border-society-purple py-3 rounded-lg font-medium"
          >
            {t.register}
          </Button>
        </div>
      </div>
      
      <p className="text-center text-sm text-society-neutral-gray pt-4">
        {t.copyright}
      </p>
    </div>
  );
};

export default Welcome;
