import type { Metadata } from "next";

import { projects } from "@/lib/constant";
import { siteConfig } from "@/lib/metadata";

import { PageHeader, SectionHeader } from "@/components/shared/utils";
import { PageTransition } from "@/components/shared/page-transition";
import { Card, CardButton, CardImage, CardTools } from "@/components/card";
import { StaggerGroup, StaggerItem } from "@/components/animations/stagger";

export const metadata: Metadata = {
  title: "Works",
  description: `Browse projects built by ${siteConfig.name} — web applications built with React, Next.js, TypeScript, and modern tools.`,
  openGraph: {
    title: `Works | ${siteConfig.name}`,
    description: `Portfolio projects by ${siteConfig.name}.`,
    url: `${siteConfig.url}/works`,
  },
  alternates: { canonical: `${siteConfig.url}/works` },
};

export default function WorksPage() {
  return (
    <PageTransition className="w-full h-fit flex flex-col p-5 space-y-10 md:w-5/6">
      <PageHeader desc="List of my projects" title="projects" />

      <section className="w-full flex flex-col space-y-7">
        <div className="md:w-8/12">
          <SectionHeader title="web apps" />
        </div>

        <StaggerGroup
          direction="up"
          staggerDelay={0.5}
          className="w-full columns-1 md:columns-3"
        >
          {projects.map((project, i) => (
            <StaggerItem
              key={project.textInfo?.title}
              index={i * 0.2233}
              className="mb-5 break-inside-avoid"
            >
              <Card cardData={project} className="mb-5 break-inside-avoid">
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
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="w-full flex flex-col space-y-7">
        <div className="md:w-8/12">
          <SectionHeader title="mobile apps" />
        </div>

        <StaggerGroup
          direction="up"
          staggerDelay={0.5}
          className="w-full columns-1 md:columns-3"
        >
          {projects.map((project, i) => (
            <StaggerItem
              key={project.textInfo?.title}
              index={i}
              className="mb-5 break-inside-avoid"
            >
              <Card cardData={project} className="mb-5 break-inside-avoid">
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
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>
    </PageTransition>
  );
}
