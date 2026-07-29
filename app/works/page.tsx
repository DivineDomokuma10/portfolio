import type { Metadata } from "next";
import { siteConfig } from "@/lib/metadata";
import { projects } from "@/lib/constant";
import { Card, CardButton, CardImage, CardTools } from "@/components/card";
import { SectionHeader } from "@/components/shared/utils";

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
    <section className="w-full space-y-7 p-7">
      <SectionHeader title="works" />

      <div className="w-full columns-1 md:columns-3">
        {projects.map((project) => (
          <Card
            key={project.textInfo?.title}
            cardData={project}
            className="mb-5 break-inside-avoid"
          >
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
        ))}
      </div>
    </section>
  );
}