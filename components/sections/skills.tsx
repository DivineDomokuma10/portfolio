import { skills } from "@/lib/constant";
import { Card, CardImage, CardTools } from "../card";
import { capitalize } from "../../lib/utils";
import { SectionHeader } from "../shared/utils";
import { MasonryGrid } from "../mansory";

const SkillSection = () => {
  const mySkills = Object.keys(skills) as Array<keyof typeof skills>;

  return (
    <section className="w-full flex flex-col space-y-10 justify-center p-5 md:items-center md:justify-between md:flex-row">
      <section className="w-full flex flex-col space-y-3 md:w-[50%]">
        <SectionHeader title="skill" />

        {/* <div className="w-full grid grid-cols-3 gap-2"> */}
        <MasonryGrid>
          {mySkills.map((skill, i) => {
            const data = skills[skill];

            return (
              <Card
                key={skill + i}
                cardData={data}
                className="flex-1 break-inside-avoid"
              >
                <header className="p-2 text-white border-b border-b-secondary group-hover:border-b-primary">
                  {capitalize(skill)}
                </header>

                <CardTools />
              </Card>
            );
          })}
        </MasonryGrid>
        {/* </div> */}
      </section>

      <section className="w-full h-fit flex items-center justify-center md:w-[40%]">
        <div />
      </section>
    </section>
  );
};

export default SkillSection;
