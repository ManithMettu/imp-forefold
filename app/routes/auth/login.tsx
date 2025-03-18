import * as Form from "@radix-ui/react-form";
import ky from "ky";
import { Eye, EyeOff, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
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
  const [showPassword, setShowPassword] = useState(false);
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
            <Form.Field
              name={loginMethod === "email" ? "email" : "phone"}
              className="md:col-span-2"
            >
              <div className="flex items-baseline justify-between">
                <Form.Label className="text-sm font-medium text-gray-700">
                  {loginMethod === "email" ? "Email Address" : "Phone Number"}
                </Form.Label>
                <Form.Message
                  className="text-xs text-red-500"
                  match="valueMissing"
                >
                  Required
                </Form.Message>
                {loginMethod === "email" && (
                  <Form.Message
                    className="text-xs text-red-500"
                    match="typeMismatch"
                  >
                    Invalid email
                  </Form.Message>
                )}
              </div>
              <Form.Control asChild>
                <input
                  type={loginMethod === "email" ? "email" : "tel"}
                  className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  placeholder={
                    loginMethod === "email"
                      ? "you@example.com"
                      : "+1 (555) 123-4567"
                  }
                  required
                />
              </Form.Control>
            </Form.Field>

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
              </div>
              <div className="relative mt-1">
                <Form.Control asChild>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                    placeholder="••••••••"
                    required
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

            <Form.Submit asChild>
              <button
                disabled={isSubmitting}
                className="w-full rounded-md border border-transparent bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2.5 font-medium text-white shadow-sm hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              >
                {isSubmitting ? "Logging in..." : "Log in"}
              </button>
            </Form.Submit>

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
