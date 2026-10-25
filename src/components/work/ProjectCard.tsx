"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Project } from "@/data/projects";
import {
  FileText,
  TrendingUp,
  Compass,
  HeartPulse,
  Camera,
  GraduationCap,
  Bot,
  Plane,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { gsap } from "@/lib/gsap";

const projectIcons: Record<string, React.ReactNode> = {
  FileText: <FileText className="h-5 w-5 text-blue-500" />,
  TrendingUp: <TrendingUp className="h-5 w-5 text-emerald-500" />,
  Compass: <Compass className="h-5 w-5 text-amber-500" />,
  HeartPulse: <HeartPulse className="h-5 w-5 text-rose-500" />,
  Camera: <Camera className="h-5 w-5 text-purple-500" />,
  GraduationCap: <GraduationCap className="h-5 w-5 text-indigo-500" />,
  Bot: <Bot className="h-5 w-5 text-cyan-500" />,
  Plane: <Plane className="h-5 w-5 text-sky-500" />,
  ShoppingBag: <ShoppingBag className="h-5 w-5 text-emerald-600" />,
};

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, { y: -2, duration: 0.2, ease: "power2.out" });
    }
    if (iconRef.current) {
      gsap.to(iconRef.current, { scale: 1.06, duration: 0.2, ease: "power2.out" });
    }
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      gsap.to(cardRef.current, { y: 0, duration: 0.2, ease: "power2.out" });
    }
    if (iconRef.current) {
      gsap.to(iconRef.current, { scale: 1, duration: 0.2, ease: "power2.out" });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] transition-colors hover:border-[var(--muted-foreground)]/30 shadow-xs flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div
              ref={iconRef}
              className="h-11 w-11 rounded-2xl bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center shrink-0 shadow-xs transition-transform"
            >
              {projectIcons[project.icon] ?? <Compass className="h-5 w-5 text-blue-500" />}
            </div>
            <div>
              <Link
                href={`/projects/${project.slug}`}
                className="text-sm sm:text-base font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors flex items-center gap-1"
              >
                <span>{project.name}</span>
                <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <p className="text-xs text-[var(--muted-foreground)] line-clamp-1 font-medium">
                {project.subtitle}
              </p>
            </div>
          </div>

          <span
            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
              project.status === "Live"
                ? "bg-emerald-500/15 text-emerald-500 border-emerald-500/20"
                : "bg-blue-500/15 text-blue-500 border-blue-500/20"
            }`}
          >
            {project.status || "Open"}
          </span>
        </div>

        {/* 3-line description */}
        <p className="text-xs text-[var(--muted-foreground)] line-clamp-3 leading-relaxed mb-4">
          {project.summary}
        </p>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]/60">
        <div className="flex items-center gap-1.5 flex-wrap">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[var(--surface-2)] text-[var(--muted-foreground)]"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-[10px] text-[var(--muted-foreground)]">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {project.links.live && (
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open live site for ${project.name}`}
              className="p-1 rounded-full text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--surface-2)] transition-colors"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          <Link
            href={`/projects/${project.slug}`}
            className="text-xs font-semibold text-[var(--accent)] hover:underline"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};
