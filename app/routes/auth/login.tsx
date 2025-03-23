import * as Form from "@radix-ui/react-form";
import ky from "ky";
import { Mail, Phone } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import PasswordField from "~/components/form/password-field";
import PhoneField from "~/components/form/phone-field";
import SubmitButton from "~/components/form/submit-button";
import FormInput from "~/components/ui/form-input";
import { cn } from "~/lib/utils";
import Footer from "./layout/footer";
import Header from "./layout/header";

type LoginResponse = {
  message: string;
  data: {
    token: string;
  };
};

export default function Login() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginMethod, setLoginMethod] = useState("email");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setIsSubmitting(true);

    try {
      const response = await ky.post("/api/auth/login", { json: data });
      const result = await response.json<LoginResponse>();
      console.log(result.message);

      // TODO: Store the token in store.
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      // TODO: Set field errors.
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-grow flex-col items-center justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md rounded-xl bg-white p-6 shadow-md">
          <div className="mb-7 text-center">
            <h2 className="mb-1 text-2xl font-bold text-gray-800">
              Welcome back
            </h2>
            <p className="text-sm text-gray-500">
              Log in to your account to continue
            </p>
          </div>

          <div className="mb-5">
            <div className="flex w-full rounded-md bg-gray-100 p-1">
              <button
                type="button"
                className={cn(
                  "flex flex-1 items-center justify-center rounded-md py-2 text-sm font-medium transition-all",
                  loginMethod === "email"
                    ? "bg-white shadow-sm"
                    : "text-gray-600 hover:text-gray-800",
                )}
                onClick={() => setLoginMethod("email")}
              >
                <Mail size={16} className="mr-2" />
                Email
              </button>
              <button
                type="button"
                className={cn(
                  "flex flex-1 items-center justify-center rounded-md py-2 text-sm font-medium transition-all",
                  loginMethod === "phone"
                    ? "bg-white shadow-sm"
                    : "text-gray-600 hover:text-gray-800",
                )}
                onClick={() => setLoginMethod("phone")}
              >
                <Phone size={16} className="mr-2" />
                Phone
              </button>
            </div>
          </div>

          <Form.Root className="space-y-5" onSubmit={onSubmit}>
            {loginMethod === "email" ? (
              <FormInput
                type="email"
                name="email"
                label="Email"
                placeholder="you@example.com"
                required
              />
            ) : (
              <PhoneField required />
            )}
            <PasswordField required />
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember_me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <SubmitButton isSubmitting={isSubmitting} text="Log in" />

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?&nbsp;
                <Link
                  to="/signup"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </Form.Root>
        </div>
      </main>

      <Footer />
    </div>
  );
}
