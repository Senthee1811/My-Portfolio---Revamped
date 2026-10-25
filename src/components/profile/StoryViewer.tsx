"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { profileData } from "@/data/profile";
import { X } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface StoryViewerProps {
  initialHighlightIndex: number;
  onClose: () => void;
}

export const StoryViewer = ({
  initialHighlightIndex,
  onClose,
}: StoryViewerProps) => {
  const highlights = profileData.highlights;
  const [currentHighlightIdx, setCurrentHighlightIdx] = useState(
    initialHighlightIndex
  );
  const [currentStoryIdx, setCurrentStoryIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const prefersReduced = useReducedMotion();
  const duration = 5000; // 5 seconds per story
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentHighlight = highlights[currentHighlightIdx];
  const stories = currentHighlight?.stories || [];
  const currentStory = stories[currentStoryIdx] || stories[0];

  const handleNext = useCallback(() => {
    setProgress(0);
    if (currentStoryIdx < stories.length - 1) {
      setCurrentStoryIdx((prev) => prev + 1);
    } else if (currentHighlightIdx < highlights.length - 1) {
      setCurrentHighlightIdx((prev) => prev + 1);
      setCurrentStoryIdx(0);
    } else {
      onClose();
    }
  }, [currentStoryIdx, currentHighlightIdx, stories.length, highlights.length, onClose]);

  const handlePrev = useCallback(() => {
    setProgress(0);
    if (currentStoryIdx > 0) {
      setCurrentStoryIdx((prev) => prev - 1);
    } else if (currentHighlightIdx > 0) {
      setCurrentHighlightIdx((prev) => prev - 1);
      const prevStories = highlights[currentHighlightIdx - 1].stories;
      setCurrentStoryIdx(prevStories.length - 1);
    }
  }, [currentStoryIdx, currentHighlightIdx, highlights]);

  // Keyboard navigation & escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, handleNext, handlePrev]);

  // Progress timer
  useEffect(() => {
    if (isPaused || prefersReduced) return;

    const stepMs = 50;
    const increment = (stepMs / duration) * 100;

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, prefersReduced, handleNext]);

  if (!currentHighlight || !currentStory) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${currentHighlight.title} Story`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200"
    >
      <button
        onClick={onClose}
        aria-label="Close story"
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
      >
        <X className="h-6 w-6" />
      </button>

      <div
        className="relative w-full max-w-sm h-[580px] sm:h-[640px] rounded-3xl overflow-hidden bg-neutral-900 text-white flex flex-col justify-between shadow-2xl border border-white/10 select-none"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Progress bars header */}
        <div className="absolute top-3 inset-x-3 z-30 flex items-center gap-1.5">
          {stories.map((_, idx) => (
            <div
              key={idx}
              className="h-1 flex-1 bg-white/25 rounded-full overflow-hidden"
            >
              <div
                className="h-full bg-white transition-all duration-75"
                style={{
                  width:
                    idx < currentStoryIdx
                      ? "100%"
                      : idx === currentStoryIdx
                      ? `${progress}%`
                      : "0%",
                }}
              />
            </div>
          ))}
        </div>

        {/* Story author and title info */}
        <div className="pt-7 px-4 z-20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-amber-500 to-indigo-500 flex items-center justify-center font-bold text-xs">
              S
            </div>
            <div>
              <p className="text-xs font-semibold">{profileData.displayName}</p>
              <p className="text-[10px] text-white/70">{currentHighlight.title}</p>
            </div>
          </div>
        </div>

        {/* Story Content Area */}
        <div className="flex-1 flex flex-col justify-center px-6 py-4 z-20">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1">
            {currentStory.subtitle}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-4">
            {currentStory.title}
          </h3>

          <div className="space-y-3">
            {currentStory.content.map((point, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-xs sm:text-sm leading-relaxed"
              >
                {point}
              </div>
            ))}
          </div>
        </div>

        {/* Tap edge overlays for next/prev */}
        <div className="absolute inset-0 z-10 flex">
          <div
            className="w-1/3 h-full cursor-pointer"
            onClick={handlePrev}
            aria-label="Previous story"
          />
          <div
            className="w-2/3 h-full cursor-pointer"
            onClick={handleNext}
            aria-label="Next story"
          />
        </div>

        {/* Footer info */}
        <div className="pb-4 px-4 z-20 flex items-center justify-between text-[11px] text-white/60">
          <span>Tap edges to navigate · Hold to pause</span>
          <button
            onClick={onClose}
            className="px-2.5 py-1 rounded-full bg-white/15 text-white hover:bg-white/25 transition-all text-[11px]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
