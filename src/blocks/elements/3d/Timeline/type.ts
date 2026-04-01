import type { RefObject } from "react";

export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  description: string;
  tag?: string;
  panelHeading?: string;
  panelParagraph?: string;
  panelImageSrc?: string;
  panelImageAlt?: string;
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
  showSpine?: boolean;
  onActiveIndexChange?: (activeIndex: number) => void;
  /** Progress stays 0 until this section’s top reaches the viewport top; then 0→1 while scrolling through the section. */
  scrollTargetRef: RefObject<HTMLElement | null>;
}
