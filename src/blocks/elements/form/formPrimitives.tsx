"use client";

import * as React from "react";
import { Controller, type Control, type ControllerRenderProps, type FieldPath, type FieldValues } from "react-hook-form";
import * as Label from "@radix-ui/react-label";
import { cn } from "@/utilities/helpers/classMerge";

export type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null);

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  render,
}: {
  control: Control<TFieldValues>;
  name: TName;
  render: (props: {
    field: ControllerRenderProps<TFieldValues, TName>;
    fieldState: { invalid: boolean; error?: { message?: string } };
  }) => React.ReactElement;
}) {
  return (
    <FormFieldContext.Provider value={{ name }}>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => render({ field, fieldState })}
      />
    </FormFieldContext.Provider>
  );
}

export const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2", className)} data-slot="form-item" {...props} />
));
FormItem.displayName = "FormItem";

export const FormLabel = React.forwardRef<
  React.ComponentRef<typeof Label.Root>,
  React.ComponentPropsWithoutRef<typeof Label.Root>
>(({ className, ...props }, ref) => (
  <Label.Root
    ref={ref}
    className={cn(
      "block text-sm font-medium leading-none text-slate-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    data-slot="form-label"
    {...props}
  />
));
FormLabel.displayName = "FormLabel";

export const FormControl = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => (
  <div ref={ref} data-slot="form-control" {...props} />
));
FormControl.displayName = "FormControl";

export function FormMessage({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement> & { children?: React.ReactNode }) {
  return (
    <p
      className={cn("text-xs font-medium text-red-600", className)}
      data-slot="form-message"
      {...props}
    >
      {children}
    </p>
  );
}
FormMessage.displayName = "FormMessage";
