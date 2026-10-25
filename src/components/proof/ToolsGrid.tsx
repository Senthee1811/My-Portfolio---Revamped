"use client";

import React from "react";
import { toolCategories, totalToolsCount } from "@/data/tools";
import { Wrench, Code2, Globe, Database, CloudCog, Cpu } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  Languages: <Code2 className="h-4 w-4 text-amber-500" />,
  Frontend: <Globe className="h-4 w-4 text-blue-500" />,
  "Backend & Data": <Database className="h-4 w-4 text-emerald-500" />,
  "DevOps & Cloud": <CloudCog className="h-4 w-4 text-indigo-500" />,
  "AI & Machine Learning": <Cpu className="h-4 w-4 text-rose-500" />,
};

export const ToolsGrid = () => {
  return (
    <div id="tools-section" className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wrench className="h-4 w-4 text-[var(--accent)]" />
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
            Tools & Technologies
          </h2>
        </div>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[var(--surface-2)] text-[var(--muted-foreground)]">
          {totalToolsCount} Tools
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {toolCategories.map((cat) => (
          <div
            key={cat.name}
            className="p-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-xs transition-colors hover:border-[var(--muted-foreground)]/30"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {categoryIcons[cat.name] ?? <Code2 className="h-4 w-4" />}
                <h3 className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
                  {cat.name}
                </h3>
              </div>
              <span className="text-[10px] font-medium text-[var(--muted-foreground)]">
                {cat.tools.length}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {cat.tools.map((tool) => (
                <div
                  key={tool.name}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[var(--surface-2)] text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all cursor-default select-none shadow-2xs"
                >
                  {tool.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
