
import React from "react";
import PersonalInfoStep from "./PersonalInfoStep";
import AddressStep from "./AddressStep";
import BankInfoStep from "./BankInfoStep";
import DocumentUploadStep from "./DocumentUploadStep";
import FamilyInfoStep from "./FamilyInfoStep";
import ChildInfoStep from "./ChildInfoStep";
import { Step } from "./useWizardState";

interface ValidationMessages {
  required: string;
  email: string;
  minLength: string;
  maxLength: string;
  pattern: string;
}

interface StepRendererProps {
  currentStep: Step;
  formData: Record<string, any>;
  onSubmit: (data: Record<string, any>) => void;
  validationMessages: ValidationMessages;
}

const StepRenderer: React.FC<StepRendererProps> = ({
  currentStep,
  formData,
  onSubmit,
  validationMessages,
}) => {
  switch (currentStep.id) {
    case "personal":
      return (
        <PersonalInfoStep 
          initialData={formData} 
          onSubmit={onSubmit} 
          validationMessages={validationMessages}
        />
      );
    case "address":
      return (
        <AddressStep 
          initialData={formData} 
          onSubmit={onSubmit} 
          validationMessages={validationMessages}
        />
      );
    case "bank":
      return (
        <BankInfoStep 
          initialData={formData} 
          onSubmit={onSubmit} 
          validationMessages={validationMessages}
        />
      );
    case "documents":
      return (
        <DocumentUploadStep 
          initialData={formData} 
          onSubmit={onSubmit} 
        />
      );
    case "family":
      return (
        <FamilyInfoStep 
          initialData={formData} 
          onSubmit={onSubmit} 
          validationMessages={validationMessages}
        />
      );
    case "children":
      return (
        <ChildInfoStep 
          initialData={formData} 
          onSubmit={onSubmit} 
          validationMessages={validationMessages}
        />
      );
    default:
      return null;
  }
};

export default StepRenderer;
