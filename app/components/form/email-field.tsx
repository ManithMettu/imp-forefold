import * as Form from "@radix-ui/react-form";

type Props = {
  name?: string;
  label?: string;
  required?: boolean | string;
  disabled?: boolean;
};

export default function EmailField({
  name = "email",
  label = "Email",
  required,
  disabled,
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
        <Form.Message className="text-xs text-red-500" match="typeMismatch">
          Invalid email
        </Form.Message>
      </div>
      <Form.Control asChild>
        <input
          type="email"
          className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
          placeholder="you@example.com"
          required={Boolean(required)}
          disabled={disabled}
        />
      </Form.Control>
    </Form.Field>
  );
}
