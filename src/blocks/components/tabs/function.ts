"use client";

import { useMemo, useState } from "react";
import { TabItem } from "./type";

export const useTabsState = (
  items: TabItem[],
  defaultValue?: string,
  activeValue?: string,
  onChange?: (value: string) => void
) => {
  const fallbackValue = defaultValue ?? items[0]?.value ?? "";
  const [internalValue, setInternalValue] = useState(fallbackValue);

  const value = activeValue ?? internalValue;

  const setValue = (nextValue: string) => {
    if (activeValue === undefined) {
      setInternalValue(nextValue);
    }
    onChange?.(nextValue);
  };

  const activeItem = useMemo(() => {
    return items.find((item) => item.value === value) ?? items[0];
  }, [items, value]);

  return {
    value,
    setValue,
    activeItem,
  };
};
