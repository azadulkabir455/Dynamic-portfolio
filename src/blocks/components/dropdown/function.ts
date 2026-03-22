"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const HOVER_DELAY_MS = 150;

export type DropdownPlacement = "below" | "above";

export function useDropdownState(trigger: "hover" | "click") {
  const [isOpen, setIsOpen] = useState(false);
  const hoverDelayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = useCallback(() => {
    if (hoverDelayRef.current) {
      clearTimeout(hoverDelayRef.current);
      hoverDelayRef.current = null;
    }
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    if (trigger === "hover") {
      hoverDelayRef.current = setTimeout(() => setIsOpen(false), HOVER_DELAY_MS);
    } else {
      setIsOpen(false);
    }
  }, [trigger]);

  const closeImmediate = useCallback(() => {
    if (hoverDelayRef.current) {
      clearTimeout(hoverDelayRef.current);
      hoverDelayRef.current = null;
    }
    setIsOpen(false);
  }, []);

  const openWithDelay = useCallback(() => {
    if (trigger !== "hover") return;
    if (hoverDelayRef.current) clearTimeout(hoverDelayRef.current);
    hoverDelayRef.current = setTimeout(() => setIsOpen(true), HOVER_DELAY_MS);
  }, [trigger]);

  const toggle = useCallback(() => {
    if (trigger !== "click") return;
    setIsOpen((prev) => !prev);
  }, [trigger]);

  useEffect(() => {
    return () => {
      if (hoverDelayRef.current) clearTimeout(hoverDelayRef.current);
    };
  }, []);

  return { isOpen, open, close, closeImmediate, openWithDelay, toggle };
}

export function useDropdownPlacement(
  isOpen: boolean,
  triggerRef: React.RefObject<HTMLElement | null>,
  panelRef: React.RefObject<HTMLElement | null>
) {
  const [placement, setPlacement] = useState<DropdownPlacement>("below");

  useEffect(() => {
    if (!isOpen || !triggerRef.current || !panelRef.current) return;

    const measure = () => {
      if (!triggerRef.current || !panelRef.current) return;
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const panelHeight = panelRef.current.offsetHeight;
      const spaceBelow = window.innerHeight - triggerRect.bottom;
      const spaceAbove = triggerRect.top;
      if (spaceBelow >= panelHeight || spaceBelow >= spaceAbove) {
        setPlacement("below");
      } else {
        setPlacement("above");
      }
    };

    const raf = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(raf);
  }, [isOpen, triggerRef, panelRef]);

  return placement;
}

export function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  isOpen: boolean,
  onClose: () => void
) {
  useEffect(() => {
    if (!isOpen) return;

    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose, ref]);
}
