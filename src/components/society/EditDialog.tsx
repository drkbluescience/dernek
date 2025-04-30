import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/context/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { BankInfo, Address } from "@/types/society";

interface EditDialogProps {
  editField: string;
  editValue: string;
  setEditValue: (value: string) => void;
  setEditField: (field: string) => void;
  handleSave: () => void;
  // Bank info editing props
  isBankInfoEdit?: boolean;
  bankInfo?: BankInfo;
  onBankInfoSave?: (updatedBankInfo: BankInfo) => void;
  // Address editing props
  isAddressEdit?: boolean;
  addressData?: Address;
  onAddressSave?: (updatedAddress: Address) => void;
}

const EditDialog = ({ 
  editField, 
  editValue, 
  setEditValue, 
  setEditField, 
  handleSave,
  isBankInfoEdit = false,
  bankInfo,
  onBankInfoSave,
  isAddressEdit = false,
  addressData,
  onAddressSave
}: EditDialogProps) => {
  const { t } = useLanguage();
  
  // State for bank info editing
  const [bankInfoState, setBankInfoState] = useState<BankInfo>({
    accountHolder: bankInfo?.accountHolder || "",
    bankName: bankInfo?.bankName || "",
    iban: bankInfo?.iban || "",
    bic: bankInfo?.bic || ""
  });
  
  // State for address editing
  const [addressState, setAddressState] = useState<Address>({
    street: addressData?.street || "",
    houseNumber: addressData?.houseNumber || "",
    postalCode: addressData?.postalCode || "",
    city: addressData?.city || ""
  });
  
  // Initialize bank info state when dialog opens
  React.useEffect(() => {
    if (isBankInfoEdit && bankInfo) {
      setBankInfoState({
        accountHolder: bankInfo.accountHolder,
        bankName: bankInfo.bankName,
        iban: bankInfo.iban,
        bic: bankInfo.bic
      });
    }
  }, [isBankInfoEdit, bankInfo]);

  // Initialize address state when dialog opens
  React.useEffect(() => {
    if (isAddressEdit && addressData) {
      setAddressState({
        street: addressData.street || "",
        houseNumber: addressData.houseNumber || "",
        postalCode: addressData.postalCode || "",
        city: addressData.city || ""
      });
    }
  }, [isAddressEdit, addressData]);

  const handleBankInfoChange = (field: keyof typeof bankInfoState, value: string) => {
    setBankInfoState(prev => ({ ...prev, [field]: value }));
  };

  const handleAddressChange = (field: keyof typeof addressState, value: string) => {
    setAddressState(prev => ({ ...prev, [field]: value }));
  };

  const handleBankInfoSave = () => {
    if (onBankInfoSave) {
      onBankInfoSave(bankInfoState);
      toast({
        title: t("society.edit.success"),
        description: t("society.edit.success.description"),
      });
    }
    setEditField("");
  };

  const handleAddressSave = () => {
    if (onAddressSave) {
      onAddressSave(addressState);
      toast({
        title: t("society.edit.success"),
        description: t("society.edit.success.description"),
      });
    }
    setEditField("");
  };

  if (isBankInfoEdit) {
    return (
      <Dialog open={!!editField} onOpenChange={(open) => !open && setEditField("")}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {t("society.bank.edit.title")}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("society.bank.holder")}</label>
              <Input 
                value={bankInfoState.accountHolder} 
                onChange={(e) => handleBankInfoChange("accountHolder", e.target.value)}
                className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("society.bank.account")}</label>
              <Input 
                value={bankInfoState.bankName} 
                onChange={(e) => handleBankInfoChange("bankName", e.target.value)}
                className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("society.bank.iban")}</label>
              <Input 
                value={bankInfoState.iban} 
                onChange={(e) => handleBankInfoChange("iban", e.target.value)}
                className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">{t("society.bank.bic")}</label>
              <Input 
                value={bankInfoState.bic} 
                onChange={(e) => handleBankInfoChange("bic", e.target.value)}
                className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setEditField("")}>
              {t("society.edit.cancel")}
            </Button>
            <Button onClick={handleBankInfoSave}>
              {t("society.edit.save")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  
  // New specific address edit dialog with German field labels
  if (isAddressEdit) {
    return (
      <Dialog open={!!editField} onOpenChange={(open) => !open && setEditField("")}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {t("society.address.edit.title")}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Strasse</label>
              <Input 
                value={addressState.street}
                onChange={(e) => handleAddressChange("street", e.target.value)}
                className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Hausnummer</label>
              <Input 
                value={addressState.houseNumber}
                onChange={(e) => handleAddressChange("houseNumber", e.target.value)}
                className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">PLZ</label>
              <Input 
                value={addressState.postalCode}
                onChange={(e) => handleAddressChange("postalCode", e.target.value)}
                className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Ort</label>
              <Input 
                value={addressState.city}
                onChange={(e) => handleAddressChange("city", e.target.value)}
                className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setEditField("")}>
              {t("society.edit.cancel")}
            </Button>
            <Button onClick={handleAddressSave}>
              {t("society.edit.save")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Original single field edit dialog for other fields
  return (
    <Dialog open={!!editField} onOpenChange={(open) => !open && setEditField("")}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {t("society.edit.title")}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input 
            value={editValue} 
            onChange={(e) => setEditValue(e.target.value)}
            className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => setEditField("")}>
            {t("society.edit.cancel")}
          </Button>
          <Button onClick={handleSave}>
            {t("society.edit.save")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
