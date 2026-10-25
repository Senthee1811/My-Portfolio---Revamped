"use client";

import React, { useRef, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";

function subscribeMounted() {
  return () => {};
}

export const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribeMounted, () => true, () => false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const prefersReduced = useReducedMotion();

  if (!mounted) {
    return (
      <div className="h-8 w-8 rounded-full border border-[var(--border)] bg-[var(--surface)]" />
    );
  }

  const isDark = resolvedTheme === "dark";

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = isDark ? "light" : "dark";

    // Fallback if View Transitions API is not supported or user prefers reduced motion
    if (
      prefersReduced ||
      typeof document === "undefined" ||
      !("startViewTransition" in document)
    ) {
      setTheme(nextTheme);
      return;
    }

    const rect = buttonRef.current?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : e.clientX;
    const y = rect ? rect.top + rect.height / 2 : e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Start transition
    const transition = (document as unknown as { startViewTransition: (cb: () => void) => { ready: Promise<void> } }).startViewTransition(() => {
      setTheme(nextTheme);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 600,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition-all hover:scale-105 active:scale-95 shadow-sm"
      id="theme-toggle-btn"
    >
      {isDark ? (
        <Sun className="h-4 w-4 text-amber-400" />
      ) : (
        <Moon className="h-4 w-4 text-slate-700" />
      )}
    </button>
  );
};
