"use client";
import Image from "next/image";

import { capitalize } from "@/lib/utils";
import type { ISkillCategory } from "@/interfaces";

import { Card, CardTools } from "../card";
import { Float } from "../animations/float";
import { SectionHeader } from "../shared/utils";
import { StaggerGroup, StaggerItem } from "../animations/stagger";

interface SkillSectionProps {
  categories: ISkillCategory[];
}

const SkillSection = ({ categories }: SkillSectionProps) => {
  if (categories.length === 0) {
    return (
      <section className="flex w-full flex-col justify-center gap-10 p-7">
        <SectionHeader title="skill" />
        <p className="text-secondary text-sm">Nothing here yet.</p>
      </section>
    );
  }

  return (
    <section className="flex w-full flex-col justify-center gap-10 p-7 md:flex-row md:items-center md:justify-between">
      <div className="w-full space-y-7 md:w-[50%]">
        <SectionHeader title="skill" />

        <StaggerGroup
          direction="up"
          staggerDelay={0.15}
          className="columns-2 md:columns-3"
          margin="-50px"
        >
          {categories.map((category, i) => (
            <StaggerItem
              key={category.id}
              index={i}
              className="mb-5 break-inside-avoid"
            >
              <Card
                cardData={{
                  techs: category.techs,
                  img: category.imageUrl ?? undefined,
                }}
              >
                <header className="border-b border-b-secondary p-2 text-white transition-colors group-hover:border-b-primary">
                  {capitalize(category.name)}
                </header>

                <CardTools />
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      <div className="hidden w-full justify-center sm:flex md:w-[40%]">
        <SkillIllustration />
      </div>
    </section>
  );
};

const SkillIllustration = () => {
  return (
    <div className="relative h-72 w-full md:w-11/12">
      <Float speed="normal" className="absolute top-10 left-0">
        <Image src="/Dots.svg" alt="" aria-hidden="true" width={63} height={63} />
      </Float>

      <Float speed="slow" className="absolute top-0 right-7">
        <Image src="/Rectangle.svg" alt="" aria-hidden="true" width={84} height={84} />
      </Float>

      <Float speed="reverse" className="absolute bottom-0 left-2 md:left-5">
        <Image
          src="/logo-outline2.png"
          alt=""
          aria-hidden="true"
          width={104}
          height={56}
        />
      </Float>

      <Float speed="spin" className="absolute top-1/2 left-2/5">
        <Image src="/Dots.svg" alt="" aria-hidden="true" width={63} height={63} />
      </Float>

      <Float speed="normal" className="absolute right-0 bottom-10">
        <Image src="/Rectangle.svg" alt="" aria-hidden="true" width={52} height={52} />
      </Float>
    </div>
  );
};

export default SkillSection;
