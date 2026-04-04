"use client";

import React, { useCallback, useEffect, useMemo, useRef } from "react";
import type { ClickSparkProps } from "./type";
import { getEasedValue } from "./functions";
import Container from "../../container/Container";

type Spark = {
  x: number;
  y: number;
  angle: number;
  startTime: number;
};

const ClickSpark = ({
  sparkColor = "#fff",
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = "ease-out",
  extraScale = 1.0,
  zIndex = 1000,
  children,
}: ClickSparkProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const sparksRef = useRef<Spark[]>([]);
  const startTimeRef = useRef<number | null>(null);

  const easeFunc = useCallback(
    (t: number) => getEasedValue(t, easing),
    [easing],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    let resizeTimeout: ReturnType<typeof setTimeout> | null = null;

    const resizeCanvas = () => {
      const { width, height } = wrapper.getBoundingClientRect();
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = Math.floor(width);
        canvas.height = Math.floor(height);
      }
    };

    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => resizeCanvas(), 100);
    };

    const ro = new ResizeObserver(handleResize);
    ro.observe(wrapper);

    resizeCanvas();

    return () => {
      ro.disconnect();
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const draw = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = timestamp - spark.startTime;
        if (elapsed >= duration) return false;

        const progress = elapsed / duration;
        const eased = easeFunc(progress);

        const distance = eased * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - eased);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        ctx.strokeStyle = sparkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        return true;
      });

      animationId = requestAnimationFrame(draw);
    };

    animationId = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animationId);
  }, [duration, easeFunc, extraScale, sparkColor, sparkRadius, sparkSize]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const now = performance.now();
      const newSparks: Spark[] = Array.from({ length: sparkCount }, (_, i) => ({
        x,
        y,
        angle: (2 * Math.PI * i) / sparkCount,
        startTime: now,
      }));

      sparksRef.current.push(...newSparks);
    },
    [sparkCount],
  );

  const wrapperStyle = useMemo<React.CSSProperties>(
    () => ({
      position: "relative",
      width: "100%",
      height: "100%",
      zIndex,
    }),
    [zIndex],
  );

  return (
    <Container as="div" ref={wrapperRef} style={wrapperStyle} onClick={handleClick}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block absolute top-0 left-0 select-none pointer-events-none"
        style={{ zIndex: zIndex + 1 }}
      />
      {children}
    </Container>
  );
};

export default ClickSpark;

