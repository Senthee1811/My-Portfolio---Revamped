"use client";

import React, { useState, useEffect } from "react";
import { Flame, GitCommit } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";
import { profileData } from "@/data/profile";

interface Day {
  contributionCount: number;
  date: string;
}

interface Week {
  contributionDays: Day[];
}

export const GithubGraph = () => {
  const [totalCount, setTotalCount] = useState<number>(642);
  const [weeks, setWeeks] = useState<Week[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/github")
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.totalContributions) setTotalCount(data.totalContributions);
        if (data.weeks) setWeeks(data.weeks);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("Failed to load GitHub activity:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const getColorClass = (count: number) => {
    if (count === 0) return "bg-[var(--surface-2)]";
    if (count <= 2) return "bg-emerald-500/35";
    if (count <= 4) return "bg-emerald-500/65";
    return "bg-emerald-500";
  };

  return (
    <div
      id="github-graph-section"
      className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-xs transition-colors hover:border-[var(--muted-foreground)]/30"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <GithubIcon className="h-4 w-4 text-[var(--foreground)]" />
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
            GitHub Contributions
          </h2>
        </div>

        <a
          href={profileData.contacts.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] font-semibold text-[var(--accent)] hover:underline flex items-center gap-1"
        >
          <span>@{profileData.githubHandle}</span>
        </a>
      </div>

      <div className="flex items-baseline gap-2 mb-3">
        <span className="text-2xl font-bold tracking-tight text-[var(--foreground)] tabular-nums">
          {totalCount.toLocaleString()}
        </span>
        <span className="text-xs text-[var(--muted-foreground)] font-medium">
          contributions in the last year
        </span>
      </div>

      {/* Contribution Grid */}
      <div className="overflow-x-auto no-scrollbar pb-1">
        <div className="flex gap-[3px] min-w-max">
          {loading ? (
            <div className="h-20 w-full flex items-center justify-center text-xs text-[var(--muted-foreground)]">
              <GitCommit className="h-4 w-4 animate-spin mr-2" />
              Loading activity matrix...
            </div>
          ) : (
            weeks.slice(-40).map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-[3px]">
                {week.contributionDays.map((day, dIdx) => (
                  <div
                    key={dIdx}
                    title={`${day.date}: ${day.contributionCount} contributions`}
                    className={`h-[9px] w-[9px] rounded-[2px] transition-transform hover:scale-125 ${getColorClass(
                      day.contributionCount
                    )}`}
                  />
                ))}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between pt-3 mt-1 border-t border-[var(--border)]/60 text-[10px] text-[var(--muted-foreground)]">
        <div className="flex items-center gap-1.5">
          <Flame className="h-3 w-3 text-amber-500" />
          <span>Active daily streaks & code releases</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Less</span>
          <span className="h-2 w-2 rounded-[2px] bg-[var(--surface-2)] inline-block" />
          <span className="h-2 w-2 rounded-[2px] bg-emerald-500/35 inline-block" />
          <span className="h-2 w-2 rounded-[2px] bg-emerald-500/65 inline-block" />
          <span className="h-2 w-2 rounded-[2px] bg-emerald-500 inline-block" />
          <span>More</span>
        </div>
      </div>
    </div>
  );
};
