"use client";

import React, { useState } from "react";
import { profileData } from "@/data/profile";
import { StoryViewer } from "./StoryViewer";
import { User, Layers, Compass, Send } from "lucide-react";

const highlightIcons: Record<string, React.ReactNode> = {
  about: <User className="h-4 w-4" />,
  stack: <Layers className="h-4 w-4" />,
  now: <Compass className="h-4 w-4" />,
  contact: <Send className="h-4 w-4" />,
};

export const Highlights = () => {
  const [activeStoryIdx, setActiveStoryIdx] = useState<number | null>(null);

  return (
    <>
      <div id="story-highlights" className="w-full">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)] mb-3">
          Highlights
        </h2>
        <div className="flex items-center gap-3.5 overflow-x-auto no-scrollbar py-1">
          {profileData.highlights.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveStoryIdx(idx)}
              className="flex flex-col items-center gap-1.5 shrink-0 group focus:outline-none"
              aria-label={`Open ${item.title} highlight`}
            >
              <div className="relative p-[2px] rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-500 transition-transform duration-300 group-hover:scale-105 active:scale-95 shadow-xs">
                <div className="h-14 w-14 rounded-full bg-[var(--surface-2)] flex items-center justify-center text-[var(--foreground)] border-2 border-[var(--background)]">
                  <div
                    className={`h-11 w-11 rounded-full flex items-center justify-center bg-gradient-to-br ${item.gradient} text-white shadow-inner`}
                  >
                    {highlightIcons[item.id] ?? <User className="h-4 w-4" />}
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-medium text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] transition-colors">
                {item.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {activeStoryIdx !== null && (
        <StoryViewer
          initialHighlightIndex={activeStoryIdx}
          onClose={() => setActiveStoryIdx(null)}
        />
      )}
    </>
  );
};
