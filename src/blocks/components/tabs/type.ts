export interface TabItem {
  label: string;
  value: string;
  content: any;
  disabled?: boolean;
  icon?: string;
  iconClassName?: string;
}

export type TabsListAlign = "left" | "right" | "center" | "full";

export interface TabsProps {
  items?: TabItem[];
  defaultValue?: string;
  activeValue?: string;
  onChange?: (value: string) => void;
  listAlign?: TabsListAlign;
  containerClassName?: string;
  listClassName?: string;
  panelClassName?: string;
  [key: string]: any;
}
