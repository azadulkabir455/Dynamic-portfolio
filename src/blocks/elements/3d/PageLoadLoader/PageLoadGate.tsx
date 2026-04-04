"use client";

import { useEffect, useRef } from "react";
import { useMarkPageReady } from "./functions";

/**
 * Signals `contentReady` only after real first-load work finishes, so the full-screen
 * loader stays up **during** fonts, document load, and your API calls — not before/after.
 *
 * Add `await fetch(...)` (or React Query `ensureQueryData`, etc.) inside `whenAppReady`.
 */
async function whenAppReady(): Promise<void> {
  if (typeof document !== "undefined") {
    await document.fonts.ready;
  }

  await new Promise<void>((resolve) => {
    if (typeof document === "undefined") {
      resolve();
      return;
    }
    if (document.readyState === "complete") {
      resolve();
      return;
    }
    window.addEventListener("load", () => resolve(), { once: true });
  });

  // --- Hook your API / critical data here (runs while the loader is visible) ---
  // await fetch("/api/...", { cache: "no-store" }).then((r) => r.json());

  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

export default function PageLoadGate() {
  const markPageReady = useMarkPageReady();
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    let cancelled = false;

    whenAppReady()
      .then(() => {
        if (!cancelled) markPageReady();
      })
      .catch(() => {
        if (!cancelled) markPageReady();
      });

    return () => {
      cancelled = true;
    };
  }, [markPageReady]);

  return null;
}
