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
