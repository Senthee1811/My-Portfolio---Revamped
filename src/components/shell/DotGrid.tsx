"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { gsap } from "@/lib/gsap";

export const DotGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isDark = resolvedTheme === "dark";
    const dotSpacing = 24;
    const baseRadius = 1;
    const baseColor = isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)";
    const highlightColor = isDark ? "rgba(10, 132, 255, 0.45)" : "rgba(10, 132, 255, 0.35)";

    const cols = Math.ceil(width / dotSpacing);
    const rows = Math.ceil(height / dotSpacing);
    const totalDots = cols * rows;

    // Pick ~6% animated dots
    const animatedCount = Math.floor(totalDots * 0.06);
    const animatedIndices = new Set<number>();
    while (animatedIndices.size < animatedCount) {
      animatedIndices.add(Math.floor(Math.random() * totalDots));
    }

    const dotPhases = new Float32Array(totalDots);
    animatedIndices.forEach((idx) => {
      dotPhases[idx] = Math.random() * Math.PI * 2;
    });

    // Create an offscreen canvas for static dots
    const offscreen = document.createElement("canvas");
    offscreen.width = width;
    offscreen.height = height;
    const offCtx = offscreen.getContext("2d");
    if (offCtx) {
      offCtx.fillStyle = baseColor;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          if (!animatedIndices.has(idx)) {
            const x = c * dotSpacing + dotSpacing / 2;
            const y = r * dotSpacing + dotSpacing / 2;
            offCtx.beginPath();
            offCtx.arc(x, y, baseRadius, 0, Math.PI * 2);
            offCtx.fill();
          }
        }
      }
    }

    let time = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(offscreen, 0, 0);

      if (!prefersReduced) {
        time += 0.03;
        animatedIndices.forEach((idx) => {
          const c = idx % cols;
          const r = Math.floor(idx / cols);
          const x = c * dotSpacing + dotSpacing / 2;
          const y = r * dotSpacing + dotSpacing / 2;
          const phase = dotPhases[idx];
          const scale = 1 + Math.sin(time + phase) * 0.8;
          const alpha = 0.3 + (Math.sin(time + phase) + 1) * 0.35;

          ctx.save();
          ctx.beginPath();
          ctx.arc(x, y, baseRadius * scale, 0, Math.PI * 2);
          ctx.fillStyle = highlightColor.replace(/[\d.]+\)$/, `${alpha})`);
          ctx.fill();
          ctx.restore();
        });
      }
    };

    render();

    if (prefersReduced) return;

    let isVisible = true;
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const tickerCallback = () => {
      if (isVisible) render();
    };

    gsap.ticker.fps(30);
    gsap.ticker.add(tickerCallback);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      render();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      gsap.ticker.remove(tickerCallback);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", handleResize);
    };
  }, [resolvedTheme, prefersReduced]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      aria-hidden="true"
    />
  );
};
