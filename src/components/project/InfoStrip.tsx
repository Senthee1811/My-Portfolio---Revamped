"use client";

import React from "react";
import { Project } from "@/data/projects";

interface InfoStripProps {
  project: Project;
}

export const InfoStrip = ({ project }: InfoStripProps) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2">
      <div className="flex items-center gap-3 min-w-max">
        {/* Category Cell */}
        <div className="px-4 py-2.5 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex flex-col items-center justify-center min-w-[110px] text-center">
          <span className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-bold">
            Category
          </span>
          <span className="text-xs font-semibold text-[var(--foreground)] mt-0.5">
            {project.info.category}
          </span>
        </div>

        {/* Platform Cell */}
        <div className="px-4 py-2.5 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex flex-col items-center justify-center min-w-[110px] text-center">
          <span className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-bold">
            Platform
          </span>
          <span className="text-xs font-semibold text-[var(--foreground)] mt-0.5">
            {project.info.platform}
          </span>
        </div>

        {/* Year Cell */}
        <div className="px-4 py-2.5 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex flex-col items-center justify-center min-w-[90px] text-center">
          <span className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-bold">
            Year
          </span>
          <span className="text-xs font-semibold text-[var(--foreground)] mt-0.5">
            {project.info.year}
          </span>
        </div>

        {/* Role Cell */}
        <div className="px-4 py-2.5 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex flex-col items-center justify-center min-w-[120px] text-center">
          <span className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-bold">
            Role
          </span>
          <span className="text-xs font-semibold text-[var(--foreground)] mt-0.5">
            {project.info.role}
          </span>
        </div>

        {/* Developer Cell */}
        <div className="px-4 py-2.5 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex flex-col items-center justify-center min-w-[110px] text-center">
          <span className="text-[10px] uppercase tracking-wider text-[var(--muted-foreground)] font-bold">
            Developer
          </span>
          <span className="text-xs font-semibold text-[var(--foreground)] mt-0.5">
            Sentheepan E.
          </span>
        </div>

        {/* Verified Stats Cells (only real facts from CV) */}
        {project.stats?.map((stat, idx) => (
          <div
            key={idx}
            className="px-4 py-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col items-center justify-center min-w-[110px] text-center"
          >
            <span className="text-sm font-bold text-amber-500">
              {stat.value}
            </span>
            <span className="text-[10px] font-semibold text-[var(--muted-foreground)] mt-0.5">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
