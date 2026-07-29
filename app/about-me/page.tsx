import type { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/lib/metadata";
import { SectionHeader } from "@/components/shared/utils";
import { Reveal } from "@/components/animations/reveal";
import { PageTransition } from "@/components/shared/page-transition";

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
    <PageTransition>
      <section className="w-full space-y-10 p-7 md:w-5/6 md:mx-auto">
        <SectionHeader title="about-me" />

        <div className="flex flex-col gap-10 md:flex-row md:items-center">
          <Reveal direction="left" className="flex justify-center md:w-[40%]">
            <Image
              src="/guy-image2.svg"
              alt="Developer illustration"
              width={300}
              height={400}
              sizes="(max-width: 768px) 300px, 400px"
              className="h-76.75 w-62.5 md:h-100 md:w-75"
            />
          </Reveal>

          <div className="text-secondary flex flex-col gap-6 text-sm leading-6 font-light md:w-[60%]">
            <Reveal direction="right" delay={0.1}>
              <p>Hello, Divine Domokuma here.</p>
            </Reveal>

            <Reveal direction="right" delay={0.15}>
              <p>
                I&apos;m a Frontend Developer with a strong focus on building modern
                web applications using JavaScript, TypeScript, React, Next.js, and
                Node.js. I enjoy solving real-world problems through thoughtful
                software design, creating applications that are responsive, scalable,
                and easy to maintain.
              </p>
            </Reveal>

            <Reveal direction="right" delay={0.2}>
              <p>
                Whether I&apos;m implementing a clean frontend interface, integrating
                backend APIs, or working with databases, I care about writing code
                that is both efficient and maintainable.
              </p>
            </Reveal>

            <Reveal direction="right" delay={0.25}>
              <p>
                Over the past few years, I&apos;ve built projects ranging from
                educational platforms and secure communication systems to portfolio
                websites and productivity tools. Each project has strengthened my
                understanding of software architecture, state management,
                authentication, database design, and user experience.
              </p>
            </Reveal>

            <Reveal direction="right" delay={0.3}>
              <p>
                I&apos;m constantly learning new technologies, refining my
                engineering practices, and contributing to projects that challenge me
                to grow as a developer.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}