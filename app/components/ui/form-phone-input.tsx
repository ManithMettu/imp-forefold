import * as flag from "country-flag-icons/react/3x2";
import { AsYouType } from "libphonenumber-js";
import { forwardRef, useRef, useState } from "react";
import type { SetOptional } from "type-fest";
import { cn } from "~/lib/utils";
import FormInput from "./form-input";
import { Input } from "./input";

type Props = { defaultValue?: string } & SetOptional<
  Omit<
    React.ComponentProps<typeof FormInput>,
    "type" | "renderInput" | "value" | "onChange" | "defaultValue"
  >,
  "name" | "label"
>;

export default function FormPhoneInput({
  name = "phone",
  label = "Phone Number",
  placeholder = "+1 (555) 123-4567",
  defaultValue = "+91",
  ...rest
}: Props) {
  return (
    <FormInput
      {...rest}
      type="tel"
      name={name}
      label={label}
      placeholder={placeholder}
      defaultValue={defaultValue}
      renderInput={forwardRef(function CustomInput(
        { defaultValue: dv, className, ...inputProps },
        ref,
      ) {
        const formatter = useRef(getFormatter(dv as string | undefined));
        const [country, setCountry] = useState(formatter.current.country);
        const [value, setValue] = useState((dv as string | undefined) ?? "");

        function onChange(e: React.ChangeEvent<HTMLInputElement>) {
          formatter.current.reset();
          setValue(formatter.current.input(e.target.value));
          setCountry(formatter.current.country);
        }

        return (
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              {country ? (
                flag[country]({ className: "h-4 w-6 rounded-[2px]" })
              ) : (
                <span className="h-4 w-6 rounded-[2px] bg-gray-200" />
              )}
            </div>
            <Input
              {...inputProps}
              ref={ref}
              value={value}
              onChange={onChange}
              className={cn("pl-11", className)}
            />
          </div>
        );
      })}
    />
  );
}

function getFormatter(initialInput?: string) {
  const formatter = new AsYouType();
  if (initialInput) formatter.input(initialInput);
  return formatter;
}
