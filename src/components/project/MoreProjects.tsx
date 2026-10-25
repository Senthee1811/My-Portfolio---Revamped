"use client";

import React from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import { ChevronRight } from "lucide-react";

interface MoreProjectsProps {
  currentSlug: string;
}

export const MoreProjects = ({ currentSlug }: MoreProjectsProps) => {
  const otherProjects = projects.filter((p) => p.slug !== currentSlug).slice(0, 4);

  return (
    <div className="space-y-3 pt-6 border-t border-[var(--border)]">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
          More Projects
        </h3>
        <Link
          href="/#projects"
          className="text-xs font-semibold text-[var(--accent)] hover:underline"
        >
          See all
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {otherProjects.map((p) => (
          <Link
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--muted-foreground)]/40 transition-all flex items-center justify-between group shadow-xs"
          >
            <div>
              <h4 className="text-sm font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                {p.name}
              </h4>
              <p className="text-xs text-[var(--muted-foreground)] line-clamp-1 mt-0.5">
                {p.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--surface-2)] text-[var(--muted-foreground)]">
                {p.status || "Open"}
              </span>
              <ChevronRight className="h-4 w-4 text-[var(--muted-foreground)] group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
