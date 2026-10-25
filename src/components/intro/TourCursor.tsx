"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { tourStops } from "./tour-stops";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { X, ChevronRight } from "lucide-react";

interface TourCursorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TourCursor = ({ isOpen, onClose }: TourCursorProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [typedText, setTypedText] = useState("");
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const bubbleRef = useRef<HTMLDivElement | null>(null);
  const highlightedElRef = useRef<HTMLElement | null>(null);
  const prefersReduced = useReducedMotion();

  const currentStop = tourStops[currentIdx];

  // Clean outline helper
  const clearOutline = useCallback(() => {
    if (highlightedElRef.current) {
      highlightedElRef.current.style.outline = "";
      highlightedElRef.current.style.outlineOffset = "";
      highlightedElRef.current = null;
    }
  }, []);

  const handleComplete = useCallback(() => {
    clearOutline();
    try {
      localStorage.setItem("senthee_tour_completed", "true");
    } catch {
      // ignore
    }
    onClose();
  }, [clearOutline, onClose]);

  const handleNext = useCallback(() => {
    if (currentIdx < tourStops.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      handleComplete();
    }
  }, [currentIdx, handleComplete]);

  // Close on Esc
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handleNext]);

  useEffect(() => {
    if (!isOpen || !currentStop) return;

    clearOutline();
    setTypedText("");

    const targetEl = document.getElementById(currentStop.targetId);

    const typeMessage = (msg: string) => {
      if (prefersReduced) {
        setTypedText(msg);
        return;
      }

      let i = 0;
      const timer = setInterval(() => {
        i++;
        setTypedText(msg.slice(0, i));
        if (i >= msg.length) {
          clearInterval(timer);
        }
      }, 22);
    };

    if (!targetEl) {
      typeMessage(currentStop.message);
      return;
    }

    highlightedElRef.current = targetEl;
    targetEl.scrollIntoView({ behavior: "smooth", block: "center" });

    const rect = targetEl.getBoundingClientRect();
    const targetX = rect.left + rect.width / 2;
    const targetY = rect.top + rect.height / 2;

    if (cursorRef.current && !prefersReduced) {
      gsap.to(cursorRef.current, {
        x: targetX,
        y: targetY,
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => {
          if (targetEl) {
            targetEl.style.outline = "2px solid #0a84ff";
            targetEl.style.outlineOffset = "4px";
          }
          typeMessage(currentStop.message);
        },
      });
    } else {
      if (targetEl) {
        targetEl.style.outline = "2px solid #0a84ff";
        targetEl.style.outlineOffset = "4px";
      }
      typeMessage(currentStop.message);
    }

    return () => clearOutline();
  }, [isOpen, currentStop, prefersReduced, clearOutline]);

  if (!isOpen) return null;

  return (
    <div
      role="region"
      aria-label="Interactive Tour"
      className="fixed inset-0 z-50 pointer-events-none"
    >
      {/* Top right tour controls */}
      <div className="absolute top-4 right-4 pointer-events-auto flex items-center gap-2">
        <button
          onClick={handleComplete}
          className="px-3.5 py-1.5 rounded-full bg-[var(--surface-2)] hover:bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] text-xs font-semibold shadow-md transition-all flex items-center gap-1.5"
        >
          <span>Skip tour</span>
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Floating Multiplayer Cursor */}
      <div
        ref={cursorRef}
        className="absolute top-0 left-0 -translate-x-2 -translate-y-2 pointer-events-none transition-opacity duration-300 z-50"
      >
        {/* Figma Cursor Arrow */}
        <div className="relative">
          <svg
            className="w-5 h-5 text-blue-500 drop-shadow-md"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M4 0l16 12-7 2-4 9-5-23z" />
          </svg>

          {/* Name Tag */}
          <div className="absolute left-3.5 top-3.5 px-2 py-0.5 rounded-md bg-blue-600 text-white text-[11px] font-bold shadow-md whitespace-nowrap">
            Senthee
          </div>
        </div>

        {/* Speech Bubble */}
        <div
          ref={bubbleRef}
          className="absolute left-6 top-8 w-64 sm:w-72 p-3.5 rounded-2xl bg-[var(--card)] text-[var(--foreground)] border border-[var(--border)] shadow-2xl pointer-events-auto animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[var(--border)]">
            <span className="text-[11px] font-bold text-[var(--accent)] uppercase tracking-wider">
              {currentStop?.title} ({currentIdx + 1}/{tourStops.length})
            </span>
          </div>

          <p className="text-xs text-[var(--foreground)] leading-relaxed font-normal min-h-[36px]">
            {typedText}
            {typedText.length < (currentStop?.message.length || 0) && (
              <span className="inline-block w-1 h-3 bg-blue-500 ml-0.5 animate-pulse" />
            )}
          </p>

          <div className="flex items-center justify-between mt-3 pt-2 border-t border-[var(--border)]/70">
            <span className="text-[10px] text-[var(--muted-foreground)]">
              Press Esc to exit
            </span>
            <button
              onClick={handleNext}
              className="px-3 py-1 rounded-full bg-[var(--accent)] text-white text-xs font-semibold hover:opacity-90 active:scale-95 transition-all flex items-center gap-1 shadow-xs"
            >
              <span>{currentIdx < tourStops.length - 1 ? "Next" : "Finish"}</span>
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
