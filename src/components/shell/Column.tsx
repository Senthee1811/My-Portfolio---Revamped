"use client";

import React, { useRef } from "react";
import { ScrollerProvider } from "@/lib/scroller-context";

interface ColumnProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  borderRight?: boolean;
}

export const Column = ({
  children,
  id,
  className = "",
  borderRight = true,
}: ColumnProps) => {
  const columnRef = useRef<HTMLDivElement | null>(null);

  return (
    <ScrollerProvider scrollerRef={columnRef}>
      <div
        id={id}
        ref={columnRef}
        className={`relative no-scrollbar subtle-scrollbar lg:h-screen lg:overflow-y-auto lg:overscroll-contain ${
          borderRight ? "lg:border-r lg:border-[var(--column-border)]" : ""
        } pb-24 lg:pb-36 ${className}`}
      >
        {children}
      </div>
    </ScrollerProvider>
  );
};
