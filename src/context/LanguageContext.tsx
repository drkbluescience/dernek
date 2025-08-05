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
  
  // Login page
  "login.title": {
    tr: "Giriş",
    de: "Anmeldung"
  },
  "login.welcome": {
    tr: "Tekrar Hoşgeldiniz",
    de: "Willkommen zurück"
  },
  "login.email": {
    tr: "E-posta",
    de: "E-Mail"
  },
  "login.email.placeholder": {
    tr: "E-posta adresinizi girin",
    de: "Geben Sie Ihre E-Mail-Adresse ein"
  },
  "login.member.number": {
    tr: "Üye Numarası",
    de: "Mitgliedsnummer"
  },
  "login.member.number.placeholder": {
    tr: "Üye numaranızı girin",
    de: "Geben Sie Ihre Mitgliedsnummer ein"
  },
  "login.password": {
    tr: "Şifre",
    de: "Passwort"
  },
  "login.password.placeholder": {
    tr: "Şifrenizi girin",
    de: "Geben Sie Ihr Passwort ein"
  },
  "login.button": {
    tr: "Giriş Yap",
    de: "Anmelden"
  },
  "login.processing": {
    tr: "Giriş yapılıyor...",
    de: "Anmeldung läuft..."
  },
  "login.no.account": {
    tr: "Hesabınız yok mu?",
    de: "Haben Sie kein Konto?"
  },
  "login.register": {
    tr: "Kayıt Ol",
    de: "Registrieren"
  },
  "login.forgot.password": {
    tr: "Şifremi Unuttum",
    de: "Passwort vergessen"
  },
  "login.activate.online": {
    tr: "Online Giriş Aktifleştirme",
    de: "Online-Login aktivieren"
  },
  
  // Forgot password page
  "forgot.password.title": {
    tr: "Şifremi Unuttum",
    de: "Passwort vergessen"
  },
  "forgot.password.header": {
    tr: "Şifre Sıfırlama",
    de: "Passwort zurücksetzen"
  },
  "forgot.password.description": {
    tr: "Şifrenizi sıfırlamak için lütfen aşağıdaki bilgileri doldurun.",
    de: "Bitte füllen Sie die folgenden Informationen aus, um Ihr Passwort zurückzusetzen."
  },
  "forgot.password.method.select": {
    tr: "Doğrulama yöntemi seçin",
    de: "Bestätigungsmethode auswählen"
  },
  "forgot.password.method.memberId": {
    tr: "Üye numarası",
    de: "Mitgliedsnummer"
  },
  "forgot.password.method.email": {
    tr: "E-posta",
    de: "E-Mail"
  },
  "forgot.password.method.phone": {
    tr: "Telefon numarası",
    de: "Telefonnummer"
  },
  "forgot.password.memberId.label": {
    tr: "Üye numarası",
    de: "Mitgliedsnummer"
  },
  "forgot.password.email.label": {
    tr: "E-posta",
    de: "E-Mail"
  },
  "forgot.password.phone.label": {
    tr: "Telefon numarası",
    de: "Telefonnummer"
  },
  "forgot.password.memberId.placeholder": {
    tr: "Üye numaranızı girin",
    de: "Geben Sie Ihre Mitgliedsnummer ein"
  },
  "forgot.password.email.placeholder": {
    tr: "E-posta adresinizi girin",
    de: "Geben Sie Ihre E-Mail-Adresse ein"
  },
  "forgot.password.phone.placeholder": {
    tr: "Telefon numaranızı girin",
    de: "Geben Sie Ihre Telefonnummer ein"
  },
  "forgot.password.submit": {
    tr: "Şifremi Sıfırla",
    de: "Passwort zurücksetzen"
  },
  "forgot.password.submitting": {
    tr: "İşleniyor...",
    de: "Wird bearbeitet..."
  },
  "forgot.password.success.title": {
    tr: "Başarılı",
    de: "Erfolgreich"
  },
  "forgot.password.success.description": {
    tr: "Şifre sıfırlama talebi alındı. Lütfen e-postanızı kontrol edin.",
    de: "Passwort-Zurücksetzungsanfrage wurde empfangen. Bitte überprüfen Sie Ihre E-Mail."
  },
  "forgot.password.error.title": {
    tr: "Hata",
    de: "Fehler"
  },
  "forgot.password.error.description": {
    tr: "Şifre sıfırlama işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.",
    de: "Bei der Passwort-Zurücksetzung ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut."
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
  "society.name": {
    tr: "Sosyal Dayanışma Dernegi",
    de: "Zentrum für Sosziale Unterstützung e.V."
  },
  "society.welcome": {
    tr: "Hoş geldiniz",
    de: "Willkommen"
  },
  "society.user": {
    tr: "Kullanıcı",
    de: "Benutzer"
  },
  "society.description": {
    tr: "Avrupa’ya Türk işgücü ile birlikte, başta Almanya olmak üzere Avrupa ülkelerinde özellikle dini ve sosyal ihtiyaçların karşılanabilmesi, karşılaşılan güçlüklerin üstesinden gelinebilmesi için dernekler kuruldu. ",
    de: "Eine Freiwilligenorganisation, die sich der Unterstützung der Gemeinschaft durch verschiedene soziale Dienstleistungen widmet."
  },
  "society.bank.edit": {
    tr: "Banka Bilgisi Degistir",
    de: "Ändern"
  },
  "society.bank.edit.title": {
    tr: "Banka Bilgisi Degistir",
    de: "Ändern"
  },
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
  "society.tab.documents": {
    tr: "Evrak Gönder",
    de: "Dokument senden"
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
    tr: "Çıkış Yap",
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
    tr: "Banka",
    de: "Bankname"
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
  "society.payment.total": {
    tr: "Toplam",
    de: "Gesamt"
  },
  "society.payment.entries": {
    tr: "kayıt",
    de: "Einträge"
  },
  "society.payment.page": {
    tr: "Sayfa",
    de: "Seite"
  },
  "society.payment.registered": {
    tr: "Kayıt Tarihi",
    de: "Eingetragen am"
  },
  "society.payment.showing": {
    tr: "Gösterilen",
    de: "Zeige"
  },
  "society.payment.of": {
    tr: "toplam",
    de: "von"
  },
  "society.payment.previous": {
    tr: "Önceki",
    de: "Zurück"
  },
  "society.payment.next": {
    tr: "Sonraki",
    de: "Weiter"
  },
  "society.payment.noData": {
    tr: "Ödeme geçmişi bulunamadı",
    de: "Keine Zahlungshistorie gefunden"
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
  "society.personal.status": {
    tr: "Üyelik Statüsü",
    de: "Mitgliedsstatus"
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
  "society.family.members": {
    tr: "Aile Üyeleri",
    de: "Familienmitglieder"
  },
  "society.family.relationship": {
    tr: "Yakınlık",
    de: "Verwandtschaft"
  },
  "society.family.gender": {
    tr: "Cinsiyet",
    de: "Geschlecht"
  },
  "society.family.memberNumber": {
    tr: "Üye Numarası",
    de: "Mitgliedsnummer"
  },
  "society.family.status": {
    tr: "Durum",
    de: "Status"
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
  "society.edit.error": {
    tr: "Güncelleme Hatası",
    de: "Aktualisierungsfehler"
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
  },
  
  // New translations for SelectionFields
  "registration.maritalStatus": {
    tr: "Medeni Durum",
    de: "Familienstand"
  },
  "registration.gender": {
    tr: "Cinsiyet",
    de: "Geschlecht"
  },
  "registration.nationality": {
    tr: "Uyruk",
    de: "Nationalität"
  },
  "registration.select": {
    tr: "Seçiniz",
    de: "Auswählen"
  },
  "registration.maritalStatus.single": {
    tr: "Bekar",
    de: "Ledig"
  },
  "registration.maritalStatus.married": {
    tr: "Evli",
    de: "Verheiratet"
  },
  "registration.maritalStatus.divorced": {
    tr: "Boşanmış",
    de: "Geschieden"
  },
  "registration.maritalStatus.widowed": {
    tr: "Dul",
    de: "Verwitwet"
  },
  "registration.gender.male": {
    tr: "Erkek",
    de: "Männlich"
  },
  "registration.gender.female": {
    tr: "Kadın",
    de: "Weiblich"
  },
  "registration.nationality.tr": {
    tr: "Türkiye",
    de: "Türkei"
  },
  "registration.nationality.de": {
    tr: "Almanya",
    de: "Deutschland"
  },
  "registration.nationality.al": {
    tr: "Arnavutluk",
    de: "Albanien"
  },
  "registration.nationality.ba": {
    tr: "Bosna",
    de: "Bosnien"
  },
  "registration.nationality.ko": {
    tr: "Kosova",
    de: "Kosovo"
  },
  "registration.nationality.other": {
    tr: "Diğer",
    de: "Andere"
  },
  
  // Online Activation page
  "activate.title": {
    tr: "Çevrimiçi Giriş Aktifleştirme",
    de: "Online-Login aktivieren"
  },
  "activate.header": {
    tr: "Çevrimiçi Giriş Aktifleştirme",
    de: "Online-Login aktivieren"
  },
  "activate.description": {
    tr: "Çevrimiçi hizmetlere erişmek için hesabınızı aktifleştirin.",
    de: "Aktivieren Sie Ihr Konto, um auf Online-Dienste zuzugreifen."
  },
  "activate.memberId": {
    tr: "Üye Numarası",
    de: "Mitgliedsnummer"
  },
  "activate.memberId.placeholder": {
    tr: "Üye numaranızı giriniz",
    de: "Geben Sie Ihre Mitgliedsnummer ein"
  },
  "activate.firstName": {
    tr: "Adı",
    de: "Vorname"
  },
  "activate.firstName.placeholder": {
    tr: "Adınızı giriniz",
    de: "Geben Sie Ihren Vornamen ein"
  },
  "activate.lastName": {
    tr: "Soyadı",
    de: "Nachname"
  },
  "activate.lastName.placeholder": {
    tr: "Soyadınızı giriniz",
    de: "Geben Sie Ihren Nachnamen ein"
  },
  "activate.birthDate": {
    tr: "Doğum Tarihi",
    de: "Geburtsdatum"
  },
  "activate.birthDate.placeholder": {
    tr: "Doğum tarihinizi seçin",
    de: "Wählen Sie Ihr Geburtsdatum"
  },
  "activate.contactInfo": {
    tr: "İletişim Bilgisi",
    de: "Kontaktinformation"
  },
  "activate.contactInfo.placeholder": {
    tr: "E-posta veya telefon numaranızı giriniz",
    de: "Geben Sie Ihre E-Mail oder Telefonnummer ein"
  },
  "activate.contactInfo.hint": {
    tr: "Şifre sıfırlama bağlantısı bu adrese gönderilecektir",
    de: "Ein Link zum Zurücksetzen des Passworts wird an diese Adresse gesendet"
  },
  "activate.submit": {
    tr: "Aktifleştir",
    de: "Aktivieren"
  },
  "activate.submitting": {
    tr: "Aktifleştiriliyor...",
    de: "Aktivierung..."
  },
  "activate.success.title": {
    tr: "Aktifleştirme Başarılı",
    de: "Aktivierung Erfolgreich"
  },
  "activate.success.description": {
    tr: "Hesabınız başarıyla aktifleştirildi. Giriş yapabilirsiniz.",
    de: "Ihr Konto wurde erfolgreich aktiviert. Sie können sich jetzt anmelden."
  },
  "activate.error.title": {
    tr: "Aktifleştirme Hatası",
    de: "Aktivierungsfehler"
  },
  "activate.error.description": {
    tr: "Hesap aktifleştirme sırasında bir hata oluştu. Lütfen bilgilerinizi kontrol edip tekrar deneyin.",
    de: "Bei der Aktivierung Ihres Kontos ist ein Fehler aufgetreten. Bitte überprüfen Sie Ihre Informationen und versuchen Sie es erneut."
  },

  // PWA Install Prompt
  "pwa.install.title": {
    tr: "Uygulamayı Yükle",
    de: "App installieren"
  },
  "pwa.install.description": {
    tr: "Ana ekranınıza ekleyin",
    de: "Zum Startbildschirm hinzufügen"
  },
  "pwa.install.button": {
    tr: "Yükle",
    de: "Installieren"
  },
  "pwa.offline.message": {
    tr: "Çevrimdışı mod aktif",
    de: "Offline-Modus aktiv"
  },

  // Document Upload Section
  "document.upload.title": {
    tr: "Evrak Gönder",
    de: "Dokument senden"
  },
  "document.upload.email": {
    tr: "E-posta",
    de: "E-Mail"
  },
  "document.upload.email.placeholder": {
    tr: "E-posta adresinizi girin",
    de: "Geben Sie Ihre E-Mail-Adresse ein"
  },
  "document.upload.subject": {
    tr: "Konu",
    de: "Betreff"
  },
  "document.upload.subject.placeholder": {
    tr: "Konu başlığını girin",
    de: "Geben Sie den Betreff ein"
  },
  "document.upload.message": {
    tr: "Mesaj Detayları",
    de: "Nachrichtendetails"
  },
  "document.upload.message.placeholder": {
    tr: "Mesajınızı detaylı olarak yazın...",
    de: "Schreiben Sie Ihre Nachricht detailliert..."
  },
  "document.upload.file": {
    tr: "Dosya",
    de: "Datei"
  },
  "document.upload.file.placeholder": {
    tr: "Dosya yüklemek için tıklayın veya sürükleyin",
    de: "Klicken oder ziehen Sie eine Datei zum Hochladen"
  },
  "document.upload.file.select": {
    tr: "Dosya Seç",
    de: "Datei auswählen"
  },
  "document.upload.file.types": {
    tr: "PDF, DOC, DOCX, JPG, PNG, TXT dosyaları desteklenir",
    de: "PDF, DOC, DOCX, JPG, PNG, TXT Dateien werden unterstützt"
  },
  "document.upload.submit": {
    tr: "Gönder",
    de: "Senden"
  },
  "document.upload.submitting": {
    tr: "Gönderiliyor...",
    de: "Wird gesendet..."
  },
  "document.upload.success": {
    tr: "Başarılı",
    de: "Erfolgreich"
  },
  "document.upload.success.description": {
    tr: "Evrakınız başarıyla gönderildi.",
    de: "Ihr Dokument wurde erfolgreich gesendet."
  },
  "document.upload.error": {
    tr: "Hata",
    de: "Fehler"
  },
  "document.upload.error.description": {
    tr: "Evrak gönderilirken bir hata oluştu.",
    de: "Beim Senden des Dokuments ist ein Fehler aufgetreten."
  },
  "document.upload.email.required": {
    tr: "E-posta adresi gereklidir.",
    de: "E-Mail-Adresse ist erforderlich."
  },
  "document.upload.subject.required": {
    tr: "Konu başlığı gereklidir.",
    de: "Betreff ist erforderlich."
  },
  "document.upload.message.required": {
    tr: "Mesaj detayları gereklidir.",
    de: "Nachrichtendetails sind erforderlich."
  },

  // Date picker translations
  "registration.year": {
    tr: "Yıl",
    de: "Jahr"
  },
  "registration.year.select": {
    tr: "Yıl seç",
    de: "Jahr auswählen"
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
