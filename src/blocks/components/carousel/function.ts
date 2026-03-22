"use client";

import { useEffect, useState } from "react";

export const getNextIndex = (currentIndex: number, length: number) => {
  if (length === 0) return 0;
  return (currentIndex + 1) % length;
};

export const getPreviousIndex = (currentIndex: number, length: number) => {
  if (length === 0) return 0;
  return (currentIndex - 1 + length) % length;
};

export const useCarouselState = (length: number, autoPlay: boolean, interval: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || length <= 1) return;

    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => getNextIndex(prev, length));
    }, interval);

    return () => window.clearInterval(timer);
  }, [autoPlay, interval, length]);

  return {
    currentIndex,
    setCurrentIndex,
    next: () => setCurrentIndex((prev) => getNextIndex(prev, length)),
    previous: () => setCurrentIndex((prev) => getPreviousIndex(prev, length)),
  };
};

export const getVisibleCarouselItems = <T,>(
  items: T[],
  currentIndex: number,
  visibleItems: number
) => {
  if (items.length === 0) return [];

  return Array.from({ length: Math.min(visibleItems, items.length) }, (_, index) => {
    return items[(currentIndex + index) % items.length];
  });
};
