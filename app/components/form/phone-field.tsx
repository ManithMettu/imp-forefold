import * as Form from "@radix-ui/react-form";
import * as flag from "country-flag-icons/react/3x2";
import { AsYouType } from "libphonenumber-js";
import { useRef, useState } from "react";

type Props = {
  name?: string;
  label?: string;
  required?: boolean | string;
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: string;
};

function getFormatter(initialInput?: string) {
  const formatter = new AsYouType();
  if (initialInput) formatter.input(initialInput);
  return formatter;
}

export default function PhoneField({
  name = "phone",
  label = "Phone Number",
  required,
  disabled,
  placeholder,
  defaultValue = "+91",
}: Props) {
  const formatter = useRef(getFormatter(defaultValue));
  const [country, setCountry] = useState(formatter.current.country);
  const [value, setValue] = useState(defaultValue);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    formatter.current.reset();
    setValue(formatter.current.input(e.target.value));
    setCountry(formatter.current.country);
  }

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
        <Form.Message className="text-xs text-red-500" match="typeMismatch">
          Invalid number
        </Form.Message>
      </div>
      <div className="relative mt-1 flex items-center">
        <div className="pointer-events-none absolute left-3 flex items-center">
          {country ? (
            flag[country]({ className: "h-4 w-6 rounded-[2px]" })
          ) : (
            <span className="h-4 w-6 rounded-[2px] bg-gray-200" />
          )}
        </div>
        <Form.Control asChild>
          <input
            type="tel"
            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 pl-10 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={Boolean(required)}
            disabled={disabled}
          />
        </Form.Control>
      </div>
    </Form.Field>
  );
}
