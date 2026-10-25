"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { projects } from "@/data/projects";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Trophy, Sparkles, ArrowRight } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";

export const FeaturedCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const prefersReduced = useReducedMotion();

  // Combine featured projects + 1 award card
  const featuredProjects = projects.filter((p) => p.isFeatured);
  const totalSlides = featuredProjects.length + 1; // 1 for Hackathon award spotlight

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Autoplay 5s paused on hover
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    if (!emblaApi || prefersReduced || isHovered) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi, prefersReduced, isHovered]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <div
      id="featured-carousel-section"
      className="w-full flex flex-col gap-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-500" />
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--muted-foreground)]">
            Featured
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[var(--muted-foreground)] tabular-nums">
            {selectedIndex + 1} / {totalSlides}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={scrollPrev}
              aria-label="Previous slide"
              className="p-1 rounded-full bg-[var(--surface-2)] hover:bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] transition-all"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={scrollNext}
              aria-label="Next slide"
              className="p-1 rounded-full bg-[var(--surface-2)] hover:bg-[var(--surface)] text-[var(--foreground)] border border-[var(--border)] transition-all"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Embla Carousel Viewport */}
      <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {/* Slide 1: Hackathon Spotlight Card */}
          <div className="flex-[0_0_100%] min-w-0 px-1">
            <div className="relative p-6 sm:p-7 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/15 via-[var(--card)] to-[var(--surface-2)] overflow-hidden shadow-md flex flex-col justify-between min-h-[220px]">
              <div className="flex items-start justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  <Trophy className="h-3.5 w-3.5" />
                  Hackathon Award
                </span>
                <span className="text-xs font-mono text-[var(--muted-foreground)]">2025</span>
              </div>

              <div className="my-3">
                <h3 className="text-lg sm:text-xl font-bold text-[var(--foreground)] tracking-tight">
                  3rd Place — Convex Track
                </h3>
                <p className="text-xs sm:text-sm font-medium text-amber-600 dark:text-amber-400 mt-0.5">
                  Cursor 24-Hour Global Buildathon
                </p>
                <p className="text-xs text-[var(--muted-foreground)] mt-2 line-clamp-2 leading-relaxed">
                  Conceived, developed, and deployed MatchMyStuff in 24 hours, integrating OpenAI vector embeddings and reactive Convex database pipelines.
                </p>
              </div>

              <Link
                href="/projects/match-my-stuff"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] hover:underline"
              >
                <span>Explore MatchMyStuff</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Featured Project Slides */}
          {featuredProjects.map((project) => (
            <div key={project.slug} className="flex-[0_0_100%] min-w-0 px-1">
              <div className="relative p-6 sm:p-7 rounded-3xl border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-md flex flex-col justify-between min-h-[220px] transition-all hover:border-[var(--muted-foreground)]/30">
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-[var(--surface-2)] text-[var(--foreground)] border border-[var(--border)]">
                    {project.info.category}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/20">
                    {project.status || "Live"}
                  </span>
                </div>

                <div className="my-3">
                  <h3 className="text-lg sm:text-xl font-bold text-[var(--foreground)] tracking-tight">
                    {project.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-[var(--accent)] mt-0.5">
                    {project.subtitle}
                  </p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-2 line-clamp-2 leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]/60">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[var(--surface-2)] text-[var(--muted-foreground)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent)] hover:underline"
                  >
                    <span>View Project</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
