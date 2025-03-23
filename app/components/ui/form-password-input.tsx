import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";
import type { SetOptional } from "type-fest";
import { cn } from "~/lib/utils";
import FormInput from "./form-input";
import { Input } from "./input";

type Props = SetOptional<
  Omit<React.ComponentProps<typeof FormInput>, "type" | "renderInput">,
  "name" | "label"
>;

export default function FormPasswordInput({
  name = "password",
  label = "Password",
  placeholder = "••••••••",
  minLength = 8,
  ...rest
}: Props) {
  return (
    <FormInput
      {...rest}
      type="password"
      name={name}
      label={label}
      placeholder={placeholder}
      minLength={minLength}
      renderInput={forwardRef(function CustomInput(
        { type, className, ...inputProps },
        ref,
      ) {
        const [show, setShow] = useState(false);
        return (
          <div className="relative">
            <Input
              {...inputProps}
              ref={ref}
              type={show ? "text" : type}
              className={cn("pr-10", className)}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShow(!show)}
            >
              {show ? (
                <EyeOff size={16} className="text-gray-400" />
              ) : (
                <Eye size={16} className="text-gray-400" />
              )}
            </button>
          </div>
        );
      })}
    />
  );
}
