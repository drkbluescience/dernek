
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { toast } from "@/hooks/use-toast";
import { getCurrentUser, logoutUser, isAuthenticated } from "@/utils/authUtils";
import { useLanguage } from "@/context/LanguageContext";
import BottomNavigation from "@/components/BottomNavigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";

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



        {/* Logout Button */}
        <LogoutButton onLogout={handleLogout} />
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default SocietyDetails;
