import { Check, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

interface StepperProps {
  steps: { title: string; description?: string }[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

export function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
  return (
    <div className="w-full py-4 mb-8 overflow-x-auto custom-scrollbar">
      <div className="flex items-center min-w-max">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div key={step.title} className="flex items-center">
              <button
                onClick={() => onStepClick(index)}
                disabled={index > currentStep}
                className={cn(
                  "flex items-center gap-3 py-2 px-4 rounded-xl transition-all outline-none",
                  isActive ? "bg-primary-50 ring-1 ring-primary-500" : "hover:bg-slate-100",
                  index > currentStep && "opacity-50 cursor-not-allowed hover:bg-transparent"
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                    isCompleted
                      ? "border-primary-500 bg-primary-500 text-white"
                      : isActive
                      ? "border-primary-500 bg-white text-primary-600"
                      : "border-slate-300 bg-white text-slate-500"
                  )}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
                </div>
                <div className="flex flex-col items-start whitespace-nowrap">
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      isActive || isCompleted ? "text-slate-900" : "text-slate-500"
                    )}
                  >
                    {step.title}
                  </span>
                  {step.description && (
                    <span className="text-xs text-slate-500">{step.description}</span>
                  )}
                </div>
              </button>

              {index < steps.length - 1 && (
                <div className="mx-2 flex-1 w-8">
                  <div
                    className={cn(
                      "h-0.5 rounded-full",
                      isCompleted ? "bg-primary-500" : "bg-slate-200"
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
