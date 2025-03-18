import * as Form from "@radix-ui/react-form";
import { ChevronDown } from "lucide-react";

type Option = {
  value: string | number;
  label: string;
};

type Props = {
  name: string;
  label: string;
  required?: boolean | string;
  disabled?: boolean;
  placeholder?: string;
  options: Option[];
  defaultValue?: string;
};

export default function SelectField({
  name,
  label,
  required,
  disabled,
  placeholder = "Select an option",
  options,
  defaultValue = "",
}: Props) {
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
      </div>
      <div className="relative mt-1">
        <Form.Control asChild>
          <select
            className="flex w-full appearance-none items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
            defaultValue={defaultValue}
            required={Boolean(required)}
            disabled={disabled}
          >
            <option value="" hidden>
              {placeholder}
            </option>
            {options.map(({ value, label }, index) => (
              <option value={value} key={index}>
                {label}
              </option>
            ))}
          </select>
        </Form.Control>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
          <ChevronDown className="h-5 w-5 text-gray-500" />
        </div>
      </div>
    </Form.Field>
  );
}
