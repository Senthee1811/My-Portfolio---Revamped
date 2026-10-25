"use client";

import React, { useState, useEffect } from "react";
import { Column } from "./Column";
import { DotGrid } from "./DotGrid";
import { QuickActions } from "./QuickActions";
import { Splash } from "@/components/intro/Splash";
import { TourCursor } from "@/components/intro/TourCursor";

// Column 1 Profile Components
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { Highlights } from "@/components/profile/Highlights";
import { ExperienceList } from "@/components/profile/ExperienceList";
import { Achievements } from "@/components/profile/Achievements";
import { AvailabilityCard } from "@/components/profile/AvailabilityCard";

// Column 2 Work Components
import { FeaturedCarousel } from "@/components/work/FeaturedCarousel";
import { ProjectList } from "@/components/work/ProjectList";

// Column 3 Proof Components
import { GithubGraph } from "@/components/proof/GithubGraph";
import { ToolsGrid } from "@/components/proof/ToolsGrid";

export const AppShell = () => {
  const [splashFinished, setSplashFinished] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);

  // Check tour completion after splash
  useEffect(() => {
    if (splashFinished) {
      try {
        const completed = localStorage.getItem("senthee_tour_completed");
        if (completed !== "true") {
          // Auto-trigger tour on first visit
          const timer = setTimeout(() => setTourOpen(true), 600);
          return () => clearTimeout(timer);
        }
      } catch {
        // ignore
      }
    }
  }, [splashFinished]);

  return (
    <div className="relative min-h-screen w-full bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent)] selection:text-white">
      {/* Background Animated Dot Grid */}
      <DotGrid />

      {/* iOS Splash Screen */}
      <Splash onComplete={() => setSplashFinished(true)} />

      {/* Guided Figma-style Tour */}
      <TourCursor isOpen={tourOpen} onClose={() => setTourOpen(false)} />

      {/* Main 3-Column Desktop Grid / Stacked Mobile Layout */}
      <main className="relative z-10 mx-auto w-full max-w-[1440px] grid grid-cols-1 lg:grid-cols-[412px_1fr_412px] min-h-screen">
        {/* Column 1: Profile (Instagram-header style) */}
        <Column
          id="column-profile"
          className="p-5 sm:p-7 space-y-7"
          borderRight={true}
        >
          <ProfileHeader />
          <Highlights />
          <ExperienceList />
          <Achievements />
          <AvailabilityCard />
        </Column>

        {/* Column 2: Work (Featured Carousel + Project Catalog) */}
        <Column
          id="column-work"
          className="p-5 sm:p-7 space-y-7"
          borderRight={true}
        >
          <FeaturedCarousel />
          <ProjectList />
        </Column>

        {/* Column 3: Proof (GitHub Contributions + Tools & Tech) */}
        <Column id="column-proof" className="p-5 sm:p-7 space-y-7" borderRight={false}>
          <GithubGraph />
          <ToolsGrid />
        </Column>
      </main>

      {/* Fixed Quick Actions Bottom Bar */}
      <QuickActions onRestartTour={() => setTourOpen(true)} />
    </div>
  );
};
