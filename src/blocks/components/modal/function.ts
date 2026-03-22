"use client";

import { type MouseEvent, useEffect } from "react";
import { ModalSize } from "./type";

const modalWidthClasses: Record<ModalSize, string> = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-6xl",
};

const modalPaddingClasses: Record<ModalSize, string> = {
  sm: "p-4",
  md: "p-5",
  lg: "p-6",
  xl: "p-8",
  full: "p-8",
};

export const getModalWidthClass = (size: ModalSize) => {
  return modalWidthClasses[size];
};

export const getModalPaddingClass = (size: ModalSize) => {
  return modalPaddingClasses[size];
};

export const useModalBehavior = (
  isOpen: boolean,
  onOpen: (() => void) | undefined,
  onClose: () => void
) => {
  useEffect(() => {
    if (!isOpen) return;

    onOpen?.();

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onOpen, onClose]);
};

export const handleOverlayClick = (
  event: MouseEvent<HTMLElement>,
  closeOnOverlayClick: boolean,
  onClose: () => void
) => {
  if (closeOnOverlayClick && event.target === event.currentTarget) {
    onClose();
  }
};
