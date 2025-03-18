import * as Form from "@radix-ui/react-form";
import ky from "ky";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import ConfirmPasswordField from "~/components/form/confirm-password-field";
import EmailField from "~/components/form/email-field";
import PasswordField from "~/components/form/password-field";
import PhoneField from "~/components/form/phone-field";
import SubmitButton from "~/components/form/submit-button";
import { cn } from "~/lib/utils";
import OtpVerificationForm from "./forms/otp-form";
import Footer from "./layout/footer";
import Header from "./layout/header";

type ResetPasswordStep = "request" | "verification" | "reset" | "complete";

type ForgotPasswordResponse = {
  message: string;
  data: {
    organization_id: string;
  };
};

type ResetPasswordResponse = {
  message: string;
};

export default function ForgotPassword() {
  const [currentStep, setCurrentStep] = useState<ResetPasswordStep>("request");
  const [organizationId, setOrganizationId] = useState<string>();
  const [resetMethod, setResetMethod] = useState<"email" | "phone">("email");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function onRequestReset(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setError("");
    setIsSubmitting(true);

    try {
      const response = await ky.post("/api/auth/forgot-password", {
        json: {
          ...data,
          method: resetMethod,
        },
      });
      const result = await response.json<ForgotPasswordResponse>();
      setSuccess(result.message);
      setOrganizationId(result.data.organization_id);
      setCurrentStep("verification");
    } catch (err) {
      console.error(err);
      setError(
        "Account not found. Please check your information and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function onPasswordReset(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setError("");
    setIsSubmitting(true);

    if (data.new_password !== data.confirm_password) {
      setError("Passwords don't match");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await ky.post("/api/reset-password", {
        json: {
          organization_id: organizationId,
          new_password: data.new_password,
        },
      });
      const result = await response.json<ResetPasswordResponse>();
      setSuccess(result.message);
      setCurrentStep("complete");
    } catch (err) {
      console.error(err);
      setError("Failed to reset password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-grow flex-col items-center justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
        {currentStep === "request" && (
          <div className="mx-auto w-full max-w-md rounded-xl bg-white p-6 shadow-md">
            <div className="mb-7 text-center">
              <h2 className="mb-1 text-2xl font-bold text-gray-800">
                Forgot Password
              </h2>
              <p className="text-sm text-gray-500">
                Enter your email or phone number to reset your password
              </p>
            </div>

            {error && (
              <div className="mb-4 rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-5">
              <div className="flex w-full rounded-md bg-gray-100 p-1">
                <button
                  type="button"
                  className={cn(
                    "flex flex-1 items-center justify-center rounded-md py-2 text-sm font-medium transition-all",
                    resetMethod === "email"
                      ? "bg-white shadow-sm"
                      : "text-gray-600 hover:text-gray-800",
                  )}
                  onClick={() => setResetMethod("email")}
                >
                  <Mail size={16} className="mr-2" />
                  Email
                </button>
                <button
                  type="button"
                  className={cn(
                    "flex flex-1 items-center justify-center rounded-md py-2 text-sm font-medium transition-all",
                    resetMethod === "phone"
                      ? "bg-white shadow-sm"
                      : "text-gray-600 hover:text-gray-800",
                  )}
                  onClick={() => setResetMethod("phone")}
                >
                  <Phone size={16} className="mr-2" />
                  Phone
                </button>
              </div>
            </div>

            <Form.Root className="space-y-5" onSubmit={onRequestReset}>
              {resetMethod === "email" ? (
                <EmailField required />
              ) : (
                <PhoneField required />
              )}

              <Form.Submit asChild>
                <button
                  disabled={isSubmitting}
                  className="w-full rounded-md border border-transparent bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2.5 font-medium text-white shadow-sm hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                >
                  {isSubmitting ? "Processing..." : "Reset Password"}
                </button>
              </Form.Submit>

              <div className="text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center font-medium text-blue-600 hover:text-blue-500"
                >
                  <ArrowLeft size={16} className="mr-2" />
                  Back to Login
                </Link>
              </div>
            </Form.Root>
          </div>
        )}

        {currentStep === "verification" && organizationId && (
          <OtpVerificationForm
            type={resetMethod}
            organization_id={organizationId}
            onSuccess={() => setCurrentStep("reset")}
            onBack={() => setCurrentStep("request")}
          />
        )}

        {currentStep === "reset" && (
          <div className="mx-auto w-full max-w-md rounded-xl bg-white p-6 shadow-md">
            <div className="mb-7 text-center">
              <h2 className="mb-1 text-2xl font-bold text-gray-800">
                Create New Password
              </h2>
              <p className="text-sm text-gray-500">
                Enter a strong password for your account
              </p>
            </div>

            {error && (
              <div className="mb-4 rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <Form.Root className="space-y-5" onSubmit={onPasswordReset}>
              <PasswordField
                name="new_password"
                label="New Password"
                required
              />
              <ConfirmPasswordField passwordName="new_password" required />
              <SubmitButton
                isSubmitting={isSubmitting}
                text="Update Password"
              />
            </Form.Root>
          </div>
        )}

        {currentStep === "complete" && (
          <div className="mx-auto w-full max-w-md rounded-xl bg-white p-6 text-center shadow-md">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-8 w-8 text-green-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              Password Reset Complete
            </h2>
            <p className="mb-6 text-gray-600">
              Your password has been successfully updated. You can now log in
              with your new password.
            </p>
            <Link
              to="/login"
              className="block w-full rounded-md border border-transparent bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2.5 font-medium text-white shadow-sm hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            >
              Back to Login
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
