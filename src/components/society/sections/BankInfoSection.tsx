
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Banknote } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface BankInfo {
  accountHolder: string;
  bankName: string;
  iban: string;
  bic: string;
}

interface BankInfoSectionProps {
  bankInfo: BankInfo;
  handleEdit: (field: string, currentValue: string) => void;
}

const BankInfoSection = ({ bankInfo, handleEdit }: BankInfoSectionProps) => {
  const { t } = useLanguage();

  return (
    <Card className="border-t-0 rounded-t-none dark:bg-gray-800 dark:border-gray-700">
      <CardContent className="pt-6 space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-society-neutral-gray dark:text-gray-400">{t("society.bank.holder")}</p>
            <div className="flex justify-between items-center">
              <p className="text-society-dark-text dark:text-gray-200 font-medium">{bankInfo.accountHolder}</p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0" 
                onClick={() => handleEdit("accountHolder", bankInfo.accountHolder)}
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit Account Holder</span>
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-society-neutral-gray dark:text-gray-400">{t("society.bank.account")}</p>
            <div className="flex justify-between items-center">
              <p className="text-society-dark-text dark:text-gray-200 font-medium">{bankInfo.bankName}</p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0" 
                onClick={() => handleEdit("bankName", bankInfo.bankName)}
              >
                <Banknote className="h-4 w-4" />
                <span className="sr-only">Edit Bank Name</span>
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-society-neutral-gray dark:text-gray-400">{t("society.bank.iban")}</p>
            <div className="flex justify-between items-center">
              <p className="text-society-dark-text dark:text-gray-200 font-medium">{bankInfo.iban}</p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0" 
                onClick={() => handleEdit("iban", bankInfo.iban)}
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit IBAN</span>
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-society-neutral-gray dark:text-gray-400">{t("society.bank.bic")}</p>
            <div className="flex justify-between items-center">
              <p className="text-society-dark-text dark:text-gray-200 font-medium">{bankInfo.bic}</p>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0" 
                onClick={() => handleEdit("bic", bankInfo.bic)}
              >
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit BIC</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BankInfoSection;
