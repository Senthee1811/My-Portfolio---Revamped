"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Project } from "@/data/projects";
import {
  ArrowLeft,
  Share2,
  ExternalLink,
  Check,
  FileText,
  TrendingUp,
  Compass,
  HeartPulse,
  Camera,
  GraduationCap,
  Bot,
  Plane,
  ShoppingBag,
} from "lucide-react";

import { GithubIcon } from "@/components/icons/BrandIcons";

const projectIcons: Record<string, React.ReactNode> = {
  FileText: <FileText className="h-7 w-7 text-blue-500" />,
  TrendingUp: <TrendingUp className="h-7 w-7 text-emerald-500" />,
  Compass: <Compass className="h-7 w-7 text-amber-500" />,
  HeartPulse: <HeartPulse className="h-7 w-7 text-rose-500" />,
  Camera: <Camera className="h-7 w-7 text-purple-500" />,
  GraduationCap: <GraduationCap className="h-7 w-7 text-indigo-500" />,
  Bot: <Bot className="h-7 w-7 text-cyan-500" />,
  Plane: <Plane className="h-7 w-7 text-sky-500" />,
  ShoppingBag: <ShoppingBag className="h-7 w-7 text-emerald-600" />,
};

interface ProjectHeaderProps {
  project: Project;
}

export const ProjectHeader = ({ project }: ProjectHeaderProps) => {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: project.name,
        text: project.subtitle,
        url: window.location.href,
      }).catch(() => {});
    } else if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const primaryLink = project.links.live || project.links.github;

  return (
    <div className="flex flex-col gap-5">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] hover:opacity-80 transition-opacity"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Projects</span>
        </Link>

        <button
          onClick={handleShare}
          aria-label="Share project"
          className="p-2 rounded-full bg-[var(--surface-2)] hover:bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] transition-all active:scale-95 flex items-center gap-1 text-xs font-medium"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Share2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Share</span>
            </>
          )}
        </button>
      </div>

      {/* Hero Header Strip */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-[22%] bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center shrink-0 shadow-md">
            {projectIcons[project.icon] ?? <Compass className="h-8 w-8 text-blue-500" />}
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
              {project.name}
            </h1>
            <p className="text-sm font-medium text-[var(--muted-foreground)] mt-0.5">
              {project.subtitle}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/20">
                {project.status || "Live"}
              </span>
              <span className="text-xs text-[var(--muted-foreground)]">
                {project.info.year} · {project.info.category}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {primaryLink && (
          <a
            href={primaryLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[var(--accent)] hover:opacity-90 active:scale-95 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            {project.links.live ? (
              <>
                <span>Open Live</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </>
            ) : (
              <>
                <GithubIcon className="h-3.5 w-3.5" />
                <span>View on GitHub</span>
              </>
            )}
          </a>
        )}
      </div>
    </div>
  );
};
