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
  /** কোম্পানির লোগো */
  logoSrc?: string;
  logoAlt?: string;
  /** ব্যানার / অফিস ইমেজ */
  imageSrc?: string;
  imageAlt?: string;
  /** লোকেশন */
  location?: string;
  /** অফিসের নাম */
  officeName?: string;
  /** অফিস সম্পর্কে সংক্ষিপ্ত বিবরণ */
  officeInfo?: string;
  /** উল্লেখযোগ্য অর্জন */
  achievements?: string[];
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
  showSpine?: boolean;
  onActiveIndexChange?: (activeIndex: number) => void;
  scrollTargetRef: RefObject<HTMLElement | null>;
}
