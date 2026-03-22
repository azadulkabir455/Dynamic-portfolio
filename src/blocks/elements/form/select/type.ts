import type { Control, FieldPath, FieldValues } from "react-hook-form";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps<TFieldValues extends FieldValues = FieldValues> {
  control?: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  options?: SelectOption[];
  placeholder?: string;
  leftIcon?: string;
  iconSize?: number;
  iconClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  helperText?: string;
  helperTextClassName?: string;
  [key: string]: unknown;
}
