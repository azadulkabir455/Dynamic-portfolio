"use client";

import { useLayoutEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

type GsapScrollSmootherProps = {
  children: ReactNode;
};

/**
 * GSAP ScrollSmoother — official wrapper/content pattern.
 * Keep `position: fixed` UI (loader, menus) as siblings outside this tree.
 *
 * @see https://gsap.com/docs/v3/Plugins/ScrollSmoother/
 */
export default function GsapScrollSmoother({ children }: GsapScrollSmootherProps) {
  useLayoutEffect(() => {
    const smoother = ScrollSmoother.create({
      smooth: 2,
      effects: true,
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
    });

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      smoother.kill();
    };
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
