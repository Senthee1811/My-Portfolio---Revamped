"use client";

import React from "react";

interface BrowserFrameProps {
  children: React.ReactNode;
  url?: string;
  className?: string;
}

export const BrowserFrame = ({
  children,
  url = "https://quick-blog-flame.vercel.app",
  className = "",
}: BrowserFrameProps) => {
  return (
    <div
      className={`rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-xl ${className}`}
    >
      {/* Browser chrome header */}
      <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[var(--surface-2)] border-b border-[var(--border)]">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56] inline-block" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e] inline-block" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f] inline-block" />
        </div>
        <div className="flex-1 mx-2">
          <div className="max-w-xs mx-auto py-1 px-3 rounded-md bg-[var(--surface)] text-[11px] text-[var(--muted-foreground)] font-mono truncate text-center border border-[var(--border)]/60">
            {url}
          </div>
        </div>
      </div>

      {/* Viewport content */}
      <div className="relative w-full overflow-hidden bg-[var(--background)]">
        {children}
      </div>
    </div>
  );
};
