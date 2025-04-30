
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Step } from "./useWizardState";

interface WizardNavigationProps {
  currentStep: Step;
  isFirstStep: boolean;
  isLastStep: boolean;
  isLoading: boolean;
  onPrevious: () => void;
  onSkip: () => void;
  t: (key: string) => string;
}

const WizardNavigation: React.FC<WizardNavigationProps> = ({
  currentStep,
  isFirstStep,
  isLastStep,
  isLoading,
  onPrevious,
  onSkip,
  t
}) => {
  return (
    <div className="flex justify-between p-4 border-t">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={isFirstStep || isLoading}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" /> {t("registration.button.previous")}
      </Button>
      <div className="flex gap-2">
        {!currentStep.isRequired && (
          <Button
            variant="ghost"
            onClick={onSkip}
            disabled={isLoading}
            className="text-gray-500 hover:text-gray-700"
          >
            {t("registration.button.skip")}
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
            {t("registration.button.complete")}
          </Button>
        ) : (
          <Button
            form={`form-${currentStep.id}`}
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            {t("registration.button.next")} <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default WizardNavigation;
