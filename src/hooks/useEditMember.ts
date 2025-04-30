
import { useState } from 'react';
import { Address, BankInfo } from '@/types/society';
import { toast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';

export const useEditMember = (
  setPersonalInfo: React.Dispatch<React.SetStateAction<any>>,
  setBankInfo: React.Dispatch<React.SetStateAction<BankInfo>>,
  setAddressData: React.Dispatch<React.SetStateAction<Address>>
) => {
  const { t } = useLanguage();
  const [editField, setEditField] = useState("");
  const [editValue, setEditValue] = useState("");
  
  // State for specific edit dialogs
  const [isBankInfoEdit, setIsBankInfoEdit] = useState(false);
  const [isAddressEdit, setIsAddressEdit] = useState(false);

  const handleEdit = (field: string, currentValue: string) => {
    setEditField(field);
    setEditValue(currentValue);
    setIsAddressEdit(false);
    setIsBankInfoEdit(false);
  };

  // Handler for editing address specifically
  const handleEditAddress = () => {
    setEditField("address");
    setIsAddressEdit(true);
    setIsBankInfoEdit(false);
  };

  // Handler for editing bank info
  const handleEditBankInfo = () => {
    setIsBankInfoEdit(true);
    setIsAddressEdit(false);
    setEditField("bankInfo");
  };

  // Handler for saving bank info
  const handleSaveBankInfo = (updatedBankInfo: BankInfo) => {
    setBankInfo(updatedBankInfo);
    setIsBankInfoEdit(false);
    setEditField("");
    
    toast({
      title: t("society.edit.success"),
      description: t("society.edit.success.description"),
    });
  };

  // Handler for saving address info
  const handleSaveAddress = (updatedAddress: Address) => {
    // Update address data state
    setAddressData(updatedAddress);
    
    // Format the address for display
    const formattedAddress = `${updatedAddress.street} ${updatedAddress.houseNumber}, ${updatedAddress.postalCode} ${updatedAddress.city}`;
    
    // Update the formatted address in personalInfo
    setPersonalInfo(prev => ({ 
      ...prev, 
      address: formattedAddress 
    }));
    
    setIsAddressEdit(false);
    setEditField("");
    
    toast({
      title: t("society.edit.success"),
      description: t("society.edit.success.description"),
    });
  };

  const handleSave = () => {
    if (!editField) return;

    // Update the appropriate field based on category
    if (["fullName", "email", "phone"].includes(editField)) {
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
    setIsAddressEdit(false);
  };

  return {
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
  };
};
