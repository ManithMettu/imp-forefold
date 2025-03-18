import * as Form from "@radix-ui/react-form";

type Props = {
  name: string;
  label: string;
  required?: boolean | string;
  disabled?: boolean;
  placeholder?: string;
  minLength?: number | [number, string | ((minLength: number) => string)];
  maxLength?: number | [number, string | ((maxLength: number) => string)];
  pattern?: string | [string, string];
  defaultValue?: string;
};

export default function TextField({
  name,
  label,
  required,
  disabled,
  placeholder,
  minLength,
  maxLength,
  pattern,
  defaultValue,
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
        {minLength !== undefined && (
          <Form.Message className="text-xs text-red-500" match="tooShort">
            {Array.isArray(minLength)
              ? typeof minLength[1] === "function"
                ? minLength[1](minLength[0])
                : minLength[1]
              : `Minimum ${minLength} characters`}
          </Form.Message>
        )}
        {maxLength !== undefined && (
          <Form.Message className="text-xs text-red-500" match="tooLong">
            {Array.isArray(maxLength)
              ? typeof maxLength[1] === "function"
                ? maxLength[1](maxLength[0])
                : maxLength[1]
              : `Maximum ${maxLength} characters`}
          </Form.Message>
        )}
        {pattern !== undefined && (
          <Form.Message
            className="text-xs text-red-500"
            match="patternMismatch"
          >
            {Array.isArray(pattern) ? pattern[1] : "Invalid format"}
          </Form.Message>
        )}
      </div>
      <Form.Control asChild>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
          placeholder={placeholder}
          required={Boolean(required)}
          disabled={disabled}
          defaultValue={defaultValue}
          minLength={Array.isArray(minLength) ? minLength[0] : minLength}
          maxLength={Array.isArray(maxLength) ? maxLength[0] : maxLength}
          pattern={Array.isArray(pattern) ? pattern[0] : pattern}
        />
      </Form.Control>
    </Form.Field>
  );
}
