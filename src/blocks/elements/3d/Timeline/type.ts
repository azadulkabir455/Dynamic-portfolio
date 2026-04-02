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
  scrollTargetRef: RefObject<HTMLElement | null>;
}
