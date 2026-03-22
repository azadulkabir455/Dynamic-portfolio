import type { Control, FieldPath, FieldValues } from "react-hook-form";

export interface TextareaProps<TFieldValues extends FieldValues = FieldValues> {
  control?: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  rows?: number;
  labelClassName?: string;
  inputClassName?: string;
  helperText?: string;
  helperTextClassName?: string;
  [key: string]: unknown;
}
