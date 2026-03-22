"use client";

import { useEffect, useState } from "react";

export const getNextSlideIndex = (currentIndex: number, length: number) => {
  if (length === 0) return 0;
  return (currentIndex + 1) % length;
};

export const getPreviousSlideIndex = (currentIndex: number, length: number) => {
  if (length === 0) return 0;
  return (currentIndex - 1 + length) % length;
};

export const useSliderState = (length: number, autoPlay: boolean, interval: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay || length <= 1) return;

    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => getNextSlideIndex(prev, length));
    }, interval);

    return () => window.clearInterval(timer);
  }, [autoPlay, interval, length]);

  return {
    currentIndex,
    setCurrentIndex,
    next: () => setCurrentIndex((prev) => getNextSlideIndex(prev, length)),
    previous: () => setCurrentIndex((prev) => getPreviousSlideIndex(prev, length)),
  };
};
