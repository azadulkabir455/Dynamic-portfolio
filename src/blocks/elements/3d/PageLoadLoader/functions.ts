"use client";

import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export const pageLoaderSafetyTimeoutMs = 15000;

export const documentSettleDelayMs = 380;

export const pageReadyNotifierSettleDelayMs = 450;

export function runAfterDocumentSettled(
  onSettled: () => void,
  settleDelayMs: number,
): () => void {
  let cancelled = false;

  const settleThenRun = () => {
    if (cancelled) return;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (cancelled) return;
        setTimeout(() => {
          if (!cancelled) onSettled();
        }, settleDelayMs);
      });
    });
  };

  if (typeof document === "undefined") {
    return () => {
      cancelled = true;
    };
  }

  if (document.readyState === "complete") {
    settleThenRun();
  } else {
    window.addEventListener("load", settleThenRun, { once: true });
  }

  return () => {
    cancelled = true;
    window.removeEventListener("load", settleThenRun);
  };
}

export type PageLoadLoaderContextValue = {
  contentReady: boolean;
  markPageReady: () => void;
  /** True after the full-screen loader has finished its exit animation (slides away). */
  loaderExited: boolean;
  markLoaderExited: () => void;
};

const PageLoadLoaderContext = createContext<PageLoadLoaderContextValue | null>(null);

export function PageLoadLoaderProvider({ children }: { children: ReactNode }) {
  const [contentReady, setContentReady] = useState(false);
  const [loaderExited, setLoaderExited] = useState(false);
  const safetyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const markPageReady = useCallback(() => {
    if (safetyTimerRef.current) {
      clearTimeout(safetyTimerRef.current);
      safetyTimerRef.current = null;
    }
    setContentReady(true);
  }, []);

  const markLoaderExited = useCallback(() => {
    setLoaderExited(true);
  }, []);

  useEffect(() => {
    safetyTimerRef.current = setTimeout(() => {
      setContentReady(true);
      safetyTimerRef.current = null;
    }, pageLoaderSafetyTimeoutMs);
    return () => {
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    };
  }, []);

  const value = useMemo(
    () => ({ contentReady, markPageReady, loaderExited, markLoaderExited }),
    [contentReady, markPageReady, loaderExited, markLoaderExited],
  );

  return createElement(PageLoadLoaderContext.Provider, { value }, children);
}

export function usePageLoadLoader() {
  return useContext(PageLoadLoaderContext);
}

export function useMarkPageReady() {
  const ctx = useContext(PageLoadLoaderContext);
  return ctx?.markPageReady ?? (() => {});
}

/** When no provider or loader never runs, treat as ready so sections still animate. */
export function useLoaderExited() {
  const ctx = useContext(PageLoadLoaderContext);
  return ctx?.loaderExited ?? true;
}

/**
 * @deprecated Prefer {@link PageLoadGate} — it waits for fonts, load, and your async work
 * so `markPageReady` does not fire before API/data is ready.
 */
export function PageReadyNotifier() {
  const markPageReady = useMarkPageReady();

  useEffect(() => {
    return runAfterDocumentSettled(markPageReady, pageReadyNotifierSettleDelayMs);
  }, [markPageReady]);

  return null;
}
