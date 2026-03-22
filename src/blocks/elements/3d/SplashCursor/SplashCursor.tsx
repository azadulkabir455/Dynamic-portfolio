"use client";

import React from "react";
import type { SplashCursorProps } from "./type";

// Reuse the existing, proven implementation.
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import SplashCursorBase from "@/components/SplashCursor";

const SplashCursor = (props: SplashCursorProps) => {
  return <SplashCursorBase {...(props as any)} />;
};

export default SplashCursor;

