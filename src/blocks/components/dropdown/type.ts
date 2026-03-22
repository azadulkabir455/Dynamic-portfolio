import type { ReactNode } from "react";

export interface DropdownItem {
  text: string;
  value?: string;
  icon?: string;
  iconClassName?: string;
  disabled?: boolean;
}

export type DropdownTrigger = "hover" | "click";

export interface DropdownProps {
  button: ReactNode;
  items: DropdownItem[];
  trigger?: DropdownTrigger;
  onSelect?: (item: DropdownItem, index: number) => void;
  listContainerClassName?: string;
  itemClassName?: string;
  textClassName?: string;
  containerClassName?: string;
  [key: string]: any;
}
