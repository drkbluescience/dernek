
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
  // Add a title section with better styling matching the example image
  return (
    <div className="space-y-6">
      <div className="bg-gray-100 p-4 rounded-md border border-gray-200 shadow-sm">
        <h3 className="text-society-dark-text font-medium">{currentStep.title}</h3>
      </div>
      
      {currentStep.id === "personal" && (
        <PersonalInfoStep 
          initialData={formData} 
          onSubmit={onSubmit} 
          validationMessages={validationMessages}
        />
      )}
      {currentStep.id === "address" && (
        <AddressStep 
          initialData={formData} 
          onSubmit={onSubmit}
        />
      )}
      {currentStep.id === "bank" && (
        <BankInfoStep 
          initialData={formData} 
          onSubmit={onSubmit}
        />
      )}
      {currentStep.id === "documents" && (
        <DocumentUploadStep 
          initialData={formData} 
          onSubmit={onSubmit} 
        />
      )}
      {currentStep.id === "family" && (
        <FamilyInfoStep 
          initialData={formData} 
          onSubmit={onSubmit}
        />
      )}
      {currentStep.id === "children" && (
        <ChildInfoStep 
          initialData={formData} 
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default StepRenderer;
