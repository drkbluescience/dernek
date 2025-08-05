
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PersonalInfoSection from "./sections/PersonalInfoSection";
import FamilyInfoSection from "./sections/FamilyInfoSection";
import BankInfoSection from "./sections/BankInfoSection";
import PaymentHistorySection from "./sections/PaymentHistorySection";
import DocumentUploadSection from "./sections/DocumentUploadSection";
import { useLanguage } from "@/context/LanguageContext";
import { PersonalInfo, FamilyInfo, BankInfo, Payment } from "@/types/society";

interface MemberInfoAccordionProps {
  personalInfo: PersonalInfo;
  familyInfo: FamilyInfo;
  bankInfo: BankInfo;
  paymentHistory: Payment[];
  handleEdit: (field: string, currentValue: string) => void;
  onEditBankInfo: () => void;
  onEditAddress: () => void;
  rawFamilyData?: any[];
  rawPaymentData?: any[];
  onDocumentUpload?: (data: any) => Promise<void>;
}

const MemberInfoAccordion = ({
  personalInfo,
  familyInfo,
  bankInfo,
  paymentHistory,
  handleEdit,
  onEditBankInfo,
  onEditAddress,
  rawFamilyData,
  rawPaymentData,
  onDocumentUpload
}: MemberInfoAccordionProps) => {
  const { t, language } = useLanguage();



  // Added key with language to force re-render when language changes
  return (
    <Accordion type="single" collapsible className="w-full" key={`accordion-${language}`}>
      {/* Personal Info Section */}
      <AccordionItem value="personal">
        <AccordionTrigger className="hover:no-underline font-medium py-3 px-4 bg-muted rounded-t-lg">
          {t("society.tab.personal")}
        </AccordionTrigger>
        <AccordionContent className="pt-0">
          <PersonalInfoSection 
            personalInfo={personalInfo}
            handleEdit={handleEdit}
            handleAddressEdit={onEditAddress}
          />
        </AccordionContent>
      </AccordionItem>
      
      {/* Family Info Section */}
      <AccordionItem value="family">
        <AccordionTrigger className="hover:no-underline font-medium py-3 px-4 bg-muted">
          {t("society.tab.family")}
        </AccordionTrigger>
        <AccordionContent className="pt-0">
          <FamilyInfoSection familyInfo={familyInfo} rawFamilyData={rawFamilyData} />
        </AccordionContent>
      </AccordionItem>
      
      {/* Bank Info Section */}
      <AccordionItem value="bank">
        <AccordionTrigger className="hover:no-underline font-medium py-3 px-4 bg-muted">
          {t("society.tab.bank")}
        </AccordionTrigger>
        <AccordionContent className="pt-0">
          <BankInfoSection 
            bankInfo={bankInfo}
            onEditBankInfo={onEditBankInfo}
          />
        </AccordionContent>
      </AccordionItem>
      
      {/* Payment History Section */}
      <AccordionItem value="payments">
        <AccordionTrigger className="hover:no-underline font-medium py-3 px-4 bg-muted">
          {t("society.tab.payments")}
        </AccordionTrigger>
        <AccordionContent className="pt-0">
          <PaymentHistorySection paymentHistory={paymentHistory} rawPaymentData={rawPaymentData} />
        </AccordionContent>
      </AccordionItem>

      {/* Document Upload Section - LAST ITEM */}
      <AccordionItem value="documents">
        <AccordionTrigger className="hover:no-underline font-medium py-3 px-4 bg-muted rounded-b-lg">
          {t("society.tab.documents")}
        </AccordionTrigger>
        <AccordionContent className="pt-0">
          <DocumentUploadSection onUpload={onDocumentUpload} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default MemberInfoAccordion;
