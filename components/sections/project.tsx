import { ArrowRight } from "lucide-react";

import { projects } from "@/lib/constant";
import { MasonryGrid, SectionHeader } from "../shared/utils";
import { Card, CardButton, CardImage, CardTools } from "../card";

const Project = () => {
  return (
    <section className="w-full flex flex-col space-y-10 justify-center p-5 ">
      <div className="w-full flex items-center justify-between space-x-5">
        <div className="md:w-8/12">
          <SectionHeader title="projects" />
        </div>

        <p className=" text-sm text-white flex items-center space-x-2.5">
          <span>See More</span>
          <ArrowRight />
        </p>
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
    </section>
  );
};

export default Project;
