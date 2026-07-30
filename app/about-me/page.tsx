import Image from "next/image";
import type { Metadata } from "next";

import { siteConfig } from "@/lib/metadata";

import { Float } from "@/components/animations/float";
import { PageHeader } from "@/components/shared/utils";
import { Reveal } from "@/components/animations/reveal";
import SkillSection from "@/components/sections/skills";
import { PageTransition } from "@/components/shared/page-transition";
import { ABOUT_ME_INFO } from "@/lib/constant";

export const metadata: Metadata = {
  title: "About Me",
  description: `Learn more about ${siteConfig.name}, a Frontend Developer specializing in React, Next.js, TypeScript, and building scalable web applications.`,
  openGraph: {
    title: `About Me | ${siteConfig.name}`,
    description: `Learn more about ${siteConfig.name}.`,
    url: `${siteConfig.url}/about-me`,
  },
  alternates: { canonical: `${siteConfig.url}/about-me` },
};

export default function AboutMePage() {
  return (
    <PageTransition className="w-full h-fit flex flex-col p-5 space-y-10 md:w-5/6">
      <PageHeader desc="A little bit about me" title="about-me" />

      <section className="w-full flex flex-col gap-10 md:flex-row md:items-center">
        <Reveal direction="left" className="flex justify-center md:w-[40%]">
          <div className="relative h-fit w-fit">
            <Float
              speed="reverse"
              className="absolute -top-6 -left-6 z-10 h-16 w-16 md:h-21 md:w-21"
            >
              <Image
                src="/Dots.svg"
                alt=""
                aria-hidden
                width={84}
                height={84}
              />
            </Float>

            <Image
              src="/guy-image2.svg"
              alt="Developer illustration"
              width={300}
              height={400}
              sizes="(max-width: 768px) 300px, 400px"
              className="h-76.75 w-62.5 md:h-100 md:w-75"
            />

            <Float speed="spin" className="absolute -bottom-6 -right-6">
              <Image
                src="/Dots-rectangle.svg"
                alt=""
                aria-hidden
                width={104}
                height={56}
              />
            </Float>
          </div>
        </Reveal>

        <div className="text-secondary flex flex-col gap-6 text-sm leading-6 font-light md:w-[60%]">
          <Reveal direction="right" delay={0.1}>
            <p>Hello, Divine Domokuma here.</p>
          </Reveal>

          {ABOUT_ME_INFO.map((info, i) => (
            <Reveal
              direction="right"
              key={i * 0.0034}
              delay={(i + 1) / 10 + 0.005}
            >
              <p>{info}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="w-full">
        <SkillSection />
      </section>
    </PageTransition>
  );
}
