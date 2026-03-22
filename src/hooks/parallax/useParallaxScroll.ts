"use client";

import {
  useParallax as useParallaxBase,
  type ParallaxProps,
} from "react-scroll-parallax";

export function useParallaxScroll<T extends HTMLElement = HTMLDivElement>(
  props: ParallaxProps,
) {
  return useParallaxBase<T>(props);
}
