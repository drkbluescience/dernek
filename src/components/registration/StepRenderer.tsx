
import React from "react";
import PersonalInfoStep from "./PersonalInfoStep";
import AddressStep from "./AddressStep";
import BankInfoStep from "./BankInfoStep";
import DocumentUploadStep from "./DocumentUploadStep";
import FamilyInfoStep from "./FamilyInfoStep";
import ChildInfoStep from "./ChildInfoStep";
import { Step } from "./useWizardState";

interface StepRendererProps {
  currentStep: Step;
  formData: Record<string, any>;
  onSubmit: (data: Record<string, any>) => void;
}

const StepRenderer: React.FC<StepRendererProps> = ({
  currentStep,
  formData,
  onSubmit,
}) => {
  switch (currentStep.id) {
    case "personal":
      return (
        <PersonalInfoStep 
          initialData={formData} 
          onSubmit={onSubmit} 
        />
      );
    case "address":
      return (
        <AddressStep 
          initialData={formData} 
          onSubmit={onSubmit} 
        />
      );
    case "bank":
      return (
        <BankInfoStep 
          initialData={formData} 
          onSubmit={onSubmit} 
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
        />
      );
    case "children":
      return (
        <ChildInfoStep 
          initialData={formData} 
          onSubmit={onSubmit} 
        />
      );
    default:
      return null;
  }
};

export default StepRenderer;
