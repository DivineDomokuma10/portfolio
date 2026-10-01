"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { IProjectCard } from "@/interfaces";
import { Card, CardButton, CardImage, CardTools } from "../card";
import { SectionHeader } from "../shared/utils";
import { StaggerGroup, WaveStaggerItem } from "../animations/stagger";

interface ProjectSectionProps {
  projects: IProjectCard[];
}

const Project = ({ projects }: ProjectSectionProps) => {
  if (projects.length === 0) {
    return (
      <section className="w-full space-y-7 p-7">
        <header className="flex items-center justify-between gap-5">
          <div className="w-full md:w-1/2">
            <SectionHeader title="projects" />
          </div>
        </header>
        <p className="text-secondary text-sm">Nothing here yet.</p>
      </section>
    );
  }

  return (
    <section className="w-full space-y-7 p-7">
      <header className="flex items-center justify-between gap-5">
        <div className="w-full md:w-1/2">
          <SectionHeader title="projects" />
        </div>

        <Link
          href="/works"
          className="hidden items-center gap-2.5 text-sm text-white transition-colors hover:text-primary md:flex"
        >
          <span>See More</span>
          <ArrowRight size={18} />
        </Link>
      </header>

      <StaggerGroup
        direction="up"
        staggerDelay={0.15}
        className="w-full columns-1 md:columns-3"
      >
        {projects.map((project, i) => (
          <WaveStaggerItem
            key={project.id}
            index={i}
            directions={["left", "down", "right"]}
            className="mb-5 break-inside-avoid"
          >
            <Card cardData={project}>
              <CardImage className="h-52 w-full" />

              <CardTools className="border-y-2 border-secondary transition-colors group-hover:border-primary" />

              <div className="space-y-3.5 p-3">
                <h3 className="text-lg text-white">
                  {project.textInfo?.title ?? "Untitled Project"}
                </h3>

                <p className="text-secondary text-xs">
                  {project.textInfo?.desc ?? "No description available."}
                </p>

                <div className="flex items-center justify-between">
                  <CardButton variant="live" />
                  <CardButton variant="github" />
                </div>
              </div>
            </Card>
          </WaveStaggerItem>
        ))}
      </StaggerGroup>

      <Link
        href="/works"
        className="border-primary flex w-fit items-center gap-3 border px-3 py-2 text-xs text-white transition-colors hover:bg-primary hover:text-background md:hidden"
      >
        <span>See More</span>
        <ArrowRight size={16} />
      </Link>
    </section>
  );
};

export default Project;