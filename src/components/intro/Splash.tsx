"use client";

import React, { useState, useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { gsap } from "@/lib/gsap";

interface SplashProps {
  onComplete: () => void;
}

const greetings = [
  { text: "hello", lang: "English" },
  { text: "வணக்கம்", lang: "Tamil" },
  { text: "ආයුබෝවන්", lang: "Sinhala" },
];

export const Splash = ({ onComplete }: SplashProps) => {
  const [visible, setVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    // Check session storage
    try {
      if (sessionStorage.getItem("senthee_splash_seen") === "true") {
        setVisible(false);
        onComplete();
        return;
      }
    } catch {
      // ignore
    }

    if (prefersReduced) {
      setVisible(false);
      onComplete();
      return;
    }

    let isMounted = true;
    let step = 0;

    const runCycle = () => {
      if (!isMounted) return;

      if (step >= greetings.length) {
        // Final fade out and reveal
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            scale: 1.08,
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
              try {
                sessionStorage.setItem("senthee_splash_seen", "true");
              } catch {
                // ignore
              }
              setVisible(false);
              onComplete();
            },
          });
        }
        return;
      }

      setCurrentIndex(step);

      if (textRef.current) {
        const tl = gsap.timeline({
          onComplete: () => {
            step++;
            setTimeout(runCycle, 350);
          },
        });

        tl.fromTo(
          textRef.current,
          {
            clipPath: "inset(0 100% 0 0)",
            filter: "blur(6px)",
            opacity: 0.2,
          },
          {
            clipPath: "inset(0 0% 0 0)",
            filter: "blur(0px)",
            opacity: 1,
            duration: 0.9,
            ease: "power2.inOut",
          }
        );
      }
    };

    const initialTimeout = setTimeout(runCycle, 200);

    return () => {
      isMounted = false;
      clearTimeout(initialTimeout);
    };
  }, [prefersReduced, onComplete]);

  const handleSkip = () => {
    try {
      sessionStorage.setItem("senthee_splash_seen", "true");
    } catch {
      // ignore
    }
    setVisible(false);
    onComplete();
  };

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--background)] text-[var(--foreground)] select-none"
    >
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 text-xs font-semibold px-3 py-1.5 rounded-full bg-[var(--surface-2)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] border border-[var(--border)] transition-all"
      >
        Skip
      </button>

      <div className="text-center px-4">
        <h1
          ref={textRef}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[var(--foreground)] font-serif italic"
        >
          {greetings[currentIndex].text}
        </h1>
        <p className="text-xs text-[var(--muted-foreground)] mt-4 tracking-widest uppercase font-mono">
          {greetings[currentIndex].lang}
        </p>
      </div>
    </div>
  );
};
