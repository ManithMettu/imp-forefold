import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import BankKYCDetails from "~/pages/emp-onboarding-forms/bank-kyc-details-forms";
import BasicInfo from "~/pages/emp-onboarding-forms/basic-Info-forms";
import ContractAgreement from "~/pages/emp-onboarding-forms/contract-agreement-form";
import EmploymentDetails from "~/pages/emp-onboarding-forms/employment-details-form";
import Stepper from "~/pages/emp-onboarding-forms/stepper";

const stepPaths = [
  "pages/emp-onboarding-forms/basic-Info-forms",
  "pages/emp-onboarding-forms/employment-details-form",
  "pages/emp-onboarding-forms/bank-kyc-details-forms",
  "pages/emp-onboarding-forms/contract-agreement-form",
];

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0);
  const location = useLocation();

  // Update current step based on URL
  useEffect(() => {
    const path = location.pathname;
    switch (path) {
      case "/dashboard/add-employee":
        setCurrentStep(0);
        break;
      case "/dashboard/add-employee/employment-details-form":
        setCurrentStep(1);
        break;
      case "/dashboard/add-employee/bank-kyc-details-forms":
        setCurrentStep(2);
        break;
      case "/dashboard/add-employee/contract-agreement-form":
        setCurrentStep(3);
        break;
    }
  }, [location]);

  // Array of components to render based on the step
  const stepsComponents = [
    <BasicInfo />,
    <EmploymentDetails />,
    <BankKYCDetails />,
    <ContractAgreement />,
  ];

  // Handle navigation manually (updating state)
  const handleNavigation = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <Stepper currentStep={currentStep} onStepChange={handleNavigation} />
      <div className="mt-8">
        <Outlet />
      </div>
    </div>
  );
}
