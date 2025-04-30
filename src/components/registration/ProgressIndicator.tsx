
import React from "react";
import { Step } from "./useWizardState";

interface ProgressIndicatorProps {
  visibleSteps: Step[];
  currentStepProgressIndex: number;
  progressPercentage: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  visibleSteps,
  currentStepProgressIndex,
  progressPercentage,
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center">
        {visibleSteps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center max-w-[80px] mx-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                index <= currentStepProgressIndex
                  ? "bg-society-purple text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {index + 1}
            </div>
            <span className="text-[10px] md:text-xs text-center line-clamp-2 h-10">
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
  );
};

export default ProgressIndicator;
