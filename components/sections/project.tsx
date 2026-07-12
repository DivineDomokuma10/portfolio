import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { projects } from "@/lib/constant";
import { Card, CardButton, CardImage, CardTools } from "../card";
import { MasonryGrid, SectionHeader } from "../shared/utils";

const Project = () => {
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

      <MasonryGrid className="columns-1 md:columns-3">
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
      </MasonryGrid>

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
