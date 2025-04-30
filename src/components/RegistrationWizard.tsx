
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import ProgressIndicator from "./registration/ProgressIndicator";
import StepRenderer from "./registration/StepRenderer";
import WizardNavigation from "./registration/WizardNavigation";
import { useWizardState, Step } from "./registration/useWizardState";

interface RegistrationWizardProps {
  onComplete: (data: Record<string, any>) => void;
  isLoading: boolean;
}

const RegistrationWizard = ({ onComplete, isLoading }: RegistrationWizardProps) => {
  const { t, language } = useLanguage();

  const steps = [
    { id: "personal", title: t("registration.personal.title"), isRequired: true },
    { id: "address", title: t("registration.address.title"), isRequired: true },
    { id: "bank", title: t("registration.bank.title"), isRequired: false },
    { id: "documents", title: t("registration.documents.title"), isRequired: false },
    { id: "family", title: t("registration.family.title"), isRequired: false },
    { id: "children", title: t("registration.children.title"), isRequired: false },
  ];

  const {
    currentStep,
    formData,
    isFirstStep,
    isLastStep,
    visibleSteps,
    currentStepProgressIndex,
    progressPercentage,
    handleNext,
    handleSkip,
    handlePrevious
  } = useWizardState(steps, {}, onComplete);

  return (
    <div className="w-full max-w-4xl mx-auto py-4" lang={language}>
      {/* Progress indicator with improved responsiveness */}
      <ProgressIndicator 
        visibleSteps={visibleSteps}
        currentStepProgressIndex={currentStepProgressIndex}
        progressPercentage={progressPercentage}
      />

      {/* Current step */}
      <Card className="society-card shadow-md overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-society-dark-purple text-white p-4 font-semibold rounded-t-lg flex justify-between items-center">
            <span>{currentStep.title}</span>
            {!currentStep.isRequired && (
              <span className="text-xs bg-gray-600 px-2 py-1 rounded">{t("registration.optional")}</span>
            )}
          </div>
          <div className="p-6">
            <StepRenderer 
              currentStep={currentStep} 
              formData={formData}
              onSubmit={handleNext}
              validationMessages={{
                required: t("validation.field.empty"),
                email: t("validation.email"),
                minLength: t("validation.minLength"),
                maxLength: t("validation.maxLength"),
                pattern: t("validation.pattern")
              }}
            />
          </div>
        </CardContent>
        <CardFooter>
          <WizardNavigation
            currentStep={currentStep}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            isLoading={isLoading}
            onPrevious={handlePrevious}
            onSkip={handleSkip}
            t={t}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegistrationWizard;
