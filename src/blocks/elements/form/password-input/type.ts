import type { Control, FieldPath, FieldValues } from "react-hook-form";

export interface PasswordInputProps<TFieldValues extends FieldValues = FieldValues> {
  control?: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  placeholder?: string;
  leftIcon?: string;
  iconSize?: number;
  iconClassName?: string;
  leftIconClassName?: string;
  rightIconClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  helperText?: string;
  helperTextClassName?: string;
  [key: string]: unknown;
}
