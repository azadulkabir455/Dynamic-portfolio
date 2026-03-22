"use client";

import { FormProvider } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { cn } from "@/utilities/helpers/classMerge";
import type { FormContainerProps } from "./type";

export function FormContainer<T extends FieldValues = FieldValues>({
  form,
  onSubmit,
  onInvalid,
  children,
  className,
  ...props
}: FormContainerProps<T>) {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        noValidate
        className={cn(className ?? "space-y-4")}
        {...props}
      >
        {children}
      </form>
    </FormProvider>
  );
}

export default FormContainer;

/*
Import:
import FormContainer from "@/blocks/elements/form/formContainer/FormContainer";

Form wrapper. You create the form with useForm (e.g. useForm({ resolver: zodResolver(schema), defaultValues }))
and pass the returned form + onSubmit. Children use useFormContext() to get control/register.

Props:
- form: UseFormReturn<T> — return value of useForm({ resolver, defaultValues, ... })
- onSubmit: (data: T) => void — called with validated data on submit
- onInvalid: () => void (optional) — called when validation fails
- children: form fields (Input, etc.)
- className: form element class (default "space-y-4")
- ...props: extra native form attributes
*/
