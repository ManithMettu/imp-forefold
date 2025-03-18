import * as Form from "@radix-ui/react-form";
import ky from "ky";
import type React from "react";
import { useState } from "react";
import { Link } from "react-router";
import ConfirmPasswordField from "~/components/form/confirm-password-field";
import EmailField from "~/components/form/email-field";
import PasswordField from "~/components/form/password-field";
import PhoneField from "~/components/form/phone-field";
import SelectField from "~/components/form/select-field";
import TextField from "~/components/form/text-field";

type SignupResponse = {
  message: string;
  data: {
    organization_id: string;
  };
};

interface Props {
  onSuccess: (organizationId: string) => void;
}

export default function SignupForm({ onSuccess }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    delete data["confirm_password"];
    setIsSubmitting(true);
    try {
      const response = await ky.post("/api/auth/signup", { json: data });
      const result = await response.json<SignupResponse>();
      console.log(result.message);
      onSuccess(result.data.organization_id);
    } catch (err) {
      console.error(err);
      // TODO: Set error.
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-xl rounded-xl bg-white p-6 shadow-md">
      <div className="mb-7 text-center">
        <h2 className="mb-1 text-2xl font-bold text-gray-800">
          Create your account
        </h2>
        <p className="text-sm text-gray-500">
          Fill in your business information to get started.
        </p>
      </div>
      <Form.Root className="space-y-5" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <TextField
            name="business_name"
            label="Business Name"
            placeholder="Your Company LLP"
            required
          />
          <TextField
            name="business_owner_full_name"
            label="Full Name"
            placeholder="John Doe"
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <EmailField required />
          <PhoneField placeholder="+1 (555) 123-4567" required />
        </div>

        <div className="md:col-span-2">
          <SelectField
            name="industry_id"
            label="Industry"
            placeholder="Select an industry"
            options={[
              { value: 1, label: "Real Estate" },
              { value: 2, label: "House Keeping" },
              { value: 3, label: "Security Services" },
              { value: 4, label: "Hospitals" },
              { value: 5, label: "Others" },
            ]}
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <SelectField
            name="country"
            label="Country"
            placeholder="Select a country"
            options={[
              { value: "US", label: "United States" },
              { value: "CA", label: "Canada" },
              { value: "GB", label: "United Kingdom" },
              { value: "AU", label: "Australia" },
              { value: "DE", label: "Germany" },
              { value: "FR", label: "France" },
              { value: "JP", label: "Japan" },
              { value: "CN", label: "China" },
              { value: "IN", label: "India" },
              { value: "BR", label: "Brazil" },
            ]}
            required
          />
          <TextField name="city" label="City" placeholder="New York" required />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <PasswordField minLength={8} required />
          <ConfirmPasswordField required />
        </div>

        <Form.Submit asChild>
          <button
            disabled={isSubmitting}
            className="w-full rounded-md border border-transparent bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2.5 font-medium text-white shadow-sm hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </Form.Submit>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?&nbsp;
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Log in
            </Link>
          </p>
        </div>
      </Form.Root>
    </div>
  );
}
