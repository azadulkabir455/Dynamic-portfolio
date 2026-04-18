"use client";

import { useCallback, useId, useRef, type ChangeEvent, type DragEvent } from "react";
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
import type { ImageUploaderProps } from "./type";

const DEFAULT_MAX_BYTES = 5 * 1024 * 1024;

async function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export function ImageUploader<TFieldValues extends FieldValues = FieldValues>({
  control: controlProp,
  name,
  label,
  labelClassName,
  helperText,
  helperTextClassName,
  accept = "image/*",
  maxFileBytes = DEFAULT_MAX_BYTES,
  confirmRemoveMessage = "Remove this image? You can upload a new one afterwards.",
  disabled = false,
  className,
  dropzoneClassName,
  previewClassName,
}: ImageUploaderProps<TFieldValues>) {
  const form = useFormContext<TFieldValues>();
  const control = controlProp ?? form.control;
  const inputId = useId();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const ingestFile = useCallback(
    async (file: File | undefined, onChange: (v: string) => void) => {
      if (!file || !file.type.startsWith("image/")) return;
      if (file.size > maxFileBytes) {
        window.alert(`Image must be smaller than ${Math.round(maxFileBytes / (1024 * 1024))}MB.`);
        return;
      }
      try {
        const dataUrl = await readFileAsDataUrl(file);
        onChange(dataUrl);
      } catch {
        window.alert("Could not read this file. Try another image.");
      }
      if (fileRef.current) fileRef.current.value = "";
    },
    [maxFileBytes],
  );

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const value = typeof field.value === "string" ? field.value : "";
        const hasImage = Boolean(value?.trim());

        const onPick = (e: ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0];
          void ingestFile(file, field.onChange);
        };

        const onDrop = (e: DragEvent) => {
          e.preventDefault();
          e.stopPropagation();
          if (disabled) return;
          const file = e.dataTransfer.files?.[0];
          void ingestFile(file, field.onChange);
        };

        const onRemove = () => {
          if (disabled) return;
          if (typeof window !== "undefined" && window.confirm(confirmRemoveMessage)) {
            field.onChange("");
            if (fileRef.current) fileRef.current.value = "";
          }
        };

        return (
          <FormItem>
            {label ? (
              <FormLabel
                htmlFor={inputId}
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
              <div className={cn("relative w-full", className)}>
                <input
                  id={inputId}
                  ref={fileRef}
                  type="file"
                  accept={accept}
                  disabled={disabled}
                  className="sr-only"
                  onChange={onPick}
                  onBlur={field.onBlur}
                />

                {!hasImage ? (
                  <label
                    htmlFor={inputId}
                    className={cn(
                      "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-white px-4 py-10 text-center text-sm text-slate-600 shadow-sm transition-colors",
                      "hover:border-slate-400 hover:bg-slate-50/80",
                      "focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-200",
                      disabled && "pointer-events-none cursor-not-allowed opacity-50",
                      fieldState.error && "border-red-400 focus-within:ring-red-200",
                      dropzoneClassName,
                    )}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onDrop={onDrop}
                  >
                    <Icon name="ImagePlus" size={28} className="text-slate-500" aria-hidden />
                    <span className="font-medium text-slate-700">Click or drop an image</span>
                    <span className="text-xs text-slate-500">PNG, JPG, WebP — max {Math.round(maxFileBytes / (1024 * 1024))}MB</span>
                  </label>
                ) : (
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50 shadow-sm",
                      fieldState.error && "border-red-400",
                      previewClassName,
                    )}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- data URLs + arbitrary paths */}
                    <img src={value} alt="" className="mx-auto max-h-56 w-full object-contain" />
                    <button
                      type="button"
                      disabled={disabled}
                      onClick={onRemove}
                      className={cn(
                        "absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-black/55 text-white shadow-md backdrop-blur-sm transition-colors",
                        "hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900",
                        disabled && "pointer-events-none opacity-50",
                      )}
                      aria-label="Remove image"
                    >
                      <Icon name="X" size={16} strokeWidth={2.5} />
                    </button>
                  </div>
                )}
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

export default ImageUploader;
