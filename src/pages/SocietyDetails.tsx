
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { toast } from "@/hooks/use-toast";
import { getCurrentUser, logoutUser, isAuthenticated } from "@/utils/authUtils";
import { useLanguage } from "@/context/LanguageContext";
import BottomNavigation from "@/components/BottomNavigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { authApi, memberApi } from "@/services/apiService";
import { API_CONFIG } from "@/config/api";

// Import the refactored components and hooks
import MemberWelcome from "@/components/society/MemberWelcome";
import SocietyHeader from "@/components/society/SocietyHeader";
import MemberInfoAccordion from "@/components/society/MemberInfoAccordion";
import EditDialog from "@/components/society/EditDialog";
import LogoutButton from "@/components/society/LogoutButton";
import { useSocietyMember } from "@/hooks/useSocietyMember";
import { useEditMember } from "@/hooks/useEditMember";

const SocietyDetails = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const { t } = useLanguage();
  
  // Get member data from our custom hook
  const {
    personalInfo,
    setPersonalInfo,
    addressData,
    setAddressData,
    familyInfo,
    bankInfo,
    setBankInfo,
    paymentHistory,
    societyInfo
  } = useSocietyMember();

  // Get editing functionality from our custom hook
  const {
    editField,
    editValue,
    setEditValue,
    setEditField,
    isBankInfoEdit,
    isAddressEdit,
    handleEdit,
    handleEditAddress,
    handleEditBankInfo,
    handleSaveBankInfo,
    handleSaveAddress,
    handleSave
  } = useEditMember(setPersonalInfo, setBankInfo, setAddressData);

  useEffect(() => {
    const checkAuth = () => {
      if (!isAuthenticated()) {
        navigate("/");
        return;
      }
      
      const userData = getCurrentUser();
      setUser(userData);
    };
    
    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    logoutUser();
    toast({
      title: t("society.logout"),
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  // Test function for API login with member number
  const testApiLogin = async () => {
    console.log("🧪 API Test Başlatılıyor...");
    console.log("📋 Test Bilgileri:");
    console.log("   Üye Numarası: 4");
    console.log("   Şifre: 2ipRY3");
    console.log("   API Base URL:", API_CONFIG.baseUrl);

    try {
      console.log("\n🔍 Username formatı ile login (çalışan format)...");
      console.log("📤 Gönderilen Data:", { username: "4", password: "2ipRY3" });

      const loginResponse = await authApi.login({ username: "4", password: "2ipRY3" } as any);
      console.log("✅ Login Response:", loginResponse);

      // API response formatı: {fk_Vertrag_Id: number, token: string}
      if (loginResponse && (loginResponse as any).token) {
        const responseData = loginResponse as any;
        console.log("🎉 Login başarılı!");
        console.log("👤 Kullanıcı ID (fk_Vertrag_Id):", responseData.fk_Vertrag_Id);
        console.log("🔑 Token:", responseData.token);

        // Test 2: Token ile kullanıcı profili çekme
        console.log("\n🔍 Token ile Userdata endpoint'ini test ediliyor...");

        // Token'ı geçici olarak set et
        const originalToken = localStorage.getItem('authToken');
        localStorage.setItem('authToken', responseData.token);

        try {
          const profileResponse = await memberApi.getProfile();
          console.log("✅ Userdata Response:", profileResponse);

          if (profileResponse.success && profileResponse.data) {
            console.log("🎉 Userdata başarıyla çekildi!");
            console.log("📊 Kullanıcı Detayları:", profileResponse.data);
          } else {
            console.log("📊 Userdata Response (success field yok):", profileResponse);
          }
        } catch (profileError) {
          console.error("❌ Userdata çekme hatası:", profileError);
        } finally {
          // Orijinal token'ı geri yükle
          if (originalToken) {
            localStorage.setItem('authToken', originalToken);
          } else {
            localStorage.removeItem('authToken');
          }
        }
      } else {
        console.log("❌ Login response'unda token bulunamadı");
        console.log("📊 Tam Response:", loginResponse);
      }

    } catch (error: any) {
      console.error("❌ API Test Hatası:", error);
      console.error("🔍 Hata Detayları:", {
        message: error.message,
        status: error.status,
        code: error.code
      });
    }

    console.log("\n🏁 API Test Tamamlandı!");
  };

  if (!user) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="page-container pb-20">
      <div className="flex justify-between items-center">
        <Header title={t("society.details.title")} />
        <LanguageSwitcher className="mr-4" />
      </div>

      <div className="space-y-6 w-full animate-fade-in">
        {/* User Welcome */}
        <MemberWelcome name={user.name} />

        {/* Society Info */}
        <SocietyHeader 
          name={societyInfo.name}
          description={societyInfo.description}
          founded={societyInfo.founded}
          members={societyInfo.members}
        />

        {/* Member Information Accordion */}
        <MemberInfoAccordion
          personalInfo={personalInfo}
          familyInfo={familyInfo}
          bankInfo={bankInfo}
          paymentHistory={paymentHistory}
          handleEdit={handleEdit}
          onEditBankInfo={handleEditBankInfo}
          onEditAddress={handleEditAddress}
        />

        {/* Edit Dialog */}
        <EditDialog 
          editField={editField}
          editValue={editValue}
          setEditValue={setEditValue}
          setEditField={setEditField}
          handleSave={handleSave}
          isBankInfoEdit={isBankInfoEdit}
          bankInfo={bankInfo}
          onBankInfoSave={handleSaveBankInfo}
          isAddressEdit={isAddressEdit}
          addressData={addressData}
          onAddressSave={handleSaveAddress}
        />

        {/* API Test Button */}
        <div className="mt-6">
          <Button
            onClick={testApiLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            🧪 API Test (Üye No: 4, Şifre: 2ipRY3)
          </Button>
        </div>

        {/* Logout Button */}
        <LogoutButton onLogout={handleLogout} />
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default SocietyDetails;
