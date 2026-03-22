import type { TimelineItem } from "./type";

export function getTimelineKey(item: TimelineItem, index: number): string {
  return item.id || `timeline-${index}`;
}
