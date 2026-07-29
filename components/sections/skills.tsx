"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";

import { skills } from "@/lib/constant";
import { capitalize } from "@/lib/utils";
import { Card, CardTools } from "../card";
import { MasonryGrid, SectionHeader } from "../shared/utils";

const SkillSection = () => {
  const mySkills = Object.keys(skills) as Array<keyof typeof skills>;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      ref={ref}
      className="flex w-full flex-col justify-center gap-10 p-7 md:flex-row md:items-center md:justify-between"
    >
      <div className="w-full space-y-7 md:w-[50%]">
        <SectionHeader title="skill" />

        <MasonryGrid className="columns-2 md:columns-3">
          {mySkills.map((skill, i) => (
            <motion.div
              key={skill}
              initial={{ y: -80, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 18,
                delay: i * 0.15,
              }}
              className="mb-5 break-inside-avoid"
            >
              <Card cardData={skills[skill]}>
                <header className="border-b border-b-secondary p-2 text-white transition-colors group-hover:border-b-primary">
                  {capitalize(skill)}
                </header>

                <CardTools />
              </Card>
            </motion.div>
          ))}
        </MasonryGrid>
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
      <Image
        src="/Dots.svg"
        alt=""
        aria-hidden
        width={63}
        height={63}
        className="animate-float absolute top-10 left-0"
      />

      <Image
        src="/Rectangle.svg"
        alt=""
        aria-hidden
        width={84}
        height={84}
        className="animate-float-slow absolute top-0 right-7"
      />

      <Image
        src="/logo-outline2.png"
        alt=""
        aria-hidden
        width={104}
        height={56}
        className="animate-float-reverse absolute bottom-0 left-2 md:left-5"
      />

      <Image
        src="/Dots.svg"
        alt=""
        aria-hidden
        width={63}
        height={63}
        className="animate-float-spin absolute top-1/2 left-2/5"
      />

      <Image
        src="/Rectangle.svg"
        alt=""
        aria-hidden
        width={52}
        height={52}
        className="animate-float absolute right-0 bottom-10"
      />
    </div>
  );
};

export default SkillSection;
