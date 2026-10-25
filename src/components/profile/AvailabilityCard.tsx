"use client";

import React from "react";
import { ColomboClock } from "./ColomboClock";
import { profileData } from "@/data/profile";
import { FileDown, MessageCircle } from "lucide-react";

export const AvailabilityCard = () => {
  return (
    <div
      id="availability-card"
      className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] transition-all hover:border-[var(--muted-foreground)]/30 shadow-xs"
    >
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-500">
            Available for Projects
          </span>
        </div>
        <ColomboClock />
      </div>

      <p className="text-sm text-[var(--foreground)] font-medium mb-1">
        Open to junior software engineering roles and freelance projects.
      </p>
      <p className="text-xs text-[var(--muted-foreground)] mb-4">
        Usually replies within a day · Colombo, Sri Lanka (UTC+05:30)
      </p>

      <div className="flex items-center gap-2">
        <a
          href={profileData.contacts.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-3.5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all active:scale-95 shadow-sm"
        >
          <MessageCircle className="h-3.5 w-3.5" />
          <span>Chat on WhatsApp</span>
        </a>

        <a
          href={profileData.contacts.cvPath}
          download
          className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-[var(--surface-2)] hover:bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] text-xs font-medium transition-all active:scale-95"
        >
          <FileDown className="h-3.5 w-3.5 text-blue-500" />
          <span>Download CV</span>
        </a>
      </div>
    </div>
  );
};
