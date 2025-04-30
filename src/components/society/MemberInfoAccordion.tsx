
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
import { useLanguage } from "@/context/LanguageContext";

interface MemberInfoAccordionProps {
  personalInfo: any;
  familyInfo: any;
  bankInfo: any;
  paymentHistory: any[];
  handleEdit: (field: string, currentValue: string) => void;
}

const MemberInfoAccordion = ({
  personalInfo,
  familyInfo,
  bankInfo,
  paymentHistory,
  handleEdit
}: MemberInfoAccordionProps) => {
  const { t } = useLanguage();

  return (
    <Accordion type="single" collapsible className="w-full">
      {/* Personal Info Section */}
      <AccordionItem value="personal">
        <AccordionTrigger className="hover:no-underline font-medium py-3 px-4 bg-muted rounded-t-lg">
          {t("society.tab.personal")}
        </AccordionTrigger>
        <AccordionContent className="pt-0">
          <PersonalInfoSection 
            personalInfo={personalInfo}
            handleEdit={handleEdit}
          />
        </AccordionContent>
      </AccordionItem>
      
      {/* Family Info Section */}
      <AccordionItem value="family">
        <AccordionTrigger className="hover:no-underline font-medium py-3 px-4 bg-muted">
          {t("society.tab.family")}
        </AccordionTrigger>
        <AccordionContent className="pt-0">
          <FamilyInfoSection familyInfo={familyInfo} />
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
            handleEdit={handleEdit}
          />
        </AccordionContent>
      </AccordionItem>
      
      {/* Payment History Section */}
      <AccordionItem value="payments">
        <AccordionTrigger className="hover:no-underline font-medium py-3 px-4 bg-muted">
          {t("society.tab.payments")}
        </AccordionTrigger>
        <AccordionContent className="pt-0">
          <PaymentHistorySection paymentHistory={paymentHistory} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default MemberInfoAccordion;
