import * as Form from "@radix-ui/react-form";
import ky from "ky";
import { ChevronDown, Eye, EyeOff } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { Link } from "react-router";

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
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    delete data["confirm_password"];
    setIsSubmitting(true);
    try {
      const response = await ky.post("/api/signup", { json: data });
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

  const industries = [
    { id: 1, name: "Real Estate" },
    { id: 2, name: "House Keeping" },
    { id: 3, name: "Security Services" },
    { id: 4, name: "Hospitals" },
    { id: 5, name: "Others" },
  ];

  const countries = [
    { code: "US", name: "United States" },
    { code: "CA", name: "Canada" },
    { code: "GB", name: "United Kingdom" },
    { code: "AU", name: "Australia" },
    { code: "DE", name: "Germany" },
    { code: "FR", name: "France" },
    { code: "JP", name: "Japan" },
    { code: "CN", name: "China" },
    { code: "IN", name: "India" },
    { code: "BR", name: "Brazil" },
  ];

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
          <Form.Field name="business_name">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-sm font-medium text-gray-700">
                Business Name
              </Form.Label>
              <Form.Message
                className="text-xs text-red-500"
                match="valueMissing"
              >
                Required
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                placeholder="Your Company LLC"
                required
              />
            </Form.Control>
          </Form.Field>

          <Form.Field name="business_owner_full_name">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-sm font-medium text-gray-700">
                Full Name
              </Form.Label>
              <Form.Message
                className="text-xs text-red-500"
                match="valueMissing"
              >
                Required
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                placeholder="John Doe"
                required
              />
            </Form.Control>
          </Form.Field>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Form.Field name="email">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-sm font-medium text-gray-700">
                Email Address
              </Form.Label>
              <Form.Message
                className="text-xs text-red-500"
                match="valueMissing"
              >
                Required
              </Form.Message>
              <Form.Message
                className="text-xs text-red-500"
                match="typeMismatch"
              >
                Invalid email
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                placeholder="you@example.com"
                required
              />
            </Form.Control>
          </Form.Field>

          <Form.Field name="phone">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-sm font-medium text-gray-700">
                Phone Number
              </Form.Label>
              <Form.Message
                className="text-xs text-red-500"
                match="valueMissing"
              >
                Required
              </Form.Message>
              <Form.Message
                className="text-xs text-red-500"
                match="typeMismatch"
              >
                Invalid phone number
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                type="tel"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                placeholder="+1 (555) 123-4567"
                required
              />
            </Form.Control>
          </Form.Field>
        </div>

        <Form.Field name="industry_id" className="md:col-span-2">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-sm font-medium text-gray-700">
              Industry
            </Form.Label>
            <Form.Message className="text-xs text-red-500" match="valueMissing">
              Required
            </Form.Message>
          </div>
          <div className="relative mt-1">
            <Form.Control asChild>
              <select
                className="flex w-full appearance-none items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                defaultValue=""
                required
              >
                <option value="" hidden>
                  Select an industry
                </option>
                {industries.map(({ id, name }, index) => (
                  <option value={id} key={index}>
                    {name}
                  </option>
                ))}
              </select>
            </Form.Control>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
              <ChevronDown className="h-5 w-5 text-gray-500" />
            </div>
          </div>
        </Form.Field>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Form.Field name="country">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-sm font-medium text-gray-700">
                Country
              </Form.Label>
              <Form.Message
                className="text-xs text-red-500"
                match="valueMissing"
              >
                Required
              </Form.Message>
            </div>
            <div className="relative mt-1">
              <Form.Control asChild>
                <select
                  className="flex w-full appearance-none items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  defaultValue=""
                  required
                >
                  <option value="" hidden>
                    Select a country
                  </option>
                  {countries.map(({ code, name }, index) => (
                    <option value={code} key={index}>
                      {name}
                    </option>
                  ))}
                </select>
              </Form.Control>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                <ChevronDown className="h-5 w-5 text-gray-500" />
              </div>
            </div>
          </Form.Field>

          <Form.Field name="city">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-sm font-medium text-gray-700">
                City
              </Form.Label>
              <Form.Message
                className="text-xs text-red-500"
                match="valueMissing"
              >
                Required
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                placeholder="New York"
                required
              />
            </Form.Control>
          </Form.Field>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Form.Field name="password">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-sm font-medium text-gray-700">
                Password
              </Form.Label>
              <Form.Message
                className="text-xs text-red-500"
                match="valueMissing"
              >
                Required
              </Form.Message>
              <Form.Message className="text-xs text-red-500" match="tooShort">
                Minimum 8 characters
              </Form.Message>
            </div>
            <div className="relative mt-1">
              <Form.Control asChild>
                <input
                  type={showPassword ? "text" : "password"}
                  className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </Form.Control>
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={16} className="text-gray-400" />
                ) : (
                  <Eye size={16} className="text-gray-400" />
                )}
              </button>
            </div>
          </Form.Field>

          <Form.Field name="confirm_password">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-sm font-medium text-gray-700">
                Confirm Password
              </Form.Label>
              <Form.Message
                className="text-xs text-red-500"
                match="valueMissing"
              >
                Required
              </Form.Message>
              <Form.Message
                className="text-xs text-red-500"
                match={(confirmPassword, formData) =>
                  confirmPassword !== formData.get("password")
                }
              >
                Passwords don't match
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input
                type={showPassword ? "text" : "password"}
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                placeholder="••••••••"
                required
              />
            </Form.Control>
          </Form.Field>
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
