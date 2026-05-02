"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import { sendYouTubeCommand } from "@/blocks/sections/frontend/intro/function";

function calcStartPaddingX(): number {
  if (typeof window === "undefined") return 0;
  return Math.max(0, (window.innerWidth - 1280) / 2);
}

export function useIntroVideoScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [startPaddingX, setStartPaddingX] = useState(calcStartPaddingX);

  useEffect(() => {
    const onResize = () => setStartPaddingX(calcStartPaddingX());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const paddingX = useTransform(
    scrollYProgress,
    [0, 0.33, 0.67],
    [startPaddingX, startPaddingX / 2, 0],
  );
  const borderRadius = useTransform(
    scrollYProgress,
    [0, 0.33, 0.67],
    [24, 12, 0],
  );

  const headerY = useTransform(scrollYProgress, [0, 0.33, 0.67], [0, -80, -180]);
  const headerBlurAmount = useTransform(scrollYProgress, [0, 0.33, 0.67], [0, 4, 16]);
  const headerFilter = useTransform(headerBlurAmount, (v) => `blur(${v}px)`);

  const videoY = useTransform(scrollYProgress, [0, 0.33, 0.67], [0, -60, -120]);

  const toggleMute = () => {
    if (!iframeRef.current) return;
    sendYouTubeCommand(iframeRef.current, isMuted ? "unMute" : "mute");
    setIsMuted((prev) => !prev);
  };

  return { sectionRef, iframeRef, isMuted, toggleMute, paddingX, borderRadius, headerY, headerFilter, videoY };
}
