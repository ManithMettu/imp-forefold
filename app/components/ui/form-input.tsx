import * as Form from "@radix-ui/react-form";
import type { Entries } from "type-fest";
import { cn } from "~/lib/utils";
import { Input } from "./input";

type Props = {
  name: string;
  type?: React.HTMLInputTypeAttribute | [React.HTMLInputTypeAttribute, string];
  label: string;
  required?: boolean | string;
  min?:
    | string
    | number
    | [string | number, string | ((min: string | number) => string)];
  max?:
    | string
    | number
    | [string | number, string | ((min: string | number) => string)];
  step?:
    | string
    | number
    | [string | number, string | ((step: string | number) => string)];
  minLength?: number | [number, string | ((minLength: number) => string)];
  maxLength?: number | [number, string | ((maxLength: number) => string)];
  pattern?: string | [string, string];
  customError?: [
    (
      | ((value: string, formData: FormData) => boolean)
      | ((value: string, formData: FormData) => Promise<boolean>)
    ),
    string,
  ];
  fieldErrors?: Record<string, string>;
  renderInput?: (props: React.ComponentProps<"input">) => React.ReactNode;
} & Omit<
  React.ComponentProps<"input">,
  | "name"
  | "type"
  | "required"
  | "min"
  | "max"
  | "step"
  | "minLength"
  | "maxLength"
  | "pattern"
>;

type Messages = {
  badInput?: string;
  patternMismatch?: string;
  rangeOverflow?: string;
  rangeUnderflow?: string;
  stepMismatch?: string;
  tooLong?: string;
  tooShort?: string;
  typeMismatch?: string;
  valueMissing?: string;
};

export default function FormInput({
  name,
  type,
  label,
  required,
  min,
  max,
  step,
  minLength,
  maxLength,
  pattern,
  customError,
  fieldErrors,
  renderInput: RenderInput,
  className,
  ...rest
}: Props) {
  const messages: Messages = {
    badInput: "Bad input",
  };

  if (type) messages.typeMismatch = Array.isArray(type) ? type[1] : "Bad value";
  if (pattern)
    messages.patternMismatch = Array.isArray(pattern)
      ? pattern[1]
      : "Bad format";
  if (max !== undefined)
    messages.rangeOverflow = getErrorMessage(max, (val) => `Min. value ${val}`);
  if (min !== undefined)
    messages.rangeUnderflow = getErrorMessage(
      min,
      (val) => `Max. value ${val}`,
    );
  if (step !== undefined)
    messages.stepMismatch = getErrorMessage(step, (val) => `Step ${val}`);
  if (maxLength !== undefined)
    messages.tooLong = getErrorMessage(maxLength, (val) => `Max. ${val} chars`);
  if (required)
    messages.valueMissing =
      typeof required === "string" ? required : "Required";
  if (minLength !== undefined)
    messages.tooShort = getErrorMessage(
      minLength,
      (val) => `Min. ${val} chars`,
    );

  return (
    <Form.Field name={name} serverInvalid={fieldErrors?.[name] !== undefined}>
      <div className="flex items-baseline justify-between">
        <Form.Label className="text-sm font-medium text-gray-700">
          {label}
        </Form.Label>
        {(Object.entries(messages) as Entries<Messages>).map(
          ([match, message]) => (
            <Form.Message
              key={match}
              className="text-xs text-red-500"
              match={match}
            >
              {message!}
            </Form.Message>
          ),
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
      <Form.Control
        {...rest}
        type={Array.isArray(type) ? type[0] : type}
        required={Boolean(required)}
        min={getPropValue(min)}
        max={getPropValue(max)}
        step={getPropValue(step)}
        minLength={getPropValue(minLength)}
        maxLength={getPropValue(maxLength)}
        pattern={Array.isArray(pattern) ? pattern[0] : pattern}
        className={cn("mt-1", className)}
        asChild
      >
        {RenderInput ? <RenderInput /> : <Input />}
      </Form.Control>
    </Form.Field>
  );
}

function getErrorMessage<T>(
  propValue: T | [T, string | ((value: T) => string)],
  defaultMessage: (value: T) => string,
) {
  return Array.isArray(propValue)
    ? typeof propValue[1] === "function"
      ? propValue[1](propValue[0])
      : propValue[1]
    : defaultMessage(propValue);
}

function getPropValue<T>(propValue?: T | [T, string | ((value: T) => string)]) {
  return Array.isArray(propValue) ? propValue[0] : propValue;
}
