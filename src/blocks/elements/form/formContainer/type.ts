import type { FieldValues, UseFormReturn } from "react-hook-form";
import type { ReactNode } from "react";

export interface FormContainerProps<T extends FieldValues = FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  onInvalid?: () => void;
  children: ReactNode;
  className?: string;
  [key: string]: any;
}
