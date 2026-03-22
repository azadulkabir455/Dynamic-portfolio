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
import type { SliderProps } from "./type";

export function Slider<TFieldValues extends FieldValues = FieldValues>({
  control: controlProp,
  name,
  label,
  min = 0,
  max = 100,
  step = 1,
  labelClassName,
  inputClassName,
  helperText,
  helperTextClassName,
  ...props
}: SliderProps<TFieldValues>) {
  const form = useFormContext<TFieldValues>();
  const control = controlProp ?? form.control;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          {label ? (
            <div className="mb-1.5 flex items-center justify-between">
              <FormLabel
                className={cn(
                  "block text-sm font-medium",
                  fieldState.error ? "text-red-600" : "text-slate-700",
                  labelClassName
                )}
              >
                {label}
              </FormLabel>
              <span className="text-sm text-slate-500">{field.value ?? min}</span>
            </div>
          ) : null}
          <FormControl>
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              className={cn(
                "h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-slate-700 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-slate-700 [&::-webkit-slider-thumb]:shadow",
                fieldState.error && "accent-red-600 [&::-webkit-slider-thumb]:bg-red-600",
                inputClassName
              )}
              {...field}
              value={field.value ?? min}
              onChange={(e) => field.onChange(Number(e.target.value))}
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

export default Slider;

/*
Import:
import Slider from "@/blocks/elements/form/slider/Slider";

Use inside FormContainer. Range input. Same prop category as Input.
- control, name, label
- min, max, step (defaults: 0, 100, 1). Schema: z.number().min(0).max(100)
- labelClassName, inputClassName, helperText, helperTextClassName
- ...props: native range input attributes
*/
