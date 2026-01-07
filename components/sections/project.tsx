import { ArrowRight } from "lucide-react";

import { projects } from "@/lib/constant";
import { MasonryGrid, SectionHeader } from "../shared/utils";
import { Card, CardButton, CardImage, CardTools } from "../card";
import Link from "next/link";

const Project = () => {
  return (
    <section className="w-full flex flex-col space-y-7 justify-center p-5">
      <div className="w-full flex items-center justify-between sm:space-x-5">
        <div className="w-full md:w-1/2">
          <SectionHeader title="projects" />
        </div>

        <Link
          href="/works"
          className="hidden text-sm text-white items-center space-x-2.5 sm:flex hover:text-primary"
        >
          <span className="">See More</span>
          <ArrowRight />
        </Link>
      </div>

      <MasonryGrid className="columns-1 md:columns-3">
        {projects.map((prj, i) => (
          <Card
            key={i}
            cardData={prj}
            className="flex-1 mb-5 break-inside-avoid"
          >
            <CardImage className="w-full h-52" />

            <CardTools className=" border-y-2 border-secondary group-hover:border-primary" />

            <div className="flex flex-col space-y-3.5 p-3">
              <h3 className="text-white text-lg">
                {prj.textInfo?.title || "No Title"}{" "}
              </h3>

              <p className="text-secondary text-xs">
                {prj.textInfo?.desc || "No Description"}
              </p>

              <div className="flex items-center w-full justify-between">
                <CardButton variant="live" />
                <CardButton variant="github" />
              </div>
            </div>
          </Card>
        ))}
      </MasonryGrid>

      <Link
        href="/works"
        className="w-fit py-2 px-3 flex items-center space-x-3 border text-xs border-primary text-white md:hidden"
      >
        <p>Read More</p>
        <ArrowRight />
      </Link>
    </section>
  );
};

export default Project;
