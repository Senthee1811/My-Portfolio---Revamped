"use client";

import React, { useSyncExternalStore } from "react";
import { Clock } from "lucide-react";

function getColomboTime() {
  if (typeof window === "undefined") return "";
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Colombo",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    return formatter.format(new Date());
  } catch {
    return "";
  }
}

function subscribe(callback: () => void) {
  const interval = setInterval(callback, 1000);
  return () => clearInterval(interval);
}

export const ColomboClock = () => {
  const timeStr = useSyncExternalStore(subscribe, getColomboTime, () => "");

  if (!timeStr) {
    return (
      <div className="flex items-center gap-1.5 text-xs text-[var(--muted-foreground)] tabular-nums">
        <Clock className="h-3.5 w-3.5 animate-pulse" />
        <span>Colombo (UTC+5:30)</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--muted-foreground)] tabular-nums">
      <Clock className="h-3.5 w-3.5 text-emerald-500" />
      <span>Colombo, LK · {timeStr}</span>
    </div>
  );
};
