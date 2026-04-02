"use client";

import React from "react";
import type { SplashCursorProps } from "./type";

import SplashCursorBase from "@/components/SplashCursor";

const SplashCursor = (props: SplashCursorProps) => {
  return <SplashCursorBase {...(props as any)} />;
};

export default SplashCursor;

