export interface AccordionItem {
  label: string;
  value: string;
  content: any;
  disabled?: boolean;
  labelIconName?: string;
}

export interface AccordionProps {
  items?: AccordionItem[];
  defaultValue?: string[];
  activeValue?: string[];
  onChange?: (values: string[]) => void;
  multiple?: boolean;
  containerClassName?: string;
  itemClassName?: string;
  contentClassName?: string;
  labelIconSize?: number;
  labelIconClassName?: string;
  [key: string]: any;
}
