"use client";

import React from "react";
import { achievements } from "@/data/experience";
import { Award, Cloud, Trophy } from "lucide-react";

export const Achievements = () => {
  return (
    <div id="achievements-section" className="w-full flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
          Achievements & Honors
        </h2>
        <Trophy className="h-3.5 w-3.5 text-amber-500" />
      </div>

      <div className="grid grid-cols-1 gap-2.5">
        {achievements.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] transition-all hover:border-[var(--muted-foreground)]/30 group"
          >
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-500/20 to-orange-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0">
                {item.id.includes("aws") ? (
                  <Cloud className="h-5 w-5" />
                ) : (
                  <Award className="h-5 w-5" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--surface-2)] text-[var(--muted-foreground)]">
                    {item.date}
                  </span>
                </div>
                <p className="text-xs font-medium text-amber-500/90 mt-0.5">
                  {item.subtitle}
                </p>
                <p className="text-xs text-[var(--muted-foreground)] mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
