"use client";

import type { FieldValues } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/blocks/elements/form/formPrimitives";
import Icon from "@/blocks/elements/icon/Icon";
import { useFormContext } from "react-hook-form";
import { cn } from "@/utilities/helpers/classMerge";
import type { SelectProps } from "./type";

export function Select<TFieldValues extends FieldValues = FieldValues>({
  control: controlProp,
  name,
  label,
  options = [],
  placeholder = "Select an option",
  leftIcon,
  iconSize = 16,
  iconClassName,
  labelClassName,
  inputClassName,
  helperText,
  helperTextClassName,
  ...props
}: SelectProps<TFieldValues>) {
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
            <div className="relative">
              {leftIcon ? (
                <span className={cn("pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2", iconClassName)}>
                  <Icon name={leftIcon} size={iconSize} className="text-current" />
                </span>
              ) : null}
              <Icon
                name="ChevronDown"
                size={iconSize}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <select
                className={cn(
                  "h-11 w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-60",
                  leftIcon ? "pl-10 pr-10" : "px-3 pr-10",
                  fieldState.error && "border-red-500 focus:border-red-500 focus:ring-red-200",
                  inputClassName
                )}
                {...field}
                {...props}
              >
                <option value="">{placeholder}</option>
                {options.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                    {opt.label}
                  </option>
                ))}
              </select>
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

export default Select;

/*
Use inside FormContainer. Same prop category as Input.
- control, name, label, options, placeholder
- leftIcon, iconSize, iconClassName
- labelClassName, inputClassName, helperText, helperTextClassName
- ...props: native select attributes
*/
