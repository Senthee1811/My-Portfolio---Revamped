"use client";

import React from "react";
import { Project } from "@/data/projects";
import { profileData } from "@/data/profile";
import { CheckCircle2, MessageSquare, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons/BrandIcons";

interface SectionsProps {
  project: Project;
}

export const Sections = ({ project }: SectionsProps) => {
  return (
    <div className="flex flex-col gap-8 my-6">
      {/* CTA Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-600/10 via-[var(--card)] to-indigo-600/10 border border-[var(--border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-[var(--foreground)]">
            Want a solution like this?
          </h3>
          <p className="text-xs text-[var(--muted-foreground)] mt-1 max-w-md">
            I build production-grade web applications, microservices, and AI integrations. Let&apos;s discuss your roadmap.
          </p>
        </div>

        <a
          href={profileData.contacts.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-full bg-[var(--foreground)] text-[var(--background)] text-xs font-bold hover:opacity-90 active:scale-95 transition-all flex items-center gap-1.5 shadow-sm shrink-0"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          <span>Get in touch</span>
        </a>
      </div>

      {/* What's Included */}
      {project.whatsIncluded && project.whatsIncluded.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
            What&apos;s Included
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {project.whatsIncluded.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex items-center gap-2.5 text-xs text-[var(--foreground)] font-medium"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* The Problem */}
      {project.problem && (
        <div className="space-y-2">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
            The Problem
          </h3>
          <div className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] text-xs sm:text-sm text-[var(--foreground)] leading-relaxed">
            {project.problem}
          </div>
        </div>
      )}

      {/* Under The Hood */}
      {project.underTheHood && project.underTheHood.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
            Under The Hood
          </h3>
          <div className="space-y-3">
            {project.underTheHood.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[var(--card)] border border-[var(--border)] space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="h-5 w-5 rounded-full bg-[var(--surface-2)] text-[var(--accent)] font-mono text-[10px] font-bold flex items-center justify-center">
                    0{idx + 1}
                  </span>
                  <h4 className="text-xs font-bold text-[var(--foreground)]">
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed pl-7">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Information Table */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
          Information
        </h3>
        <div className="p-5 rounded-2xl bg-[var(--card)] border border-[var(--border)] divide-y divide-[var(--border)] text-xs">
          <div className="py-2.5 flex items-center justify-between">
            <span className="text-[var(--muted-foreground)]">Developer</span>
            <span className="font-semibold text-[var(--foreground)]">Sentheepan Ellankovan</span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <span className="text-[var(--muted-foreground)]">Category</span>
            <span className="font-semibold text-[var(--foreground)]">{project.info.category}</span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <span className="text-[var(--muted-foreground)]">Platform</span>
            <span className="font-semibold text-[var(--foreground)]">{project.info.platform}</span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <span className="text-[var(--muted-foreground)]">Timeline</span>
            <span className="font-semibold text-[var(--foreground)]">{project.info.year}</span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <span className="text-[var(--muted-foreground)]">Role</span>
            <span className="font-semibold text-[var(--foreground)]">{project.info.role}</span>
          </div>

          {project.links.github && (
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-[var(--muted-foreground)]">Source Code</span>
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--accent)] hover:underline flex items-center gap-1"
              >
                <span>GitHub Repository</span>
                <GithubIcon className="h-3 w-3" />
              </a>
            </div>
          )}

          {project.links.live && (
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-[var(--muted-foreground)]">Live Site</span>
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--accent)] hover:underline flex items-center gap-1"
              >
                <span>{project.links.live.replace(/^https?:\/\//, "")}</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          )}

          <div className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-[var(--muted-foreground)]">Stack & Tools</span>
            <div className="flex flex-wrap gap-1.5 justify-end">
              {project.info.stack.map((item) => (
                <span
                  key={item}
                  className="px-2 py-0.5 rounded-md bg-[var(--surface-2)] text-[10px] font-medium text-[var(--foreground)] border border-[var(--border)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
