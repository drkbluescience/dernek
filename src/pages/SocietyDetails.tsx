
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { toast } from "@/hooks/use-toast";
import { getCurrentUser, logoutUser, isAuthenticated } from "@/utils/authUtils";
import { useLanguage } from "@/context/LanguageContext";
import BottomNavigation from "@/components/BottomNavigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";

// Import the refactored components
import MemberWelcome from "@/components/society/MemberWelcome";
import SocietyHeader from "@/components/society/SocietyHeader";
import MemberInfoAccordion from "@/components/society/MemberInfoAccordion";
import EditDialog from "@/components/society/EditDialog";
import LogoutButton from "@/components/society/LogoutButton";

interface Payment {
  id: string;
  date: string;
  amount: string;
  type: string;
  status: string;
}

const SocietyDetails = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const { t } = useLanguage();
  
  // Mock society data
  const societyInfo = {
    name: "Community Helpers Society",
    founded: "2020",
    members: 124,
    description: "A volunteer organization dedicated to helping the community through various social service activities.",
  };

  // Mock member personal data - now state for editing
  const [personalInfo, setPersonalInfo] = useState({
    fullName: "John Smith",
    email: "john.smith@example.com",
    phone: "+49 123 456 7890",
    birthDate: "15.05.1985",
    gender: "Male",
    address: "Musterstraße 123, 10115 Berlin",
  });

  // Mock family information
  const familyInfo = {
    maritalStatus: "Married",
    spouse: {
      name: "Maria Smith",
      birthDate: "22.08.1988",
    },
    children: [
      {
        name: "Thomas Smith",
        birthDate: "03.12.2012",
      },
      {
        name: "Anna Smith",
        birthDate: "17.06.2016",
      }
    ]
  };

  // Mock bank information - now state for editing
  const [bankInfo, setBankInfo] = useState({
    accountHolder: "John Smith",
    bankName: "Sparkasse Berlin",
    iban: "DE12 3456 7890 1234 5678 90",
    bic: "SPKRDE21XXX"
  });

  // Mock payment history
  const paymentHistory: Payment[] = [
    {
      id: "p1",
      date: "01.01.2025",
      amount: "50,00 €",
      type: "Membership Fee",
      status: "Paid"
    },
    {
      id: "p2",
      date: "01.02.2025",
      amount: "50,00 €",
      type: "Membership Fee",
      status: "Paid"
    },
    {
      id: "p3",
      date: "01.03.2025",
      amount: "50,00 €",
      type: "Membership Fee",
      status: "Paid"
    },
    {
      id: "p4",
      date: "01.04.2025",
      amount: "50,00 €",
      type: "Membership Fee",
      status: "Pending"
    }
  ];

  // Fields that can be edited
  const [editField, setEditField] = useState("");
  const [editValue, setEditValue] = useState("");
  // New state for bank info editing
  const [isBankInfoEdit, setIsBankInfoEdit] = useState(false);

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

  const handleEdit = (field: string, currentValue: string) => {
    setEditField(field);
    setEditValue(currentValue);
  };

  // Handler for editing bank info
  const handleEditBankInfo = () => {
    setIsBankInfoEdit(true);
    setEditField("bankInfo");
  };

  // Handler for saving bank info
  const handleSaveBankInfo = (updatedBankInfo: {
    accountHolder: string;
    bankName: string;
    iban: string;
    bic: string;
  }) => {
    setBankInfo(updatedBankInfo);
    setIsBankInfoEdit(false);
    setEditField("");
  };

  const handleSave = () => {
    if (!editField) return;

    // Update the appropriate field based on category
    if (["fullName", "email", "phone", "address"].includes(editField)) {
      setPersonalInfo(prev => ({ ...prev, [editField]: editValue }));
    }

    // Show success toast
    toast({
      title: t("society.edit.success"),
      description: t("society.edit.success.description"),
    });

    // Reset edit state
    setEditField("");
    setEditValue("");
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
        />

        {/* Logout Button */}
        <LogoutButton onLogout={handleLogout} />
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default SocietyDetails;
