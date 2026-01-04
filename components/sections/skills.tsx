import Image from "next/image";

import { skills } from "@/lib/constant";
import { Card, CardTools } from "../card";
import { capitalize } from "../../lib/utils";
import { MasonryGrid, SectionHeader } from "../shared/utils";

const SkillSection = () => {
  const mySkills = Object.keys(skills) as Array<keyof typeof skills>;

  return (
    <section className="w-full flex flex-col space-y-10 justify-center p-5 md:items-center md:justify-between md:flex-row">
      <section className="w-full flex flex-col space-y-7 md:w-[50%]">
        <SectionHeader title="skill" />

        <MasonryGrid className="columns-2 md:columns-3">
          {mySkills.map((skill, i) => {
            const data = skills[skill];

            return (
              <Card
                key={skill + i}
                cardData={data}
                className="flex-1 mb-5 break-inside-avoid"
              >
                <header className="p-2 text-white border-b border-b-secondary group-hover:border-b-primary">
                  {capitalize(skill)}
                </header>

                <CardTools />
              </Card>
            );
          })}
        </MasonryGrid>
      </section>

      <section className="w-full flex items-center justify-center md:w-[40%]">
        <SkillIllustrator />
      </section>
    </section>
  );
};

const SkillIllustrator = () => {
  return (
    <>
      <div className="w-full h-72 relative md:hidden ">
        <Image
          alt="grid dot"
          src={"/Dots.svg"}
          width={63}
          height={63}
          className="absolute top-10 left-0"
        />

        <Image
          alt="guy"
          src={"/Rectangle.svg"}
          width={84}
          height={84}
          className="absolute top-0 right-7"
        />

        <Image
          alt="grid dot"
          src={"/logo-outline2.png"}
          width={104}
          height={56}
          className="absolute bottom-0 left-2"
        />

        <Image
          alt="grid dot"
          src={"/Dots.svg"}
          width={63}
          height={63}
          className="absolute top-1/2 left-2/5"
        />

        <Image
          alt="guy"
          src={"/Rectangle.svg"}
          width={52}
          height={52}
          className="absolute right-0 bottom-10"
        />
      </div>
      <div className="hidden w-11/12 h-72 relative md:block">
        <Image
          alt="grid dot"
          src={"/Dots.svg"}
          width={63}
          height={63}
          className="absolute top-10 left-0"
        />

        <Image
          alt="guy"
          src={"/Rectangle.svg"}
          width={84}
          height={84}
          className="absolute top-0 right-7"
        />

        <Image
          alt="grid dot"
          src={"/logo-outline2.png"}
          width={104}
          height={56}
          className="absolute bottom-0 left-5"
        />

        <Image
          alt="grid dot"
          src={"/Dots.svg"}
          width={63}
          height={63}
          className="absolute top-1/2 left-2/5"
        />

        <Image
          alt="guy"
          src={"/Rectangle.svg"}
          width={52}
          height={52}
          className="absolute right-0 bottom-10"
        />
      </div>
    </>
  );
};

export default SkillSection;
