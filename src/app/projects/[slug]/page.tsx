import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { projects } from "@/data/projects";
import { ProjectHeader } from "@/components/project/ProjectHeader";
import { InfoStrip } from "@/components/project/InfoStrip";
import { Gallery } from "@/components/project/Gallery";
import { Sections } from "@/components/project/Sections";
import { MoreProjects } from "@/components/project/MoreProjects";
import { DotGrid } from "@/components/shell/DotGrid";
import { QuickActions } from "@/components/shell/QuickActions";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | Sentheepan Ellankovan",
    };
  }

  return {
    title: `${project.name} | Sentheepan Ellankovan`,
    description: project.summary,
    openGraph: {
      title: `${project.name} — ${project.subtitle}`,
      description: project.summary,
      type: "website",
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="relative min-h-screen w-full bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent)] selection:text-white">
      <DotGrid />

      <main className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pb-32">
        <ProjectHeader project={project} />
        <InfoStrip project={project} />
        <Gallery project={project} />
        <Sections project={project} />
        <MoreProjects currentSlug={project.slug} />
      </main>

      <QuickActions />
    </div>
  );
}
