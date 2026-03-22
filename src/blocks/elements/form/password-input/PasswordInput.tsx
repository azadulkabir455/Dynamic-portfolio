"use client";

import { useState } from "react";
import type { FieldPath, FieldValues } from "react-hook-form";
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
import type { PasswordInputProps } from "./type";

export function PasswordInput<TFieldValues extends FieldValues = FieldValues>({
  control: controlProp,
  name,
  label,
  placeholder,
  leftIcon,
  iconSize = 16,
  iconClassName,
  leftIconClassName,
  rightIconClassName,
  labelClassName,
  inputClassName,
  helperText,
  helperTextClassName,
  ...props
}: PasswordInputProps<TFieldValues>) {
  const [showPassword, setShowPassword] = useState(false);
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
                <span className={cn("pointer-events-none absolute left-3 top-1/2 -translate-y-1/2", iconClassName, leftIconClassName)}>
                  <Icon name={leftIcon} size={iconSize} className="text-current" />
                </span>
              ) : null}
              <input
                type={showPassword ? "text" : "password"}
                placeholder={placeholder}
                className={cn(
                  "h-11 w-full rounded-lg border border-slate-200 bg-white py-2 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-60",
                  leftIcon ? "pl-10 pr-11" : "px-3 pr-11",
                  fieldState.error && "border-red-500 focus:border-red-500 focus:ring-red-200",
                  inputClassName
                )}
                {...field}
                {...props}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className={cn(
                  "absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-700",
                  rightIconClassName
                )}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <Icon name={showPassword ? "EyeOff" : "Eye"} size={iconSize} className="text-current" />
              </button>
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

export default PasswordInput;

/*
Use inside FormContainer.
- control, name, label, placeholder
- leftIcon: Lucide icon name on the left (e.g. "Lock")
- iconSize, iconClassName (shared), leftIconClassName, rightIconClassName (toggle button)
- Right side: show/hide password toggle (Eye / EyeOff)
- labelClassName, inputClassName, helperText, helperTextClassName
- ...props: native input attributes
*/
