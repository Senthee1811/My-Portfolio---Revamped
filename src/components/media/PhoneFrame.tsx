"use client";

import React from "react";
import { Wifi, Battery, Signal } from "lucide-react";

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
  time?: string;
}

export const PhoneFrame = ({
  children,
  className = "",
  time = "9:41",
}: PhoneFrameProps) => {
  return (
    <div
      className={`relative mx-auto w-full max-w-[320px] sm:max-w-[340px] aspect-[9/18.5] rounded-[44px] p-3 bg-neutral-900 border-[3.5px] border-neutral-700 shadow-2xl overflow-hidden flex flex-col ${className}`}
    >
      {/* Screen container */}
      <div className="relative w-full h-full rounded-[36px] overflow-hidden bg-[var(--background)] flex flex-col border border-white/5">
        {/* Status Bar */}
        <div className="relative z-30 pt-2.5 px-6 pb-1 flex items-center justify-between text-[11px] font-semibold text-[var(--foreground)] select-none">
          <span>{time}</span>

          {/* Dynamic Island */}
          <div className="absolute left-1/2 -translate-x-1/2 top-2 h-4 w-20 rounded-full bg-black flex items-center justify-end pr-2">
            <span className="h-2 w-2 rounded-full bg-blue-500/80 animate-pulse" />
          </div>

          <div className="flex items-center gap-1.5">
            <Signal className="h-3 w-3" />
            <Wifi className="h-3 w-3" />
            <Battery className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* Screen inner content */}
        <div className="relative flex-1 overflow-hidden">{children}</div>

        {/* Home indicator bar */}
        <div className="relative z-30 py-1.5 flex justify-center bg-transparent">
          <div className="h-1 w-28 rounded-full bg-neutral-500/40" />
        </div>
      </div>
    </div>
  );
};
