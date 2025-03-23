import { Loader2 } from "lucide-react";
import { Button } from "./button";

type Props = { isSubmitting: boolean } & Omit<
  React.ComponentProps<typeof Button>,
  "type" | "disabled"
>;

export default function FormSubmitButton({
  isSubmitting,
  children,
  ...rest
}: Props) {
  return (
    <Button {...rest} type="submit" disabled={isSubmitting}>
      {isSubmitting ? <Loader2 className="animate-spin" /> : children}
    </Button>
  );
}
