import * as Form from "@radix-ui/react-form";
import ky from "ky";
import type React from "react";
import { useState } from "react";
import { Link } from "react-router";
import FormInput from "~/components/ui/form-input";
import FormPasswordInput from "~/components/ui/form-password-input";
import FormPhoneInput from "~/components/ui/form-phone-input";
import FormSelect from "~/components/ui/form-select";
import FormSubmitButton from "~/components/ui/form-submit-button";

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
          <FormInput
            type="text"
            name="business_name"
            label="Business Name"
            placeholder="Your Company LLP"
            required
          />
          <FormInput
            type="text"
            name="business_owner_full_name"
            label="Full Name"
            placeholder="John Doe"
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormInput
            type="email"
            name="email"
            label="Email"
            placeholder="you@example.com"
            required
          />
          <FormPhoneInput required />
        </div>

        <div className="md:col-span-2">
          <FormSelect
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
          <FormSelect
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
          <FormInput
            type="text"
            name="city"
            label="City"
            placeholder="New York"
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormPasswordInput required />
          <FormInput
            type="password"
            name="confirm_password"
            label="Confirm Password"
            placeholder="••••••••"
            customError={[
              (confirmPassword, formData) =>
                formData.get("password") !== confirmPassword,
              "Passwords mismatch",
            ]}
            required
          />
        </div>

        <FormSubmitButton isSubmitting={isSubmitting} className="w-full">
          Create account
        </FormSubmitButton>

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
