export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  description: string;
  tag?: string;
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
  showSpine?: boolean;
}
