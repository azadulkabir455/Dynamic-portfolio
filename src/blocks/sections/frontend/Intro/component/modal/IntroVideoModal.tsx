"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { cn } from "@/utilities/helpers/classMerge";
import type { IntroVideoModalProps } from "./type";

/**
 * Portal + dialog above global UI (e.g. BubbleMenu z-[1000]).
 * Video is muted initially so autoplay works in browsers; user can unmute via controls.
 */
const IntroVideoModal = ({
  open,
  onClose,
  videoSrc,
  posterSrc,
}: IntroVideoModalProps) => {
  const [mounted, setMounted] = useState(false);
  const titleId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence mode="sync">
      {open ? (
        <motion.div
          key="intro-video-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-[1100] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            aria-label="Close video"
            onClick={onClose}
          />
          <motion.div
            className={cn(
              "relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl",
              "border border-secondary/30 bg-ternary shadow-2xl",
            )}
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <span id={titleId} className="sr-only">
              Intro video
            </span>
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-20 rounded-full border border-secondary/40 bg-black/40 p-2 text-secondary transition hover:bg-black/60"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <video
              key={videoSrc}
              className="aspect-video w-full bg-black object-contain"
              src={videoSrc}
              poster={posterSrc}
              controls
              playsInline
              autoPlay
              muted
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
};

export default IntroVideoModal;
