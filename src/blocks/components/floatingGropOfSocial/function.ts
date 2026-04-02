"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type FloatingPlacement = "bottom-right" | "bottom-left" | "top-right" | "top-left" | "top-center" | "center";

interface UseFloatingSocialOptions {
  radius: number;
  count: number;
  placement: FloatingPlacement;
}

export function useFloatingSocial({
  radius,
  count,
  placement,
}: UseFloatingSocialOptions) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const { startAngle, endAngle } = useMemo(() => {
    switch (placement) {
      case "bottom-right":
        return { startAngle: -Math.PI, endAngle: -Math.PI / 2 };
      case "bottom-left":
        return { startAngle: -Math.PI / 2, endAngle: 0 };
      case "top-right":
        return { startAngle: 0, endAngle: Math.PI / 2 };
      case "top-left":
        return { startAngle: Math.PI / 2, endAngle: Math.PI };
      case "top-center":
        return { startAngle: (5 * Math.PI) / 4, endAngle: (7 * Math.PI) / 4 };
      case "center":
      default:
        return { startAngle: (-3 * Math.PI) / 4, endAngle: -Math.PI / 4 };
    }
  }, [placement]);

  const getIconStyle = useCallback(
    (index: number) => {
      if (count === 0) {
        return {
          left: "50%",
          top: "50%",
          opacity: 0,
          transform: "translate(-50%, -50%) scale(0.7)",
          pointerEvents: "none" as const,
        };
      }

      const t = count === 1 ? 0.5 : index / (count - 1);
      const angle = startAngle + (endAngle - startAngle) * t;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      if (!isOpen) {
        return {
          left: "50%",
          top: "50%",
          opacity: 0,
          transform: "translate(-50%, -50%) scale(0.7)",
          pointerEvents: "none" as const,
        };
      }

      return {
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        opacity: 1,
        transform: "translate(-50%, -50%) scale(1)",
        pointerEvents: "auto" as const,
      };
    },
    [count, endAngle, isOpen, radius, startAngle]
  );

  const getLineStyle = useCallback(
    (index: number) => {
      if (count === 0) {
        return {
          left: "50%",
          top: "50%",
          opacity: 0,
          transform: "rotate(0deg) scaleX(0)",
        } as const;
      }

      const t = count === 1 ? 0.5 : index / (count - 1);
      const angle = startAngle + (endAngle - startAngle) * t;
      const degrees = (angle * 180) / Math.PI;
      const lineLength = Math.max(radius - 18, 0);

      if (!isOpen || lineLength === 0) {
        return {
          left: "50%",
          top: "50%",
          opacity: 0,
          transform: `rotate(${degrees}deg) scaleX(0)`,
        } as const;
      }

      return {
        left: "50%",
        top: "50%",
        width: `${lineLength}px`,
        opacity: 1,
        transform: `rotate(${degrees}deg) scaleX(1)`,
      } as const;
    },
    [count, isOpen, radius, startAngle, endAngle]
  );

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, toggle, close, getIconStyle, getLineStyle };
}

export function useFloatingSocialClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  isOpen: boolean,
  onClose: () => void
) {
  useEffect(() => {
    if (!isOpen) return;

    const handler = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, onClose, ref]);
}

