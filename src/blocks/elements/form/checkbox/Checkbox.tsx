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
import type { CheckboxProps } from "./type";

export function Checkbox<TFieldValues extends FieldValues = FieldValues>({
  control: controlProp,
  name,
  label,
  labelClassName,
  inputClassName,
  helperText,
  helperTextClassName,
  ...props
}: CheckboxProps<TFieldValues>) {
  const form = useFormContext<TFieldValues>();
  const control = controlProp ?? form.control;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <div className="flex items-center gap-2">
            <FormControl>
              <input
                type="checkbox"
                className={cn(
                  "h-4 w-4 rounded border border-slate-300 text-slate-900 focus:ring-2 focus:ring-slate-200 focus:ring-offset-0",
                  fieldState.error && "border-red-500",
                  inputClassName
                )}
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                onBlur={field.onBlur}
                ref={field.ref}
                name={field.name}
                {...props}
              />
            </FormControl>
            {label ? (
              <FormLabel
                className={cn(
                  "cursor-pointer text-sm font-medium",
                  fieldState.error ? "text-red-600" : "text-slate-700",
                  labelClassName
                )}
              >
                {label}
              </FormLabel>
            ) : null}
          </div>
          {helperText && !fieldState.error ? (
            <p className={cn("text-xs text-slate-500", helperTextClassName)}>{helperText}</p>
          ) : null}
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
}

export default Checkbox;

/*
Use inside FormContainer. Same prop category as Input.
- control, name, label
- labelClassName, inputClassName, helperText, helperTextClassName
- ...props: native checkbox attributes
*/
