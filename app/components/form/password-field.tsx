import * as Form from "@radix-ui/react-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

type Props = {
  name?: string;
  label?: string;
  required?: boolean | string;
  disabled?: boolean;
  minLength?: number | [number, string | ((minLength: number) => string)];
  maxLength?: number | [number, string | ((maxLength: number) => string)];
};

export default function PasswordField({
  name = "password",
  label = "Password",
  required,
  disabled,
  minLength = 8,
  maxLength,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form.Field name={name}>
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-sm font-medium text-gray-700">
          {label}
        </Form.Label>
        {required && (
          <Form.Message className="text-xs text-red-500" match="valueMissing">
            {typeof required === "string" ? required : "Required"}
          </Form.Message>
        )}
        {minLength !== undefined && (
          <Form.Message className="text-xs text-red-500" match="tooShort">
            {Array.isArray(minLength)
              ? typeof minLength[1] === "function"
                ? minLength[1](minLength[0])
                : minLength[1]
              : `Min. ${minLength} characters`}
          </Form.Message>
        )}
        {maxLength !== undefined && (
          <Form.Message className="text-xs text-red-500" match="tooLong">
            {Array.isArray(maxLength)
              ? typeof maxLength[1] === "function"
                ? maxLength[1](maxLength[0])
                : maxLength[1]
              : `Max. ${maxLength} characters`}
          </Form.Message>
        )}
      </div>
      <div className="relative mt-1">
        <Form.Control asChild>
          <input
            type={showPassword ? "text" : "password"}
            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
            placeholder="••••••••"
            required={Boolean(required)}
            disabled={disabled}
            minLength={Array.isArray(minLength) ? minLength[0] : minLength}
            maxLength={Array.isArray(maxLength) ? maxLength[0] : maxLength}
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
  );
}
