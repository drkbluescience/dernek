
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import PersonalInfoStep from "./registration/PersonalInfoStep";
import AddressStep from "./registration/AddressStep";
import BankInfoStep from "./registration/BankInfoStep";
import DocumentUploadStep from "./registration/DocumentUploadStep";
import FamilyInfoStep from "./registration/FamilyInfoStep";
import ChildInfoStep from "./registration/ChildInfoStep";

interface RegistrationWizardProps {
  onComplete: (data: Record<string, any>) => void;
  isLoading: boolean;
}

const steps = [
  { id: "personal", title: "Kişisel Bilgiler" },
  { id: "address", title: "Adres Bilgileri" },
  { id: "bank", title: "Banka Bilgileri" },
  { id: "documents", title: "Belge Yükleme" },
  { id: "family", title: "Eş Bilgileri" },
  { id: "children", title: "Çocuk Bilgileri" },
];

const RegistrationWizard = ({ onComplete, isLoading }: RegistrationWizardProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleNext = (stepData: Record<string, any>) => {
    const updatedData = { ...formData, ...stepData };
    setFormData(updatedData);

    if (isLastStep) {
      onComplete(updatedData);
    } else {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStepIndex((prev) => Math.max(0, prev - 1));
  };

  const renderStep = () => {
    switch (currentStep.id) {
      case "personal":
        return (
          <PersonalInfoStep 
            initialData={formData} 
            onSubmit={handleNext} 
          />
        );
      case "address":
        return (
          <AddressStep 
            initialData={formData} 
            onSubmit={handleNext} 
          />
        );
      case "bank":
        return (
          <BankInfoStep 
            initialData={formData} 
            onSubmit={handleNext} 
          />
        );
      case "documents":
        return (
          <DocumentUploadStep 
            initialData={formData} 
            onSubmit={handleNext} 
          />
        );
      case "family":
        return (
          <FamilyInfoStep 
            initialData={formData} 
            onSubmit={handleNext} 
          />
        );
      case "children":
        return (
          <ChildInfoStep 
            initialData={formData} 
            onSubmit={handleNext} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-4">
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  index <= currentStepIndex
                    ? "bg-society-purple text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {index + 1}
              </div>
              <span className="text-xs text-center hidden sm:block">
                {step.title}
              </span>
            </div>
          ))}
        </div>
        <div className="relative h-2 bg-gray-200 mt-3 rounded-full">
          <div
            className="absolute top-0 left-0 h-2 bg-society-purple rounded-full transition-all"
            style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Current step */}
      <Card className="border border-gray-200 rounded-lg shadow-sm">
        <CardContent className="p-0">
          <div className="bg-gray-800 text-white p-4 font-semibold rounded-t-lg">
            {currentStep.title}
          </div>
          <div className="p-6">{renderStep()}</div>
        </CardContent>
        <CardFooter className="flex justify-between p-4 border-t">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={isFirstStep || isLoading}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Geri
          </Button>
          {isLastStep ? (
            <Button
              form={`form-${currentStep.id}`}
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              Kaydı Tamamla
            </Button>
          ) : (
            <Button
              form={`form-${currentStep.id}`}
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              İleri <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegistrationWizard;
