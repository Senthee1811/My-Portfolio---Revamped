"use client";

import React, { useState } from "react";
import { experiences, educations } from "@/data/experience";
import { Briefcase, GraduationCap, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

export const ExperienceList = () => {
  const [showEducation, setShowEducation] = useState(false);

  return (
    <div id="experience-section" className="w-full flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
          Experience & Education
        </h2>
        <span className="text-[11px] font-medium text-[var(--muted-foreground)]">
          {experiences.length} Positions
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] transition-all hover:border-[var(--muted-foreground)]/30 group"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] shrink-0">
                  <Briefcase className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--foreground)] leading-snug">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-1.5 flex-wrap text-xs text-[var(--muted-foreground)]">
                    <span className="font-medium text-[var(--foreground)]">{exp.company}</span>
                    <span>·</span>
                    <span>{exp.period}</span>
                  </div>
                </div>
              </div>

              {exp.isCurrent && (
                <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/20">
                  Now
                </span>
              )}
            </div>

            <ul className="mt-3 space-y-1.5 text-xs text-[var(--muted-foreground)] leading-relaxed list-disc list-inside">
              {exp.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>

            <div className="mt-3 flex items-center justify-between pt-2 border-t border-[var(--border)]/60">
              <div className="flex items-center gap-1.5 flex-wrap">
                {exp.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[var(--surface-2)] text-[var(--muted-foreground)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {exp.link && (
                <a
                  href={exp.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] font-medium text-[var(--accent)] hover:underline"
                >
                  <span>Visit</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        ))}

        {/* Expandable Education section */}
        {showEducation && (
          <div className="space-y-2.5 pt-1 animate-in fade-in duration-300">
            {educations.map((edu, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--card)]"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="h-8 w-8 rounded-xl bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center text-amber-500 shrink-0">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--foreground)] leading-snug">
                      {edu.degree}
                    </h3>
                    <p className="text-xs text-[var(--muted-foreground)]">
                      {edu.institution} · {edu.period}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] mt-2 leading-relaxed">
                  {edu.details}
                </p>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => setShowEducation(!showEducation)}
          className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[var(--surface)] hover:bg-[var(--surface-2)] border border-[var(--border)] text-xs font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-all"
        >
          <span>{showEducation ? "Hide Education" : "See Education Credentials"}</span>
          {showEducation ? (
            <ChevronUp className="h-3.5 w-3.5" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
    </div>
  );
};
