"use client";

import React, { useState, useMemo } from "react";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import { FolderGit2, ChevronDown, ChevronUp } from "lucide-react";

type FilterType = "All" | "AI & ML" | "Full-Stack" | "Web & UI";

export const ProjectList = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [showAll, setShowAll] = useState(false);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (activeFilter === "All") return true;
      if (activeFilter === "AI & ML") {
        return (
          project.tags.some((t) => /AI|Gemini|OpenAI|TTS|PyTorch/i.test(t)) ||
          project.slug.includes("bot") ||
          project.slug.includes("emotional")
        );
      }
      if (activeFilter === "Full-Stack") {
        return (
          project.tags.some((t) => /MERN|Node|Express|Next|MongoDB|Convex/i.test(t)) ||
          project.slug.includes("blog") ||
          project.slug.includes("kfm") ||
          project.slug.includes("saas")
        );
      }
      if (activeFilter === "Web & UI") {
        return (
          project.tags.some((t) => /React|Next|Vue|Tailwind|HTML|TypeScript/i.test(t))
        );
      }
      return true;
    });
  }, [activeFilter]);

  const displayedProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 5);

  const remainingCount = filteredProjects.length - displayedProjects.length;

  return (
    <div id="projects-section" className="w-full flex flex-col gap-4">
      {/* Header with Project Count & Filter Chips */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderGit2 className="h-4 w-4 text-[var(--accent)]" />
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
              Projects & Repositories
            </h2>
          </div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[var(--surface-2)] text-[var(--muted-foreground)]">
            {filteredProjects.length} Total
          </span>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {(["All", "AI & ML", "Full-Stack", "Web & UI"] as FilterType[]).map(
            (tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveFilter(tab);
                  setShowAll(false);
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all shrink-0 ${
                  activeFilter === tab
                    ? "bg-[var(--foreground)] text-[var(--background)] shadow-xs"
                    : "bg-[var(--surface-2)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface)] border border-[var(--border)]"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-3.5">
        {displayedProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {/* View More Button */}
      {remainingCount > 0 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="w-full py-2.5 px-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--surface-2)] text-xs font-semibold text-[var(--foreground)] transition-all flex items-center justify-center gap-1.5 shadow-xs"
        >
          <span>View more ({remainingCount})</span>
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      )}

      {showAll && filteredProjects.length > 5 && (
        <button
          onClick={() => setShowAll(false)}
          className="w-full py-2.5 px-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--surface-2)] text-xs font-semibold text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-all flex items-center justify-center gap-1.5"
        >
          <span>Show less</span>
          <ChevronUp className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
};
