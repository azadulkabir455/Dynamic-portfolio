export interface SliderItem {
  id: string | number;
  image: string;
  alt: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string;
  content?: any;
}

export interface SliderProps {
  items?: SliderItem[];
  autoPlay?: boolean;
  interval?: number;
  className?: string;
  contentClass?: string;
  overlayClass?: string;
  imageClass?: string;
  [key: string]: any;
}
