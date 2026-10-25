"use client";

import React, { useState } from "react";
import { profileData } from "@/data/profile";
import {
  FileText,
  Mail,
  ChevronDown,
  ChevronUp,
  Navigation,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";

interface QuickActionsProps {
  onRestartTour?: () => void;
}

export const QuickActions = ({ onRestartTour }: QuickActionsProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      aria-label="Quick Actions"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1.5 transition-all duration-300"
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        aria-label={collapsed ? "Show quick actions" : "Hide quick actions"}
        className="flex items-center gap-1 text-[11px] font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] px-2.5 py-0.5 rounded-full bg-[var(--surface)]/80 backdrop-blur-md border border-[var(--border)] transition-all shadow-xs"
      >
        <span>{collapsed ? "Show quick actions" : "Hide quick actions"}</span>
        {collapsed ? (
          <ChevronUp className="h-3 w-3" />
        ) : (
          <ChevronDown className="h-3 w-3" />
        )}
      </button>

      {!collapsed && (
        <div
          id="quick-actions-bar"
          className="flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-full bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--border)] shadow-xl transition-all"
        >
          {onRestartTour && (
            <button
              onClick={onRestartTour}
              aria-label="Take guided tour"
              title="Take guided tour"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-[var(--accent)] text-white hover:opacity-90 active:scale-95 transition-all shadow-xs"
            >
              <Navigation className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Tour</span>
            </button>
          )}

          <a
            href={profileData.contacts.cvPath}
            download
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-[var(--surface)] hover:bg-[var(--surface-2)] text-[var(--foreground)] border border-[var(--border)] transition-all active:scale-95"
          >
            <FileText className="h-3.5 w-3.5 text-blue-500" />
            <span>CV</span>
          </a>

          <a
            href={profileData.contacts.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-[var(--surface)] hover:bg-[var(--surface-2)] text-[var(--foreground)] border border-[var(--border)] transition-all active:scale-95"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          <a
            href={profileData.contacts.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-[var(--surface)] hover:bg-[var(--surface-2)] text-[var(--foreground)] border border-[var(--border)] transition-all active:scale-95"
          >
            <LinkedinIcon className="h-3.5 w-3.5 text-[#0077b5]" />
            <span className="hidden sm:inline">LinkedIn</span>
          </a>

          <a
            href={`mailto:${profileData.contacts.email}`}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-[var(--surface)] hover:bg-[var(--surface-2)] text-[var(--foreground)] border border-[var(--border)] transition-all active:scale-95"
          >
            <Mail className="h-3.5 w-3.5 text-red-500" />
            <span className="hidden sm:inline">Email</span>
          </a>
        </div>
      )}
    </aside>
  );
};
