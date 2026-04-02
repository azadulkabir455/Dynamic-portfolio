"use client";

import type { FieldValues } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/blocks/elements/form/formPrimitives";
import { useFormContext } from "react-hook-form";
import { cn } from "@/utilities/helpers/classMerge";
import type { TextareaProps } from "./type";

export function Textarea<TFieldValues extends FieldValues = FieldValues>({
  control: controlProp,
  name,
  label,
  placeholder,
  rows = 4,
  labelClassName,
  inputClassName,
  helperText,
  helperTextClassName,
  ...props
}: TextareaProps<TFieldValues>) {
  const form = useFormContext<TFieldValues>();
  const control = controlProp ?? form.control;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          {label ? (
            <FormLabel
              className={cn(
                "mb-1.5 block text-sm font-medium",
                fieldState.error ? "text-red-600" : "text-slate-700",
                labelClassName
              )}
            >
              {label}
            </FormLabel>
          ) : null}
          <FormControl>
            <textarea
              rows={rows}
              placeholder={placeholder}
              className={cn(
                "flex min-h-24 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-60",
                fieldState.error && "border-red-500 focus:border-red-500 focus:ring-red-200",
                inputClassName
              )}
              {...field}
              {...props}
            />
          </FormControl>
          {helperText && !fieldState.error ? (
            <p className={cn("text-xs text-slate-500", helperTextClassName)}>{helperText}</p>
          ) : null}
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
}

export default Textarea;
