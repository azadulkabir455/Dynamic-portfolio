import type { Control, FieldPath, FieldValues } from "react-hook-form";

export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps<TFieldValues extends FieldValues = FieldValues> {
  control?: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: string;
  options?: RadioOption[];
  labelClassName?: string;
  optionsClassName?: string;
  itemClassName?: string;
  helperText?: string;
  helperTextClassName?: string;
  [key: string]: unknown;
}
