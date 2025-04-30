
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "tr" | "de";

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, ...args: any[]) => string;
}

const defaultLanguage: Language = "tr";

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// All translations
export const translations: Record<string, Record<Language, string>> = {
  // Welcome page
  "welcome.title": {
    tr: "Sosyal Dayanışma Dernegi",
    de: "Zentrum für Sosziale Unterstützung e.V."
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
    tr: "© 2025 Zsu e.V. Tüm hakları saklıdır.",
    de: "© 2025 Zsu e.V. Alle Rechte vorbehalten."
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
  },
  
  // Society Details page
  "society.details.title": {
    tr: "Üye Detayları",
    de: "Mitgliedsdetails"
  },
  "society.welcome": {
    tr: "Hoş geldiniz",
    de: "Willkommen"
  },
  "society.member.since": {
    tr: "Üyelik başlangıcı",
    de: "Mitglied seit"
  },
  "society.tab.personal": {
    tr: "Kişisel Bilgiler",
    de: "Persönliche Informationen"
  },
  "society.tab.family": {
    tr: "Aile Bilgileri",
    de: "Familieninformationen"
  },
  "society.tab.bank": {
    tr: "Banka Bilgileri",
    de: "Bankinformationen"
  },
  "society.tab.payments": {
    tr: "Ödeme Geçmişi",
    de: "Zahlungsverlauf"
  },
  "society.founded": {
    tr: "Kuruluş",
    de: "Gegründet"
  },
  "society.members": {
    tr: "Üyeler",
    de: "Mitglieder"
  },
  "society.events": {
    tr: "Etkinlikler",
    de: "Veranstaltungen"
  },
  "society.committee": {
    tr: "Yönetim Kurulu",
    de: "Vorstand"
  },
  "society.logout": {
    tr: "Ç��kış Yap",
    de: "Abmelden"
  },
  "society.navigation.home": {
    tr: "Ana Sayfa",
    de: "Startseite"
  },
  "society.navigation.profile": {
    tr: "Profil",
    de: "Profil"
  },
  "society.navigation.settings": {
    tr: "Ayarlar",
    de: "Einstellungen"
  },
  "society.settings.darkmode": {
    tr: "Karanlık Mod",
    de: "Dunkler Modus"
  },
  "society.bank.account": {
    tr: "Hesap",
    de: "Konto"
  },
  "society.bank.holder": {
    tr: "Hesap Sahibi",
    de: "Kontoinhaber"
  },
  "society.bank.iban": {
    tr: "IBAN",
    de: "IBAN"
  },
  "society.bank.bic": {
    tr: "BIC",
    de: "BIC"
  },
  "society.payment.date": {
    tr: "Tarih",
    de: "Datum"
  },
  "society.payment.amount": {
    tr: "Tutar",
    de: "Betrag"
  },
  "society.payment.type": {
    tr: "İşlem Türü",
    de: "Transaktionstyp"
  },
  "society.payment.status": {
    tr: "Durum",
    de: "Status"
  },
  // New keys for editing functionality
  "society.personal.name": {
    tr: "Ad Soyad",
    de: "Name"
  },
  "society.personal.birthDate": {
    tr: "Doğum Tarihi",
    de: "Geburtsdatum"
  },
  "society.personal.gender": {
    tr: "Cinsiyet",
    de: "Geschlecht"
  },
  "society.personal.email": {
    tr: "E-posta",
    de: "E-Mail"
  },
  "society.personal.phone": {
    tr: "Telefon",
    de: "Telefon"
  },
  "society.personal.address": {
    tr: "Adres",
    de: "Adresse"
  },
  "society.family.maritalStatus": {
    tr: "Medeni Durum",
    de: "Familienstand"
  },
  "society.family.spouse": {
    tr: "Eş",
    de: "Ehepartner/in"
  },
  "society.family.children": {
    tr: "Çocuklar",
    de: "Kinder"
  },
  "society.family.name": {
    tr: "Ad Soyad",
    de: "Name"
  },
  "society.family.birthDate": {
    tr: "Doğum Tarihi",
    de: "Geburtsdatum"
  },
  "society.edit.title": {
    tr: "Bilgi Düzenle",
    de: "Information bearbeiten"
  },
  "society.edit.save": {
    tr: "Kaydet",
    de: "Speichern"
  },
  "society.edit.cancel": {
    tr: "İptal",
    de: "Abbrechen"
  },
  "society.edit.success": {
    tr: "Güncelleme Başarılı",
    de: "Aktualisierung erfolgreich"
  },
  "society.edit.success.description": {
    tr: "Bilgileriniz başarıyla güncellendi.",
    de: "Ihre Informationen wurden erfolgreich aktualisiert."
  },
  
  // Form validation messages
  "validation.required": {
    tr: "Bu alan zorunludur",
    de: "Dieses Feld ist erforderlich"
  },
  "validation.email": {
    tr: "Geçerli bir e-posta adresi giriniz",
    de: "Bitte geben Sie eine gültige E-Mail-Adresse ein"
  },
  "validation.minLength": {
    tr: "En az {0} karakter giriniz",
    de: "Geben Sie mindestens {0} Zeichen ein"
  },
  "validation.maxLength": {
    tr: "En fazla {0} karakter girebilirsiniz",
    de: "Sie können höchstens {0} Zeichen eingeben"
  },
  "validation.pattern": {
    tr: "Geçersiz format",
    de: "Ungültiges Format"
  },
  "validation.numeric": {
    tr: "Sadece rakam giriniz",
    de: "Bitte geben Sie nur Zahlen ein"
  },
  "validation.date": {
    tr: "Geçerli bir tarih giriniz",
    de: "Bitte geben Sie ein gültiges Datum ein"
  },
  "validation.field.empty": {
    tr: "Bu alanı doldurun",
    de: "Fülle dieses Feld aus"
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
    // Force a re-render of components using the language context
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  // Translate function
  const t = (key: string, ...args: any[]): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    
    let translatedText = translations[key][language] || key;
    
    // Replace placeholders like {0}, {1} with arguments
    if (args && args.length > 0) {
      args.forEach((arg, index) => {
        translatedText = translatedText.replace(`{${index}}`, arg);
      });
    }
    
    return translatedText;
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
