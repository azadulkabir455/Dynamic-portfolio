"use client";

import { useEffect, useState } from "react";

function getTotalSeconds(days: number, hours: number, minutes: number): number {
  return days * 86400 + hours * 3600 + minutes * 60;
}

function splitTotalSeconds(total: number) {
  const clamped = Math.max(0, Math.floor(total));
  const days = Math.floor(clamped / 86400);
  const remainderAfterDays = clamped % 86400;
  const hours = Math.floor(remainderAfterDays / 3600);
  const remainderAfterHours = remainderAfterDays % 3600;
  const minutes = Math.floor(remainderAfterHours / 60);
  const seconds = remainderAfterHours % 60;
  return { days, hours, minutes, seconds };
}

export function useCountdown(initialDays: number, initialHours: number, initialMinutes: number) {
  const [totalSeconds, setTotalSeconds] = useState(() =>
    getTotalSeconds(initialDays, initialHours, initialMinutes)
  );

  useEffect(() => {
    if (totalSeconds <= 0) return;
    const timer = setInterval(() => {
      setTotalSeconds((prev) => {
        const next = prev - 1;
        return next < 0 ? 0 : next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [totalSeconds]);

  const { days, hours, minutes, seconds } = splitTotalSeconds(totalSeconds);
  const isFinished = totalSeconds <= 0;

  return { days, hours, minutes, seconds, isFinished };
}
