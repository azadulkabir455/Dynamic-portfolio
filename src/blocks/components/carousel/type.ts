export interface CarouselItem {
  id: string | number;
  content: any;
}

export interface CarouselProps {
  items?: CarouselItem[];
  autoPlay?: boolean;
  interval?: number;
  visibleItems?: 1 | 2 | 3 | 4;
  showDots?: boolean;
  className?: string;
  contentClass?: string;
  controlsClass?: string;
  itemClass?: string;
  [key: string]: any;
}
