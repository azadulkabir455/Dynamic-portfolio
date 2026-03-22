import type { Control, FieldPath, FieldValues } from "react-hook-form";

export interface InputProps<TFieldValues extends FieldValues = FieldValues> {
  control?: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  type?: string;
  leftIcon?: string;
  iconSize?: number;
  iconClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  helperText?: string;
  helperTextClassName?: string;
  [key: string]: unknown;
}
