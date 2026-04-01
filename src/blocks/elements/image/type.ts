export interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** When true, omit `width` / `height` and size via parent + `sizes` (Next.js `fill`). */
  fill?: boolean;
  className?: string;
  priority?: boolean;
  [key: string]: any;
}
