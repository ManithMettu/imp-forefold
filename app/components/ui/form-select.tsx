import * as Form from "@radix-ui/react-form";
import { ChevronDown } from "lucide-react";
import { cn } from "~/lib/utils";

type Option = {
  value: string | number;
  label: string;
};

type Props = {
  name: string;
  label: string;
  required?: boolean | string;
  defaultValue?: string | number;
  placeholder?: string;
  options: Option[];
  customError?: [
    (
      | ((value: string, formData: FormData) => boolean)
      | ((value: string, formData: FormData) => Promise<boolean>)
    ),
    string,
  ];
  fieldErrors?: Record<string, string>;
} & Omit<React.ComponentProps<"select">, "name" | "required" | "defaultValue">;

export default function FormSelect({
  name,
  label,
  required,
  placeholder = "Select an option",
  options,
  customError,
  fieldErrors,
  className,
  defaultValue = "",
  ...rest
}: Props) {
  return (
    <Form.Field name={name} serverInvalid={fieldErrors?.[name] !== undefined}>
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-sm font-medium text-gray-700">
          {label}
        </Form.Label>
        {required && (
          <Form.Message className="text-xs text-red-500" match="valueMissing">
            {typeof required === "string" ? required : "Required"}
          </Form.Message>
        )}
        {fieldErrors?.[name] && (
          <Form.Message className="text-xs text-red-500">
            {fieldErrors[name]}
          </Form.Message>
        )}
        {customError && (
          <Form.Message className="text-xs text-red-500" match={customError[0]}>
            {customError[1]}
          </Form.Message>
        )}
      </div>
      <div className="relative mt-1">
        <Form.Control asChild>
          <select
            {...rest}
            defaultValue={defaultValue}
            className={cn(
              "border-input dark:bg-input/30 h-9 w-full min-w-0 appearance-none rounded-md border bg-transparent px-3 py-1 pr-11 text-base shadow-xs disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              "focus-visible:border-ring focus-visible:ring-ring/50 outline-none focus-visible:ring-[3px]",
              "data-invalid:ring-destructive/20 dark:data-invalid:ring-destructive/40 data-invalid:border-destructive",
              "flex transition-[color,box-shadow]",
              className,
            )}
            required={Boolean(required)}
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
