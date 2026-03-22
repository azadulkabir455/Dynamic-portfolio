"use client";

import {
  ParallaxProvider,
  type ParallaxProviderProps,
} from "react-scroll-parallax";

export function ParallaxRoot({
  children,
  ...props
}: ParallaxProviderProps) {
  return <ParallaxProvider {...props}>{children}</ParallaxProvider>;
}
