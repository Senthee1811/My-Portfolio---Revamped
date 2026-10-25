"use client";

import React from "react";
import Image from "next/image";
import { Project } from "@/data/projects";
import { TelegramSim } from "@/components/media/TelegramSim";
import { BrowserFrame } from "@/components/media/BrowserFrame";
import { PhoneFrame } from "@/components/media/PhoneFrame";

interface GalleryProps {
  project: Project;
}

export const Gallery = ({ project }: GalleryProps) => {
  if (project.showcase === "telegram-sim") {
    return (
      <div className="w-full flex flex-col items-center py-4">
        <div className="text-center mb-4">
          <span className="text-xs uppercase tracking-widest font-semibold text-[var(--muted-foreground)]">
            Interactive Showcase · Simulated Bot Demo
          </span>
        </div>
        <TelegramSim embeddedInPhone={true} />
      </div>
    );
  }

  if (project.showcase === "video" && project.videoUrl) {
    return (
      <div className="w-full flex flex-col gap-2 py-4">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs uppercase tracking-widest font-semibold text-[var(--muted-foreground)]">
            Preview Media · Video Walkthrough
          </span>
        </div>
        <BrowserFrame url={project.links.live || "https://studiokfm.com"}>
          <video
            src={project.videoUrl}
            controls
            playsInline
            className="w-full max-h-[540px] object-cover bg-black"
          />
        </BrowserFrame>
      </div>
    );
  }

  if (project.screenshots && project.screenshots.length > 0) {
    const desktopShots = project.screenshots.filter((s) => s.includes("desktop"));
    const mobileShots = project.screenshots.filter((s) => s.includes("mobile"));

    return (
      <div className="w-full flex flex-col gap-4 py-4">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs uppercase tracking-widest font-semibold text-[var(--muted-foreground)]">
            App Store Preview · Desktop & Mobile
          </span>
          <span className="text-xs text-[var(--muted-foreground)]">
            Scroll horizontally →
          </span>
        </div>

        <div className="flex items-start gap-4 overflow-x-auto no-scrollbar pb-3 snap-x snap-mandatory">
          {/* Desktop Shots */}
          {desktopShots.map((shot, idx) => (
            <div
              key={idx}
              className="snap-center shrink-0 w-[85vw] sm:w-[620px] max-w-full"
            >
              <BrowserFrame url={project.links.live || "https://quick-blog-flame.vercel.app"}>
                <div className="relative aspect-[16/10] w-full bg-[var(--surface-2)]">
                  <Image
                    src={shot}
                    alt={`${project.name} Desktop Preview ${idx + 1}`}
                    fill
                    sizes="(max-width: 640px) 85vw, 620px"
                    className="object-cover object-top"
                  />
                </div>
              </BrowserFrame>
            </div>
          ))}

          {/* Mobile Shots */}
          {mobileShots.map((shot, idx) => (
            <div
              key={`m-${idx}`}
              className="snap-center shrink-0 w-[240px] sm:w-[260px]"
            >
              <PhoneFrame time="14:30">
                <div className="relative w-full h-full bg-[var(--surface-2)]">
                  <Image
                    src={shot}
                    alt={`${project.name} Mobile Preview ${idx + 1}`}
                    fill
                    sizes="260px"
                    className="object-cover object-top"
                  />
                </div>
              </PhoneFrame>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
