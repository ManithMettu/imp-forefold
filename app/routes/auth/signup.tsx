import { CheckCircleIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { cn } from "~/lib/utils";
import OtpVerificationForm from "./forms/otp-form";
import SignupForm from "./forms/signup-form";
import Footer from "./layout/footer";
import Header from "./layout/header";

type SignupStep =
  | "signup"
  | "email-verification"
  | "phone-verification"
  | "complete";

export default function Signup() {
  const [currentStep, setCurrentStep] = useState<SignupStep>("signup");
  const [organizationId, setOrganizationId] = useState<string>();

  const steps = [
    {
      id: "signup",
      name: "Account Details",
      status: currentStep === "signup" ? "current" : "complete",
    },
    {
      id: "email-verification",
      name: "Email Verification",
      status:
        currentStep === "email-verification"
          ? "current"
          : currentStep === "signup"
            ? "upcoming"
            : "complete",
    },
    {
      id: "phone-verification",
      name: "Phone Verification",
      status:
        currentStep === "phone-verification"
          ? "current"
          : currentStep === "complete"
            ? "complete"
            : "upcoming",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-grow flex-col items-center justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
        <nav
          aria-label="Progress"
          className="mb-12 sm:mx-auto sm:w-full sm:max-w-xl"
        >
          <ol role="list" className="flex items-center">
            {steps.map((step, stepIdx) => (
              <li
                key={step.id}
                className={cn(
                  "relative",
                  stepIdx !== steps.length - 1 && "pr-8 sm:pr-20",
                  stepIdx !== 0 && "pl-8 sm:pl-20",
                  "flex flex-grow",
                )}
              >
                {step.status === "complete" ? (
                  <>
                    <div
                      className="absolute inset-0 flex items-center"
                      aria-hidden="true"
                    >
                      <div className="h-0.5 w-full bg-blue-600" />
                    </div>
                    <div className="group relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
                      <svg
                        className="h-5 w-5 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="sr-only">{step.name}</span>
                    </div>
                  </>
                ) : step.status === "current" ? (
                  <>
                    <div
                      className="absolute inset-0 flex items-center"
                      aria-hidden="true"
                    >
                      <div className="h-0.5 w-full bg-gray-200" />
                    </div>
                    <div
                      className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-600 bg-white"
                      aria-current="step"
                    >
                      <span
                        className="h-2.5 w-2.5 rounded-full bg-blue-600"
                        aria-hidden="true"
                      />
                      <span className="sr-only">{step.name}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="absolute inset-0 flex items-center"
                      aria-hidden="true"
                    >
                      <div className="h-0.5 w-full bg-gray-200" />
                    </div>
                    <div className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                      <span
                        className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"
                        aria-hidden="true"
                      />
                      <span className="sr-only">{step.name}</span>
                    </div>
                  </>
                )}

                <span className="absolute top-10 left-0 w-full text-center text-sm font-medium text-gray-500">
                  {step.name}
                </span>
              </li>
            ))}
          </ol>
        </nav>

        {currentStep === "signup" && (
          <SignupForm onSuccess={setOrganizationId} />
        )}

        {currentStep === "email-verification" && organizationId && (
          <OtpVerificationForm
            type="email"
            organization_id={organizationId}
            onSuccess={() => setCurrentStep("phone-verification")}
            onBack={() => setCurrentStep("signup")}
          />
        )}

        {currentStep === "phone-verification" && organizationId && (
          <OtpVerificationForm
            type="phone"
            organization_id={organizationId}
            onSuccess={() => setCurrentStep("complete")}
            onBack={() => setCurrentStep("signup")}
          />
        )}

        {currentStep === "complete" && (
          <div className="mx-auto w-full max-w-md rounded-xl bg-white p-6 text-center shadow-md">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              Registration Complete!
            </h2>
            <p className="mb-6 text-gray-600">
              Your account has been successfully created and verified.
            </p>
            <Link
              to="/dashboard"
              className="block w-full rounded-md border border-transparent bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2.5 font-medium text-white shadow-sm hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            >
              Go to Dashboard
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
