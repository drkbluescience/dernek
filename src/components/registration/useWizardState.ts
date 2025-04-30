
import { useState } from "react";

export interface Step {
  id: string;
  title: string;
  isRequired: boolean;
}

export function useWizardState(
  steps: Step[], 
  initialData: Record<string, any> = {},
  onComplete: (data: Record<string, any>) => void
) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>(initialData);
  const [skippedSteps, setSkippedSteps] = useState<string[]>([]);

  // Make sure we always have a valid currentStep
  const currentStep = steps[currentStepIndex] || steps[0];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  // Check if a step should be skipped based on previous selections
  const shouldSkipStep = (stepId: string) => {
    // Skip family step if marital status is not "married"
    if (stepId === "family" && formData.maritalStatus !== "married") {
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
      let nextIndex = currentStepIndex + 1;
      
      // Skip steps that should be skipped based on previous selections
      while (nextIndex < steps.length && shouldSkipStep(steps[nextIndex].id)) {
        setSkippedSteps((prev) => [...prev, steps[nextIndex].id]);
        nextIndex++;
      }
      
      setCurrentStepIndex(nextIndex);
    }
  };

  const handleSkip = () => {
    if (!currentStep.isRequired) {
      setSkippedSteps([...skippedSteps, currentStep.id]);
      
      let nextIndex = currentStepIndex + 1;
      
      // Skip steps that should be skipped based on previous selections
      while (nextIndex < steps.length && shouldSkipStep(steps[nextIndex].id)) {
        setSkippedSteps((prev) => [...prev, steps[nextIndex].id]);
        nextIndex++;
      }
      
      setCurrentStepIndex(nextIndex);
    }
  };

  const handlePrevious = () => {
    let prevIndex = currentStepIndex - 1;
    
    // Skip backward over skipped steps
    while (prevIndex >= 0 && (skippedSteps.includes(steps[prevIndex].id) || shouldSkipStep(steps[prevIndex].id))) {
      prevIndex--;
    }
    
    setCurrentStepIndex(Math.max(0, prevIndex));
  };

  // Filter out skipped steps for the progress indicator
  const visibleSteps = steps.filter(step => !skippedSteps.includes(step.id) && !shouldSkipStep(step.id));

  // Ensure currentStep is defined before accessing its properties
  const currentStepProgressIndex = currentStep 
    ? visibleSteps.findIndex(step => step.id === currentStep.id) 
    : 0;
    
  // Ensure we don't divide by zero when there's only one step
  const progressPercentage = visibleSteps.length > 1 
    ? ((currentStepProgressIndex >= 0 ? currentStepProgressIndex : 0) / (visibleSteps.length - 1)) * 100 
    : (currentStepIndex === 0 ? 0 : 100);

  return {
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
  };
}
