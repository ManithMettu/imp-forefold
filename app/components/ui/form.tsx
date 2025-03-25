import * as React from "react";
import { FormProvider, useForm, type UseFormProps } from "react-hook-form";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  onSubmit: (data: any) => void;
  formOptions?: UseFormProps;
}

export function Form({ children, onSubmit, formOptions, ...props }: FormProps) {
  const methods = useForm(formOptions);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} {...props}>
        {children}
      </form>
    </FormProvider>
  );
}

export { useFormContext } from "react-hook-form";

