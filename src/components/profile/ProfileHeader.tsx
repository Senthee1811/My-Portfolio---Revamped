"use client";

import React from "react";
import Image from "next/image";
import { profileData } from "@/data/profile";
import { ThemeToggle } from "@/components/shell/ThemeToggle";
import { MessageSquare, Plus } from "lucide-react";

export const ProfileHeader = () => {
  return (
    <div id="profile-header" className="relative flex flex-col items-start gap-4">
      {/* Top action row: Theme toggle */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[var(--surface-2)] text-[var(--muted-foreground)] border border-[var(--border)]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active
          </span>
        </div>
        <ThemeToggle />
      </div>

      {/* Avatar and bio row */}
      <div className="flex items-center gap-4 sm:gap-5 w-full">
        <div
          id="profile-avatar"
          className="relative group shrink-0"
        >
          <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-full p-[2.5px] bg-gradient-to-tr from-amber-500 via-pink-500 to-indigo-500 shadow-md">
            <div className="relative h-full w-full rounded-full overflow-hidden bg-[var(--surface)] border-2 border-[var(--background)]">
              <Image
                src={profileData.avatarUrl}
                alt={profileData.fullName}
                fill
                priority
                sizes="(max-width: 640px) 80px, 96px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  // Fallback to github remote avatar
                  const target = e.target as HTMLImageElement;
                  if (target.src !== profileData.remoteAvatarUrl) {
                    target.src = profileData.remoteAvatarUrl;
                  }
                }}
              />
            </div>
          </div>
          <span
            className="absolute bottom-0.5 right-0.5 h-4 w-4 rounded-full bg-emerald-500 border-2 border-[var(--background)] shadow-xs"
            title="Online / Available"
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
              {profileData.displayName}
            </h1>
            <span className="text-xs text-[var(--muted-foreground)] font-medium">
              @{profileData.githubHandle}
            </span>
          </div>

          <h2 className="text-sm font-semibold text-[var(--foreground)] mt-0.5">
            {profileData.role}
          </h2>

          <p className="text-xs text-[var(--muted-foreground)] line-clamp-2 mt-1 leading-relaxed">
            {profileData.shortBio}
          </p>
        </div>
      </div>

      {/* Action buttons: Follow + Message */}
      <div className="flex items-center gap-2.5 w-full mt-1">
        <a
          href={profileData.contacts.github}
          target="_blank"
          rel="noopener noreferrer"
          id="btn-follow-github"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-4 rounded-full bg-[var(--accent)] hover:opacity-90 active:scale-[0.98] text-white text-xs font-semibold shadow-xs transition-all"
        >
          <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
          <span>Follow on GitHub</span>
        </a>

        <a
          href={profileData.contacts.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          id="btn-message-whatsapp"
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-4 rounded-full bg-[var(--surface-2)] hover:bg-[var(--surface)] active:scale-[0.98] text-[var(--foreground)] border border-[var(--border)] text-xs font-semibold shadow-xs transition-all"
        >
          <MessageSquare className="h-3.5 w-3.5 text-emerald-500" />
          <span>Message</span>
        </a>
      </div>
    </div>
  );
};
