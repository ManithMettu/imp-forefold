import * as Form from "@radix-ui/react-form";

type Props = {
  isSubmitting: boolean;
  text: string;
};

export default function SubmitButton({ isSubmitting, text }: Props) {
  return (
    <Form.Submit asChild>
      <button
        disabled={isSubmitting}
        className="w-full rounded-md border border-transparent bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2.5 font-medium text-white shadow-sm hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
      >
        {isSubmitting ? "loading..." : text}
      </button>
    </Form.Submit>
  );
}
