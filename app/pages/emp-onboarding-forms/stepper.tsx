import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/button";

const steps = [
  { label: "Basic Info", path: "/dashboard/add-employee" },
  { label: "Employment Details", path: "/dashboard/add-employee/employment-details-form" },
  { label: "Bank & KYC", path: "/dashboard/add-employee/bank-kyc-details-forms" },
  { label: "Contract Agreement", path: "/dashboard/add-employee/contract-agreement-form" },
];

export default function Stepper({ 
  currentStep, 
  onStepChange 
}: { 
  currentStep: number;
  onStepChange: (stepIndex: number) => void;
}) {
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      onStepChange(nextStep);
      navigate(steps[nextStep].path);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      onStepChange(prevStep);
      navigate(steps[prevStep].path);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="relative">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.path} className="relative flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center
                  ${index <= currentStep 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-gray-300 text-gray-300'}`}
              >
                {index < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span className={`mt-2 text-sm font-medium ${
                index === currentStep ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {step.label}
              </span>
            </div>
          ))}
          <div className="absolute top-5 left-0 right-0 -z-10">
            <div className="h-0.5 w-full bg-gray-200">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button
          onClick={handlePrevious}
          variant="outline"
          className="flex items-center gap-2"
          disabled={currentStep === 0}
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </Button>
        <Button
          onClick={handleNext}
          variant="default"
          className="flex items-center gap-2"
          disabled={currentStep === steps.length - 1}
        >
          Next <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
