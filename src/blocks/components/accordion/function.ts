"use client";

import { useState } from "react";

export const useAccordionState = (
  defaultValue: string[] | undefined,
  activeValue: string[] | undefined,
  multiple: boolean,
  onChange?: (values: string[]) => void
) => {
  const [internalValues, setInternalValues] = useState<string[]>(defaultValue ?? []);
  const values = activeValue ?? internalValues;

  const toggleValue = (value: string) => {
    const exists = values.includes(value);
    let nextValues = values;

    if (multiple) {
      nextValues = exists ? values.filter((item) => item !== value) : [...values, value];
    } else {
      nextValues = exists ? [] : [value];
    }

    if (activeValue === undefined) {
      setInternalValues(nextValues);
    }

    onChange?.(nextValues);
  };

  return {
    values,
    toggleValue,
  };
};
