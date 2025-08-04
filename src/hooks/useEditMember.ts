
import { useState } from 'react';
import { Address, BankInfo } from '@/types/society';
import { toast } from '@/hooks/use-toast';
import { useLanguage } from '@/context/LanguageContext';
import { memberApi } from '@/services/apiService';

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
  const handleSaveBankInfo = async (updatedBankInfo: BankInfo) => {
    console.log("🏦 Banka bilgisi güncelleme başlatıldı:");
    console.log("📤 Gönderilen veri:", updatedBankInfo);

    try {
      // Call API to update bank info
      const response = await memberApi.updateBankInfo(updatedBankInfo);
      console.log("📥 API Response:", response);

      if (response.success || response) {
        console.log("✅ Banka bilgisi başarıyla güncellendi");

        // Update local state only if API call succeeds
        setBankInfo(updatedBankInfo);
        setIsBankInfoEdit(false);
        setEditField("");

        toast({
          title: t("society.edit.success"),
          description: t("society.edit.success.description"),
        });
      } else {
        console.log("❌ API güncelleme başarısız:", response.message);
        throw new Error(response.message || "Update failed");
      }
    } catch (error: any) {
      console.error("❌ Banka bilgisi güncelleme hatası:", error);
      toast({
        title: t("society.edit.error"),
        description: error.message || "Banka bilgileri güncellenirken hata oluştu.",
        variant: "destructive",
      });
    }
  };

  // Handler for saving address info
  const handleSaveAddress = async (updatedAddress: Address) => {
    console.log("🏠 Adres bilgisi güncelleme başlatıldı:");
    console.log("📤 Gönderilen veri:", updatedAddress);

    try {
      // Call API to update address
      const response = await memberApi.updateAddress(updatedAddress);
      console.log("📥 API Response:", response);

      if (response.success || response) {
        console.log("✅ Adres bilgisi başarıyla güncellendi");

        // Update address data state only if API call succeeds
        setAddressData(updatedAddress);

        // Format the address for display
        const formattedAddress = `${updatedAddress.street} ${updatedAddress.houseNumber}, ${updatedAddress.postalCode} ${updatedAddress.city}`;
        console.log("📍 Formatlanmış adres:", formattedAddress);

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
      } else {
        console.log("❌ API güncelleme başarısız:", response.message);
        throw new Error(response.message || "Update failed");
      }
    } catch (error: any) {
      console.error("❌ Adres bilgisi güncelleme hatası:", error);
      toast({
        title: t("society.edit.error"),
        description: error.message || "Adres bilgileri güncellenirken hata oluştu.",
        variant: "destructive",
      });
    }
  };

  const handleSave = async () => {
    if (!editField) return;

    console.log("👤 Kişisel bilgi güncelleme başlatıldı:");
    console.log("📝 Alan:", editField);
    console.log("📤 Yeni değer:", editValue);

    try {
      // Prepare data for API call
      const updateData = { [editField]: editValue };
      console.log("📤 Gönderilen veri:", updateData);

      // Call API to update personal info
      const response = await memberApi.updateProfile(updateData);
      console.log("📥 API Response:", response);

      if (response.success || response) {
        console.log("✅ Kişisel bilgi başarıyla güncellendi");

        // Update the appropriate field based on category only if API call succeeds
        if (["fullName", "email", "phone"].includes(editField)) {
          setPersonalInfo(prev => ({ ...prev, [editField]: editValue }));
          console.log("🔄 Local state güncellendi:", editField, "=", editValue);
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
      } else {
        console.log("❌ API güncelleme başarısız:", response.message);
        throw new Error(response.message || "Update failed");
      }
    } catch (error: any) {
      console.error("❌ Kişisel bilgi güncelleme hatası:", error);
      toast({
        title: t("society.edit.error"),
        description: error.message || "Kişisel bilgiler güncellenirken hata oluştu.",
        variant: "destructive",
      });
    }
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
