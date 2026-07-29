import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionHeader } from "../shared/utils";
import { Float } from "../animations/float";

const AboutSection = () => {
  return (
    <section className="grid-pattern flex w-full flex-col justify-center gap-10 p-7 md:flex-row-reverse md:items-center md:justify-between">
      <div className="w-full space-y-7 md:w-[45%]">
        <SectionHeader title="about-me" />

        <div className="text-secondary flex flex-col gap-6 text-sm leading-6 font-light">
          <p>Hello, Divine Domokuma here.</p>

          <p>
            I&apos;m a Frontend Developer with a strong focus on building modern
            web applications using JavaScript, TypeScript, React, Next.js,
            Node.js.
          </p>

          <p>
            I enjoy solving real-world problems through thoughtful software
            design, creating applications that are responsive, scalable, and
            easy to maintain.
          </p>

          {/*<p>
            Whether I&apos;m implementing a clean frontend interface,
            integrating backend APIs, or working with databases, I care about
            writing code that is both efficient and maintainable.
          </p> 
          <p>
            Over the past few years, I&apos;ve built projects ranging from
            educational platforms and secure communication systems to portfolio
            websites and productivity tools. Each project has strengthened my
            understanding of software architecture, state management,
            authentication, database design, and user experience. I&apos;m
            constantly learning new technologies, refining my engineering
            practices, and contributing to projects that challenge me to grow as
            a developer.
          </p> */}
        </div>

        <Link
          href="/about-me"
          className="border-primary flex w-fit items-center gap-3 border px-3 py-2 text-xs text-white transition-colors hover:bg-primary hover:text-background"
        >
          <span>Read More</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      <div className="hidden md:flex w-full justify-center md:w-[45%]">
        <AboutIllustration />
      </div>
    </section>
  );
};

const AboutIllustration = () => {
  return (
    <div className="relative h-fit w-fit">
      <Float speed="reverse" className="absolute top-1/4 -left-3 z-10 h-16 w-16 md:h-21 md:w-21">
        <Image src="/Dots.svg" alt="" aria-hidden width={84} height={84} />
      </Float>

      <Image
        src="/guy-image2.svg"
        alt="Developer illustration"
        width={300}
        height={400}
        className="h-76.75 w-62.5 md:h-100 md:w-75"
      />

      <Float speed="spin" className="absolute right-0 bottom-10">
        <Image src="/Dots-rectangle.svg" alt="" aria-hidden width={104} height={56} />
      </Float>
    </div>
  );
};

export default AboutSection;
