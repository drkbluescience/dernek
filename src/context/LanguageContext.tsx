
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "tr" | "de";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const defaultLanguage: Language = "tr";

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// All translations
export const translations: Record<string, Record<Language, string>> = {
  // Welcome page
  "welcome.title": {
    tr: "Zsu",
    de: "Zsu"
  },
  "welcome.description": {
    tr: "Hoşgeldiniz",
    de: "Willkommen"
  },
  "welcome.login": {
    tr: "Giriş Yap",
    de: "Anmelden"
  },
  "welcome.register": {
    tr: "Kayıt Ol",
    de: "Registrieren"
  },
  "welcome.copyright": {
    tr: "© 2025 Society Connect. Tüm hakları saklıdır.",
    de: "© 2025 Society Connect. Alle Rechte vorbehalten."
  },
  
  // Registration page
  "register.title": {
    tr: "Kayıt",
    de: "Registrierung"
  },
  "registration.personal.title": {
    tr: "Kişisel Bilgiler",
    de: "Persönliche Informationen"
  },
  "registration.address.title": {
    tr: "Adres Bilgileri",
    de: "Adressinformationen"
  },
  "registration.bank.title": {
    tr: "Banka Bilgileri",
    de: "Bankinformationen"
  },
  "registration.documents.title": {
    tr: "Belge Yükleme",
    de: "Dokumenten-Upload"
  },
  "registration.family.title": {
    tr: "Eş Bilgileri",
    de: "Ehepartnerinformationen"
  },
  "registration.children.title": {
    tr: "Çocuk Bilgileri",
    de: "Kinderinformationen"
  },
  "registration.button.next": {
    tr: "İleri",
    de: "Weiter"
  },
  "registration.button.previous": {
    tr: "Geri",
    de: "Zurück"
  },
  "registration.button.skip": {
    tr: "Atla",
    de: "Überspringen"
  },
  "registration.button.complete": {
    tr: "Kaydı Tamamla",
    de: "Registrierung abschließen"
  },
  "registration.optional": {
    tr: "Opsiyonel",
    de: "Optional"
  },
  "registration.success": {
    tr: "Kayıt Başarılı",
    de: "Registrierung Erfolgreich"
  },
  "registration.success.description": {
    tr: "Hesabınız başarıyla oluşturuldu!",
    de: "Ihr Konto wurde erfolgreich erstellt!"
  },
  "registration.error": {
    tr: "Kayıt Hatası",
    de: "Registrierungsfehler"
  },
  "registration.error.description": {
    tr: "Kayıt işlemi sırasında bir hata oluştu.",
    de: "Bei der Registrierung ist ein Fehler aufgetreten."
  },
  "language.switch.tr": {
    tr: "Deutsch",
    de: "Türkçe"
  }
};

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  // Try to get language from localStorage or use default
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language");
    return (savedLanguage === "tr" || savedLanguage === "de") ? savedLanguage : defaultLanguage;
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // Translate function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language] || key;
  };

  // Set language function
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook for using the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
