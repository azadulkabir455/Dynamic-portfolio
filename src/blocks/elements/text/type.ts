export type TextVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "label"
  | "small"
  | "strong"
  | "em"
  | "pre";

export interface TextProps {
  children?: React.ReactNode;
  variant?: TextVariant;
  className?: string;
  dangerouslySetInnerHTML?: { __html: string };
  [key: string]: any;
}
