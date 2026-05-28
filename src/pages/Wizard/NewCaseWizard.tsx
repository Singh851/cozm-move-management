import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Check, User, Map, Briefcase, ShieldCheck, ClipboardList } from "lucide-react";
import { cn } from "../../lib/utils";

// Steps Imports
import { Step1Assignee } from "./steps/Step1Assignee";
import { Step2Assignment } from "./steps/Step2Assignment";
import { Step3JobInfo } from "./steps/Step3JobInfo";
import { Step4Policy } from "./steps/Step4Policy";
import { Step5Summary } from "./steps/Step5Summary";

const STEPS = [
  { id: 0, title: "Assignee Details", description: "Personal info & dependants", icon: User },
  { id: 1, title: "Assignment Details", description: "Dates, route & entities", icon: Map },
  { id: 2, title: "Assignment Specific Details", description: "Role, cost center & contacts", icon: Briefcase },
  { id: 3, title: "Policy & Services", description: "Policy selection & required services", icon: ShieldCheck },
  { id: 4, title: "Summary", description: "Review and submit initiation", icon: ClipboardList },
];

export function NewCaseWizard() {
  const [expandedSteps, setExpandedSteps] = useState<Record<number, boolean>>({ 0: true });
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const navigate = useNavigate();

  const toggleStep = (index: number) => {
    setExpandedSteps((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleNext = (currentIndex: number) => {
    setCompletedSteps((prev) => ({ ...prev, [currentIndex]: true }));
    setExpandedSteps((prev) => ({ ...prev, [currentIndex]: false, [currentIndex + 1]: true }));
    
    // Scroll the new step into view ideally, but letting the layout shift should be okay
    setTimeout(() => {
      window.scrollTo({
        top: Math.max(0, window.scrollY + 100),
        behavior: 'smooth'
      });
    }, 350);
  };

  const handleSubmit = () => {
    navigate("/cases");
  };

  return (
    <div className="max-w-4xl mx-auto pb-24">
      <div className="mb-10 text-center">
        <h1 className="font-display text-4xl font-bold text-slate-900 tracking-tight">New Case Initiation</h1>
        <p className="text-slate-500 mt-3 text-lg font-medium">
          Complete the steps below to initiate a new assignment. Fields marked with <span className="text-red-500">*</span> are mandatory.
        </p>
      </div>

      <div className="space-y-4">
        {STEPS.map((step, index) => {
          const isExpanded = expandedSteps[index];
          const isCompleted = completedSteps[index];
          const Icon = step.icon;

          return (
            <div 
              key={step.id} 
              className={cn(
                "rounded-2xl border bg-white transition-all duration-300 overflow-hidden",
                isExpanded 
                  ? "border-primary-500 shadow-lg shadow-primary-500/10 ring-1 ring-primary-500" 
                  : "border-slate-200 shadow-sm hover:border-primary-300 hover:shadow-md"
              )}
            >
              <button
                onClick={() => toggleStep(index)}
                className="w-full flex items-center justify-between p-5 md:px-8 text-left focus-visible:outline-none focus-visible:bg-slate-50 transition-colors"
                aria-expanded={isExpanded}
              >
                <div className="flex items-center gap-5 md:gap-6">
                  <div 
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 transition-all duration-300",
                      isCompleted && !isExpanded
                        ? "border-primary-500 bg-primary-500 text-white"
                        : isExpanded
                        ? "border-primary-200 bg-primary-50 text-primary-600 shadow-sm"
                        : "border-slate-200 bg-slate-50 text-slate-400"
                    )}
                  >
                    {isCompleted && !isExpanded ? <Check className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                  </div>
                  <div className="flex flex-col items-start">
                    <span className={cn(
                      "text-xl font-display font-bold tracking-tight transition-colors duration-300", 
                      isExpanded ? "text-primary-700" : "text-slate-900",
                      isCompleted && !isExpanded && "text-slate-700"
                    )}>
                      {step.id + 1}. {step.title}
                    </span>
                    <span className="text-sm font-medium text-slate-500 mt-0.5">{step.description}</span>
                  </div>
                </div>
                <div className={cn(
                  "p-2.5 rounded-full transition-colors duration-300", 
                  isExpanded ? "bg-primary-50 text-primary-600" : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                )}>
                  <ChevronDown 
                    className={cn(
                      "h-6 w-6 transition-transform duration-500 ease-[cubic-bezier(0.87,_0,_0.13,_1)]",
                      isExpanded ? "rotate-180" : "rotate-0"
                    )} 
                  />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-5 pb-5 md:px-8 md:pb-8 border-t border-slate-100 pt-6">
                      <div className="opacity-0 animate-[fadeIn_0.5s_ease-out_0.2s_forwards]">
                        {index === 0 && <Step1Assignee />}
                        {index === 1 && <Step2Assignment />}
                        {index === 2 && <Step3JobInfo />}
                        {index === 3 && <Step4Policy />}
                        {index === 4 && <Step5Summary />}
                      </div>
                      
                      <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
                        {index > 0 ? (
                          <Button 
                            onClick={() => {
                              setExpandedSteps((prev) => ({ ...prev, [index]: false, [index - 1]: true }));
                              setTimeout(() => {
                                window.scrollTo({ top: Math.max(0, window.scrollY - 150), behavior: 'smooth' });
                              }, 150);
                            }} 
                            variant="outline"
                            size="lg" 
                            className="min-w-[120px] text-base shadow-sm"
                          >
                            Back
                          </Button>
                        ) : (
                          <div /> /* Spacer */
                        )}
                        
                        {index === STEPS.length - 1 ? (
                          <Button onClick={handleSubmit} size="lg" className="bg-primary-600 hover:bg-primary-700 min-w-[200px] text-base shadow-sm">
                            Submit Initiation
                          </Button>
                        ) : (
                          <Button onClick={() => handleNext(index)} size="lg" className="bg-slate-900 hover:bg-slate-800 min-w-[160px] text-base shadow-sm">
                            Save & Continue
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
