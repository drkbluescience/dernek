
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
  { id: "personal", title: "Kişisel Bilgiler", isRequired: true },
  { id: "address", title: "Adres Bilgileri", isRequired: true },
  { id: "bank", title: "Banka Bilgileri", isRequired: false },
  { id: "documents", title: "Belge Yükleme", isRequired: false },
  { id: "family", title: "Eş Bilgileri", isRequired: false },
  { id: "children", title: "Çocuk Bilgileri", isRequired: false },
];

const RegistrationWizard = ({ onComplete, isLoading }: RegistrationWizardProps) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [skippedSteps, setSkippedSteps] = useState<string[]>([]);

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  // Check if a step should be skipped based on previous selections
  const shouldSkipCurrentStep = () => {
    // Skip family step if marital status is not "married"
    if (currentStep.id === "family" && formData.maritalStatus !== "married") {
      return true;
    }
    return false;
  };

  const handleNext = (stepData: Record<string, any>) => {
    const updatedData = { ...formData, ...stepData };
    setFormData(updatedData);

    if (isLastStep) {
      onComplete(updatedData);
    } else {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      
      // Check if the next step should be skipped
      if (nextIndex < steps.length) {
        const nextStep = steps[nextIndex];
        if (nextStep.id === "family" && updatedData.maritalStatus !== "married") {
          // Skip family step and go to the next one if not married
          setSkippedSteps([...skippedSteps, nextStep.id]);
          setCurrentStepIndex(nextIndex + 1);
        }
      }
    }
  };

  const handleSkip = () => {
    if (!currentStep.isRequired) {
      setSkippedSteps([...skippedSteps, currentStep.id]);
      setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1));
    }
  };

  const handlePrevious = () => {
    let prevIndex = currentStepIndex - 1;
    
    // Skip backward over skipped steps
    while (prevIndex >= 0 && skippedSteps.includes(steps[prevIndex].id)) {
      prevIndex--;
    }
    
    setCurrentStepIndex(Math.max(0, prevIndex));
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

  // Check if we should auto-skip the current step
  if (shouldSkipCurrentStep() && !isLastStep) {
    setSkippedSteps([...skippedSteps, currentStep.id]);
    setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1));
  }

  // Filter out skipped steps for the progress indicator
  const visibleSteps = steps.filter(step => !skippedSteps.includes(step.id));
  const currentStepProgressIndex = visibleSteps.findIndex(step => step.id === currentStep.id);
  const progressPercentage = visibleSteps.length > 1 ? 
    (currentStepProgressIndex / (visibleSteps.length - 1)) * 100 : 
    (currentStepIndex === 0 ? 0 : 100);

  return (
    <div className="w-full max-w-4xl mx-auto py-4">
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          {visibleSteps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  index <= currentStepProgressIndex
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
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Current step */}
      <Card className="border border-gray-200 rounded-lg shadow-sm">
        <CardContent className="p-0">
          <div className="bg-gray-800 text-white p-4 font-semibold rounded-t-lg flex justify-between items-center">
            <span>{currentStep.title}</span>
            {!currentStep.isRequired && (
              <span className="text-xs bg-gray-600 px-2 py-1 rounded">Opsiyonel</span>
            )}
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
          <div className="flex gap-2">
            {!currentStep.isRequired && !isLastStep && (
              <Button
                variant="ghost"
                onClick={handleSkip}
                disabled={isLoading}
              >
                Atla
              </Button>
            )}
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
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegistrationWizard;
