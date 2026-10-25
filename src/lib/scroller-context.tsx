"use client";

import React, { createContext, useContext, RefObject } from "react";

interface ScrollerContextValue {
  scrollerRef: RefObject<HTMLElement | null>;
}

const ScrollerContext = createContext<ScrollerContextValue>({
  scrollerRef: { current: null },
});

export const ScrollerProvider = ({
  children,
  scrollerRef,
}: {
  children: React.ReactNode;
  scrollerRef: RefObject<HTMLElement | null>;
}) => {
  return (
    <ScrollerContext.Provider value={{ scrollerRef }}>
      {children}
    </ScrollerContext.Provider>
  );
};

export const useScroller = () => {
  const context = useContext(ScrollerContext);
  return context.scrollerRef.current ?? (typeof window !== "undefined" ? window : null);
};
