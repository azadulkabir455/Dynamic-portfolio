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
import type { RadioGroupProps } from "./type";

export function RadioGroup<TFieldValues extends FieldValues = FieldValues>({
  control: controlProp,
  name,
  label,
  options = [],
  labelClassName,
  optionsClassName,
  itemClassName,
  helperText,
  helperTextClassName,
  ...props
}: RadioGroupProps<TFieldValues>) {
  const form = useFormContext<TFieldValues>();
  const control = controlProp ?? form.control;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem {...props}>
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
            <div className={cn("space-y-3", optionsClassName)}>
              {options.map((option) => (
                <label
                  key={option.value}
                  className={cn("flex cursor-pointer items-center gap-2 text-sm text-slate-700", itemClassName)}
                >
                  <input
                    type="radio"
                    name={field.name}
                    value={option.value}
                    disabled={option.disabled}
                    checked={field.value === option.value}
                    onChange={() => field.onChange(option.value)}
                    onBlur={field.onBlur}
                    ref={field.ref}
                    className="h-4 w-4 border border-slate-300 text-slate-900 focus:ring-2 focus:ring-slate-200 focus:ring-offset-0"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
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

export default RadioGroup;
