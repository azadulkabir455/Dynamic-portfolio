"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import type { TargetCursorProps } from "./type";
import { getIsMobile } from "./functions";

type CornerPos = { x: number; y: number };

const TargetCursor = ({
  targetSelector = ".cursor-target",
  spinDuration = 2,
  hideDefaultCursor = true,
  hoverDuration = 0.2,
  parallaxOn = true,
}: TargetCursorProps) => {
  const isMobile = useMemo(() => {
    if (typeof window === "undefined") return false;
    return getIsMobile();
  }, []);

  const cursorRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const activeTargetRef = useRef<Element | null>(null);

  const cornersRef = useRef<HTMLElement[]>([]);
  const targetCornerPositionsRef = useRef<CornerPos[] | null>(null);

  const activeStrengthRef = useRef(0);
  const tickRafRef = useRef<number | null>(null);

  const spinTlRef = useRef<gsap.core.Timeline | null>(null);

  const ensureTick = useCallback(() => {
    if (tickRafRef.current != null) return;

    const tick = () => {
      tickRafRef.current = requestAnimationFrame(tick);

      if (!targetCornerPositionsRef.current || cornersRef.current.length === 0) return;

      const strength = activeStrengthRef.current;
      if (strength <= 0) return;

      const cursor = cursorRef.current;
      if (!cursor) return;

      const cursorX = gsap.getProperty(cursor, "x") as number;
      const cursorY = gsap.getProperty(cursor, "y") as number;

      cornersRef.current.forEach((cornerEl, i) => {
        const currentX = gsap.getProperty(cornerEl, "x") as number;
        const currentY = gsap.getProperty(cornerEl, "y") as number;
        const target = targetCornerPositionsRef.current?.[i];
        if (!target) return;

        const targetX = target.x - cursorX;
        const targetY = target.y - cursorY;

        const finalX = currentX + (targetX - currentX) * strength;
        const finalY = currentY + (targetY - currentY) * strength;

        // Keep gsap internal values in sync (so getProperty works consistently).
        gsap.set(cornerEl, { x: finalX, y: finalY });
      });
    };

    tickRafRef.current = requestAnimationFrame(tick);
  }, []);

  const stopTick = useCallback(() => {
    if (tickRafRef.current == null) return;
    cancelAnimationFrame(tickRafRef.current);
    tickRafRef.current = null;
  }, []);

  const moveCursor = useCallback((x: number, y: number) => {
    if (!cursorRef.current) return;
    gsap.to(cursorRef.current, { x, y, duration: 0.1, ease: "power3.out" });
  }, []);

  useEffect(() => {
    if (isMobile || !cursorRef.current) return;

    const originalCursor = document.body.style.cursor;
    if (hideDefaultCursor) document.body.style.cursor = "none";

    const cursor = cursorRef.current;
    cornersRef.current = Array.from(cursor.querySelectorAll<HTMLElement>(".target-cursor-corner"));

    // Center
    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });

    // Initial corner offsets (relative to viewport)
    const { borderWidth, cornerSize } = { borderWidth: 3, cornerSize: 12 };
    const initial: CornerPos[] = [
      { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
      { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
      { x: cornerSize * 0.5, y: cornerSize * 0.5 },
      { x: -cornerSize * 1.5, y: cornerSize * 0.5 },
    ];

    targetCornerPositionsRef.current = initial;
    cornersRef.current.forEach((el, i) => {
      const p = initial[i];
      gsap.set(el, { x: p.x, y: p.y });
    });

    // Spin
    if (spinTlRef.current) spinTlRef.current.kill();
    spinTlRef.current = gsap
      .timeline({ repeat: -1 })
      .to(cursor, { rotation: "+=360", duration: spinDuration, ease: "none" });

    const moveHandler = (e: MouseEvent) => moveCursor(e.clientX, e.clientY);
    window.addEventListener("mousemove", moveHandler);

    const cleanup = () => {
      activeTargetRef.current = null;
      targetCornerPositionsRef.current = initial;
      activeStrengthRef.current = 0;
      stopTick();

      spinTlRef.current?.resume?.();
      gsap.to(cursor, { rotation: 0, duration: 0.001 });

      // Snap corners back
      cornersRef.current.forEach((el, i) => {
        const p = initial[i];
        gsap.to(el, { x: p.x, y: p.y, duration: 0.25, ease: "power3.out" });
      });
    };

    const enterHandler = (e: MouseEvent) => {
      const directTarget = e.target as HTMLElement | null;
      if (!directTarget) return;

      // Find closest target selector from event target up the tree.
      let current: HTMLElement | null = directTarget;
      let found: Element | null = null;
      while (current && current !== document.body) {
        if (current.matches(targetSelector)) {
          found = current;
          break;
        }
        current = current.parentElement;
      }

      if (!found) return;
      if (activeTargetRef.current === found) return;

      activeTargetRef.current = found;
      spinTlRef.current?.pause?.();
      gsap.set(cursor, { rotation: 0 });

      const rect = found.getBoundingClientRect();
      const { cornerSize: cs } = { borderWidth: 3, cornerSize: 12 };

      // Viewport-based positions of the 4 corners that the cursor should approach.
      const positions: CornerPos[] = [
        { x: rect.left - 3, y: rect.top - 3 },
        { x: rect.right + 3 - cs, y: rect.top - 3 },
        { x: rect.right + 3 - cs, y: rect.bottom + 3 - cs },
        { x: rect.left - 3, y: rect.bottom + 3 - cs },
      ];

      targetCornerPositionsRef.current = positions;

      const duration = hoverDuration;
      activeStrengthRef.current = 0;
      // Start tick immediately; strength animation can be eased independently.
      ensureTick();
      gsap.to(activeStrengthRef, {
        current: 1,
        duration,
        ease: "power2.out",
      });

      const leaveHandler = () => cleanup();
      found.addEventListener("mouseleave", leaveHandler, { once: true });
    };

    window.addEventListener("mouseover", enterHandler, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      window.removeEventListener("mouseover", enterHandler);
      if (tickRafRef.current != null) cancelAnimationFrame(tickRafRef.current);
      tickRafRef.current = null;
      cleanup();
      if (hideDefaultCursor) document.body.style.cursor = originalCursor;
      spinTlRef.current?.kill();
    };
  }, [hideDefaultCursor, hoverDuration, isMobile, moveCursor, parallaxOn, spinDuration, stopTick, targetSelector, ensureTick]);

  if (isMobile) return null;

  return (
    <div ref={cursorRef} className="fixed top-0 left-0 w-[1px] h-[1px] pointer-events-none z-[9999]" style={{ willChange: "transform" }}>
      <div
        ref={dotRef}
        className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: "transform" }}
      />
      {Array.from({ length: 4 }).map((_, i) => {
        const pos = [
          "-translate-x-[150%] -translate-y-[150%] border-r-0 border-b-0",
          "translate-x-1/2 -translate-y-[150%] border-l-0 border-b-0",
          "translate-x-1/2 translate-y-1/2 border-l-0 border-t-0",
          "-translate-x-[150%] translate-y-1/2 border-r-0 border-t-0",
        ][i];
        return (
          <div
            key={i}
            className={`target-cursor-corner absolute top-1/2 left-1/2 w-3 h-3 border-[3px] border-white ${pos}`}
            style={{ willChange: "transform" }}
          />
        );
      })}
    </div>
  );
};

export default TargetCursor;

