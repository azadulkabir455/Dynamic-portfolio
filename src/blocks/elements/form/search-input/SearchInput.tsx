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
import type { SearchInputProps } from "./type";

export function SearchInput<TFieldValues extends FieldValues = FieldValues>({
  control: controlProp,
  name,
  label,
  placeholder,
  iconSize = 16,
  iconClassName,
  labelClassName,
  inputClassName,
  helperText,
  helperTextClassName,
  ...props
}: SearchInputProps<TFieldValues>) {
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
              <span className={cn("pointer-events-none absolute left-3 top-1/2 -translate-y-1/2", iconClassName)}>
                <Icon name="Search" size={iconSize} className="text-current" />
              </span>
              <input
                type="search"
                placeholder={placeholder}
                className={cn(
                  "h-11 w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-60",
                  fieldState.error && "border-red-500 focus:border-red-500 focus:ring-red-200",
                  inputClassName
                )}
                {...field}
                {...props}
              />
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

export default SearchInput;
