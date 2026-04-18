"use client";

import { useEffect, useRef, useState } from "react";
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
import { filterLucideIconNames } from "@/utilities/icons/lucideIconNames";
import type { LucideIconPickerProps } from "./type";

export function LucideIconPicker<TFieldValues extends FieldValues = FieldValues>({
  control: controlProp,
  name,
  label,
  labelClassName,
  inputClassName,
  helperText,
  helperTextClassName,
  disabled = false,
  suggestionLimit = 48,
}: LucideIconPickerProps<TFieldValues>) {
  const form = useFormContext<TFieldValues>();
  const control = controlProp ?? form.control;
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const raw = typeof field.value === "string" ? field.value : "";
        const suggestions = filterLucideIconNames(raw, suggestionLimit);
        const previewIcon = raw.trim().length >= 2 ? raw.trim() : "Search";

        return (
          <FormItem>
            {label ? (
              <FormLabel
                className={cn(
                  "mb-1.5 block text-sm font-medium",
                  fieldState.error ? "text-red-600" : "text-slate-700",
                  labelClassName,
                )}
              >
                {label}
              </FormLabel>
            ) : null}
            <FormControl>
              <div ref={rootRef} className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 z-[1] -translate-y-1/2 text-black">
                  <Icon name={previewIcon} size={16} className="text-current" />
                </span>
                <input
                  ref={field.ref}
                  name={field.name}
                  type="text"
                  autoComplete="off"
                  spellCheck={false}
                  disabled={disabled}
                  value={raw}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setOpen(true);
                  }}
                  onFocus={() => setOpen(true)}
                  onBlur={field.onBlur}
                  className={cn(
                    "h-11 w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-60",
                    fieldState.error && "border-red-500 focus:border-red-500 focus:ring-red-200",
                    inputClassName,
                  )}
                />
                {open && !disabled && suggestions.length > 0 ? (
                  <ul
                    className="absolute z-[60] mt-1 max-h-52 w-full overflow-auto rounded border border-black bg-white py-1 shadow-lg"
                    role="listbox"
                  >
                    {suggestions.map((n) => (
                      <li key={n} role="option">
                        <button
                          type="button"
                          className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-ternary hover:bg-black/[0.06]"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            field.onChange(n);
                            setOpen(false);
                          }}
                        >
                          <Icon name={n} size={16} className="shrink-0 text-black" />
                          <span className="min-w-0 truncate font-medium">{n}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </FormControl>
            {helperText && !fieldState.error ? (
              <p className={cn("text-xs text-slate-500", helperTextClassName)}>{helperText}</p>
            ) : null}
            <FormMessage>{fieldState.error?.message}</FormMessage>
          </FormItem>
        );
      }}
    />
  );
}

export default LucideIconPicker;
