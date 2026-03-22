import { ReactNode } from "react";

export type ListType = "ol" | "ul";

export interface ListProps {
  type?: ListType;
  items?: any[];
  listClassName?: string;
  itemClassName?: string;
  listIcon?: ReactNode;
  [key: string]: any;
}
