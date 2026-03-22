export interface CategoryCardProps {
  icon: string;
  title: string;
  /** When provided, the entire card is wrapped in a link to this href */
  href?: string;
  iconSize?: number;
  iconClassName?: string;
  titleClassName?: string;
  containerClassName?: string;
  /** Extra classes for the link when href is provided */
  linkClassName?: string;
  [key: string]: any;
}
