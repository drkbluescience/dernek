import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { BankInfo } from "@/types/society";

interface BankInfoSectionProps {
  bankInfo: BankInfo;
  onEditBankInfo: () => void;
}

const BankInfoSection = ({ bankInfo, onEditBankInfo }: BankInfoSectionProps) => {
  const { t } = useLanguage();
  
  return (
    <Card className="border-t-0 rounded-t-none dark:bg-gray-800 dark:border-gray-700">
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-society-neutral-gray dark:text-gray-400">{t("society.bank.holder")}</p>
            <p className="text-society-dark-text dark:text-gray-200 font-medium">{bankInfo.accountHolder}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-society-neutral-gray dark:text-gray-400">{t("society.bank.account")}</p>
            <p className="text-society-dark-text dark:text-gray-200 font-medium">{bankInfo.bankName}</p>
          </div>
          {/* IBAN - Only show if available */}
          {bankInfo.iban && (
            <div className="space-y-1">
              <p className="text-xs text-society-neutral-gray dark:text-gray-400">{t("society.bank.iban")}</p>
              <p className="text-society-dark-text dark:text-gray-200 font-medium">{bankInfo.iban}</p>
            </div>
          )}
          <div className="space-y-1">
            <p className="text-xs text-society-neutral-gray dark:text-gray-400">{t("society.bank.bic")}</p>
            <p className="text-society-dark-text dark:text-gray-200 font-medium">{bankInfo.bic}</p>
          </div>
          
          {/* Edit all bank info button */}
          <div className="pt-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center justify-center gap-2 mt-2" 
              onClick={onEditBankInfo}
            >
              <Edit className="h-4 w-4" />
              {t("society.bank.edit")}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BankInfoSection;
